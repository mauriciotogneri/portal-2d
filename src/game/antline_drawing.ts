import type {PositionData} from '@/game/chamber_data'
import {Direction} from '@/game/direction'
import {wallJoins} from '@/game/element_drawings'
import {PALETTE} from '@/game/palette'
import {type CompiledAntline, type CompiledChamber, NO_ELEMENT, type PlacedKind} from '@/game/rules/compiled_chamber'
import type {RulesState} from '@/game/rules/rules_state'
import type {TilePainter} from '@/game/tile_painter'

// How the antlines are drawn (docs/sprites.md): dotted lines on the floor
// from a button, switch or receiver to an element it links (from a receiver,
// under its wall tile up to the floor), drawn by code, unlit in
// cyan and lit in amber while the element they lead to is unblocked, each
// dot ringed by a darker border. They lie over the floor and under
// everything else, so the renderer draws them into its backdrop; where a
// line crosses a plain wall, its dots are drawn again over the wall's top,
// right after the walls and their shadow, kept clear of the wall's bevels

/**
 * A dot's middle, in tiles from the chamber's bottom-left corner: x to the
 * right, y upwards.
 */
type DotPoint = {
  readonly x: number // Tiles to the right
  readonly y: number // Tiles upwards
}

/** Dots along each tile of a line, one on the tile's middle */
const DOTS_PER_TILE = 3

/** A dot's width, in tiles */
const DOT_WIDTH = 0.15

/** The width of a dot's border, in tiles; it is never thinner than a pixel */
const BORDER_WIDTH = 0.025

/** Where a line stops on its last run, in tiles before the middle of the element's tile: its edge, so it ends the same whether the element is drawn or not */
const END_SHORT = 0.5

/** Leeway for comparing distances along a line, in tiles */
const LEEWAY = 1e-6

/** The dots of a wall tile a line runs straight across with a wall beyond both ends, in tiles from its middle along the line: the floor's */
const WALL_RUN_DOTS = [
  -1 / DOTS_PER_TILE,
  0,
  1 / DOTS_PER_TILE,
]

/** The dots of a wall tile a line runs straight across with a bevel at either end: a pair centred on the tile, clear of the bevel */
const WALL_EDGE_DOTS = [
  -1 / (2 * DOTS_PER_TILE),
  1 / (2 * DOTS_PER_TILE),
]

/** The elements on a wall tile that hide a line under them, as they do on the floor: no dots are drawn over them */
const HIDING_WALL_KINDS: readonly PlacedKind[] = [
  'blockedWall',
  'emitter',
  'receiver',
]

/**
 * Whether an antline is lit: while the element it leads to is unblocked (a
 * door or the exit open, a laser, a light barrier or a fizzler off, a ditch
 * bridged, a blocked wall taking portals, an emitter on). A box has no
 * blocked flag, so a line to it is never lit.
 * @param state - The state drawn
 * @param antline - The antline
 * @returns True when it is lit
 */
export function isAntlineLit(state: RulesState, antline: CompiledAntline): boolean {
  const kind = antline.target.kind

  return (kind !== 'box') && (!state.isBlocked(kind, antline.target.index))
}

/**
 * Which antlines are lit in a state, as one text to compare, so the backdrop
 * that holds them is drawn again only when one of them changes.
 * @param state - The state drawn
 * @returns One character per antline, in the chamber's order: 1 when lit, 0 when not
 */
export function antlinesLitKey(state: RulesState): string {
  return state.chamber.antlines.map((antline) => isAntlineLit(state, antline) ? '1' : '0').join('')
}

/**
 * The middles of an antline's dots, every tile middle along its path among
 * them and each corner once, from the middle of the button's, switch's or
 * receiver's tile to just short of the element's tile.
 * @param path - Its corner tiles, from the button, switch or receiver to the element
 * @returns The dots, in order along the line
 */
function dotsAlong(path: CompiledAntline['path']): DotPoint[] {
  const dots: DotPoint[] = []
  const spacing = 1 / DOTS_PER_TILE

  for (let run = 0; run < path.length - 1; run++) {
    const from = path[run]
    const to = path[run + 1]

    if ((from === undefined) || (to === undefined)) {
      continue
    }

    const length = Math.abs(to.x - from.x) + Math.abs(to.y - from.y)
    const isLast = run === path.length - 2
    const reach = isLast ? (length - END_SHORT - LEEWAY) : (length + LEEWAY)
    const dx = Math.sign(to.x - from.x)
    const dy = Math.sign(to.y - from.y)

    // Every run after the first starts on the corner the run before ended on
    for (let dot = (run === 0) ? 0 : 1; dot * spacing <= reach; dot++) {
      const along = dot * spacing

      dots.push({
        x: from.x + 0.5 + (dx * along),
        y: from.y + 0.5 + (dy * along),
      })
    }
  }

  return dots
}

/**
 * Every tile an antline crosses, in order, from its first corner's to its
 * last.
 * @param path - Its corner tiles, from the button, switch or receiver to the element
 * @returns The tiles, or none when a run between two corners isn't straight, which only a chamber read without the layout checks can have
 */
function tilesAlong(path: CompiledAntline['path']): PositionData[] {
  const first = path[0]

  if (first === undefined) {
    return []
  }

  const tiles: PositionData[] = [first]

  for (let run = 0; run < path.length - 1; run++) {
    const from = path[run]
    const to = path[run + 1]

    if ((from === undefined) || (to === undefined)) {
      continue
    }

    const dx = Math.sign(to.x - from.x)
    const dy = Math.sign(to.y - from.y)

    if ((dx !== 0) && (dy !== 0)) {
      return []
    }

    let x = from.x
    let y = from.y

    while ((x !== to.x) || (y !== to.y)) {
      x += dx
      y += dy
      tiles.push({
        x: x,
        y: y,
      })
    }
  }

  return tiles
}

/**
 * The dots over a wall tile a line crosses, kept clear of its bevels: a
 * bevel lies at each end where the tile beyond isn't part of the mass of
 * walls, as the walls are drawn. Running straight across with a wall beyond
 * both ends, it takes the floor's dots; with a bevel at either end, a pair
 * centred on the tile. Turning on it, it takes its middle dot and each arm's,
 * but for an arm that ends on a bevel.
 * @param joins - Whether a tile is part of the mass of walls
 * @param tile - The wall tile
 * @param before - The tile the line comes from
 * @param after - The tile the line goes on to
 * @returns The dots
 */
function wallTileDots(joins: (x: number, y: number) => boolean, tile: PositionData, before: PositionData, after: PositionData): DotPoint[] {
  const middleX = tile.x + 0.5
  const middleY = tile.y + 0.5
  const inX = before.x - tile.x
  const inY = before.y - tile.y
  const outX = after.x - tile.x
  const outY = after.y - tile.y
  const bevelIn = !joins(before.x, before.y)
  const bevelOut = !joins(after.x, after.y)

  if ((inX === -outX) && (inY === -outY)) {
    const offsets = (bevelIn || bevelOut) ? WALL_EDGE_DOTS : WALL_RUN_DOTS

    return offsets.map((along) => ({
      x: middleX + (outX * along),
      y: middleY + (outY * along),
    }))
  }

  const arm = 1 / DOTS_PER_TILE
  const dots: DotPoint[] = [
    {
      x: middleX,
      y: middleY,
    },
  ]

  if (!bevelIn) {
    dots.push({
      x: middleX + (inX * arm),
      y: middleY + (inY * arm),
    })
  }

  if (!bevelOut) {
    dots.push({
      x: middleX + (outX * arm),
      y: middleY + (outY * arm),
    })
  }

  return dots
}

/**
 * The middles of an antline's dots over the plain walls it crosses: never
 * on its first tile, the button's, switch's or receiver's, nor its last, the
 * element's, nor on a blocked wall, an emitter or a receiver, which hide it.
 * @param chamber - The chamber
 * @param joins - Whether a tile is part of the mass of walls
 * @param path - Its corner tiles, from the button, switch or receiver to the element
 * @returns The dots
 */
function wallDotsAlong(chamber: CompiledChamber, joins: (x: number, y: number) => boolean, path: CompiledAntline['path']): DotPoint[] {
  const tiles = tilesAlong(path)
  const dots: DotPoint[] = []

  for (let i = 1; i < tiles.length - 1; i++) {
    const before = tiles[i - 1]
    const tile = tiles[i]
    const after = tiles[i + 1]

    if ((before === undefined) || (tile === undefined) || (after === undefined) || !joins(tile.x, tile.y)) {
      continue
    }

    if (HIDING_WALL_KINDS.some((kind) => chamber.elementAt(kind, tile.x, tile.y) !== NO_ELEMENT)) {
      continue
    }

    dots.push(...wallTileDots(joins, tile, before, after))
  }

  return dots
}

/**
 * Draws a set of dots in one colour: every dot filled, then every dot's
 * border, inside its edge so the border doesn't widen it.
 * @param painter - Paints on the canvas
 * @param dots - The dots' middles
 * @param fill - The dots' colour
 * @param border - Their border's colour
 */
function drawDots(painter: TilePainter, dots: readonly DotPoint[], fill: string, border: string): void {
  if (dots.length === 0) {
    return
  }

  // A frame on the chamber's bottom-left corner, with x to the right and y down
  painter.drawInFrame(0, 0, Direction.UP, (ctx, tileSize) => {
    const radius = (DOT_WIDTH * tileSize) / 2
    const borderWidth = Math.max(BORDER_WIDTH * tileSize, 1)
    const points = dots.map((dot) => ({
      x: dot.x * tileSize,
      y: -dot.y * tileSize,
    }))

    ctx.beginPath()

    for (const point of points) {
      ctx.moveTo(point.x + radius, point.y)
      ctx.arc(point.x, point.y, radius, 0, Math.PI * 2)
    }

    ctx.fillStyle = fill
    ctx.fill()

    const borderRadius = Math.max(radius - (borderWidth / 2), 0)

    ctx.beginPath()

    for (const point of points) {
      ctx.moveTo(point.x + borderRadius, point.y)
      ctx.arc(point.x, point.y, borderRadius, 0, Math.PI * 2)
    }

    ctx.lineWidth = borderWidth
    ctx.strokeStyle = border
    ctx.stroke()
  })
}

/**
 * Draws some of the dots of a state's antlines, the unlit lines' first, so a
 * lit line shows over an unlit one where they share tiles.
 * @param painter - Paints on the canvas
 * @param state - The state drawn
 * @param dotsOf - The dots drawn of an antline
 */
function drawLines(painter: TilePainter, state: RulesState, dotsOf: (antline: CompiledAntline) => DotPoint[]): void {
  const antlines = state.chamber.antlines

  drawDots(painter, antlines.filter((antline) => !isAntlineLit(state, antline)).flatMap(dotsOf), PALETTE.antlineOff, PALETTE.antlineOffBorder)
  drawDots(painter, antlines.filter((antline) => isAntlineLit(state, antline)).flatMap(dotsOf), PALETTE.antlineOn, PALETTE.antlineOnBorder)
}

/**
 * Draws a state's antlines on the floor, under the walls and everything
 * else.
 * @param painter - Paints on the canvas
 * @param state - The state drawn
 */
export function drawAntlines(painter: TilePainter, state: RulesState): void {
  drawLines(painter, state, (antline) => dotsAlong(antline.path))
}

/**
 * Draws a state's antlines again over the plain walls they cross, after the
 * walls and their shadow.
 * @param painter - Paints on the canvas
 * @param state - The state drawn
 */
export function drawWallAntlines(painter: TilePainter, state: RulesState): void {
  const joins = wallJoins(state.chamber)

  drawLines(painter, state, (antline) => wallDotsAlong(state.chamber, joins, antline.path))
}

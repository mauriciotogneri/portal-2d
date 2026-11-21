/**
 * Every colour the game draws on its canvas by code, named by what it
 * colours: the background behind the floor, the shared drop shadow, a
 * missed shot's ripple in each portal's colour, the particles rising from
 * each open portal, in its own colours, the antlines' dots, unlit
 * and lit, each with its border, an emitter's ray, from its dark rim to its
 * white-hot core, the mirror marked on a carried mirror box, the fizzlers'
 * fields, their see-through blue, their cyan light and the splash where a
 * portal shot meets one, the light barriers'
 * bands, their see-through teal, their rim and their light, the open exit's
 * shadow, the surface detail laid over the floor and the walls' tops,
 * its tones and its wear marks, and the element detail laid over the
 * elements' sprites, each drawn faint (how faint is the drawing's to say). Everything else is drawn from the sprites' files,
 * whose meaning colours are listed in docs/sprites.md. The background and
 * the portals' colours are mirrored by hand in the CSS tokens on `:root` in
 * `src/assets/styles.css`, and the portals' colours in the sprites too, as
 * their comments say: change them together.
 */
export const PALETTE = {
  chamber: 'rgba(32, 32, 32, 1)', // Background behind the floor; mirrored by --color-chamber
  shadow: 'rgba(0, 0, 0, 0.5)', // The shared drop shadow under what stands raised, at its darkest
  missBlue: 'rgba(40, 140, 220, 1)', // A missed blue shot's ripple: the blue portal's meaning colour (docs/sprites.md); mirrored by --color-blue
  missOrange: 'rgba(255, 160, 30, 1)', // A missed orange shot's ripple: the orange portal's meaning colour (docs/sprites.md); mirrored by --color-orange
  particleBlue: 'rgba(40, 140, 220, 1)', // The blue portal's particles (docs/sprites.md): a shaft's sides and a spark's ring, the blue portal's rim colour
  particleBlueShaft: 'rgba(58, 151, 225, 1)', // A blue shaft's middle, a little lighter than its sides
  particleBlueCore: 'rgba(170, 220, 255, 1)', // A blue spark's middle: the pale blue of the portal's lit inner edge
  particleOrange: 'rgba(255, 160, 30, 1)', // The orange portal's particles: a shaft's sides and a spark's ring, the orange portal's rim colour
  particleOrangeShaft: 'rgba(255, 168, 48, 1)', // An orange shaft's middle, a little lighter than its sides
  particleOrangeCore: 'rgba(255, 220, 160, 1)', // An orange spark's middle: the pale orange of the portal's lit inner edge
  fizzlerField: 'rgba(22, 85, 211, 1)', // A fizzler's field (docs/sprites.md): its see-through blue sheet, drawn half opaque, deeper than the blue portal
  fizzlerLight: 'rgba(126, 218, 255, 1)', // The field's cyan light: its wisps, its tongues of light along the connectors, its dashes' glow, its flash and a shot's splash's glow
  fizzlerCore: 'rgba(191, 237, 255, 1)', // The light at its palest: the wisps' brightest strands, the tongues' roots, the dashes' streaks and the flash's ring
  fizzlerSplashRing: 'rgba(223, 246, 255, 1)', // The ring spreading where a portal shot met the field: its palest light, halfway to white
  fizzlerSplashSpot: 'rgba(255, 255, 255, 1)', // The spot flashing white where the shot met it
  lightBarrierBand: 'rgba(96, 222, 186, 1)', // A light barrier's band: the light barrier's teal meaning colour (docs/sprites.md), drawn see-through
  lightBarrierRim: 'rgba(20, 150, 120, 1)', // The deep teal rim just outside the band, so it reads on the light floor
  lightBarrierLight: 'rgba(186, 246, 228, 1)', // The light along the band's edges, and pooling where it leaves an end plate
  lightBarrierEdge: 'rgba(242, 255, 251, 1)', // The band's two bright edges, the light at its brightest where it leaves an end plate, and its glow where it was met
  lightBarrierFlare: 'rgba(255, 255, 255, 1)', // The line a band unfolds from, the fronts running out of its plates, and the flare and bar where a shot or the subject met it
  antlineOff: 'rgba(72, 176, 185, 1)', // An unlit antline's dots: muted cyan, clear of the blue portal and the light barrier's teal (docs/sprites.md)
  antlineOffBorder: 'rgba(50, 123, 130, 1)', // Their border, 30 % darker
  antlineOn: 'rgba(250, 194, 44, 1)', // A lit antline's dots: amber, yellower than the orange portal (docs/sprites.md)
  antlineOnBorder: 'rgba(175, 136, 31, 1)', // Their border, 30 % darker
  rayBody: 'rgba(255, 228, 112, 1)', // An emitter's ray: pale gold, its beam's body, its haze and its glow (docs/sprites.md)
  rayLight: 'rgba(255, 242, 186, 1)', // The ray's beam lightening towards its middle
  rayCore: 'rgba(255, 252, 236, 1)', // The ray's white-hot core
  rayRim: 'rgba(186, 148, 30, 1)', // The ray's dark rim and soft edge, so pale gold shows on the light floor
  carriedMirrorFrame: 'rgba(44, 48, 54, 1)', // A carried mirror box's mirror, drawn over the box in the subject's hands: its dark frame
  carriedMirrorGlass: 'rgba(226, 231, 238, 1)', // Its glass
  carriedMirrorGlint: 'rgba(255, 255, 255, 1)', // The glint along it
  exitShadow: 'rgba(0, 0, 0, 1)', // The open exit's shadow at its darkest, at the chamber's edge
  floorShadeCool: 'rgba(26, 36, 62, 1)', // The surface detail (docs/sprites.md): a floor tile shaded a little darker than the next, its cooler tint
  floorShadeWarm: 'rgba(66, 56, 42, 1)', // Its warmer tint; each tile is shaded somewhere between the two
  floorPatch: 'rgba(34, 40, 60, 1)', // The soft darker patches, several tiles wide, on the floor
  floorWallShade: 'rgba(20, 26, 44, 1)', // The floor darkening towards the walls
  floorGrime: 'rgba(60, 54, 46, 1)', // The dirt gathered along the foot of the walls
  floorScratch: 'rgba(58, 64, 82, 1)', // A scratch on the floor
  floorCrack: 'rgba(34, 38, 50, 1)', // A crack in a floor tile
  floorChip: 'rgba(122, 127, 140, 1)', // What shows where a floor tile's corner is chipped off
  floorChipEdge: 'rgba(52, 57, 70, 1)', // The broken edge round it
  wallScratch: 'rgba(238, 241, 248, 1)', // A scratch on a wall's top, bright on the grey
  surfaceLight: 'rgba(255, 255, 255, 1)', // What lightens a surface: the open floor far from every wall, the lit edge of a scratch or a crack on the floor, a wall plate or patch a shade lighter
  surfaceDark: 'rgba(0, 0, 0, 1)', // What darkens a wall: a plate or patch a shade darker, the shaded edge of a scratch
  elementWarm: 'rgba(255, 186, 110, 1)', // The element detail (docs/sprites.md): an element tinted a little warmer than the next
  elementCool: 'rgba(110, 150, 255, 1)', // An element tinted a little cooler than the next
  gratePolish: 'rgba(206, 210, 216, 1)', // A band of a grate's bars rubbed paler where feet cross it
  grateScratch: 'rgba(226, 230, 236, 1)', // A scratch on a grate's frame, bright on the steel
} as const

/**
 * A palette colour at another opacity.
 * @param colour - The colour, as rgba() with its channels
 * @param alpha - The opacity, from 0 to 1
 * @returns The colour at that opacity, as rgba()
 */
export function withAlpha(colour: string, alpha: number): string {
  return colour.replace(/,\s*[\d.]+\)$/, `, ${alpha})`)
}

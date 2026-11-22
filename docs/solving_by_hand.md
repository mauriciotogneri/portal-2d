# Solving a chamber by hand

How to solve a chamber by reasoning rather than by search, and how to prove the solution right by playing it through the rules. It is for the chambers the solver can't help with:

- **Too large to finish.** On 2026-11-08, under older rules, the solver gave up on Playground 2 and Playground 3 and found only a long route for Playground 4 (`docs/solver.md`). Even on the tutorial (id 1), its fewest-portals search gave up at its default 5 minutes on 2026-11-22, and its fewest-moves search took nearly 4.
- **Too large for the key.** The solver packs a state into 64 bits; Playground 1 needs 79, so it refuses it.
- **A receiver.** The solver's macro search refuses any chamber with one, since the subject cuts a ray by walking into it; only its exact reference search, far slower, runs there.
- **Proving a new chamber solvable** before its solution is recorded.
- **Arguing that something can't be done.** For example, that no route skips an element, or that a shortcut doesn't exist (`docs/level_design.md`, guideline 101).

The approach: treat the chamber as a set of regions joined by walking, by portal shots and by boxes, work back from the exit to what each step needs, write the route forward, then play it through the game's own rules with a short script. A route that plays to completion is a proof that the chamber is solvable, since the script runs the same `step` the game runs.

Playground 2 was solved this way on 2026-11-20, with no search: 169 actions, 100 moves and 29 portals, and the route still plays under the rules as they stood on 2026-11-22. The recorded solution the chamber had while it was in the campaign took 260 actions, 167 moves and 34 portals; it was deleted when the chamber left the campaign, and git history keeps it. The [worked example](#worked-example-playground-2) at the end walks through it.

To check a chamber for shortcuts, solve it before reading its recorded solution. A route found on its own is what shows a way the design didn't intend; compare the two afterwards.

## The tools

| # | Tool | What it gives |
|---|------|---------------|
| 1 | [Chamber map](#chamber-map) | The chamber as text, top row first, and its moving parts: every element a link can switch, how it starts and what switches it |
| 2 | [Route check](#route-check) | Plays a route through the rules one action at a time, printing each step, and stops at the first refused action or missed checkpoint |
| 3 | `npm run solve` | Each chamber's size; on a small chamber or a cut-down copy, a search (`docs/solver.md`) |

Both scripts are throwaways: keep them outside the repository.

### Chamber map

Save as `chamber_map.py` and run `python3 chamber_map.py src/chambers/chamber_N.json` (or a playground chamber's file, `src/dev/playground/playground_N.json`). It needs nothing but Python 3.

```python
import json
import sys
from collections import defaultdict

data = json.load(open(sys.argv[1]))
width, height = data['size']['width'], data['size']['height']
ARROWS = {'UP': '^', 'DOWN': 'v', 'LEFT': '<', 'RIGHT': '>'}
SYMBOLS = {
    'walls': lambda entry: '#',
    'blockedWalls': lambda entry: 'X',
    'emitters': lambda entry: 'e' + ARROWS[entry['direction']],
    'receivers': lambda entry: 'r' + ARROWS[entry['direction']],
    'slideFloors': lambda entry: ',',
    'ditches': lambda entry: '~',
    'doors': lambda entry: 'D',
    'fizzlers': lambda entry: 'F',
    'lasers': lambda entry: '|' if entry['direction'] == 'V' else '-',
    'lightBarriers': lambda entry: ':' if entry['direction'] == 'V' else '=',
    'buttons': lambda entry: 'o',
    'switches': lambda entry: 's',
    'arrows': lambda entry: ARROWS[entry['direction']],
    'boxes': lambda entry: 'M' if 'mirror' in entry else 'B',
}


def tiles(entry):
    if 'xFrom' in entry:
        for x in range(entry['xFrom'], entry['xTo'] + 1):
            for y in range(entry['yFrom'], entry['yTo'] + 1):
                yield x, y
    else:
        yield entry['x'], entry['y']


# The map: one cell per tile, top row first (y grows upwards); * marks an element with an id
cells = defaultdict(str)
for field, symbol in SYMBOLS.items():
    for entry in data.get(field, []):
        for x, y in tiles(entry):
            cells[(x, y)] += symbol(entry) + ('*' if 'id' in entry else '')
cells[(data['exit']['x'], data['exit']['y'])] += 'E' + ('*' if 'id' in data['exit'] else '')
cells[(data['subject']['x'], data['subject']['y'])] += 'S'
cell_width = max(3, max(len(text) for text in cells.values()) + 1)
print('    ' + ''.join(f'{x:<{cell_width}}' for x in range(width)))
for y in range(height - 1, -1, -1):
    print(f'{y:>2}  ' + ''.join(f'{cells.get((x, y)) or ".":<{cell_width}}' for x in range(width)))

# The moving parts: every element with an id, how it starts (blocked when a link
# reaches it, before the start settles), and what acts on it; then any element
# without an id that starts unblocked, since it stays that way
STATES = {
    'blockedWalls': ('refusing portals', 'taking portals'),
    'emitters': ('off', 'on'),
    'ditches': ('open', 'bridged'),
    'doors': ('closed', 'open'),
    'exit': ('closed', 'open'),
    'fizzlers': ('on', 'off'),
    'lasers': ('on', 'off'),
    'lightBarriers': ('on', 'off'),
}
ACTIVATORS = {'buttons': 'button', 'switches': 'switch', 'receivers': 'receiver'}
groups = {group['id']: group['links'] for group in data.get('groups', [])}
acted_on_by = defaultdict(list)
for field, name in ACTIVATORS.items():
    for entry in data.get(field, []):
        for link in entry['links']:
            for target in groups.get(link, [link]):
                acted_on_by[target].append(f"{name} ({entry['x']},{entry['y']})")
parts = [(field, entry) for field in SYMBOLS for entry in data.get(field, [])] + [('exit', data['exit'])]
print()
for field, entry in sorted(parts, key=lambda part: part[1].get('id', 0)):
    if field == 'arrows':
        start = f"pointing {entry['direction']}" + (f" (turns to {entry['turnedDirection']})" if 'turnedDirection' in entry else '')
    elif field in STATES:
        linked = bool(acted_on_by.get(entry.get('id')))
        start = STATES[field][0 if linked or entry.get('blocked', field != 'emitters') else 1]
    else:
        start = None
    if 'xFrom' in entry:
        where = f"{field} ({entry['xFrom']}..{entry['xTo']},{entry['yFrom']}..{entry['yTo']})"
    else:
        where = f"{field} ({entry['x']},{entry['y']})"
    if 'id' in entry:
        sources = ', '.join(acted_on_by[entry['id']]) or 'nothing'
        print(f"id {entry['id']}: {where}{', starts ' + start if start else ''}; acted on by {sources}")
    elif start is not None and field != 'arrows' and start == STATES[field][1]:
        print(f"no id: {where}, always {start}")
```

| # | Mark | Tile |
|---|------|------|
| 1 | `.` | Floor |
| 2 | `#` | Wall, which takes portals |
| 3 | `X` | Blocked wall: refuses portals while blocked; with no id it keeps its start for good, refusing portals unless its file says `blocked: false` |
| 4 | `e>` `r<` | Emitter, receiver, with the way its face looks |
| 5 | `~` | Ditch |
| 6 | `D` | Door |
| 7 | `F` | Fizzler |
| 8 | `\|` `-` | Laser, vertical or horizontal; `-\|` is two lasers crossing |
| 9 | `:` `=` | Light barrier, vertical or horizontal |
| 10 | `o` `s` | Button, switch |
| 11 | `^` `v` `<` `>` | Arrow, the way it lets the subject in |
| 12 | `,` | Slide floor, written before what stands on it (`,o` is a button on slide floor) |
| 13 | `B` `M` | Box, mirror box, at its start |
| 14 | `E` `S` | Exit, the subject's start |
| 15 | `*` | After a mark: the element has an id, so a link can switch it. An element without one never changes |

The map shows where things start, not how they start: the parts list under it says that. A cell can hold several marks, as `oB` for a box starting on a button.

### Route check

Save as `route_check.ts`, change the chamber import and the route, and run `npx tsx --tsconfig tsconfig.scripts.json path/to/route_check.ts` from the repository's root. `tsx` resolves the `@/` imports through `tsconfig.scripts.json`, wherever the file is.

```ts
// Plays a route written by hand through the rules, one action at a time,
// printing each step, and stops at the first refusal or wrong checkpoint.
// A token like 3,11 is a checkpoint: where the subject must stand after the
// action before it.
import chamberData from '@/dev/playground/playground_2.json'
import {parseReplayAction} from '@/game/replay_data'
import type {Action} from '@/game/rules/action'
import {CompiledChamber} from '@/game/rules/compiled_chamber'
import {loadChamber} from '@/game/rules/load_chamber'
import type {RulesState} from '@/game/rules/rules_state'
import {startChamber, step} from '@/game/rules/step'
import {countPortalsOpened, countsAsMove} from '@/game/rules/step_counts'

const ROUTE = `
  blue turnLeft orange left left left 3,11
`

const loaded = loadChamber(chamberData)

if (loaded.chamber === null) {
  throw new Error(loaded.problems.map((problem) => problem.message).join('; '))
}

const chamber = new CompiledChamber(loaded.chamber)
const start = startChamber(chamber)
let state: RulesState = start.state
let actions = 0
let moves = 0
let portals = countPortalsOpened(start.events)

for (const token of ROUTE.split(/\s+/).filter((text) => text !== '')) {
  const tile = `${state.subjectX},${state.subjectY}`

  if (/^\d+,\d+$/.test(token)) {
    if (token !== tile) {
      throw new Error(`checkpoint ${token} missed: the subject stands on ${tile}`)
    }

    continue
  }

  const action: Action = parseReplayAction(token)
  const result = step(chamber, state, action)

  moves += countsAsMove(state, result.state) ? 1 : 0
  portals += countPortalsOpened(result.events)
  state = result.state
  actions++
  console.log(`${String(actions).padStart(3)} ${action.padEnd(9)} ${state.subjectX},${state.subjectY} ${state.facing} ${state.isCarrying ? 'carrying ' : ''}[${result.events.join(', ')}]`)

  if (result.events.includes('refused')) {
    throw new Error(`action ${actions} (${action}) was refused`)
  }
}

console.log(`completed: ${String(state.completed)}, actions: ${actions}, moves: ${moves}, portals: ${portals}`)
```

The route is the actions by their replay names (`up`, `down`, `left`, `right`, `turnUp`, `turnDown`, `turnLeft`, `turnRight`, `blue`, `orange`, `interact`), separated by spaces or new lines. Each step prints the subject's tile, its facing, whether it carries a box, and the step's events (`bluePortalOpened`, `crossed`, `boxPickedUp`, `buttonPressed`, `doorOpened`, `fizzled` and the rest). Put a checkpoint after each phase, and after every crossing: a crossing that lands somewhere unexpected is the most common mistake, and the checkpoint catches it at once instead of many steps later. A refused action always stops the check, since a hand route never needs one: a shot that misses, a crossing onto a tile the subject can't enter, a box put down where it can't go.

The script proves the route plays. To make it the chamber's recorded solution, play it in `npm run dev` and press Download solution (`AGENTS.md`, "Recorded solutions").

## The rules

This doc restates only the few rules that trip a hand solution most often, as [pitfalls](#pitfalls), since a copy drifts from them; read the rules where they are kept. `docs/game_summary.md` tells the whole game in plain words and is the place to start. `docs/elements.md` is the authority: its "Rules" section says exactly what each action does and how a step settles, and its "Interactions" table names the rules that bring each pair of elements together. When the route check does something unexpected, the answer is there.

Two things matter here beyond the rules themselves: how this doc writes positions, and what in a chamber can change at all.

**Positions.** A tile is written `(x,y)`, with y growing upwards, so up is a higher y and the map's top row is the highest. A wall's face is written as the wall tile and the side it is on: `(4,16)E` is the east face of wall `(4,16)`, which looks onto `(5,16)`.

**What never changes.** Only a link changes an element's `blocked` flag, and only an element with an `id` can be linked. So an element without an id keeps the state its file gives it for good, whichever that is: with `blocked` left out, a laser is always on, a ditch always open, a fizzler always on and a blocked wall always refuses portals (pitfall 2 has every default), and one whose file says otherwise stays the other way, such as a blocked wall with `blocked: false`, which always takes portals. In most chambers nearly everything is fixed. The few elements with ids are the puzzle's moving parts.

## The method

### 1. Find the moving parts

Run the chamber map. The parts list names every element a link can switch, how it starts and what acts on it; every other element is scenery. Write the links as a short table: each button, switch and receiver, what it opens, and whether it holds (a button or a receiver: its links close again when released or dark) or latches (a switch: it stays active once used). An element several of them link opens only while all of them are active.

Note any element without an id that starts unblocked (the list's "always" lines): an always-open exit means the puzzle is just reaching it, and an always-off laser lets the subject and shots through, though the walls at the ends of its run still take no portal.

### 2. Split the floor into regions

Group the floor tiles into regions the subject can walk between with the scenery as it is. Mark each edge between regions:

- **Conditional:** a linked door, ditch, laser or light barrier, open only while every link to it is held, or a linked arrow, turned only while every link to it is held. Note what holds it.
- **One way:** an arrow, which lets the subject in its way only and never back. Several arrows in a row make a one-way corridor. A linked arrow's way, and so the edge, turns with its link.
- **A fizzler that is on:** walkable both ways, but crossing it closes both portals and destroys a carried box. Treat it as a reset of everything the subject carries.
- **Slide floor:** an edge from each tile and way to wherever the slide stops, which may be far away or through a portal.

Name each region in plain words (the start room, the door pocket) and keep a list: its tiles, what is in it (boxes, buttons, switches), and its edges. A small pocket sealed off by lasers, as in Playground 2's top half, is a region of its own: lasers stop walking but not shots.

### 3. Map the sightlines

For each region, list the wall faces a shot from inside it can reach, and which region each face looks onto. Walk each row and column from the region's tiles both ways and note where the shot stops. `docs/game_summary.md` ("Portals") says what stops a shot and which wall faces refuse a portal, and `docs/elements.md` ("Shoot blue or orange") gives every case.

A portal hop from region P to region Q needs two things, both done from P:

1. a shot from a tile of P that lands on a face looking onto a tile of Q;
2. a face the subject can walk into from P: any wall next to a tile of P whose face takes a portal, or the portal it arrived through.

Then walking into the second face brings the subject out in Q. Build the hop graph next to the walking graph. Shots that pass lasers, ditches and boxes often reach far: a single row or column can join regions at opposite ends of the chamber.

Look hardest at the long sightlines that end in a blocked wall, at the chamber's edge, behind an end plate or a fizzler's connector, or beside a door or the exit. Those are the designer closing a line on purpose; every one of them is a hop that doesn't exist, and they are what the puzzle is built from.

### 4. Find the cuts

A cut is a boundary between two parts of the chamber that something can't cross. The most useful:

- **An always-on fizzler as the only walking link, with no sightline across.** No portal survives the walk through it and no carried box crosses it, so nothing but the subject ever moves from one side to the other. Each box is bound to its side, and portals have to be set up afresh on each side.
- **A one-way arrow.** The subject can go through and never come back the same way, so the region behind it must have another way out, or be visited last. A linked arrow is a cut only while its link stays as it is: turning it changes which sides lead on and off it, and turns the subject standing on it.
- **A conditional edge with no other way across.** Whatever holds it is required, so it becomes a goal of its own (step 5).

Cuts settle most of the big questions before any route is written: which box can serve which button, which regions are visited in which order, which portal must be kept.

### 5. Work back from the exit

Start at the exit and ask what reaching it needs, then what each of those needs, until everything traces back to the start:

1. Is the exit open? If not, which link opens it, and where does the subject stand to work it?
2. How is that place reached: walking, a hop, or a conditional edge?
3. Each conditional edge the subject walks through needs every link to it held while the subject is somewhere else, so it needs a box on each button (or a ray on each receiver, and each switch used). An edge only a shot needs to cross can be held by the subject standing on the button and shooting from there, if the line runs from that tile.
4. Each box needed: which side of every cut is it on, and how does it reach its button?

Writing the chain as a list makes the gaps plain: a goal with no way to reach it means a wrong assumption about a region, a sightline or a rule.

### 6. Budget the boxes

List each box, its start, which side of each cut it is on, and every job it has. A box can do several jobs in turn:

- **Hold a button for a crossing**, then be fetched back: hop back to where the box is, pick it up and hop again with it.
- **Hold a button for an instant.** Put it down, shoot or walk through what it opens, then pick it up again. A portal opened through a fizzler that the box held off stays open when the fizzler comes back on, unless it is on a face looking onto that fizzler's tile.
- **Its last job** is the one it is left on.

A box that has to be in two places at once means another box is needed, or a different order.

### 7. Write the route forward

Turn the chain into phases, each from one safe position to the next: where the subject starts the phase, where each portal is, what it carries, and what the phase achieves. For each step, write down the colour of each portal before shooting, since shooting a colour moves it (pitfall 10).

Before trusting a phase, check its side effects, pitfalls 6 and 8 first: leaving a button closes what it held, perhaps on a box, and a fizzler switching on closes a portal on a face looking at it.

### 8. Check the route through the rules

Paste the phases into the route check with a checkpoint after each crossing and each phase, and run it. Fix the first failure, never more than one at a time: a missed checkpoint usually means the crossing came out of the other portal, or a shot stopped on a wall earlier than planned. A refused shot either missed (a closed door or exit, a fizzler or a light barrier that is on, a blocked wall, an emitter's or a receiver's face, an end plate or a fizzler's connector, a face beside a door or the exit, a portal already on that face or a neighbouring one) or was tried while carrying a box, when no shot leaves. A shot from inside a fizzler that is on fires nothing and reports no refusal, so the check doesn't stop on it: the next checkpoint or the events show it. Read the events to see what the step did. When the check ends with `completed: true`, the route is a proof that the chamber is solvable.

## Techniques

**Leapfrog.** To cross a chain of sealed pockets, keep the portal just come out of and shoot the other colour into the next pocket, then turn and walk back into the first. Each hop is one shot and usually one move, and the colours alternate. When the face to walk into is far from where the shot is fired, shoot a new one on the wall right beside the shooting tile instead: one more shot, fewer moves.

**Carrying through a portal.** A box can't be carried while shooting, so set up both portals first, then pick the box up, then walk into the portal. To bring a box out of a sealed pocket, the pocket needs a face for the exit shot and a wall beside the box's pick-up tile; shoot both before touching the box.

**Shooting from the button.** The subject standing on a button holds its links, and a shot leaves from its tile. A line that starts on the button tile needs no box: the shot is fired while the link is held, and the portal stays once the subject leaves.

**A box holding a fizzler off for one shot.** Put the box on the fizzler's button, shoot through the fizzler, pick the box up again. Shots go past the box itself, so the shot can even run along a line through the box's tile.

**Fetching a box back.** A box left on a button to open a way across can be recovered from the far side by a hop back next to it. A sightline through the box's own tile works, since shots pass boxes.

**Getting out of a dead end.** Before walking into a region with no way out but the way in, make sure a portal that will still be open points somewhere useful. From inside, shoot the other colour onto a wall there and walk into it. A portal survives walking and every element but a fizzler and a linked blocked wall becoming blocked under it.

**The long shot.** A row or a column that runs the length of the chamber, past lasers, ditches and arrows, can end a long walk in one hop. Look for one whenever the route walks back the way it came.

**Facing without turning.** Walking into a wall that holds no portal faces it at no cost, as a turn does. After a crossing the subject faces away from the portal's wall, so a shot straight ahead needs no turn.

## Proving that something can't be done

To show that a chamber can't be solved without an element, or that a shortcut doesn't exist, find a cut that the element's link (or the missing shortcut) is the only way across, and show every way across it is closed. List each kind of crossing, since the forgotten one is where the argument fails:

1. **Walking:** every tile on the boundary, with its arrows (one way), conditional edges and fizzlers.
2. **Portal hops, both ways:** every row and column that crosses the boundary, with where its shot stops, and whether the face there takes a portal. Remember shots pass lasers, ditches, boxes and anything switched off, and that a fizzler or light barrier can be off at the moment of the shot.
3. **Portals placed earlier:** a portal shot while a sightline was open, which survives until something closes it.
4. **Boxes:** carried across, sent back to a start on the other side (destroyed, or by a switch linked to it), or holding a button on either side.
5. **The subject holding a button while it shoots.**
6. **Rays:** through portals and mirror boxes, lighting a receiver on the other side.
7. **Links acting at a distance:** a button on one side switching an element on the other.

When every crossing is ruled out with a reason, the argument holds for every order of play, which a search can't give on a large chamber. When the argument gets hard, cut the region out into a small chamber of its own and run `npm run solve -- --solvable path/to/small_chamber.json` on it (named by its file, since with none named `npm run solve` takes only the campaign's chambers). If the cut-down chamber has a receiver, the macro search behind `--solvable` refuses it: run `--baseline`, the exact reference search, instead.

## Pitfalls

1. **The map is upside down.** y grows upwards: the map prints the highest row first, and "up" is towards it.
2. **A field left out is blocked.** A door, laser, light barrier, fizzler or exit without `blocked` starts closed or on, a ditch open and a blocked wall refusing portals, and an emitter starts on, unless a link reaches it: then it starts off, as every linked element starts blocked.
3. **Lasers don't stop shots; light barriers and fizzlers do while on.** A pocket sealed by lasers is reachable by portal; one sealed by light barriers may not be.
4. **Faces that refuse a portal.** Check the end plate or a fizzler's connector, the door or exit beside the wall, the neighbouring face of a wall already holding a portal, and blocked walls: four misses that look like hits on the map.
5. **A box blocks a crossing onto its tile.** A box left on a button can make a portal face looking onto that button unusable.
6. **Walking through a fizzler drops both portals**, including the one that was meant to lead back.
7. **A carried box can't shoot.** Every shot of a carrying phase has to happen before the pick-up, or after a put-down.
8. **Picking a box up off a button releases it at once**, and leaving a ditch's button reopens the ditch under whatever lies there.
9. **One-way arrows decide the order.** Visit the far side of a one-way edge only once there is another way back, or nothing left behind it.
10. **The portal just come out of is the one to keep.** Shoot the other colour next.

## Worked example: Playground 2

Playground 2 (20 × 20), as it stood on 2026-11-20. On 2026-11-08, under older rules, the solver gave up on it after 10 minutes, past 6 million states (`docs/solver.md`).

```
    0  1  2  3  4  5  6  7  8  9  10 11 12 13 14 15 16 17 18 19
19  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #
18  X  .  .  .  |* .  |  .  .  .  .  .  |  o  #  .  .  .  .  #
17  #  .  .  .  #  -  -| -  #  -  -  #  #  .  #  .  .  .  .  #
16  #  .  .  .  #  .  |  .  |  .  .  .  |  .  #  .  .  .  .  #
15  #  .  .  .  #  .  |  .  #  #  #  ~  #  .  #  .  .  .  .  #
14  #  .  s  .  #  #  #  #  #  .  |  .  #  .  .  .  .  .  .  #
13  #  .  .  .  X  B  .  .  .  .  |  .  |  .  #  .  .  .  .  #
12  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  F  #
11  #  .  .  .  .  .  .  .  .  .  .  .  <  .  .  .  .  .  .  X
10  #  .  .  .  .  .  #  .  .  o  .  .  #  v  v  #  #  #  #  #
 9  #  .  .  .  .  .  #  .  .  .  .  .  #  v  v  #  .  .  .  #
 8  #  .  .  .  .  .  #  .  .  B* .  s  #  v  v  #  .  o  .  #
 7  #  .  .  .  .  .  #  .  .  .  .  .  #  .  .  #  .  .  .  #
 6  #  ~  ~  ~  ~  ~  #  #  #  ~* #  #  #  #  D* #  #  F* #  #
 5  #  .  .  .  .  .  #  .  .  .  .  .  <  .  .  .  .  .  .  X
 4  #  .  .  .  .  .  #  .  .  X  .  .  #  .  .  .  .  .  .  #
 3  #  .  .  S  .  .  #  .  .  o  .  .  X  ~  ~  ~  .  o  .  #
 2  #  .  .  .  .  .  #  .  .  .  .  .  F* .  .  ~  .  .  .  #
 1  #  .  .  .  .  .  #  .  .  .  .  .  X  ~  ~  ~  .  .  .  #
 0  #  #  #  E* #  #  #  #  #  #  #  #  #  X  X  X  #  #  #  #

id 101: ditches (9,6), starts open; acted on by button (9,10)
id 102: boxes (9,8); acted on by switch (11,8)
id 103: fizzlers (12,2), starts on; acted on by button (9,3)
id 104: fizzlers (17,6), starts on; acted on by button (17,3)
id 105: doors (14,6), starts closed; acted on by button (17,8)
id 106: lasers (4,18), starts on; acted on by button (13,18)
id 107: exit (3,0), starts closed; acted on by switch (2,14)
```

Seven moving parts, and everything else fixed: 15 of the 16 lasers always on, the fizzler at (18,12) always on, every blocked wall refusing portals for good. Box A starts at (9,8), box B at (5,13).

### The regions

The bottom half, below the solid row 12:

| # | Region | Tiles | What is in it | Ways out |
|---|--------|-------|---------------|----------|
| 1 | Start room | (1..5, 1..5) | The exit, below (3,1) | By portal only: a shot up past the ditch row lands on row 12's underside, over the middle |
| 2 | Middle | (1..5, 7..11), row 11 to (11,11), (7..11, 7..10) | Box A, ditch button (9,10), box A's switch (11,8) | Down over ditch (9,6) while (9,10) is held; by portal, down past the ditch row into the start room |
| 3 | Bottom middle | (7..11, 1..5) | Fizzler button (9,3) | By portal up column 9 into the middle; through fizzler (12,2) to a two-tile island; by portal along row 2 to (19,2)W, only while (12,2) is off |
| 4 | Bottom right | (13..18, 4..5), (16..18, 1..3) | Fizzler button (17,3) | Left through arrow (12,5), one way; up through door (14,6) while (17,8) is held; up through fizzler (17,6) |
| 5 | Right middle | (16..18, 7..9) | Door button (17,8) | Down through fizzler (17,6) |
| 6 | Door pocket | (13,7), (14,7) | | Down through the door; by portal up columns 13 and 14, past the arrows, onto row 11 |
| 7 | Row 11, east | (13..18, 11) | | Left through arrow (12,11) into the middle, one way; down the arrows into the door pocket, one way; up through fizzler (18,12) into the top half |

The top half: the top-right room, (15..18, 13..18) with (14,14), joined to column 13, (13,13..18), where the laser button (13,18) is; the switch room, (1..3, 13..18), with the exit switch (2,14), entered only through laser (4,18); and between them, seven pockets sealed by always-on lasers, each reachable only by portal:

| # | Pocket | Tiles | Faces looking into it | Shot from |
|---|--------|-------|-----------------------|-----------|
| 1 | A | (5..9, 13), (9,14), with box B | (8,14)E | C, along row 14 |
| 2 | C | (11,13), (11,14) | (11,12)N, (12,14)W | G, down column 11; A, along row 14 |
| 3 | D | (5,15), (5,16) | (4,16)E, (4,15)E, (5,14)N | Column 13, E or G, along row 16; E, along row 15; I, down column 5 |
| 4 | E | (7,15), (7,16) | (8,15)W, (7,14)N | D, along row 15; H, down column 7 |
| 5 | G | (9..11, 16) | (9,15)N, (10,15)N, (11,17)S | H, down columns 9 and 10; C, up column 11 |
| 6 | H | (7..11, 18) | (7,19)S, (9,19)S, (10,19)S | E, up column 7; G, up columns 9 and 10 |
| 7 | I | (5,18) | (5,19)S | D, up column 5 |
| 8 | Column 13 | (13,13..18) | (14,13)W, (14,16)W, (14,18)W | A, along row 13; D, E or G, along row 16; H, I or the switch room, along row 18 |

### The deductions

1. **The exit needs the switch room.** The exit starts closed, and only switch (2,14) opens it.
2. **The switch room needs a box on (13,18).** Every shot into the switch room ends on a blocked wall: (0,18) along row 18, (4,13) along row 13, and its other walls face only itself. So the subject has to walk in through laser (4,18), which is off only while button (13,18) is held, from far away: a box has to hold it.
3. **That box is box B.** Row 12 is wall from end to end but for the always-on fizzler (18,12), which stops shots, closes portals and destroys a carried box. No portal, shot or box crosses it, so box A, below, can never reach (13,18).
4. **Box B's pocket is six hops from column 13.** Only C can shoot into A; only G (or A) into C; only H (or C) into G; only E (or G) into H; and only D (or H) into E, and column 13 can shoot into D. The way back is one hop: from A along row 13 to (14,13)W, in the button's column.
5. **The top half needs the door.** The only way up is walking through (18,12) from row 11's east end. The middle can't walk there, since arrow (12,11) points left, out of it. Row 11's east end is reached only by a shot up past the arrows, from the door pocket or from the bottom right through the open door, and the door opens only while a box holds (17,8). That is box A's last job.
6. **Box A's way to (17,8).**
   - Into the bottom middle by holding the ditch button while the subject crosses, then fetched back by a hop (a shot up column 9 passes the box).
   - Into the bottom right by holding fizzler button (9,3) while a shot goes along row 2, then picked up and carried through.
   - Into the right middle by holding fizzler button (17,3) while a shot goes up column 17 through the off fizzler, then picked up and carried through.
7. **The way back.** From the switch room, a portal on its own wall leads out through the one still in pocket D, then D to column 13, the walk through (18,12), a long shot along row 11 to (0,11)E, and a shot down past the ditches to (1,0)N, in the start room.

### The route

| # | Phase | Actions | Ends on |
|---|-------|---------|---------|
| 1 | Shoot blue up past the ditches to (3,12)S and orange to (0,3)E, and cross into the middle | 6 | (3,11) |
| 2 | Pick up box A, put it on (9,10), walk down over the bridged ditch | 15 | (9,5) |
| 3 | Blue up column 9 to (9,12)S, orange to (10,6)S, hop back, pick up box A, hop down with it | 8 | (10,5) |
| 4 | Box A on (9,3), blue along row 2 to (19,2)W, pick it up, hop into the bottom right | 13 | (18,2) |
| 5 | Box A on (17,3), orange up column 17 to (17,10)S, pick it up, hop into the right middle, box A on (17,8): the door opens | 8 | (17,9) |
| 6 | Hop back, walk through the door, orange up column 14 to (14,12)S, blue to (15,7)W, hop onto row 11 | 14 | (14,11) |
| 7 | Walk through fizzler (18,12) into the top-right room | 6 | (18,13) |
| 8 | Six leapfrog hops: column 13, D, E, H, G, C, A | 40 | (9,14) |
| 9 | Blue along row 13 to (14,13)W, orange to (6,12)N, pick up box B, hop out, box B on (13,18): laser (4,18) off | 16 | (13,17) |
| 10 | Hop to D, then I, walk through the laser into the switch room, use the switch: the exit opens | 17 | (2,14) |
| 11 | Blue to (2,12)N and hop to D, blue to (14,16)W and hop to column 13, hop across the top-right room, walk through (18,12) | 16 | (18,11) |
| 12 | Orange to (18,10)N, blue along row 11 to (0,11)E, hop, orange down column 1 to (1,0)N, hop, walk to the exit | 10 | (3,0) |

The whole route, ready for the route check (one line per phase, phase 8 one line per hop):

```
blue turnLeft orange left left left 3,11
right right right right right right down down interact turnUp interact down down down down 9,5
turnUp blue right turnUp orange up 9,11 interact up 10,5
down down turnLeft interact down turnRight blue up turnLeft interact up up up 18,2
left turnUp interact orange interact right right 17,9 interact
up 18,2 up up left left left left up up up 14,7 orange turnRight blue right 14,11
right right right right up up 18,13
up left left left left left up up 13,16 turnLeft blue turnRight orange right 5,16
down turnRight orange up left 7,15
turnUp blue right 7,18
right right turnDown orange turnUp blue up 9,16
right right turnDown blue turnUp orange up 11,13
up turnLeft orange down down 9,14
down turnRight blue left left left turnDown orange turnLeft interact down 13,13 up up up up interact
down turnLeft orange turnRight blue right 5,16 turnUp blue left 5,18 left left down down down down left 2,14 interact
turnDown blue down down 5,16 blue left 13,16 down down turnRight blue turnLeft orange left 18,14 down down down 18,11
orange turnLeft blue down 1,11 turnDown orange left 1,1 right right down 3,0
```

The route check ends with `completed: true, actions: 169, moves: 100, portals: 29`, last checked on 2026-11-22. A change to Playground 2 or to the rules can break it; run the check again before relying on it.

Every moving part took part but one: both boxes, all five buttons, the exit switch, both linked fizzlers, the linked ditch, the door and laser (4,18). Box A's switch (11,8) was never needed. It is the undo for a box A left somewhere useless.

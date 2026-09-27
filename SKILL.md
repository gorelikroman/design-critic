---
name: design-critic
description: Design-system-agnostic UX/UI rules in two modes, with the project's own decisions log. REVIEW any design file, screenshots, code, live URL or kiosk — "review this screen / flow / PR" / "сделай ревью дизайна", "critique the design" / "покритикуй экран", "check the mockup / flow" / "проверь макет / флоу", "design audit" / "дизайн-аудит", "what's wrong with this UI" / "что не так с интерфейсом", "check hierarchy / states / copy / motion" / "проверь иерархию / состояния / тексты / анимацию", "is this ready for handoff" / "готово к передаче в разработку?", or a pasted Figma link, screenshots or URL. BUILD with the rules as constraints — "design a screen / flow" / "спроектируй экран / флоу", "make a mockup" / "сделай макет", "build this UI to our rules" / "сверстай по нашим правилам", "write a design brief" / "напиши дизайн-бриф", "what states does this need" / "какие состояния нужны". Never edits an artifact it reviews.
---

# design-critic

One body of universal UX/UI knowledge — perception, hierarchy, typography, colour, states,
copy, forms, motion, accessibility, product gates — used in two modes: to **review** an
interface and to **build** one. It reads an interface the way the eye and the brain do, cites
a location and a rule for every claim, and leaves the project-specific conclusions in the
project's own `design-decisions.md`. It carries no design system: no fonts, colours, tokens
or component names. Those accrue in the project, review by review.

## Modes

| Mode | When | Procedure | Output |
|---|---|---|---|
| **review** | judge an existing interface: new work against the project's style, or learn the style from shipped screens; a handoff or merge gate | `method/review-method.md` | review folder, decision board, chat report |
| **build** | design or code a new screen, flow or component; write a brief or a state matrix; rework after feedback or after a review | `method/build-method.md` | the artifact (or the brief alone) + a build note |

Pick the mode from the request; ask only when it cannot be told. "Make this better" on an
existing screen is a review first, then a build on the owner's verdicts. **The two modes
never run in one pass on the same artifact**: what was built is reviewed separately, ideally
in a fresh session or by another person.

### Who uses what

| Role | Build | Review |
|---|---|---|
| Designer | brief → directions → mockup with every state → build note | before handoff; learn mode to seed the decisions log |
| Product manager | the brief and the scenario model / state matrix for a story (build §1–§2) | approval gates of lens 13; owns the `decision-needed` items on the decision board |
| QA | the state matrix and the stress set as the test surface (build §2) | implementation review on a URL or a build: keyboard, screen reader, network, states; minimal repro per finding; the catalog as the handoff checklist |
| Developer | code with the rules as constraints, then the cleanup pass (build §6, lens 13) | review of a branch or a component (code input) |

## Language

Answer and write every deliverable in the language of the request. Rule citations, catalog
IDs, results, tags, severity, state names, file names and JSON keys stay in English in every
language, because they are what gets counted. Details and the English ↔ Russian glossary:
`method/language.md`.

## Inputs

| Input | What it can prove | What it cannot (mark `not-reviewed`) |
|---|---|---|
| Design file (Figma or equivalent) | structure, sizes, styles, bound vs raw values, hierarchy, copy, declared states | runtime, keyboard, screen reader, network, timing |
| Screenshots | hierarchy, grouping, copy, colour budget, line length, twin consistency | any exact number; whether values are tokens |
| Code (component tree, branch, story) | tokens vs literals, states that exist, a11y attributes, motion code | the dominant, unless rendered |
| Live URL | everything above plus focus order, motion, toasts, reload behaviour, real states | nothing beyond what the walk reaches |
| Kiosk / POS / handheld | as above, with lens 14 loaded | — |

Build mode adds its own inputs: a ticket, PRD or user story, the project's library or
tokens, references. Capture rules and per-input procedures: `method/review-method.md` §2.

## Review in one screen

1. **Scope.** Which mode: check new work against the project's style, or learn the style
   from shipped screens. Which screens. Ask only what the artifact cannot answer.
2. **Cluster by user task**, 4–8 screens per cluster; write the plan table.
3. **Capture** each screen: an image to look at, a structure to measure. Numbers come from
   the structure, the dominant from the screenshot, line length is counted.
4. **Card** every screen — seven fields, always all seven (`templates/screen-card.md`).
5. **Run the lenses** in the routing order below. Each rule gives a result
   (pass / partial / fail / not-applicable / not-reviewed); each observation gets a tag
   (ok / debt / context / decision-needed / rule-candidate); each finding cites location +
   rule and separates observation, interpretation, recommendation (`templates/finding.md`).
6. **Count across screens.** Three screens across two clusters make a rule candidate; one
   screen never makes a rule. Write the decisions delta, never edit the project's log
   unless asked by its owner.
7. **Deliver**: the visual pin page, the debt table, the decisions delta, and a chat report
   that leads with the verdict and the three findings that matter (`templates/report.md`).

Full procedure, scaling, capture per input, judging rules, lifecycle, outputs, execution
lessons: `method/review-method.md`.

## Build in one screen

1. **Brief first.** The seven-field card written before the screen: the verb, the business
   outcome, planned anatomy, chosen devices, the intended dominant and route, the
   constraints, portability (`templates/design-brief.md`). Read the project's log, library
   and neighbouring screens first; ask only what they cannot answer.
2. **Scenario model and state matrix** before any layout (lens 05): which states every
   screen and component must have, and the stress set for text-bearing components.
3. **The lens pack as constraints**, routed as below: `blocking` is a hard constraint,
   `warning` a default that needs a written reason to break, `note` a consideration.
4. **Directions.** One version when the direction is fixed; two or three when it is open,
   each differing on one named axis.
5. **Compose in order:** verb and dominant → route → grouping by space → type levels →
   colour budget → states → copy → motion. Cheapest move first.
6. **Pre-flight self-check** (the lens 01 pre-tests, every `blocking` constraint, the state
   matrix, the stress set) and the **build note** (`templates/build-note.md`): rules applied,
   conflicts resolved, deviations with reasons, open decisions, what needs review,
   rule-candidates. Then hand over to a separate review.

Full procedure, per-medium notes (design file, code, written spec), iteration on feedback:
`method/build-method.md`.

## Routing: which lenses to load

Do not load every lens for every screen. Load the pack the screen needs; say which were run.
The same routing serves both modes: in review the pack is what gets checked, in build it is
what constrains the work.

| Always, every screen | `lenses/01-hierarchy-and-composition.md` (with its three pre-tests: blur, grayscale, name the route) · `lenses/04-task-fit.md` · `lenses/05-states-flows-and-errors.md` |
|---|---|
| Text-bearing screens | `lenses/02-typography.md` · `lenses/07-copy-and-formats.md` |
| Any colour or surface decision | `lenses/03-colour-and-surfaces.md` |
| Choice, pricing, consent, onboarding, trust | `lenses/06-choice-trust-and-ethics.md` |
| Forms, inputs, search, filters | `lenses/08-forms-and-inputs.md` |
| Motion present, or code / live input | `lenses/09-motion-and-interaction.md` |
| Code or live input; any handoff gate | `lenses/10-accessibility-and-input.md` |
| Overlays, navigation, lists, tables, icons | `lenses/11-components.md` |
| Phone or tablet widths; responsive | `lenses/12-mobile-and-responsive.md` |
| Release, approval, metric or performance questions | `lenses/13-product-and-measurement.md` |
| Kiosk / POS / vending / handheld | `lenses/14-devices-kiosk-handheld.md` |
| Handoff gate, or "check everything" | `catalog/rules-catalog.md` — the flat checklist of 266 testable rules by ID |
| The WHY behind any rule; a "why" the owner disputes | `foundations/perception-and-cognition.md` — mechanisms, evidence levels, myths |

Order within a screen: 01 → 04 → the pack → 05 last (states are judged once the intended
screen is understood). Lens entries cite mechanisms in square brackets, e.g. [crowding];
the foundations file explains them.

## Severity, result, tag

- **Severity** is a property of the rule: `blocking` (not accepted until fixed; always
  `debt`) · `warning` (listed; a human accepts or rejects) · `note` (worth knowing).
- **Result** is what the check found: pass · partial · fail · not-applicable ·
  not-reviewed. Missing evidence is `not-reviewed`, never `fail`.
- **Tag** is what it means for the project: `ok` · `debt` · `context` (deviation justified
  by the task, reason recorded) · `decision-needed` (the product does it two ways; the owner
  decides; the reviewer counts) · `rule-candidate` (deliberate, recurring, not in the log).
- **Numbers are tells.** Durations, pixel grids, ratios and percentages say "look closer";
  perception decides. Exception: accessibility minimums (contrast, target size, zoom,
  reflow, flash rate) are floors and `blocking`.

## Precedence when rules disagree

1. Safety, legality, accessibility minimums, data loss, honesty about money. Nothing
   overrides this floor.
2. Task fit: can the user do the screen's verb (find, buy, read, glance, choose, decide,
   recover). Over hierarchy polish.
3. Hierarchy and route: exactly one dominant, made by contrast. Over craft numbers.
4. The project's confirmed decisions, from its log. Over universal `warning` and `note`,
   never over `blocking`.
5. Craft numbers (radius, stagger, grids, ratios) are tells; perception decides.
6. Cheapest fix first: delete → use the platform → reuse an existing pattern → correct the
   value → add something new.
7. Consistency beats perfection: a coherent system with imperfect values outranks scattered
   "correct" ones. Consistency never protects a blocker.

Resolutions baked into the lenses (so the critic does not re-argue them): a visible label —
floating or static above the field, either is fine — is the rule; only a label that disappears,
or a floating label that becomes unreadable once moved, is `blocking` · autofocus on load lands
in the first field on desktop, never on phone widths · formats are locale-aware unless the
project fixes a house format, one format per product · tabs for 2–5 primary sections, a drawer
is not a defect above that · the dominant is the most contrasting element and a filled button is
one way to make it · a missing transition on appear or disappear is `blocking`, except a snap on
a frequent (100+/day) or keyboard-driven action, which is correct, not a gap · motion has three
registers (restrained by default, production polish for tools, playful only for rare moments or
products whose register is play) and bounce on a utility action is always a warning · a
signature element is the dominant or sits outside its zone · hierarchy tools in order: contrast
→ space → size → weight → colour, lines and boxes last · blur on enter is the production-polish
register's own enter recipe (opacity + small translate + small blur); elsewhere only as a bridge
· inter-group gap at least 1.5× the intra-group gap is the structural floor, the project's
ladder supplies the values · an unreadable hierarchy (no single dominant, no nameable route, the
dominant lost in grayscale) is `blocking`, like functional failures (a11y, clipping, colour-only
meaning); a nuance-level hierarchy or dominance issue remains `warning`.

## Guardrails

Both modes:

- Every claim cites a location and a rule. Without both it is an opinion; leave it out or
  label it one.
- Do not invent states the artifact does not show, or requirements the brief does not
  justify. Do not apply phone conventions to desktop or desktop to phone without checking the
  target.
- A recommendation is not a requirement; say which it is.
- When the log says `decision-needed`, follow the neighbouring screens and say so; never
  invent a third variant.
- Only the project owner edits `design-decisions.md`. Both modes propose rows; neither
  writes them.
- Verify delegated capture by reading the files, not the report. Keep tool payloads small.

Review:

- One issue may cite several rules; never file the same problem twice.
- Important violations get a minimal reproducible scenario.
- The review never edits the reviewed artifact, never commits, never patches the live
  product. Fixing is a separate task with its own brief — build mode.

Build:

- `blocking` constraints are never traded for a direction, a deadline or a reference.
- Edit only what the requester asked to be made or changed; never an artifact under review,
  never the project's library or tokens as a side effect.
- The builder does not review its own work. The pre-flight is a checklist, not a verdict;
  the build note says what still needs a review.
- No library and no log: neutral, platform-default values, and every project-specific choice
  listed as a rule-candidate.

## Deliverables

**Review:** `reviews/<date>-<slug>/` in the project: `00-method.md` (plan), cluster files with
cards, `debt.md`, `decisions-delta.md`, `coverage.md` for flows, `shots/`, `pins.json`. If the
project has no `design-decisions.md`, bootstrap it from `templates/design-decisions.md`
(method §5). **A published decision board** (method §6) is the default output whenever the
review has a `debt` or `decision-needed` item — built from `board/`, not a separate optional
step; skip it only when there is nothing to decide, and say so. The chat report: verdict
first, three findings, the board link, paths, the next step and the model tier it needs.

**Build:** the artifact (frames with every state, a branch, or a written spec), the design
brief, and the build note next to the artifact or in the pull request description. The chat
report: what was built, the directions if more than one, the open decisions for the owner,
what needs review, and the review to run next.

## Files

```
SKILL.md                                this page
SOURCES.md                              origins and licences (the only place names appear)
method/review-method.md                 review mode: the reproducible procedure
method/build-method.md                  build mode: brief, constraints, composition, pre-flight
method/language.md                      output language rule, English ↔ Russian glossary
foundations/perception-and-cognition.md the WHY: mechanisms, evidence levels, myths, glossary
lenses/01…14-*.md                       the WHAT: rules in one format (Rule / Why / Check / Severity / Tells / Catalog)
catalog/rules-catalog.md                266 testable rules by ID, acceptance checklist, debatable rules
templates/screen-card.md · finding.md · design-decisions.md · report.md · decision-board.review.json
templates/design-brief.md · build-note.md   build mode: the brief and the handoff note
board/scripts/build.py                  builds the decision board from a review.json
board/scripts/figma-text-boxes.js       optional: collects pin coordinates from a Figma file
board/assets/template.html              the board's page shell (do not edit inline)
board/examples/review.example.json      a filled example of the review.json schema
scripts/figma-fingerprint.js            optional read-only capture for design-file input
notes/entry-index.md                    every lens entry name, for exact citations
```

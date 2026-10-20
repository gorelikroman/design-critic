# Handoff — where the work stands and where to start

For the next agent on this repository. State as of 2026-10-11. The owner writes in Russian:
answer in Russian, briefly (`method/language.md`), while the repository stays English only.

## Read first

1. `README.md` — what the plugin is, install, roles, layout.
2. `SKILL.md` — the router: four modes (review, build, spec, test), language, product layers,
   severity and precedence.
3. `notes/owner-decisions-2026-09-26.md` — the owner's decisions; they override defaults.
4. `products/README.md` and `products/reboost/` — how a product layer works; Reboost is the
   only one so far.
5. `presentation/README.md` — the deck and the demo page shown to the team.

## Settled rules (do not reopen)

- The repository is English only; `scripts/check_skill.py` fails on any Cyrillic. Russian
  lives only in replies and in claude.ai artifacts.
- Reply in the language of the request; IDs, severity and state names stay English.
- A product is chosen by its name in the request. Never guess a product: with no name, use the
  repository's own `.design-critic/product.md`, otherwise the universal rules only.
- `gorelikroman/beluga-ds` (the Reboost design system) is read-only.
- Before every push: `python3 scripts/check_skill.py`. Before a release: the routing evals
  (`evals/README.md`); the last runs passed 18 of 18.

## Open work

1. **Two more product layers**, built from `products/_template/` the way Reboost was.
   Waiting on the owner for the material:
   - DoktorABC (medical): its Figma library, tokens, 5–10 reference screens. Overshoot and
     bouncy easing are blocking in medical flows (lens 09 · Easing and overshoot follow the
     register and the moment).
   - Mobile App: the same, plus the iOS and Android platform rules (lenses 12 and 14).
2. **Demo page cuts**, proposed and not yet answered by the owner
   (`presentation/demo/critic-in-action.html`):
   - remove “A button that doesn’t respond” and “A toast that eases in”: the difference is
     not visible;
   - fix “Command palette on ⌘K” with real keyboard input, where the version without the
     critic loses the first typed letters;
   - fix “Bottom sheet and Reduce Motion”: the checkbox on by default;
   - merge the seven text-only QA cards (slow network, 200 % zoom, high contrast, obscured
     focus, a phone call mid-checkout, an error below the fold, a country by keyboard) into
     one checklist card.
3. **Russian versions.** The owner also has Russian copies of the deck and of the demo page as
   claude.ai artifacts on the old account (the demo there has 40 cards and none of the latest
   changes). They cannot live in this repository. When the owner needs them, translate from
   `presentation/` and publish them as artifacts.
4. **A catalog citation to check**: `lenses/09-motion-and-interaction.md` · Motion gaps cites
   `N-08`, which is about reserving space against layout shift, not about appear and disappear
   transitions. Proposed to the owner as a separate fix.
5. **Visual testing pilot** (`pilot/visual-testing/README.md`): Testplane on the Reboost
   Storybook — screenshot regression plus `scripts/live-checks.js`. First run and a planted
   regression are written up there; next steps are listed at its end (beluga-ds CI, page-level
   runs on staging, Figma ↔ build, a `Live` section per product layer).

## What the owner values

- Depth shown with facts: real numbers, real rule IDs, real script output. Verify every rule
  against `lenses/` and `catalog/`; never invent one.
- Fewer slides and less text. Drop a card or a slide whose difference is not visible without
  explanation.
- Material that works for every role: developer, designer, product manager, QA.

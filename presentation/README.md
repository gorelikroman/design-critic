# Presentation and demo

Material for showing design-critic to the team. English only, like the rest of the repository.

| Path | What |
|---|---|
| `html/design-critic-deck.html` | The 8-slide deck as one standalone page. Open it in a browser: ← → or Space to move, click the left or right edge, F for full screen; speaker notes in the bar at the bottom (shown on hover) |
| `html/critic-in-action.html` | “Critic in Action”: 59 interactive before-and-after examples (developer 15, designer 14, PM 15, QA 15) |
| `deck/project/` | Source of the deck in the claude.ai Slides format: `deck.json` (order, sections, fonts) and one `<section>` per file in `slides/` |
| `demo/critic-in-action.html` | Source of the demo page as a claude.ai HTML artifact (no doctype; the artifact wraps it) |

Slide order: cover → what → prism → library → sources → chains → doctor → next.

## Editing and republishing

- Edit the sources, not the files in `html/`; `html/` is a snapshot for viewing.
- The deck is a Slides artifact. Create it from the Slides type, then publish `deck/project/deck.json`
  with the files in `deck/project/slides/`. `slides/what.html` shows `evals/fixtures/checkout.png`
  through an asset path (`/_blob/<id>`) of the old artifact: upload that image as an asset of the
  new artifact and replace the path.
- The demo page is a plain HTML artifact: publish `demo/critic-in-action.html` as it is.
- Every rule name, catalog ID and severity on the slides and cards comes from `lenses/` and
  `catalog/`. When a rule changes, check the cards that cite it.
- After editing, rebuild the standalone copy in `html/`: the demo page needs a doctype and a
  `<head>`; the deck needs the slides inside a viewer that scales the 1920×1080 canvas, with
  `x-icon` and `x-connector` drawn as inline SVG.

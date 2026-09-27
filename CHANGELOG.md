# Changelog

Versions follow `.claude-plugin/plugin.json`. Plugin installs stay on a version until it is
bumped here and in the manifest.

## 1.0.0 — 2026-09-27

First packaged release: one core for designers, PMs, QA and developers.

- **Modes.** Review (existing), plus build (`method/build-method.md`), spec
  (`method/spec-method.md`) and test (`method/test-method.md`), with their templates: design
  brief, build note, UX spec, test plan, bug report.
- **Product layers** (`products/`): a product's design system sources, components, patterns,
  voice and hard rules on top of the universal rules; a blank template; loading order and
  precedence in `SKILL.md`.
- **Language.** Output in the language of the request; counting tokens stay English
  (`method/language.md`). The repository itself is English only; `check_skill.py` enforces it.
- **Scripts.** `catalog_to_tests.py` (catalog → test cases CSV / Markdown, severity from the
  lenses), `ui_tells.py` (line-level tells in UI code, each with its rule),
  `check_skill.py` (integrity checks).
- **Distribution.** Plugin manifest and marketplace (`.claude-plugin/`); CLAUDE.md snippet for
  product repositories; routing evals (`evals/`).
- Routing evals (`python3 evals/run_routing.py`, 2026-09-27): **17/17 passed** on the English
  suite: every mode triggers and reads its method file, the `.design-critic/` product layer is
  loaded when the request names the product, both negative prompts stay silent. The trigger
  list is English only; a separate set of 11 Russian prompts still triggered the skill 11/11
  and picked the right mode 11/11, answering in Russian. Fixed on the way: a named product was
  looked up only in `products/` and missed the repository's layer; a review could run from the
  summary without opening the lenses; without an artifact a review or test prompt asks for one
  first (correct, so those cases carry `evals/fixtures/`); in `claude -p` the skill's files
  need `--add-dir`. The runner stops at 14 turns, so it measures routing, not finished
  deliverables.

## 0.1 — 2026-09-26

Review-only skill: lenses 01–14, catalog, foundations, review method, decision board.

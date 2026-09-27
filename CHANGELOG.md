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
- **Language.** Output in the language of the request; counting tokens stay English;
  English ↔ Russian glossary (`method/language.md`). Triggers paired in English and Russian.
- **Scripts.** `catalog_to_tests.py` (catalog → test cases CSV / Markdown, severity from the
  lenses), `ui_tells.py` (line-level tells in UI code, each with its rule),
  `check_skill.py` (integrity checks).
- **Distribution.** Plugin manifest and marketplace (`.claude-plugin/`); CLAUDE.md snippet for
  product repositories; routing evals (`evals/`).
- Routing evals (`python3 evals/run_routing.py`, 2026-09-27): **17/17 passed**: every mode
  triggers from English and Russian prompts and reads its method file, the `.design-critic/`
  product layer is loaded, both negative prompts stay silent. Found on the way: without an
  artifact a review or test prompt makes the model ask for one before loading the skill
  (correct, so those cases now carry `evals/fixtures/`), and in `claude -p` the skill's own
  files need `--add-dir` to be readable. The runner stops at 8 turns, so it measures routing,
  not finished deliverables.

## 0.1 — 2026-09-26

Review-only skill: lenses 01–14, catalog, foundations, review method, decision board.

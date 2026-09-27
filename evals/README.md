# Evals

Two kinds of check keep the skill from quietly getting worse as rules and modes change.

## 1. Integrity — every commit

`python3 scripts/check_skill.py` checks what a model cannot be trusted to notice:

- `SKILL.md` frontmatter parses, has `name` and `description`, and the description fits
  1024 characters;
- every `lens NN · <entry>` citation in the method, templates, products and the front door
  resolves to a real lens heading;
- every catalog ID cited outside the catalog exists in it;
- every path listed in the `SKILL.md` Files block exists;
- `.claude-plugin/plugin.json` and `marketplace.json` parse and agree on the plugin name.

It exits non-zero on any failure, so it can gate a pull request.

## 2. Routing — before each release

`evals/routing.json` lists prompts in English and Russian from every role, plus prompts that
must not trigger the skill. For each case, in a fresh Claude Code session with the skill
installed from the branch under test:

1. Send the prompt (replace `<figma link>` and `<product>` with real ones, or use screenshots).
2. Record: did the skill trigger; which mode it chose; which lenses it said it loaded;
   whether each `expect` note held.
3. A case passes when every stated expectation holds. `trigger: false` passes when the
   skill does not load.

Keep the results next to the release in `CHANGELOG.md` (pass count and the failing IDs).
When a case fails, fix the cause (the description's triggers, the mode table, the routing)
rather than the case.

## 3. Quality — per product, over time

The strongest eval is a set of real screens with known answers: for each product, a few
screens with the findings the product owner agreed on in a past review. Re-run the review
on them after rule changes and compare findings by rule ID. Put them in
`evals/<product>/` with the screenshots and the agreed findings; they are product data and
stay private with the product layer.

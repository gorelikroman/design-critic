# design-critic

A portable UX/UI skill for Claude Code, for designers, product managers, QA and developers.
One body of perception science, interaction rules and product-UX gates, used in four modes:

- **Review** judges any interface — a design file, screenshots, code, a live URL, a kiosk.
- **Build** uses the rules as constraints while a screen, a flow or a component is designed
  or coded.
- **Spec** turns a story into UX requirements: scenarios, states, acceptance criteria with
  rule IDs, release gates.
- **Test** turns the rules and the spec into test cases, runs them on a build, files defects.

The core carries no design system. Each product adds its own in a **product layer**
(`products/`): design system sources, components, patterns, voice, hard rules and a decisions
log that grows review by review.

It answers in the language of the request, whatever it is; rule IDs, tags and state
names stay in English so results can be counted (`method/language.md`).

## Install

As a plugin (recommended: one command for the team, updates by version):

```bash
claude plugin marketplace add gorelikroman/design-critic
claude plugin install design-critic@design-critic
```

Inside a session the same works as `/plugin marketplace add gorelikroman/design-critic` and
`/plugin install design-critic@design-critic`. The repository must be readable by whoever
installs it. Updates: `claude plugin update design-critic@design-critic` after the version in
`.claude-plugin/plugin.json` is bumped.

For a private repository, each person needs read access on GitHub and git credentials on
their machine (for example `gh auth login`). Auto-update is off by default for third-party
marketplaces: turn it on in `/plugin` → Marketplaces → design-critic.

**For a whole repository's team** — commit this to the product repository's
`.claude/settings.json`; when a teammate opens the repository in an interactive Claude Code
session and trusts the folder, Claude Code offers to install the marketplace and enable the
plugin:

```json
{
  "extraKnownMarketplaces": {
    "design-critic": {
      "source": { "source": "github", "repo": "gorelikroman/design-critic" },
      "autoUpdate": true
    }
  },
  "enabledPlugins": { "design-critic@design-critic": true }
}
```

The same block in Claude Code's managed settings rolls it out organisation-wide.

**For people who do not use a terminal** (Claude desktop app, claude.ai): an organisation
admin on a Team or Enterprise plan adds the plugin in the admin settings under Plugins &
skills (sync from GitHub, add the marketplace, or upload a zip of this repository) and sets
its availability, for example "Installed by default". An individual can upload the zip for
personal use under Customize → Plugins. There the skill's review, build, spec and test modes
work; the Python scripts need an environment that can run them.

As a plain skill: copy the folder into `~/.claude/skills/` (or a project's `.claude/skills/`)
and start a new session.

```bash
cp -R design-critic ~/.claude/skills/
```

Claude reads the skill's own files (lenses, catalog, templates) while it works; if it asks for
permission to read the skill's folder, allow it, or the run falls back to the summary in
`SKILL.md` and says so.

It triggers on plain requests (below). To call it explicitly: `/design-critic:design-critic`
when installed as a plugin, `/design-critic` when copied as a plain skill.

## Quick start by role

Ask in plain words, in any language. The skill picks the mode from the request; name
the product when there is more than one.

| Role | Main mode | Try |
|---|---|---|
| **Designer** | build, review | "Design the subscription screen to our rules" · "Make three directions for onboarding" · "Review this mockup before handoff" · "Learn our product's rules from these shipped screens" |
| **Product manager** | spec | "Write UX requirements and acceptance criteria for this story" · "What states does this flow need?" · "Is this ready for release?" |
| **QA** | test | "Write UX test cases for the sign-up form on web" · "Test checkout accessibility on staging: keyboard and screen reader" · "File this bug with its rule and repro" |
| **Developer** | build (code), review | "Build this component to our design rules" · "Clean up this generated UI" · "Review the UI in this branch" |

What you get back:

| Mode | Deliverables |
|---|---|
| Build | the artifact with every state, a design brief, a build note (rules applied, deviations with reasons, what needs review) |
| Review | verdict and top three findings in chat, a decision board with pins on the screens, a review folder with cards, debt table and proposed decisions |
| Spec | a UX spec: scenarios, state matrix, acceptance criteria (Given / When / Then with rule IDs), release gates, open decisions |
| Test | a test plan with results, a CSV of cases, bug reports with rule, severity and repro, a run summary with the release call |

Tools that run without Claude:

```bash
# catalog rules → UX test cases for your test management tool
python3 scripts/catalog_to_tests.py --sections A,B,D,E,K,L --platform web --level REQ -o cases.csv
# line-level tells in changed UI code, each with its rule
git diff --name-only main | python3 scripts/ui_tells.py --stdin
```

For a product repository, paste `templates/claude-md-snippet.md` into its `CLAUDE.md` so
Claude Code uses the rules while writing UI, not only when asked for a review.

## Product layers

Available: **Reboost** (`products/reboost/`, a summary of the design handbook in
`gorelikroman/beluga-ds`). Each product gets `products/<slug>/` with `product.md` (design system sources, components,
patterns, voice, hard rules) and `design-decisions.md` (the decisions log). Shared company
decisions can go into `products/_company/product.md`. A product repository can keep its layer
in `.design-critic/` instead. How to create and fill one: `products/README.md`.

Switching between products: name the product in the request ("review the settings screen in
Alpha"), matched against the `Names` line of each `product.md`; in a product repository its
`.design-critic/` layer is picked up automatically; with several products and no name, the
skill asks. Every deliverable starts with the active product, or "Product: none — universal
rules only".

## What is inside

| Path | What |
|---|---|
| `SKILL.md` | Entry point: modes, roles, language, product layers, routing, severity, precedence |
| `method/review-method.md` · `build-method.md` · `spec-method.md` · `test-method.md` | The four procedures |
| `method/language.md` | Output language rule: what is translated, what stays English |
| `foundations/perception-and-cognition.md` | The WHY: 72+ mechanisms with evidence levels, myths, glossary |
| `lenses/01…14-*.md` | The rules: about 410 entries in one format (Rule / Why / Check / Severity / Tells) |
| `catalog/rules-catalog.md` | 266 testable rules by ID for handoff gates and test cases |
| `templates/` | Screen card, finding, report, decisions log, design brief, build note, UX spec, test plan, bug report, CLAUDE.md snippet |
| `products/` | Product layers and a blank template |
| `board/` | The decision board: build script, page shell, example |
| `scripts/` | Figma capture, catalog → test cases, UI tells scan, live layout checks on a rendered page, integrity check |
| `evals/` | Routing evals and how to run them |
| `pilot/README.md` | Pilot guide for the team: install, tasks per role, feedback form |
| `pilot/visual-testing/` | Testplane pilot on a Storybook: screenshot regression and live layout checks, first results on Reboost |
| `.claude-plugin/` | Plugin manifest and marketplace |
| `SOURCES.md` | Origins and licences (the only file that names authors) |
| `presentation/` | The team deck and the “Critic in Action” demo page: sources and standalone HTML |
| `notes/` | Build spec, entry index, owner decisions of 2026-09-26, handoff for the next agent |

## Maintaining

Edit the repository, run `python3 scripts/check_skill.py` (frontmatter, citations, catalog
IDs, files, manifests), bump the version in `.claude-plugin/plugin.json` and `CHANGELOG.md`
for a release. Keep entry headings unique across lenses; cross-references use the form
`lens NN · <exact heading>` and are listed in `notes/entry-index.md`. Before a release, run
the routing evals (`evals/README.md`).

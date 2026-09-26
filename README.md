# design-critic

A portable UX/UI critic skill for Claude Code. It reviews any interface — a design file,
screenshots, code, a live URL, a kiosk — against one body of perception science,
interaction rules and product-UX gates. It carries no design system: project-specific
rules accrue in the reviewed project's own `design-decisions.md`.

## Install

Copy the folder into Claude Code's skills directory:

```bash
cp -R design-critic ~/.claude/skills/
```

Or unpack the archive:

```bash
unzip design-critic.zip -d ~/.claude/skills/
```

For one project only, put it in that project's `.claude/skills/` instead. Start a new
Claude Code session so the skill is picked up.

## Use

Ask in plain words: "review these screens", "critique this flow", "is this ready for
handoff", "сделай ревью дизайна", or paste a Figma link, screenshots or a URL. The skill
clusters screens by user task, fills a seven-field card per screen, runs the lenses the
screen needs, and reports findings with location, rule, severity and a decisions delta.
It never edits the reviewed artifact.

## What is inside

| Path | What |
|---|---|
| `SKILL.md` | Entry point: inputs, method in brief, lens routing, severity, precedence |
| `method/review-method.md` | The full reproducible review procedure |
| `foundations/perception-and-cognition.md` | The WHY: 72+ mechanisms with evidence levels, myths, glossary |
| `lenses/01…14-*.md` | The rules: about 410 entries in one format (Rule / Why / Check / Severity / Tells) |
| `catalog/rules-catalog.md` | 266 testable rules by ID for handoff gates |
| `templates/` | Screen card, finding, report, project decisions log |
| `scripts/figma-fingerprint.js` | Optional read-only structural capture for Figma input |
| `SOURCES.md` | Origins and licences (the only file that names authors) |
| `notes/` | Build spec, entry index, owner decisions of 2026-09-26 |

## Maintaining

Edit the copy in the repository, then re-copy it to `~/.claude/skills/design-critic/`.
Keep entry headings unique across lenses; cross-references use the form
`lens NN · <exact heading>` and are listed in `notes/entry-index.md`.

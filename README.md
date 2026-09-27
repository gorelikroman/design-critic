# design-critic

A portable UX/UI skill for Claude Code, in two modes. **Review** judges any interface — a
design file, screenshots, code, a live URL, a kiosk — against one body of perception science,
interaction rules and product-UX gates. **Build** uses the same rules as constraints while a
screen, a flow or a component is designed or coded. It carries no design system:
project-specific rules accrue in the project's own `design-decisions.md`.

It answers in the language of the request (Russian or English); rule IDs, tags and state
names stay in English so results can be counted (`method/language.md`).

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
Claude Code session so the skill is picked up. It can also be called explicitly with
`/design-critic`.

## Quick start by role

Ask in plain words, in English or Russian. The skill picks the mode from the request.

| Role | Build | Review |
|---|---|---|
| **Designer** | "Design the subscription screen to our rules" · «Спроектируй экран подписки по нашим правилам» · "Make three directions for onboarding" · «Сделай три направления для онбординга» | "Review these screens before handoff" · «Сделай ревью макета перед передачей в разработку» · "Learn our style from these shipped screens" · «Выведи наши правила из этих экранов» |
| **Product manager** | "Write a design brief for this story" · «Напиши дизайн-бриф по этой истории» · "What states does this flow need?" · «Какие состояния нужны этому флоу?» | "Is this ready for release?" · «Готово к релизу?» — lens 13 approval gates; the `decision-needed` items on the decision board are yours to decide |
| **QA** | "List the states and edge cases to test for this screen" · «Составь список состояний и граничных случаев для проверки» | "Review the staging build of checkout: keyboard, screen reader, errors" · «Проверь чекаут на стенде: клавиатура, скринридер, ошибки» — every blocking finding comes with a minimal repro |
| **Developer** | "Build this component to our design rules" · «Сверстай этот компонент по нашим правилам» · "Clean up this generated UI" · «Почисти сгенерированный интерфейс» | "Review this branch / PR for UI issues" · «Сделай ревью UI в этой ветке» |

What you get back:

- **Build:** the artifact (frames with every state, a branch, or a written spec), a design
  brief (`templates/design-brief.md`) and a build note (`templates/build-note.md`) saying
  which rules shaped it, which conflicts were resolved and what still needs a review.
- **Review:** a verdict and the three findings that matter in chat, a published decision
  board with pins on the screens, and a review folder with cards, the debt table and the
  proposed changes to the project's decisions log.

Build and review never run in one pass on the same artifact: what was built is reviewed
separately.

## What is inside

| Path | What |
|---|---|
| `SKILL.md` | Entry point: modes, roles, language, routing, severity, precedence |
| `method/review-method.md` | Review mode: the full reproducible procedure |
| `method/build-method.md` | Build mode: brief, state matrix, constraints, composition order, pre-flight, build note |
| `method/language.md` | Output language rule and the English ↔ Russian glossary |
| `foundations/perception-and-cognition.md` | The WHY: 72+ mechanisms with evidence levels, myths, glossary |
| `lenses/01…14-*.md` | The rules: about 410 entries in one format (Rule / Why / Check / Severity / Tells) |
| `catalog/rules-catalog.md` | 266 testable rules by ID for handoff gates |
| `templates/` | Screen card, finding, report, decisions log, design brief, build note |
| `board/` | The decision board: build script, page shell, example |
| `scripts/figma-fingerprint.js` | Optional read-only structural capture for Figma input |
| `SOURCES.md` | Origins and licences (the only file that names authors) |
| `notes/` | Build spec, entry index, owner decisions of 2026-09-26 |

## Maintaining

Edit the copy in the repository, then re-copy it to `~/.claude/skills/design-critic/`.
Keep entry headings unique across lenses; cross-references use the form
`lens NN · <exact heading>` and are listed in `notes/entry-index.md`.

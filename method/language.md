# Language of the output

> The skill's own files are written in English. The people using it are not always. This
> file fixes what is translated and what is not, so a Russian report and an English report
> of the same review can still be counted, grepped and compared.

## The rule

1. **Answer in the language of the request.** A request in Russian gets the chat report, the
   screen cards, the findings, the brief and the build note in Russian. A mixed request
   follows the language of its instructions, not of its quoted material.
2. **Keep the counting tokens in English, untranslated**, in every language:
   - rule citations: `lens NN · <exact entry heading>`, catalog IDs (`A-03`), log rows;
   - results: `pass` · `partial` · `fail` · `not-applicable` · `not-reviewed`;
   - tags: `ok` · `debt` · `context` · `decision-needed` · `rule-candidate`;
   - severity: `blocking` · `warning` · `note`; confidence: `high` · `medium` · `low`;
   - state names: `default` · `loading` · `empty` · `validation_error` · `server_error` ·
     `success` · `permission_denied` · `custom`;
   - file names, folder names, JSON keys and values of `review.json`.
   These are what the method counts across screens and reviews; a translated tag is a
   second tag.
3. **Everything else is translated**: observations, interpretations, recommendations, the
   verdict, table headings, template headings and comments.
4. **The first use of a term may carry a gloss** from the table below, once per document:
   "доминанта (dominant)". After that, use the local term.
5. **Quotes stay verbatim.** The project owner's words and the interface's own copy are
   quoted in the original language; a translation, if needed, follows in brackets.
6. **Interface copy is judged in the interface's language**, whatever the report's language
   (lens 07).

## Glossary — English ↔ Russian

| English | Русский | Where it is defined |
|---|---|---|
| dominant | доминанта | lens 01 · Single dominant |
| entry point | точка входа | lens 01 |
| route (eye route) | маршрут взгляда | lens 01 · Route in 0.3 s, no attention tearing |
| hierarchy levels | уровни иерархии | lens 01 · Levels of hierarchy |
| spacing cascade | каскад отступов | lens 01 · The spacing cascade |
| outer / inner gap | внешний / внутренний отступ | lens 01 · Outer gap beats inner gap |
| reading mode (analytical / exploratory) | режим чтения (аналитический / исследовательский) | lens 01 · Choose the reading mode first |
| blur / squint test | тест размытия (прищура) | lens 01, pre-tests |
| grayscale test | тест в оттенках серого | lens 01, pre-tests; lens 03 |
| verb (of the screen) | глагол экрана (задача пользователя одним словом) | lens 04 · One intent per screen |
| task profile | профиль задачи | lens 04 · The five task profiles |
| colour budget | цветовой бюджет | lens 03 |
| accent | акцент | lens 03, lens 04 |
| state vocabulary | словарь состояний | lens 05 · State vocabulary |
| scenario model | модель сценариев | lens 05 · Scenario coverage |
| stress set | стресс-набор | lens 05 · The reviewer's minimum stress set |
| dead end | тупик | lens 05 · No dead ends |
| dark pattern | тёмный паттерн | lens 06 |
| motion register | регистр анимации | lens 09 · Name the register before the first finding |
| target size | размер области нажатия | lens 10 · Target size |
| screen card | карточка экрана | `templates/screen-card.md` |
| device (design device) | приём | method/review-method.md §3 |
| cluster | кластер (группа экранов одной задачи) | method/review-method.md §1 |
| lens / lens pack | линза / набор линз | `SKILL.md` · Routing |
| finding | находка | `templates/finding.md` |
| debt table | таблица долга | method/review-method.md §6 |
| decisions log | журнал решений (`design-decisions.md`) | method/review-method.md §5 |
| decisions delta | дельта решений (`decisions-delta.md`) | method/review-method.md §5 |
| decision board | доска решений | method/review-method.md §6 |
| project owner | владелец проекта | method/review-method.md §5 |
| handoff | передача в разработку | catalog |
| design brief | дизайн-бриф | `templates/design-brief.md` |
| build note | заметка к сборке | `templates/build-note.md` |
| pre-flight self-check | предполётная самопроверка | method/build-method.md §7 |
| direction | направление (вариант) | method/build-method.md §4 |

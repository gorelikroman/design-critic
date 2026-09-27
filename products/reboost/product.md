# Product layer — Reboost

> Loaded on top of the universal rules whenever work concerns Reboost (`products/README.md`).
> Only the product owner edits this file; builds and reviews propose changes.
>
> **Names:** Reboost · reboost · Reboost UI Kit · beluga-ds · reboost-ui · reboost-checkout ·
> helfy-platform-storybook — every name people use for this product in requests.
>
> Product owner: Roman · Design system owner: Roman · Last updated: 2026-09-27 ·
> Decisions log: `design-decisions.md` (this folder, a snapshot).

## 0. Source of truth — read this first

This layer is a **portable summary**. The canonical source is the Reboost design handbook in
the `gorelikroman/beluga-ds` repository (`docs/design-handbook/`, captured from the live Figma
2026-09-07; typography decided 2026-09-15). This summary was taken from beluga-ds commit
`9ccb91b` on 2026-09-27.

- **When the beluga-ds repository is available** (the working directory, or a clone): read
  the handbook files named below and trust them over this summary. If they disagree, the
  handbook wins; point out the drift so this layer gets refreshed.
- **When it is not** (the desktop app, claude.ai, another repository): work from this file and
  `design-decisions.md`; say "Product: Reboost (summary layer, beluga-ds@9ccb91b)".
- **Refreshing this layer:** after the handbook changes, re-read it and update this file;
  replace `design-decisions.md` with the new `09-decisions.md` under the same header comment,
  with the new commit and date; bump the plugin version.

Which handbook files each mode reads (all under `docs/design-handbook/`):

| Mode | Read | Why |
|---|---|---|
| build | `15-pattern-library.md` (+ `15-patterns.json`) → `13-typography-roles-and-patterns.md` → `02-tokens.md` → `04-components.md` → `05-design-rules.md` | shell → blocks → atoms, type roles, tokens, components, laws |
| review | `05-design-rules.md` §4b (archetypes), §8 (hard rules), §9 (critic checklist) → `09-decisions.md` | the product's confirmed yardstick and its open questions |
| spec | `05-design-rules.md` §4b → `15-pattern-library.md` → `docs/error-states.md` | archetype anatomy, patterns, the error-state contract |
| test | `05-design-rules.md` §8 → `docs/error-states.md` → `docs/upload-component-spec.md` → `10-fix-backlog.md` | blocking rules, state contracts, known defects |

**The product's own skills.** beluga-ds ships Reboost-specific skills in `.claude/skills/`:
`prd-to-figma` (PRD → brief → UI schema → Figma → critic), `reboost-mockup` (one screen, popup
or edit in Figma), `reboost-review` (the owner's review method against §4b and `09`),
`reboost-setup` (Figma MCP and access check), `figma-add-icon`, `review-board`. Inside that
repository they own the Figma mechanics (`use_figma` and the library); design-critic brings
the universal method and the other roles' modes (spec, test, code review). Both judge against
the same handbook. `refero-design` is for tasks with no Reboost pattern, never primary.

## 1. The product

- **What it is:** a US telehealth / online-prescription product. A questionnaire leads to a
  medical review, then treatment and plan choice, checkout and order confirmation; a patient
  account ("My Account") holds subscriptions, orders, settings and billing. Trust signals:
  HIPAA, LegitScript, "Our Pharmacy Partners".
- **Categories** (theme modes, `04 Category` in Figma, `data-theme` in code): weight-loss, ed,
  menopause, testosterone, birth-control, peptides, compounded-glp, hair-loss, anti-aging,
  lab-analysis, metabolic-support, anti-nausea; the brand default mode is `reboost`.
- **Patient variants:** `FTB-A` first time, no GLP-1 before; `FTB-B` switching from another
  provider; `RP` returning patient (refill).
- **Platforms:** responsive web only. Every screen has two frames, mobile 375 and desktop
  (920 / 924 / 1440); desktop is one centered 520 px column in the funnel. No native app.
- **Users' state by surface** (from the 85-screen review):

| Surface | Verb | State |
|---|---|---|
| Questionnaire landing | decide | arrived from an ad, three seconds to decide, leaves easily |
| Questionnaire steps | choose | committed but tired; each screen should take seconds |
| Medical review, disqualify | recover | anxious: "am I a good fit?"; FTB-B fears a thrown-off dose |
| Treatment plan | buy | buying with doubt |
| Checkout | buy | peak anxiety |
| Account dashboard, details | glance | calm, routine; anxious around money and health |
| Pause, dose change | decide | mild anxiety |

- **Locale and formats:** US English. Money `$37` (never `37$`), a discount `−$5`, a zero fee
  reads as a word ("Free"), dates "Mar 14" / "Oct 15, 2026", weight in lbs. Money and dates
  reach UI components as pre-formatted strings; components never format them.

## 2. Design system sources

| Source | Where | Notes |
|---|---|---|
| Component library (Figma) | "🇺🇸 UI KIT - reboost", file key `BvhK4O1XjvVipAAS7yZ1h3`, page `🧩 UI Kit` (`167:972`) | 224 components; the `Archive` page is not a source; "UX/UI Redesign" library variables are prohibited |
| Product Figma files | funnel `42dzqhSYu8TNmywyhJJfOR` (page `✅ READY TO DEV`), questionnaires `OscW6YOfVFHkhDVHUYR2Ro`, My Subscription `v39wDgVX92yl64SGbrpQEa`, Settings / My Account `kdVxqJLPU5UaZoiAKIudlF`, review collection `vdFkmYUE5h0ndTS9pfc2k8` | map: `docs/design-handbook/01-figma-map.md` |
| Design tokens | `packages/ui/src/styles/globals.css` (+ `typography.css`, `fonts.css`); Figma collections 01 Primitives, 02 Semantic, 03 Sizing, 04 Category | "source of truth = Figma Variables"; snapshot in `02-tokens.md` |
| Component code | `@sml-hub/reboost-ui` (`packages/ui`), `@sml-hub/reboost-checkout` (`packages/checkout`), GitHub Packages | consuming: `CONSUMING.md`; code rules: `AGENTS.md` |
| Component docs | Storybook `apps/storybook` (`pnpm storybook`, port 6006); no deployed URL | groups: Primitives, Molecules, Domain, Commerce, Foundations, Questionnaire, Pilot Screens, Handoff / Checkout |
| Code Connect | `packages/ui/src/figma/*.figma.ts` | checkout package is out of scope |
| DS MCP server | `apps/ds-mcp` (`@sml-hub/ds-mcp`, not deployed): `get_component_inventory`, `get_tokens`, `get_policies`, `get_doctrine`, `search_knowledge`, `validate_design` | local: `DS_MCP_ALLOW_ANON=1 pnpm --filter @sml-hub/ds-mcp start` |
| Icons | `@sml-hub/reboost-ui/icons` (116 icons); thin linear, stroke 1.5–2; 16 in rows, 24 standalone, 64–80 as popup illustration | |

**Token roles by name** (values stay in the source; bind semantic `02` tokens, never `01`
primitives or hex):

| Role | Token names |
|---|---|
| Primary action | `fill/primary` (dark-green pill, white text), `fill/primary-hover`; category keys `key/*` via the mode |
| Destructive | `fill/destructive`, `surface/destructive`, `border/destructive`; `urgent` set for errors |
| Feedback | `text-`, `surface-`, `icon-`, `border-`, `fill-` × `success` · `warning` · `info`, always as a triad of one semantic |
| Canvas and surfaces | `surface/background` (warm cream), `surface/card`, `surface/muted`, `surface/accent`, `surface/brand`, `surface/brand-subtle`, `surface/inverse` |
| Text | `text/main` (dark forest green, not black), `text/secondary`, `text/tertiary`, `text/disabled`, `text/heading`, `text/brand` |
| Borders | `border/main` (warm hairline), `border/input`, `border/selected`, `border/focus` |
| Spacing | `padding-*` and `gap-*` 3xs…5xl = 2 · 4 · 6 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 (gap 6xl 64); ≥ 768 px the large steps grow; off-ladder values (5, 9, 10, 14, 18, 28, 30, 36, 60) do not exist |
| Type | role styles from `13-typography-roles-and-patterns.md` (`Heading/Title`, `Heading/Lead`, `Heading/Heading` 22, `Display/Stat`, `Body/Body`, `Body/Caption`, `Body/Legal`, `UI/Button`, `UI/Option`, `UI/Input`, …); code classes `ds-*` |
| Radii | `radius/*` 3xs…2xl = 2 · 4 · 6 · 8 · 12 · 16 · 20 · 24, `full`; cards r = 16 |
| Elevation | `shadow/xs` focus · `sm` resting cards · `md` popovers · `lg` dialogs and sheets · `xl` toasts |
| Tap target | `tap/min` |

## 3. Visual character (what makes a screen "ours")

- A warm base: cream canvas, near-white cards, warm borders and greys; body text dark green.
- Brand = forest green + sage; gold only for accent captions. No lavender, no 3D art, no photo
  collages.
- Flow screens open with a soft hero gradient (`gradient/hero-fade`), then a centered
  `Heading/Title` and a `Heading/Lead`.
- Cards are thin hairline containers (1 px `border/main`, r = 16, `shadow/sm` or none); the
  hierarchy inside a card is nuance (weight, tone), not colour.
- Host Grotesk carries meaning (headings, names, values, prices, buttons, options); Roboto
  carries prose and utility and is never larger than 14 (except text typed in a field).
  Poppins, Inter and Manrope are prohibited.
- The only "loud" screen allowed is the trust / welcome screen.
- Source: `05-design-rules.md` §4.

## 4. Voice and terms

- Headings are an action or a promise, not a section name ("Almost done — review and
  consent", not "Legal Consent"); the subtitle never repeats the breadcrumb.
- The CTA names the next step or the reward ("Check your eligibility", "Continue to see your
  treatment"); a sensitive change names the procedure ("Send verification link", not "Save").
- Address the user by name in the title when the name is known ("Welcome back, {name}").
- Give, then ask: the result or reassurance comes before any form.
- Consequences are stated in text, not colour: option captions say what happens ("Resumes
  Oct 15, 2026"). Waiting screens name the result ("Matching you with the right treatment").
- Errors: one problem, one next step; no jargon, no blame, no exclamation marks, no codes; the
  verbs are *couldn't*, *try again*, *check*. The customer never sees a status code, a stack
  trace or the word "server". Fixed copy: ErrorPage "Something didn't work as expected" /
  "Your progress is safe." / "Try now"; toast "We couldn't complete that action. Please try
  again."
- Bad news (out of stock) is a calm white card, no red and no icon.
- Caps only for short labels (≤ ~20 characters).
- Canonical strings (with their styles): "Due today:", "Due after doctor approval:", "Order
  summary", "Most popular", "Based on your answers", "Recommended starting path", "Your
  information is never shared and is protected by HIPAA." (`13-typography-roles-and-patterns.md`).
- **No glossary exists yet.** Known term drift, to be decided: doctor / provider / clinician /
  physician; "Log in" vs "Sign in"; "Close" vs "Got it"; "Identity Verification" vs "Upload a
  photo of your ID". Stable: "Select photo" / "Take photo" (in that order), "I agree —
  continue", "Go back" / "Quit questionnaire".

## 5. Components — when to use which

Full catalogue: `04-components.md` (Figma node ids, properties) and `COMPONENT-MAP.md`
(Figma → code). Selection rules: `05-design-rules.md` §5.

| Need | Use | Not |
|---|---|---|
| Primary action | `Button` default (one per screen; full-width pill); `black` for account CTAs | a second filled button; a styled div |
| Secondary action | underlined text link in the funnel; ghost button in the account | a second primary |
| Recovery vs exit | recovery primary, exit outline | exit as primary |
| Questionnaire answer | `OptionButton` / `Forms/ButtonQuestion` (checkbox = multi + Continue; no checkbox = single, auto-advance) | `RadioGroup` (radio only for real settings: payment method, tier) |
| Labelled field | `FormField` + `Input` / `Select` / `Combobox` (floating label, helper under the field) | native `input` / `select`; a placeholder as the label |
| Short known list / search | `Select` / `Combobox` (reuse, never rebuild) | a custom dropdown |
| Status | dot + word → `Badge` (≥ 3 states or "action required") → red card border only for Failed | colour alone; a filled badge for a binary state |
| Inline warning | `Alert` type warning; a critical note inside a card = callout on `surface/muted` | a toast (Sonner) as an inline warning; an Alert inside a card |
| Action failed, user stays | `ErrorToast` (sage badge, never red; one at a time) | a red toast; a page |
| User cannot continue | `ErrorPage` (error / not-found) | a toast |
| Parameterised action, transitional state | `Popup` (bottom sheet on mobile, centered on desktop) | a separate page |
| Irreversible confirmation | `AlertDialog` | a Popup with a red primary for a reversible action |
| Side drawer | `Sheet` (left / right only) | Sheet as a bottom panel |
| Empty list | `Empty` (sage line illustration 160–180, heading, one sentence, primary with the action icon) | "No data" |
| Loading | `Spinner` / `Skeleton`; waiting screen = ring around the monogram + the result line | a hand-drawn spinner |
| Upload | `FileUpload` (id / prescription / bodyPhoto / document; empty, uploading, success, error, disabled; errors inline) | a modal mid-questionnaire |
| Card layout | `CardBase` (padding 16, 12 on top with an eyebrow) | `Core/Card` (20) for composites |
| Checkout, subscription, account blocks | `Commerce/*` (`OrderSummaryCard`, `PlanOptionCard`, `PaymentMethodRow`, `CouponRow`, `KeyValue`, …) | rebuilding them from primitives |
| Edit vs navigate | pencil = edit in place; chevron = navigate | |
| Icon button | `Button size="icon"` in code; `Core/IconButton` in Figma | a Button emulating an icon button |

## 6. Patterns

Assembly: **one shell per screen → blocks → atoms**, each slot with a named type role and kit
component (`15-pattern-library.md`, `15-patterns.json`). Archetype anatomy confirmed on 85
screens: `05-design-rules.md` §4b; reasoning and reference nodes: `design-decisions.md`.

| Shell | Anatomy (short) |
|---|---|
| S1 Account page | hero gradient → floating white pill header → breadcrumb ("‹ Parent" deeper) → `Heading/Title` → `Heading/Lead` (≤ 2 lines) → content; no primary on a dashboard, actions live in the card that owns them |
| S2 Funnel step | dark hero gradient → `Navigation/Header` → centered title → `Heading/Subtitle` → content → primary → "Skip" underlined link → trust footer (HIPAA line + badges + Pharmacy Partners); desktop one 520 column |
| S3 Questionnaire step | coupon → header (‹, segmented progress without "N of M", ⋯) → QuestionTag (follow-ups, the only amber spot) → question (22, left) → helper → options → Skip / Sign in → sticky primary; no trust footer on mobile |
| S4 Popup | icon → `Heading/Heading` 22 (no exceptions, never a second Title) → subtitle → buttons |
| S5 In-page state | Heading 22 centered + caption |
| S6 Full-page error / 404 | `ErrorPage` |

Archetypes (details in §4b): **treatment plan** (recommendation → SpecStrip → benefits →
dosage → alternatives → how it works → FAQ → sticky primary + outline; price is the second
hero) · **checkout** (one step: title → "Due today: $0 / Due after doctor approval: $509"
reassurance → order summary → delivery → billing → coupon (inert → Applied → Error, value
kept) → payment rows with radio → CTA → FAQ → trust footer) · **order confirmation** (the
mandatory next step as the single dark card; "What happens next?" timeline) · **parameterised
action** (Popup: context card on `surface/accent` → one sentence on consequence and
reversibility → options with consequence captions → primary + ghost; reversible = green,
red only for irreversible) · **account forms** (one card, floating labels, locked values as
KeyValue with 🔒 ⓘ, "(Optional)" in the label) · **empty state** · **breakscreen** (a fact
screen; see §8 on its two dominants).

## 7. Hard rules (blocking for Reboost)

From `05-design-rules.md` §8, `AGENTS.md` and the policies; a violation is `debt` with no
`context` exception.

1. Only components from the "🇺🇸 UI KIT - reboost" library (code: `@sml-hub/reboost-ui`,
   `@sml-hub/reboost-checkout`); no new component, token or style without the DS owner.
2. No bare hex / rgb: only `02 Semantic` variables (+ `key/*`); never `01` primitives.
3. Every gap and padding is a `03 Sizing` variable; an off-ladder value does not exist.
4. Every text layer uses a role style from `13-typography-roles-and-patterns.md`; bare text,
   Poppins and Inter are prohibited; text inside buttons, options and tabs keeps its `UI/*`
   style. Code: typography only via `ds-*` classes.
5. Radii only from `radius/*` (code: `rounded-xl` / `rounded-2xl` banned — but see §8).
6. At most one solid-primary button and one Title (H1) per screen.
7. Every input and dropdown has a label; a placeholder is not a label.
8. Mobile first; tap targets ≥ `tap/min`; two frames per screen (mobile + desktop), paired names
   `{StepCode} / {platform} / {variant}`.
9. "UX/UI Redesign" variables are prohibited.
10. Category theming only via the `04 Category` mode / `data-theme`, never manual recolouring.
11. Questionnaire answers are always `OptionButton`, never `RadioGroup`.
12. Code: errors via `aria-invalid` / `FormField error=`; checkout components never route,
    fetch or format money and dates (they arrive as strings).

Product warnings (listed, a human accepts or rejects): inner gap ≥ outer gap; missing
required states (loading / error / empty / success); weak desktop coverage; no alt on an
image; no name on an icon button; line length outside 40–70; a centered element hanging in
nothing; more than 5 text styles on one screen; an element "not from here".

## 8. Motion register

- Register: **restrained** — "every transition explains an interaction; no decorative 'wow'
  motion" (`figma-agent-skills/reboost-doctrine.md`).
- No duration or easing tokens exist yet (code values are hardcoded; Figma has one `Easing`
  variable). Reference values: question transition exit 220 / enter delay 120 / enter 320 ms,
  horizontal for next / back, vertical for a follow-up; ErrorToast in 240 ms
  `cubic-bezier(0.2,0.8,0.2,1)`, out 180 ms; floating label 150 ms ease-out; accordion 200 ms.
- Plan switch (`docs/plan-switch-motion.md`): compositor properties only, never `ease-in` on an
  entrance, never fade dark into white; reduced motion = instant swap + 200 ms copy fade; input
  locked during the transition.

## 9. Known drift and open questions

The critic reports these as `decision-needed` or as known debt, not as new findings on every
screen. Canonical list: `09-decisions.md` (open questions) and `07-staleness-report.md`.

**Conflicts with a universal `blocking` rule** — a product decision cannot override these
(precedence in `SKILL.md`); the critic keeps reporting them until the owner changes the product
rule or the universal one:

- The invalid-submit shake is deliberately not gated by reduced motion (`globals.css`), against
  lens 10 · Non-colour cues and reduced motion.
- The questionnaire breakscreen is described as "the one legitimate case of two dominants",
  against lens 01 · Single dominant (whose only exception is a hero number and its phrase read
  as one sentence).

**Inside the product:**

- Field standard: floating label with a required asterisk (`05` §4) vs "(Optional)" in the label
  and no asterisk (`05` §4b, account forms) vs a bare placeholder (questionnaire) — Q10 / Q24.
- Tap target: the owner decided 44 (Figma changed), code `--tap-min` and `validate_design` still
  use 48.
- Radii: `AGENTS.md` bans `rounded-xl` / `rounded-2xl`, Figma and `globals.css` define them, six
  components use `rounded-xl`.
- Default theme: Figma default is `reboost` green; code `:root` is still weight-loss orange
  (owner decided the code changes).
- Two component kits in one file: questionnaires still use the legacy `Button-question`,
  `Coupon`, `Skip / Sign in` (Q62); two card standards (`Core/Card` vs `CardBase`); two
  uploaders.
- Primitive colours used directly in nine components (button, badge, alert, icon-badge,
  checkbox, option-button, combobox, skeleton, error-page).
- Icons: `AGENTS.md` says lucide-react only, the kit ships its own 116 icons.
- No dark mode, no motion tokens, no breakpoint tokens (only `md` = 768).
- Open product questions (`09-decisions.md`): single-choice control in the account (Q1 / Q8),
  empty-state heading level (Q2), funnel title size and logo (Q11), two primaries on plan
  format (Q13), "Pay – $509" vs "Continue" (Q16), secondary style in popups (Q18), consent with
  no control (Q21), disqualify terminal not drawn (Q22), sheet vs popup (Q28), large-number
  format (Q29), "Close" primary or outline (Q61).
- Fix backlog of confirmed debt (copy, maths, style): `10-fix-backlog.md`.

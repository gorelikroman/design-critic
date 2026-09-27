<!-- Snapshot of beluga-ds docs/design-handbook/09-decisions.md at commit 9ccb91b, taken
     2026-09-27. The canonical log lives in beluga-ds; edit it there and refresh this copy.
     Relative links below (05-design-rules.md, 13-…, 10-fix-backlog.md, 08-design-review/)
     point into beluga-ds/docs/design-handbook/. Node ids (1:877 …) are in the review
     collection file vdFkmYUE5h0ndTS9pfc2k8 unless another file is named. -->

# Reboost Design Decisions Log — by Archetype

> Cumulative result of the `08-design-review/` review. Format: archetype → decision → why →
> reference (file:node) → where it's violated. A rule moves into `05-design-rules.md` once
> confirmed by ≥3 screens from ≥2 clusters — done 2026-09-08, see `05-design-rules.md` §4b. Statuses: `candidate` (one cluster),
> `confirmed` (≥2 clusters), `decision-needed` (needs Roman).
>
> Review collection file: `vdFkmYUE5h0ndTS9pfc2k8`. Updated: 2026-09-07, after clusters A-I — screen review completed (2026-09-08).
>
> **Owner confirmation 2026-09-07 (cluster A):** all observations are correct; anything marked
> `debt` is to be fixed (backlog in `10-fix-backlog.md`). The `candidate (A)` statuses below are
> considered **confirmed by owner**; they only await confirmation on other clusters to move into `05`.

> **Typography (2026-09-15):** every type decision from the Reboost Type Review (266 screens) —
> roles, patterns per screen type, owner corrections — lives in
> [`13-typography-roles-and-patterns.md`](13-typography-roles-and-patterns.md). Where a row below
> names an old style (`Heading/H1`, `UI/Label Small`, `Eyebrow/Card`…), 13 wins.

## 1. Account page (list / detail)

| Decision | Why | Reference | Violations | Status |
|---|---|---|---|---|
| Hero gradient 233-295 px at the top + white floating header pill (logo, "My Account", ☰) | soft entry, header reads on any background; gradient gives "brand feel" without imagery | `1:877`, `1:622`, all B | — | **confirmed** (A + B, 15 screens) |
| Section root (Settings) — no breadcrumb or back; 1st level under "My account" — breadcrumb `Eyebrow/Card`; deeper — "‹ Parent" (`UI/Button` 14, `fill/primary`) | at the 2nd level, "go back" matters more than "where am I" | `1:1584` / `1:877` / `1:1869`, B1-B9 | — | **confirmed** (A + B) |
| H1 30 + subtitle `UI/Label Small` (HG Medium 14), no longer than 2 lines; paragraph → `Body/Small` | the subtitle is a continuation of the title, not a paragraph: it stays in the heading typeface | `1:877`, B1-B9 | `1:622`, `1:971`, `1:1869` — Poppins; `1:1643` — 3 lines | **confirmed** (A + B) |
| Dashboard with no primary button: all actions outline/ghost; primary only for an action involving money or creation (Refill, Browse, Add) | D2: one dominant element; where there's nothing to buy, the content is the dominant element | `1:622`, `1:877` | — | candidate (A) |
| Detail card order: result → logistics → doctor → pharmacy → instructions → money and management → help | value first, cancellation last; anxiety-inducing content (money) after reassuring content (progress) | `1:622` | — | candidate (A) |
| Status = 8 px dot + word in sage, no filled badge | quieter than a Badge; doesn't compete with the CTA | `1:877`, `1:622` | — | candidate (A) |
| Subscription progress = "Shipment N out of M" + segmented bar | the number is precise information, the bar is fast peripheral reading | `1:877` | — | candidate (A), check in F |
| Active tab filter filled with sage (`fill/primary-hover` class), not `fill/primary` | the filter shouldn't be the dominant element | `1:877` | inactive color hardcoded | candidate (A) |

## 2. Card (organism)

| Decision | Why | Reference | Violations | Status |
|---|---|---|---|---|
| eyebrow (`Eyebrow/Card` 12 tertiary) → heading (H4 20 / hero number) → body (14-16 secondary) → ≤1 outline/ghost action | three levels of nuance within, contrast between cards (D3/D4) | `1:622` cards 3-6 | — | confirms 05 §3 |
| Padding 12/16/16/16 with eyebrow, r=16, 12-16 between cards | canon 2026-07-30 | `1:622` | `1:877` gap 14; chart r=12 | confirmed (handbook + A) |
| Critical warning inside a card — callout on `surface/muted` r=12, not an Alert and not red | the "do not freeze" warning is an instruction, not an error | `1:622` Instructions | hardcoded color `#f2f2f5` | candidate (A) |
| Tertiary action — ghost link with icon (share/external), underlined | the only underline on the screen = external navigation | `1:622` "View medication guide" | — | candidate (A) |

## 3. Parameterized action in the account (pause, dose change, reschedule)

| Decision | Why | Reference | Violations | Status |
|---|---|---|---|---|
| Popup (`Overlays/Popup`) over a dimmed page, not a separate screen | context stays visible; a transitional state doesn't deserve its own page | `1:802`, `1:770` | double scrim 60%+30% | confirmed (Roman 2026-09-07 + A) |
| First block — context card on `surface/accent`: exactly what the action will affect | removes the question "is this about that subscription?" | `1:802` | — | candidate (A) |
| One phrase about the consequence and reversibility (`UI/Option` 16 secondary) | anxiety is relieved with text, not color | `1:802` | — | candidate (A) |
| Each option has a caption with the consequence ("Resumes Oct 15, 2026") | a choice without a consequence is a blind choice | `1:802` | "Answer option" placeholder | candidate (A) |
| Reversible action — primary green; destructive red only for irreversible actions | pause ≠ cancel; red would lose its value | `1:802` | — | candidate (A) |
| primary confirmation + ghost "Cancel" / "Skip this step" below it | symmetric friction (05 §7) | `1:802`, `1:770` | — | candidate (A) |
| An optional step is marked "(optional)" in the title and has a ghost Skip | honesty; not sludge | `1:770` | — | candidate (A) |
| Single-choice in the account — with radio/checkbox + Continue; in the funnel — no indicator, tap = navigate | in the account a choice = a setting, needs an explicit confirm; in the funnel — pace | `1:770`, `1:802` vs questionnaire | checkbox (A4) and radio (A5) for the same archetype; options r=10 vs 16 | **decision-needed** |

## 3b. Account lists and menus (cluster B)

| Decision | Why | Reference | Violations | Status |
|---|---|---|---|---|
| Menu row = title `UI/Label Small` + one-line description + chevron in a circle; the destructive item is last, without red | navigation shouldn't be scary; red is only on the confirmation screen | `1:1584` | descriptions without a style, get truncated | candidate (B) |
| Pencil = edit in place, chevron = navigate; "Default" as a `Body/Caption` word-label, not a pill | affordance via icon; "default" doesn't deserve a color | `1:1890`, `1:1584` | — | candidate (B) |
| Status: dot + word, when background/binary; `Core/Badge` pill, when there are ≥3 states or an action is required; card border color — only for Failed | color is spent in proportion to increasing severity | `1:877`, `1:1717` (dots) · `1:1643` (pills) · `1:1717` Failed (border) | — | **confirmed** (A + B) |
| Transaction history: month `Eyebrow/Caps` → cards; dotted line between "what" and "payment details"; "Download receipt" as an underlined link on the right | grouping by time, the receipt is a tertiary action | `1:1717` | Poppins statuses, hardcoded tabs | candidate (B) |
| Money summary: kicker `Eyebrow/Caps` → `Display/Stat Large` → one phrase, centered; breakdown by cards below | the number is what people came for | `1:1819`, `1:622` ("4/6") | — | **confirmed** (A + B) |

## 3c. Forms in the account (cluster B)

| Decision | Why | Reference | Violations | Status |
|---|---|---|---|---|
| The form lives in one card r=16; editable fields — `Forms/Input` with a floating label, locked fields — KeyValue with no border, with 🔒 and ⓘ | "can/can't" reads via the border, not the color | `1:1599`, `1:1623`, `1:1908` | "Monthly Plan" placeholder; `summary-first-name` is a draft layer name | candidate (B) |
| The form's subtitle answers "why do you need this" / "what happens next" | relieves anxiety before input | `1:1599`, `1:1623` | — | candidate (B) |
| Successful validation — a green helper with ✓ below the field; "(Optional)" in the label; the helper explains what the field is for | confirmation via text, no asterisks for required fields | `1:1908` | — | candidate (B) |
| Scope of the action (one subscription / all) — tiles with an icon, title and caption; a consequence warning (`Alert warning`) above the choice, in the same card | the consequence sits next to the choice | `1:1908` | `Sonner` used instead of `Alert` | candidate (B) |
| Sensitive change (email) — verification link; the button names the procedure ("Send verification link") | security explained through the action | `1:1623` | — | candidate (B) |
| Form actions: primary + ghost "Cancel" | symmetric friction | `1:1599`, `1:1908` | `1:1623` has no Cancel | decision-needed |
| Explainer before the action: illustration → "What's included" (icon in a light `surface/brand` circle + title + description) → "How" → one CTA; sections spaced with `gap/6xl` 64 | read before something irreversible | `1:1662` | Poppins section headings | candidate (B) |

## 3d. Funnel step (cluster C — medical review, contacts)

| Decision | Why | Reference | Violations | Status |
|---|---|---|---|---|
| Step anatomy: dark hero gradient (320 mobile / 459 desktop) → white `Navigation/Header` → centered title → `Heading/Subtitle` 18 → content → primary → "Skip" as an underlined link → trust footer (Footnote + HIPAA/LegitScript + Our Pharmacy Partners) | dark entry = "serious, medical"; light bottom = "safe" | `1:4545`, `1:4675` | footer is cropped on 1:4588, 1:4719 | **confirmed** (7 screens) |
| "Give, then ask": the result (94%, words, goal/dose) always comes before the form | anxiety is relieved before requesting data | `1:4545`, `1:4608` | — | candidate (C) |
| Hero number with a bar (`ScoreMeter`): label on the left, `Display/Stat` on the right | a number is trusted more than words | `1:4545`, `1:4608`, desktop | — | **confirmed** (A3, B9, C — 3 clusters) |
| Secondary action in the funnel — underlined "Skip" link (in the account — ghost "Cancel") | in the funnel a second button can't be given weight; in the account, the exit needs to be visible | all C vs A4/A5/B3/B5 | — | candidate (C), both contexts are correct |
| The CTA names the next step or the reward ("Continue to see your treatment", "Check your eligibility") | motivation lives in the verb | all C | — | candidate (C) |
| The title addresses the user by name when the name is known | personalization in the most visible spot | `1:4588`, `1:4640`, `1:4752` | — | candidate (C) |
| Transferring patient (FTB-B): a current-dose card, "we know what you're taking," before the form; lead phrase "We'll prioritize continuity" in bold | FTB-B's main fear is losing their dose | `1:4608`, `1:4719` | unstyled lines | candidate (C) |
| Emphasis within a paragraph: the first phrase `text/main` SemiBold, the rest `text/secondary`; a short centered hairline as a pause between "about you" and "your data" | contrast within a paragraph without color | `1:4608` | — | candidate (C) |
| Desktop funnel step: one centered 520 column, the same sequence; H1 44, number 44, fields and CTA span the full column | the funnel doesn't need a sidebar; focus | `1:4675`, `1:4719`, `1:4752` | footer caption 14 vs 10 | candidate (C) |
| Funnel fields: placeholder + "*" without a floating label; in the account — floating label + "(Optional)" | the funnel is short, is a label unnecessary? | C vs B | — | **decision-needed** |
| Step title on mobile: H3 22 (FTB-A, C1/C2) or H1 30 (FTB-B, C3/C4) | | | | **decision-needed** |
| **Logo: "Re" monogram on a dark background, "Reboost" wordmark on light** — a property of the `Header` component, not chance | contrast matters more than typeface consistency | 15 questionnaire screens (G), C, D, E, F | serif "réboost" on `1:16935` — a third variant, debt | **confirmed** (G closes half of question 11) |

## 3e. Treatment and plan selection (cluster D)

| Decision | Why | Reference | Violations | Status |
|---|---|---|---|---|
| Recommendation page = a landing page inside the funnel: recommendation (name + price) → "based on your answers" → benefits → dosage → alternatives (tabs + `ProductCard`) → "How it works" (`SectionTimeline`) → before/after → education → FAQ → sticky primary + outline pair | sell one recommendation, removing objections, without leaving the page | `1:4775`, `1:4873` | Poppins/Inter, lavender, hardcoded values | candidate (D) |
| Content sheet r=24 overlaps the dark hero with the product photo; the goal curve 256 → 190 repeats as a motif from medical review | continuity of the "your goal" story | `1:4775`, `1:4873` | — | candidate (D) |
| Price = a second hero: `Display/Price` 43 to the right of H1, caption "total for your first month" above it; in cards H3/H4 + `UI/Tooltip` "/month", prefix "from" / "Start from" | the price doesn't hide, but isn't louder than the product either | `1:4775`, `1:5129`, `1:6668`, `1:6725` | `#000000` in prices | **confirmed** (7 screens) |
| Social proof — one `Footnote` line with a ★ below the product name | trust without a banner | `1:4775`, `1:5129` | — | candidate (D) |
| Sticky pair at the bottom of the landing page: primary + outline alternative ("Let a doctor choose for me") on a white card with a shadow | the CTA is always accessible; the alternative isn't a second primary | `1:4775` | component with no name | candidate (D) |
| Alternative path "let the doctor choose": doctor photo with a glass chip (name + ✓ + quote) → question-H2 → "How it works" 1-2-3 with a `text/brand` timeframe → "You'll see" preview → reassurance about money → primary + "Choose myself" link | a face removes distrust; the preview shows the outcome | `1:4966`, `1:5013` | — | candidate (D) |
| Returning patient: "Welcome back, {name}" centered + a "what we did" phrase → product card → `SelectRow` with a dose dropdown → `Eyebrow/Caps` "Based on your latest check-in" + checklist with light ✓ → Continue + outline "More medications" | shows the system remembers the patient, one decision | `1:5129`, `1:5312` | second H1 in the card | candidate (D) |
| Bad news (out of stock) — a calm white card at the top, no red and no icon; the alternative right below it | don't scare, offer a path | `1:5256` | — | candidate (D) |
| Plan format: `PlanMarketingCard` — H3 → caption `text/accent` → first line `UI/Feature` bold → benefits `Label/Primary` → savings `text/success` → "Dosage summary" link on the left, price on the right → CTA inside the card | comparing two paths "side by side" | `1:6668`, `1:7203` | lavender; **two primaries on one screen** | **decision-needed** |
| Duration: `PlanOptionCard` radio + a pre-selected recommended option with a dark "Most popular" badge + one CTA naming the step ("Shipping & payment") | a choice within one path — one CTA | `1:6725`, `1:7261` | "over 3 months" on the 6-month option | candidate (D) |
| Explainer popup: H3 + ✕ → paragraph → bold lead fact → "icon-stack + caption + text" lines → one "Got it" button; on desktop — the same popup, centered | "what this means" without leaving | `1:6764`, `1:6904`, `1:7046` | paragraphs in `UI/Button`, 100% scrim | candidate (D) |
| Dark filled icon circles in the marketing education section ("How do GLP-1s work?") | | `1:4775`, `1:4873` | against the "Icon Badge is light" rule | **decision-needed** |

## 3f. Checkout and authentication (cluster E)

| Decision | Why | Reference | Violations | Status |
|---|---|---|---|---|
| One-step checkout: centered H1 → reassuring paragraph about charges and refunds → Order summary → Delivery (info + address or a read-only line) → billing checkbox (on) → Coupon → Payment → CTA → checkout FAQ → footer | all anxiety is relieved before the first field; one page — one pace | `1:6280`, `1:6443`, `1:6362` | prices don't add up; paragraphs in `UI/Button` | candidate (E) |
| Order summary: `Eyebrow/Card` → photo + `UI/Value Large` + meta + `UI/Amount` + "/month" footnote → dotted line → fee lines → **You Save in green** → Total `UI/Amount` → **"Due today: $0" / "Due after doctor approval: $509"** as an H3 pair → `UI/Feature` savings, centered | money repeats consistently; "$0 today" is the main promise | `1:6362`, `1:5762` | monogram instead of a photo | candidate (E) |
| Payment methods — `PaymentMethodRow`: brand icon + `Subtitle Small` + radio on the right; Credit Card is pre-selected | a familiar payment-selection format | `1:6280` | — | candidate (E) |
| Saved address — a read-only line with a pencil; selecting — a popup with radio rows + a "Show all addresses" link + a "+ Add new address" row; adding — a popup with the same form and "Save" | don't make the user re-enter data; sub-tasks don't leave the page | `1:6362`, `1:6228`, `1:6264` | — | candidate (E) (+B1) |
| Auth inside checkout: `H5` card "Log in to complete your order" → toggle link → Google outline + Apple black → "or" → form → primary; "Forgot your password?" as an underlined link | don't lose the order context; social login first | `1:5762`, `1:5836`, `1:5904` | the toggle link on the login screen is wrong; "doctor HubSpot" | candidate (E) |
| Sex/gender — `ToggleGroup` brand segment (one half filled) | a binary choice without radio buttons | `1:5762` | — | candidate (E) |
| Sub-task popup: H3 + ✕ + content + one primary | the sub-task doesn't leave the page | `1:5979`, `1:6228`, `1:6264` (+D10-D13) | text in `UI/Button` | **confirmed** (D + E + I) |
| A confirmation popup with no next step is closed with an **outline** "Close" | primary only where there's a step | `1:5990`, `1:15029` | **contradicted by cluster I:** in `1:4544` and `1:4537` "Close" is primary. Score 2:2 | **decision-needed** (question 61) |
| Coupon: Apply inert before input → Applied (floating label, outline "Remove", ✓ green caption) → Error (red border, ⚠ caption, value retained) | feedback via text and form, not only color | `1:6622`, `1:6644` | — | candidate (E) (+B5) |
| Desktop checkout: sticky bar "Total · from $ /month" + chevron expand + Continue | the total is always visible on a long page | `1:6443`, `1:6540` | the sticky bar shows a different amount | candidate (E) |
| Checkout CTA: "Pay – $509" (mobile, medication) or "Continue" (desktop, saved address) | | | | **decision-needed** |

## 3g. Order confirmation (cluster F)

| Decision | Why | Reference | Violations | Status |
|---|---|---|---|---|
| OC: outlined checkmark in a circle → "Congratulations, {name}!" as secondary `H3` + `H1` "We've received your order" → `Body/Small` with the email → [required step] → "What happens next?" `SectionTimeline` → cross-sell → footer | exhale → what's now → what's next → where to go | `1:5436`, `1:5567`, `1:5689` | `#000000` in H2, foreign text in step 3 | candidate (F) |
| A required action after payment — the only dark `surface/inverse` card: white linear icon, muted eyebrow, white H3, text, button | a dark block on a light page = "can't be skipped" | `1:5436`, `1:5689` | the button is lavender — should be light (`surface/card` + dark text) | candidate (F) |
| Success — a forest-green outlined checkmark with no fill; confetti — a barely noticeable background | celebration, but a quiet one | `1:5436` | — | candidate (F) |
| Cross-sell card: `H2` category + `Label/Small` counter + product photo bleeding off the right edge + dark square chevron button + `Label/Small` CTA caption | the product "breaks out" of the card, the button stays quiet | `1:5436`, `1:5689` | section caption without a style, two CTA wordings | candidate (F) |
| CSAT popup: `H4` + ✕, 3 `Body/Medium` questions, a scale of 5 linear faces in cream squares (the selected one is dark), textarea, primary + Skip | fast, no numbers, on-brand | `1:5587` | Skip outline vs ghost/link | candidate (F) |
| Desktop: the "What happens next?" timeline in a row of 3 × 360; everything else — a 520 column | a row reads as a sequence | `1:5689` (+D2 reviews) | — | candidate (F) |

## 3h. Questionnaire (cluster G)

| Decision | Why | Reference | Violations | Status |
|---|---|---|---|---|
| Questionnaire step: `Coupon` → `Header` (‹ + segmented progress + ⋯) → title **on the left** → instruction → `Button-question` → `Skip / Sign in` → primary. **No trust footer** | the questionnaire asks, the funnel promises: title on the left instead of centered, a shorter screen | `1:14847`, `1:14853`, `1:14865`, `1:14868` | the footer only exists on desktop (question 23) | **confirmed** (G) |
| Answer = `Button-question` r=16; **checkbox present = multi-select, absent = single-select** — the control communicates the question type | the user understands "one or several" before tapping | 5 screens of G | — | **confirmed** (G) |
| A single-select answer auto-advances, `Continue` isn't shown; multi-select and free text require `Continue` | pace: in the questionnaire, a tap = an answer | `1:14853`, `1:15068` vs `1:14847`, `1:14868` | — | candidate (G) |
| Questionnaire progress — a 200×4 segmented bar in the header, no percentages and no "N of M" | in the questionnaire, rhythm matters, not an exact count (the opposite is true in the subscription — "N out of M", A-7) | G3-G9, `1:17199` | two segments are assembled raw | candidate (G) |
| A follow-up is marked with `Questionnaire/QuestionTag` r=999 — **the only spot of amber on the screen** | the branch is visible instantly, the color isn't spent anywhere else | `1:14868`, `1:14865` | the tag is set in `UI/Tooltip` + Roboto | candidate (G) |
| A reference lookup (allergies, medications) = a "Yes/No gate → search screen with chips" pair | the gate filters out most users before complex input | `1:15068` + `1:15087` | the search is hand-assembled, lavender in the chips | candidate (G) |
| Soft block (an out-of-protocol answer): a sheet with a grab-handle, primary "Go back", outline "Quit" — **recovery is always primary** | the path back is easier than the exit | `1:14844` | — | candidate (G) |
| Dark chapter screen between blocks: kicker "<block> Done" → `H1` on the left → vertical 3-step stepper → cream primary | reward for completing a block; inverting the light step signals a chapter change | 6 screens of G (+H1-H4) | "Start" CTA in the middle of the questionnaire | **confirmed** (G + H) |
| Breakscreen fact: photo + "You're not alone" + hero number + statistic + source + one primary; **the number and the phrase read as one sentence** | the only legitimate case of two dominant elements | `1:16841`, `1:16818`, `1:18239`, `1:18254` | numbers without a style, different sizes 52/92 | **confirmed** (G + H) |
| Desktop questionnaire = the same 520 column and the same `Content / RP *` component as mobile | portability without a second design | `1:16935`, `1:17199` | the title doesn't scale up (question 26), cards are inverted (question 25) | **confirmed** (G) |

## 3i. Wide questionnaire intros and pauses (cluster H)

> **There are no dashboards in the file.** Six 1270×779 nodes — desktop intros and breakscreens for the ED questionnaire,
> four of them are one screen in four background variants. There's nothing to derive a
> desktop dashboard grid rule from (question 40).

| Decision | Why | Reference | Violations | Status |
|---|---|---|---|---|
| "Windowed" screen: cream `surface/background` field → rounded 1244×753 image canvas with a 12/13 inset and r≈36 | the image doesn't touch the edges — the screen reads as an object, not a background | H1-H6 | radii 37/36/29 on one shape; inset 13 is off the scale | candidate (H) |
| Content over the image — **one 324 column, no card** (520 in the funnel on white) | on a photo, text doesn't need a canvas, it needs a narrow measure | H1-H6 | the column is shifted from the optical center by 9-16 px (H1-H4) | candidate (H) |
| The header on a pause screen is **transparent** (logo centered), not the account's white pill | a pill would cut through the frame | H1-H6 | — | candidate (H) |
| The photo background is dimmed to a texture: opacity 0.4-0.6 + 20% black or `SOFT_LIGHT` | the background doesn't compete with the title | H3-H6 | `white-50` contrast on light areas < 3:1 | candidate (H) |
| The face in the background looks **toward the column**, not out of the frame | the model's gaze leads the reader's gaze | H4 violates this | — | candidate (H) |
| Three levels of white as depth: `text/on-fill` → `white-50` → `white-30` | "receding into depth gets lighter and thinner" (D3), literally | H1-H4 | — | **confirmed** (D + H) |
| A number always has a link to the source institute in `Body/Footnote` | the figure reads as a fact, not as advertising | H5, H6 (+C) | `1:16818` has no source | candidate (H) |

## 3j. Utility screens and overlays (cluster I)

| Decision | Why | Reference | Violations | Status |
|---|---|---|---|---|
| Help menu popup: 3 × `Commerce/ActionListItem`, **no button** — the only way out is ✕ | the menu doesn't require confirmation | `1:7301`, `1:14993` | — | candidate (I) |
| Fork popup: primary + outline **stacked, gap 8** (not in a row) | on mobile, buttons in a row lose width | `1:15029` | — | candidate (I) |
| The ✕ aligns to the first line of the title, not to the center of the header | with a two-line title, the close icon doesn't "float" | `1:15029` | — | candidate (I) |
| Explanation popup: `Body/Medium` 16 paragraph + `Body/Footnote` source | an explanation is read, not scanned | `1:14964` | — | candidate (I) |
| Gold `Label/Primary` as a section heading inside a popup | gold carries structure, it doesn't decorate | `1:14964` | — | candidate (I) |
| Unavailable options are dimmed, not hidden | the user sees the full picture of the choice | `1:14964` | — | candidate (I) |
| Waiting screen: a ring around the monogram + `H3` naming the outcome ("Matching you with the right treatment") | the wait is explained by the outcome, not a spinner | `1:4441`, `1:4491` | no trust footer (question 64) | candidate (I) |
| A coupon in the summary — a fee line, a minus before the currency sign ("−$5") | the discount reads as a line in the calculation | `1:6181` | the math doesn't add up: 509 − 5 = 504, Total shows 499 | candidate (I) |

## 3k. System finding from cluster I: two component kits in one file

Account, checkout, and overlays are built on `Core / Forms / Commerce / Overlays`. **The entire questionnaire block
rests on a different component kit**: `Button`, `Input`, `icons/24px/tuiIcon*`, `Button-question`,
`Screen / Base`, `Coupon`, `Skip / Sign in`. Both libraries are connected as remote libraries.

This explains, all at once: `Button-question` instead of `Forms/ButtonQuestion` (in `04-components.md`
the former is marked as a draft), the legacy `Coupon` and `Skip / Sign in` from the `Archive` page, different
headers, different fields, and the "degraded copy" of the password-reset screen. **As long as the two kits coexist,
every rule about components has two readings.** Resolution — question 62.

## 4. Empty state

| Decision | Why | Reference | Violations | Status |
|---|---|---|---|---|
| Linear illustration 160-180 px in sage (not 3D, not a photo) + `Heading/H3` + one sentence + primary at the bottom with an action icon | quiet, on-brand, one action | `1:1869` | `1:971`: H2 + monogram — unify | candidate (A), decision on H2/H3 |

## 5. Open questions for Roman (after clusters A-I)

1. Single-choice in the account: checkbox on the right (A4) or radio on the left (A5)? One component for both.
2. Empty state: H3 (A6) or H2 (A2)? Monogram or linear illustration?
3. `Drawer BUILDING BLOCKES` is used in production (A4, A5) — formalize it as the
   `Overlays/PopupOption` + `Overlays/PopupActions` components? Property names need to be defined.
4. Subscription card in the list (A1) — a new `Commerce/SubscriptionCard` component?
5. Lavender in the A3 chart — recolor to brand (per the "no purple" rule)?
6. `ActionListItem` has r=20, cards have 16: keep 20 for action rows, or align to 16?
7. Forms: ghost "Cancel" always (B3, B5), or is a back link enough (B4)?
8. A third variant of single-choice appeared in B5 (radio top-right in a tile) — relates to question 1: the account needs
   a single selection component with variants `Control = checkbox | radio`, `Layout = row | tile`.
9. `Display/Stat Large` (44) on mobile for money — lock it in as a rule (03-typography currently
   says "desktop only")?
10. Funnel: fields with "*" in the placeholder and no floating label (C) versus a floating label and
    "(Optional)" in the account (B) — two form standards or one?
11. Funnel step title on mobile: H3 22 (FTB-A) or H1 30 (FTB-B)? Which logo in the funnel header —
    the "Reboost" wordmark or the "Re" monogram?
12. Consent text on mobile — 10 px (Footnote). Raise it to 12 (`UI/Helper`)?
13. Plan format (D8, D14): two marketing cards, each with its own primary "Continue". Is this a
    deliberate exception to "one primary per screen" for mutually exclusive paths — or should it be aligned to
    radio + one CTA, as in the duration selection (D9)?
14. "How do GLP-1s work?" (D1, D2): icons in dark green filled circles, even though the Icon Badge rule is
    a light `surface/brand`. Is the marketing section an exception?
15. `UI/Price Prefix` (12 px) is used as the style for benefit lines in 10+ places in cluster D.
    Replace it with `Label/Primary` 14 (as in `PlanMarketingCard`) or introduce `UI/Benefit Small`?
16. Checkout CTA: "Pay – $509" with the amount (E1) or "Continue" (E2-E4)? If "Continue" — is it because
    the charge happens after doctor approval ("Due today $0")?
17. FAQ on checkout: the mobile set — 3 general questions about the medication, the desktop set — 5 about charges,
    delivery, and renewal. Should the desktop set become the single standard?
18. Secondary action in a popup: ghost "Skip this step" (A5), outline "Skip" (F3 CSAT), or a
    "Skip" link (funnel)? One rule for popups.
19. The button on the dark "Verify your identity" card (F1, F4) is lavender. Replace it with a light one
    (`surface/card` + dark text, like "Get Started" on the welcome screen)?

### Cluster G — questionnaire (20-29)
20. **Two standards for the question title in the same questionnaire**: `Heading/H3` 22 (`1:15068`, `1:15087`) versus Poppins 21 with no style (`1:14847`-`1:14868`). The screens are consecutive. Which is the canon?
21. **Consent with no control** (`1:14909`): the checkmarks are drawn already checked, there's no checkbox, and declining isn't expressed in any way — yet the `@disqualify (consent declined)` terminal exists in the schema.
22. **The questionnaire disqualification terminal isn't drawn** — only a red note on the schema, whereas for medical review it's four finished screens (C).
23. **Trust footer**: present on the questionnaire desktop, absent on all questionnaire mobile screens — against rule C-9.
24. **A third field standard**: the questionnaire — a bare placeholder with no "*"; the funnel — placeholder + "*"; the account — a floating label. Align to one?
25. **Surface inversion**: mobile — white cards on cream, questionnaire desktop — cream on white.
26. **The title on the questionnaire desktop doesn't scale up** (21), whereas on Progress it grows to 44, and the funnel rule requires 44.
27. **Gold as an entire screen background** (`1:16984` Welcome) against the "gold is a secondary accent" rule.
28. **Sheet with a grab-handle versus popup with ✕** — when to use which.
29. **Large-number format**: "30 000 000+" (European space separators) next to "1 IN 8".

### Cluster H — wide intros (40-45)
40. **Does a dashboard exist in the product?** If so — provide the node: there's currently nothing to derive a desktop dashboard grid rule from.
41. Which of the four background variants (H1-H4) is the canon? Mark exploration sheets separately.
42. Codify "number + phrase = one sentence" as an exception to the single-dominant-element rule?
43. Transparent header and white pill — variants of one `Header`, or two components?
44. Column 324 on a photo versus 520 on white — a deliberate distinction?
45. Mobile breakscreen — the same vertical stepper, or a percentage bar?

### Cluster I — utility screens (60-66)
60. **Questionnaire and checkout auth — one screen or two?** Currently two different designs for the same task.
61. **"Close" primary or outline?** Score 2:2. Agent's hypothesis: outline when the popup completed a task; primary when the popup was informational.
62. **The second component kit in the questionnaire** — a temporary measure or a deliberate decision? The entire component catalog depends on this.
63. Size and alignment of the utility popup title — four variants exist in the product.
64. Waiting screen with no trust footer — exception or oversight?
65. "Your dosage" popup: does the choice apply on tap, or is a "Save" button needed?
66. Where's the canonical instance of help/privacy — in the questionnaire, or in the funnel?

# Product layers

The skill's core is design-system-agnostic. A **product layer** adds one product's design
system, patterns, voice and decisions on top of it, so building and reviewing that product
use its real components and its own rules.

```
universal rules      lenses/, catalog/, foundations/          — this skill, never product-specific
company layer        products/_company/product.md             — optional: what all products share
product layer        products/<slug>/product.md                — the product's design system and patterns
                     products/<slug>/design-decisions.md       — the product's decisions log, grown by reviews
```

## How a layer is loaded

1. **By name.** The request names the product; the name is matched against the title and
   the `Names` line of every layer — those in this folder and the working repository's
   `.design-critic/product.md` (list every name people actually use: the official one,
   localized ones, the repo slug).
2. **By repository.** No name in the request, and the working repository has
   `.design-critic/product.md` (a product repo can keep its layer there instead of in this
   folder) → that layer. If a named product and the repository's layer disagree, the name
   wins and the mismatch is pointed out.
3. **Otherwise** universal rules only — a product is never guessed. The first line of the
   deliverable says so and lists the available layers, so the requester can name one.
4. The skill loads `products/_company/product.md` if it exists, then the product's
   `product.md` and `design-decisions.md`. The product wins over the company where they
   differ.

Switching is per request: "now the same screen in Beta" loads Beta's layer and drops
Alpha's. Every deliverable starts with the active layer ("Product: Alpha"), so a report can
never be read as the wrong product's.

## Precedence

A product layer is "the project's confirmed decisions" in the precedence order of
`SKILL.md`: it outranks universal `warning` and `note` rules, never a universal `blocking`
one. The **hard rules** section of `product.md` is the project's hard rules of the review
method (§4.5): breaking one is `debt` with no `context` exception.

## Creating a layer for a product

1. `cp -R products/_template products/<slug>`: it holds `product.md` and an empty
   `design-decisions.md` (the same file as `templates/design-decisions.md`).
2. Fill `product.md` §1–§3 by hand: what the product is, the design system's sources (library
   link, token source, component docs), the voice. Leave §4–§6 mostly empty.
3. Run a review in **learn mode** on the product's most recent, most trusted screens
   (`method/review-method.md` §0, §5 "Bootstrapping a new project"). Its decisions delta and
   component inventory become the first rows of `design-decisions.md` and §4–§5 of
   `product.md`, once the product owner accepts them.
4. From then on, reviews grow the log and builds use the components and patterns listed here.

Only the product owner edits a product layer. Builds and reviews propose changes; they do not
write them.

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

1. The request names the product, or the working repository has `.design-critic/product.md`
   (a product repo can keep its layer there instead of in this folder).
2. The skill loads `products/_company/product.md` if it exists, then the product's
   `product.md` and `design-decisions.md`. The product wins over the company where they
   differ.
3. Several products exist and the request does not say which → the skill asks. No layer
   applies → universal rules only.

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

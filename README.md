# Earth & Tonic — Shopify Liquid build

Everything (home, shop, product, our story, gallery, header, footer, cart, newsletter)
lives in **one file**: `earth-and-tonic.liquid`.

No API tokens, no JavaScript framework. It uses Shopify's native product data,
native cart (`/cart/add`), native checkout, and the native `{% form 'customer' %}`
newsletter, so orders and email subscribers land in your Shopify admin directly.

## Install

1. **Shopify admin → Online Store → Themes → ⋯ → Edit code**
2. **Sections → Add a new section** → name it `earth-and-tonic`.
   Delete the placeholder content and paste all of `earth-and-tonic.liquid`.
3. **Layout → theme.liquid** — inside `<body>`, replace the theme's header /
   main / footer markup with a single line:

   ```liquid
   {% section 'earth-and-tonic' %}
   ```

   Keep `{{ content_for_header }}` in `<head>`.
4. **Assets → Add a new asset** — upload every file from the `assets/` folder
   here, keeping the exact filenames.
5. **Online Store → Pages** — create two pages so the nav links resolve:
   - "Our Story" with handle `about`
   - "Gallery" with handle `gallery`

   Content can be blank; the section supplies the layout.

## Which page renders what

| Shopify template | Renders |
| --- | --- |
| `index` | Home (hero, marquee, duo split, collection grid, bundle, story, values) |
| `product` | Product page — centered bottle flanked by ingredients, directions / suggested uses / storage, related products |
| `collection`, `list-collections`, `search` | Shop grid |
| page handle `about` | Our Story |
| page handle `gallery` | Photo mosaic |
| anything else | That page's own Shopify content, inside the site chrome |

## Bundle discount

The bundle button adds both balms and then redirects through
`/discount/BUNDLE5`, so the $5 off applies automatically. Keep the `BUNDLE5`
discount code active in **Discounts**. If you rename it, change `BUNDLE_CODE`
at the top of the Liquid file.

## Product ingredient copy

Ingredient names, notes, descriptions, suggested uses and storage are near the
top of the `product` block, keyed by product handle. The two handles used are:

- `earth-balm-botanical-skin-balm-2oz`
- `moon-balm-lavender-botanical-balm-2-0z`

Any other product falls back to a generic ingredient set.

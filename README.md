# Earth & Tonic — Shopify theme

This folder is a **complete, valid Shopify theme** (proper `layout/`, `templates/`,
`sections/`, `config/`, `locales/`, `snippets/`, `assets/` structure). The whole
storefront is drawn by one section, `sections/earth-and-tonic.liquid`, which
branches on `template.name` to render home, shop, product, our story, gallery,
cart, and footer. `layout/theme.liquid` simply calls that section.

No API tokens, no JS framework — it uses Shopify's native product data, native
cart, native checkout, and the native `{% form 'customer' %}` newsletter.

## ⚠️ Why "not a theme" happens on the GitHub connection

Shopify's **GitHub integration reads the ROOT of the branch you connect** and
expects the theme folders (`layout/`, `templates/`, `config/`, …) to be right
there. This repository's root is a **React/Vite app**, and the theme lives in
this `shopify/` subfolder — so Shopify sees no theme at the root and reports
**"not a theme."**

Give Shopify a branch (or repo) whose **root** is this theme. Pick one:

### Option A — Dedicated branch via `git subtree` (single repo, recommended)

Run from the repo root:

```sh
# create/refresh a branch whose ROOT is the shopify/ folder
git subtree split --prefix shopify -b shopify-theme
git push -f origin shopify-theme
```

Then in Shopify admin → **Online Store → Themes → Add theme → Connect from GitHub**,
choose this repo and the **`shopify-theme`** branch. It now sees a valid theme.
Re-run those two commands whenever you edit files in `shopify/` to update it.

### Option B — Separate theme repo

```sh
cd shopify
git init && git add . && git commit -m "Earth & Tonic Shopify theme"
git branch -M main
git remote add origin git@github.com:<you>/earth-and-tonic-theme.git
git push -u origin main
```

Connect that repo's `main` branch in Shopify.

### Option C — Shopify CLI (no GitHub needed)

```sh
npm i -g @shopify/cli @shopify/theme
cd shopify
shopify theme dev     # live local preview
shopify theme push    # upload to your store
```

## Which page renders what

| Shopify template | Renders |
| --- | --- |
| `index` | Home (hero, marquee, duo split, collection grid, bundle, story, values) |
| `product` | Product page — centered bottle flanked by ingredients, directions / suggested uses / storage, related products |
| `collection`, `list-collections`, `search` | Shop grid |
| page handle `about` | Our Story |
| page handle `gallery` | Photo mosaic |
| `cart` | Native cart (`templates/cart.liquid`) |
| `404`, `blog`, `article`, `gift_card`, `password` | Standard templates inside the site chrome |
| anything else | That page's own Shopify content, inside the site chrome |

## Store setup after connecting

**Online Store → Pages** — create two pages so the nav links resolve:
- "Our Story" with handle `about`
- "Gallery" with handle `gallery`

Content can be blank; the section supplies the layout.

## Bundle discount

The bundle button adds both balms and then redirects through
`/discount/BUNDLE5`, so the $5 off applies automatically. Keep the `BUNDLE5`
discount code active in **Discounts**. If you rename it, change `BUNDLE_CODE`
at the top of `sections/earth-and-tonic.liquid`.

## Product ingredient copy

Ingredient names, notes, descriptions, suggested uses and storage are near the
top of the `product` block in `sections/earth-and-tonic.liquid`, keyed by
product handle. The two handles used are:

- `earth-balm-botanical-skin-balm-2oz`
- `moon-balm-lavender-botanical-balm-2-0z`

Any other product falls back to a generic ingredient set.

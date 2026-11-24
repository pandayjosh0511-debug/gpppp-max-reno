# Reno Decks — GPPPP Max Reno

React + TypeScript + Vite client-review website, combining the Reno Decks premium site and historic catalogue.

## Current catalogue

- 19 Timmdek collection/Max extras draft products.
- 84 historical shop entries from the old website.
- 103 total listings; all catalogue prices are **quotation-only** until Max approves current rates.
- Historical price strings retained in `docs/historical-shop-prices.json` for review; these are not active shop prices.
- Timmdek and historic product images are **illustrative SVG previews**; obtain authorised real product photos before commercial release.

## Development

```bash
npm ci
npm run build
npm run dev
```

Build output: `dist/`. Vercel framework: Vite. Build command: `npm run build`; output directory: `dist`.

## Before going live

1. Confirm Max's current product names, selling prices, VAT and stock.
2. Replace illustrations with permitted photos matching the real items.
3. Test cart, quote workflow, contact delivery and mobile navigation.
4. Verify business contact details, project photography and legal notices.
5. Run the production build and test deployed routes.

This repository is a **client review draft**, not a production-approved checkout.

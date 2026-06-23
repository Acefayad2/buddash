# 🌿 BudDash

A DoorDash-style **cannabis delivery** storefront — original code, your brand. Browse local
dispensaries, build a cart, check out, and watch a live order-tracking flow.

> **Demo / MVP.** Uses mock data and no real backend or payments. Built as a frontend
> foundation to iterate on.

## Stack

- **React 18** + **Vite**
- **React Router** for navigation
- Plain CSS (no UI framework) — easy to theme
- Cart state via React Context

## What's in it

- **Age gate** (21+) on first visit
- **Home** — hero search, category filters, dispensary cards, product grid
- **Dispensary page** — per-store menu
- **Cart drawer** — add / remove / change quantity
- **Checkout** — delivery address, ID-verification notice, tip selector, order summary
- **Order tracking** — animated multi-step status with a mini map

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into dist/
npm run preview  # preview the production build
```

## Deploy (Netlify)

`netlify.toml` is already configured: build command `npm run build`, publish dir `dist`,
with an SPA redirect so client-side routes work on reload.

## ⚠️ Before going to production

Cannabis delivery has real legal/operational requirements not handled by this demo:

- **Age & ID verification** — real document verification, not a checkbox
- **State/local licensing** — delivery is only legal in some jurisdictions, often via licensed operators
- **Payments** — most major processors (Stripe, PayPal) prohibit cannabis; you'll need a cannabis-friendly processor
- **Compliance** — Metrc/track-and-trace, purchase limits, tax rules

## Next steps

- Wire products/orders to a real backend (e.g. Supabase)
- Add auth and persistent carts
- Integrate a compliant payment + ID-verification provider

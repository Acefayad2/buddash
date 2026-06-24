# BudDash (Enatega DoorDash-clone template)

This is the **web app from the [Enatega multivendor delivery template](https://github.com/marthaegrimaldi/doordash-clone-app)** (MIT licensed — see `LICENSE`), deployed as the starting point for BudDash.

## ⚠️ Important: it runs on MOCK data

The original template depends on Enatega's backend, which is:
- **Offline** — its public demo server (`enatega-multivendor.up.railway.app`) now returns 404, and
- **Proprietary/paid** for production.

Without a backend the app gets stuck on a loading spinner. So this copy ships with a **local mock backend** so the UI actually renders standalone:

- `src/apollo/index.js` — the Apollo client now serves mock data instead of calling a server.
- `src/apollo/mocks.js` — the mock data (config + sample cannabis "dispensaries"). **Edit this** to change what shows.

## To make it real (edit-after-upload checklist)

1. **Google Maps key** — replace the placeholder `googleApiKey` in `src/apollo/mocks.js` (and ideally hardcode it in `src/config/constants.js`) with your own key, so the maps and address autocomplete work.
2. **Backend** — to get real restaurants/dispensaries, orders, login, and payments, either:
   - buy/host an Enatega backend, or
   - point the Apollo client back at your own GraphQL server (restore `src/apollo/index.js` to an `HttpLink`).
3. **Branding** — logo/header in `src/components/Header`, theme colors in `src/utils/theme.js`.

## Run locally

```bash
npm install --legacy-peer-deps
npm start            # http://localhost:3000
CI=false npm run build
```

## Deploy

`netlify.toml` is configured (Node 20, legacy peer deps, `CI=false`). Uses HashRouter, so no SPA redirect is needed.

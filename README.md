# Next.js template

This is a Next.js template with shadcn/ui.

## Local development

Generate a signing secret (`openssl rand -base64 32`) and set `FLAGS_SECRET` in
`.env.local` before building or starting the app. Use the same secret in every
deployed instance; the Flags SDK needs it to encode and decode precomputed flag
codes, including the variants generated at build time.

For Vercel deployments, add `FLAGS_SECRET` in the project's Settings >
Environment Variables for Production and Preview (if used), then redeploy. Keep
the same value for builds and runtime; `.env.local` is only for local development.

The public URLs are `/`, `/home2`, `/sample-page`, `/product` and `/product/<sku>`. The
proxy rewrites them internally to `/<lang>-<flagCode>/...`; links and
`router.push` should use public URLs. Supported locales are `en`, `sv` and `no`
(see `i18n/locales.ts`). The proxy picks the `NEXT_LOCALE` cookie (set by the
language switcher), then `Accept-Language`, then English.

## Price streaming demo

Product prices simulate a 10-second pricing service, cached with `cacheLife("max")`.
On a cold visit, the static shell appears immediately, then product details and
the price stream in. Later visits to that URL include those details and price in
the cached shell. The existing product lookup adds another 1.5 seconds on a cold
cache; recommendations and delivery estimates remain request-time content.

All supported locale/promo root variants are prerendered, allowing nested SKU
shells to upgrade after a visit. Price lookup is cached by SKU, so switching
locale or promo flags does not repeat the pricing delay. The two home pages share
the same UI: `/` disables product-card prefetching, while `/home2` enables it.
Catalogue and recommendation cards also enable URL-specific prefetching. Visible
prefetch-enabled cards can warm products before the click, while recommendations
and other request-time work wait until navigation.

`TRL-RUN-001` is prerendered at build time. To see a cold price, directly open
`/product/JKT-SHL-002` after a fresh production build, before browsing the catalog
(which can prefetch it). Use the same `FLAGS_SECRET` for build and runtime.

Prefetching requires JavaScript. Disabling it does not clear server caches and also
prevents React's streamed Suspense patches from revealing content normally. Keep
JavaScript enabled when comparing `/` and `/home2`; use a fresh build and an
unvisited SKU to observe a cold price. Both pages share the same server caches.

Run the production regression tests:

```bash
pnpm exec playwright install chromium
pnpm test:e2e
```

Playwright builds and runs two isolated servers: normal production for verifying
shell upgrades, and a test-enabled build for `instant()` navigation checks.
Next.js disables background shell upgrades when that testing API is exposed,
so these checks cannot share one build. See `instant-nav.rig.md`.

New builds, cache expiration, and eviction can make a price cold again. Development
mode does not represent production shell caching.

## Adding components

To add components to your app, run the following command:

```bash
npx shadcn@latest add button
```

This will place the ui components in the `components` directory.

## Using components

To use the components in your app, import them as follows:

```tsx
import { Button } from "@/components/ui/button";
```

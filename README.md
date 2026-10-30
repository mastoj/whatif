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

The public URLs are `/`, `/sample-page`, `/product` and `/product/<sku>`. The
proxy rewrites them internally to `/<lang>-<flagCode>/...`; links and
`router.push` should use public URLs. Supported locales are `en`, `sv` and `no`
(see `i18n/locales.ts`). The proxy picks the `NEXT_LOCALE` cookie (set by the
language switcher), then `Accept-Language`, then English.

## Price streaming demo

Product prices simulate a 10-second pricing service, cached with `cacheLife("max")`.
On a cold visit, a price skeleton appears while the price streams in. Later visits
to the same URL include the price in the cached shell. The existing product lookup
adds another 1.5 seconds on a cold cache; recommendations remain request-time content.

`TRL-RUN-001` is prerendered at build time, so use `/product/JKT-SHL-002` to see a
cold price. Test production caching with a fresh build and server using the same
`FLAGS_SECRET`, before visiting that product:

```bash
BASE_URL=http://localhost:3000 node --test tests/price-cache.test.mjs
```

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

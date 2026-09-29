# Next.js template

This is a Next.js template with shadcn/ui.

## Local development

Generate a signing secret (`openssl rand -base64 32`) and set `FLAGS_SECRET` in
`.env.local` before building or starting the app. Use the same secret in every
deployed instance; the Flags SDK needs it to encode and decode precomputed flag
codes, including the variants generated at build time.

The public URLs are `/` and `/sample-page`. The proxy rewrites them internally
to `/<lang>-<flagCode>/...`; links and `router.push` should use public URLs.
For this example, `NEXT_LOCALE=de` selects German, or the `Accept-Language`
header selects it when no locale cookie is set. English is the default.

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

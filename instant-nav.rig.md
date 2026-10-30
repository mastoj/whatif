# Product shell test rig

- Build/start/test: `pnpm test:e2e`. Playwright owns two fresh production builds
  and servers. Occupied ports fail instead of reusing another app.
- Cache project: port 3100, `NEXT_E2E_TEST=cache`, `.next-e2e-cache` output.
  The testing API is off, because enabling it disables background shell upgrades
  in Next.js 16.4.3 (`app-page-runtime.js`, fallback revalidation).
- Instant project: port 3102, `NEXT_E2E_TEST=1`, `.next-e2e-1` output. This build
  exposes the testing API for `instant()`. Normal builds never expose that API.
- Credentials: public app, no auth. One temporary `FLAGS_SECRET` is shared by the
  build and server unless explicitly supplied in the environment.
- Context: all three locales, promo on/off, sample-message on. Product data is the
  checked-in catalog; no authentication, external API, or mutable product writer.
- HTTP contracts: a cold hard load sends the fallback shell without waiting for
  price. A warm hard load includes price before `</main>`, not in a streamed patch.
  Switching locale/promo reuses the SKU price; recommendations stream every time.
- Browser contracts: the Swedish cold shell commits under `instant()` and content
  streams after release. From `/product`, the real product-card link includes the
  warmed heading/price under lock, but recommendations wait for release. Viewport
  prefetching opts into one URL-specific request per visible card; this demo has
  ten products. Cold prefetch is best-effort; the fallback remains available.
- Loop: edit, `pnpm test:e2e`; each run rebuilds and stops its own server. Install
  Chromium once with `pnpm exec playwright install chromium`.
- Drift: development bypasses production shell caching. Keep the two projects
  separate; don't enable the testing API in the cache project or real deployment.
- Liveness: fresh local build/start; no remote artifact.
- Known unrelated failures: three existing React-hooks lint errors.
- Differential: removing the root-variant list, SKU-only price lookup, and product
  card prefetch produced seven failures; restoring them passes the full suite.

import assert from "node:assert/strict"
import { test } from "@playwright/test"

async function readProduct(baseURL: string, locale: string, promo: boolean) {
  const start = performance.now()
  const response = await fetch(`${baseURL}/product/DEMO-CACHE-007`, {
    headers: {
      "Accept-Language": locale,
      Cookie: `show-promo-banner=${promo ? "1" : "0"}`,
    },
    signal: AbortSignal.timeout(30_000),
  })
  assert.equal(response.status, 200)
  const decoder = new TextDecoder()
  let html = ""
  let shellAt: number | undefined
  let priceAt: number | undefined
  let recommendationsAt: number | undefined
  assert.ok(response.body)
  const reader = response.body.getReader()
  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    html += decoder.decode(value, { stream: true })
    if (html.includes("</main>")) shellAt ??= performance.now() - start
    if (html.includes('data-testid="product-price"')) {
      priceAt ??= performance.now() - start
    }
    if (html.includes('data-testid="recommendations"')) {
      recommendationsAt ??= performance.now() - start
    }
  }
  assert.ok(shellAt !== undefined, "The static shell must render")
  assert.ok(priceAt !== undefined, "Product price must render")
  assert.ok(recommendationsAt !== undefined, "Recommendations must stream in")
  return { html, shellAt, priceAt, recommendationsAt }
}

// A synthetic SKU is cold even if its underlying catalog product was prerendered.
for (const locale of ["en", "sv", "no"]) {
  for (const promo of [false, true]) {
    test(`${locale}, promo=${promo}: immediate shell upgrades after a visit`, async ({
      baseURL,
    }) => {
      assert.ok(baseURL)
      const cold = await readProduct(baseURL, locale, promo)
      assert.ok(
        cold.html.includes(`<html lang="${locale}"`),
        "Locale must be preserved"
      )
      assert.equal(cold.html.includes('data-testid="promo-banner"'), promo)
      assert.ok(
        cold.shellAt < 2_000,
        "Cold shell must not wait for product or price"
      )
      if (locale === "en" && !promo) {
        assert.ok(
          cold.priceAt >= 10_000,
          "Cold pricing service must wait 10 seconds"
        )
      } else {
        assert.ok(
          cold.priceAt < 2_000,
          "Changing locale/flags must not repeat the pricing delay"
        )
      }

      const warm = await readProduct(baseURL, locale, promo)
      assert.ok(warm.priceAt < 2_000, "Warm price must arrive without delay")
      assert.ok(
        warm.html.indexOf('data-testid="product-price"') <
          warm.html.indexOf("</main>"),
        "Warm price must be in the initial shell, not a later streamed chunk"
      )
      assert.ok(
        warm.html.indexOf('data-testid="recommendations"') >
          warm.html.indexOf("</main>"),
        "Recommendations must remain outside the cached shell"
      )
      assert.ok(
        warm.recommendationsAt >= 1_000,
        "Recommendations must run on every request"
      )
      console.log(
        `${locale}/promo=${promo}: shell ${Math.round(cold.shellAt)}ms, cold price ${Math.round(cold.priceAt)}ms, warm price ${Math.round(warm.priceAt)}ms`
      )
    })
  }
}

import assert from "node:assert/strict"
import test from "node:test"

// Run against a fresh production build/server, before visiting this SKU.
// BASE_URL=http://localhost:3000 node --test tests/price-cache.test.mjs
const baseUrl = process.env.BASE_URL ?? "http://localhost:3000"

async function readProduct() {
  const start = performance.now()
  const response = await fetch(`${baseUrl}/product/JKT-SHL-002`, {
    headers: { "Accept-Language": "en" },
  })
  assert.equal(response.status, 200)
  const decoder = new TextDecoder()
  let html = ""
  let priceAt
  let fallbackAt
  for await (const chunk of response.body) {
    html += decoder.decode(chunk, { stream: true })
    if (html.includes('aria-label="Loading price"')) {
      fallbackAt ??= performance.now() - start
    }
    if (html.includes('class="text-2xl font-semibold"')) {
      priceAt ??= performance.now() - start
    }
  }
  assert.ok(priceAt !== undefined, "Product price must render")
  return { html, priceAt, fallbackAt }
}

test("cold price streams after 10s; warm price is in the cached shell", async (t) => {
  const cold = await readProduct()
  assert.ok(cold.fallbackAt < 5_000, "Price skeleton should arrive first")
  assert.ok(cold.priceAt >= 10_000, "Cold price should wait 10 seconds")

  const warm = await readProduct()
  t.diagnostic(
    `Price arrival: cold ${Math.round(cold.priceAt)}ms, warm ${Math.round(warm.priceAt)}ms`
  )
  assert.ok(warm.priceAt < 2_000, "Warm price should arrive without the delay")
  assert.ok(
    warm.html.indexOf('class="text-2xl font-semibold"') <
      warm.html.indexOf("</main>"),
    "Warm price must be inside the initial shell, not a later streamed chunk"
  )
})

import assert from "node:assert/strict"
import test from "node:test"
import { getProduct, products } from "../lib/products.ts"

test("known SKUs keep their original products", () => {
  for (const product of products) {
    assert.equal(getProduct(product.sku), product)
  }
})

test("unknown SKUs use their hash modulo the catalog size", () => {
  assert.deepEqual(getProduct("A"), {
    ...products[65 % products.length],
    sku: "A",
  })
  assert.deepEqual(getProduct("B"), {
    ...products[66 % products.length],
    sku: "B",
  })
})

test("collisions retain distinct requested SKUs without mutating the catalog", () => {
  const index = 65 % products.length
  const collision = String.fromCharCode(65 + products.length)
  const originalSku = products[index].sku
  assert.deepEqual(getProduct(collision), {
    ...getProduct("A"),
    sku: collision,
  })
  assert.equal(getProduct("A").sku, "A")
  assert.equal(products[index].sku, originalSku)
})

test("long and Unicode SKUs map deterministically to valid products", () => {
  for (const sku of ["", "0", "DEMO-123", "商品-🧪", "z".repeat(10_000)]) {
    const product = getProduct(sku)
    assert.equal(product.sku, sku)
    assert.deepEqual(getProduct(sku), product)
    assert.ok(products.some((p) => p.name === product.name))
  }
})

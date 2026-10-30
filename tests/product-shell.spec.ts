import { expect, test } from "@playwright/test"
import { instant } from "@next/playwright"

test.use({
  locale: "sv-SE",
})

test("cold Swedish product has an instant shell and streams its content", async ({
  page,
  baseURL,
}, testInfo) => {
  // This route is not listed in generateStaticParams.
  await instant(
    page,
    async () => {
      await page.goto("/product/JKT-SHL-002")
      await expect(page.getByRole("banner")).toBeVisible()
      await expect(page.locator("main")).toBeVisible()
      await expect(page.locator("main h1")).toHaveCount(0)
      await page.screenshot({ path: testInfo.outputPath("cold-shell.png") })
    },
    { baseURL }
  )
  await expect(
    page.getByRole("heading", { name: "Stormline 3L Shell Jacket" })
  ).toBeVisible()
  await expect(page.getByTestId("product-price")).toBeVisible({
    timeout: 20_000,
  })
  await expect(
    page.getByTestId("recommendations").getByRole("link")
  ).toHaveCount(3)
})

test("mobile product preserves promo, delivery, and missing-SKU behavior", async ({
  page,
  context,
  baseURL,
}) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await context.addCookies([
    { name: "show-promo-banner", value: "1", url: baseURL! },
    { name: "show-delivery-estimate", value: "1", url: baseURL! },
  ])
  await page.goto("/product/TRL-RUN-001")
  await expect(
    page.getByRole("heading", { name: "Trailblazer GTX Running Shoe" })
  ).toBeVisible()
  await expect(page.getByTestId("product-price")).toBeVisible()
  await expect(
    page.getByText("Fri frakt på alla beställningar denna vecka!")
  ).toBeVisible()
  await expect(page.getByText(/Beställ inom/)).toBeVisible()
  await page.goto("/product/not-a-real-sku")
  await expect(page.getByText("This page could not be found.")).toBeVisible()
})

test("a catalog link shows the warmed product in its instant shell", async ({
  page,
}, testInfo) => {
  await (await page.request.get("/product/JKT-SHL-002")).body()
  await page.goto("/product")
  await instant(page, async () => {
    await page.getByRole("link", { name: /Stormline 3L Shell Jacket/ }).click()
    await expect(
      page.getByRole("heading", { name: "Stormline 3L Shell Jacket" })
    ).toBeVisible()
    await expect(page.getByTestId("product-price")).toBeVisible()
    await expect(page.getByTestId("recommendations")).toHaveCount(0)
    await page.screenshot({ path: testInfo.outputPath("warm-shell.png") })
  })
  await expect(
    page.getByTestId("recommendations").getByRole("link")
  ).toHaveCount(3)
})

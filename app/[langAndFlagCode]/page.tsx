import Link from "next/link"
import { langAndFlagCode } from "next/root-params"
import { connection } from "next/server"
import { getTranslations } from "next-intl/server"
import { Suspense } from "react"

import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { products } from "@/lib/products"

async function getLocale() {
  const token = await langAndFlagCode()
  return token.slice(0, token.indexOf("-"))
}

async function FeaturedCarousel() {
  await connection()
  // Simulate a slow merchandising service
  await new Promise((resolve) => setTimeout(resolve, 800))
  const locale = await getLocale()
  const featured = products
    .map((p) => ({ p, r: Math.random() }))
    .sort((a, b) => a.r - b.r)
    .map(({ p }) => p)

  return (
    <ul className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2">
      {featured.map((p) => (
        <li key={p.sku} className="shrink-0 snap-start">
          <ProductCard product={p} locale={locale} className="h-full w-56" />
        </li>
      ))}
    </ul>
  )
}

function CarouselSkeleton() {
  return (
    <ul className="flex gap-4 overflow-hidden pb-2">
      {[0, 1, 2, 3, 4].map((i) => (
        <li
          key={i}
          className="h-24 w-56 shrink-0 animate-pulse rounded-lg bg-muted"
        />
      ))}
    </ul>
  )
}

export default async function Page() {
  const t = await getTranslations("Home")

  return (
    <div className="flex min-h-svh flex-col gap-8 p-6">
      <div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
        <div>
          <h1 className="font-medium">{t("title")}</h1>
          <p>{t("description")}</p>
          <div className="mt-2 flex gap-2">
            <Button render={<Link href="/sample-page" />}>
              {t("sampleLink")}
            </Button>
            <Button variant="outline" render={<Link href="/product" />}>
              {t("productsLink")}
            </Button>
          </div>
        </div>
        <div className="font-mono text-xs text-muted-foreground">
          (Press <kbd>d</kbd> to toggle dark mode)
        </div>
      </div>

      <section className="min-w-0 text-sm">
        <h2 className="mb-4 text-lg font-medium">{t("featured")}</h2>
        <Suspense fallback={<CarouselSkeleton />}>
          <FeaturedCarousel />
        </Suspense>
      </section>
    </div>
  )
}

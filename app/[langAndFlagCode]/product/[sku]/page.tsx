import { getPrecomputed } from "flags/next"
import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { langAndFlagCode } from "next/root-params"
import { connection } from "next/server"
import { getFormatter, getTranslations } from "next-intl/server"
import { Suspense } from "react"

import { Button } from "@/components/ui/button"
import { precomputeFlags, showDeliveryEstimate, showPromoBanner } from "@/flags"
import { getProduct, products, type Product } from "@/lib/products"
import { FlagToggles } from "./flag-toggles"

type Props = PageProps<"/[langAndFlagCode]/product/[sku]">

async function getLocale() {
  const token = await langAndFlagCode()
  return token.slice(0, token.indexOf("-"))
}

async function getFlagCode() {
  const token = await langAndFlagCode()
  return token.slice(token.indexOf("-") + 1)
}

async function getPromoFlag(flagCode: string) {
  "use cache"
  return getPrecomputed(showPromoBanner, precomputeFlags, flagCode)
}

export function generateStaticParams() {
  return products.map((p) => ({ sku: p.sku }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { sku } = await params
  const product = getProduct(sku)
  if (!product) return {}
  return {
    title: `${product.name} | ${product.brand}`,
    description: product.description,
  }
}

async function Price({ product }: { product: Product }) {
  const locale = await getLocale()
  const format = await getFormatter({ locale })
  const t = await getTranslations({ locale, namespace: "Product" })
  const money = (value: number) =>
    format.number(value, { style: "currency", currency: "EUR" })

  return (
    <div className="flex items-baseline gap-3">
      <span className="text-2xl font-semibold">{money(product.price)}</span>
      {product.compareAtPrice && (
        <>
          <s className="text-muted-foreground">
            {money(product.compareAtPrice)}
          </s>
          <span className="rounded bg-red-600 px-2 py-0.5 text-xs text-white">
            {t("save", {
              percent: Math.round(
                (1 - product.price / product.compareAtPrice) * 100
              ),
            })}
          </span>
        </>
      )}
    </div>
  )
}

async function ProductDetails({ params }: Pick<Props, "params">) {
  const { sku } = await params
  const product = getProduct(sku)
  if (!product) notFound()
  const locale = await getLocale()
  const t = await getTranslations({ locale, namespace: "Product" })

  return (
    <>
      <nav className="text-muted-foreground">
        <Link href="/" className="hover:underline">
          {t("home")}
        </Link>{" "}
        / {product.category} /{" "}
        <span className="text-foreground">{product.name}</span>
      </nav>

      <section className="grid gap-8 md:grid-cols-2">
        <div className="flex aspect-square items-center justify-center rounded-lg bg-muted text-muted-foreground">
          {product.name}
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <p className="tracking-wide text-muted-foreground uppercase">
              {product.brand}
            </p>
            <h1 className="text-2xl font-medium">{product.name}</h1>
            <p className="text-muted-foreground">
              {"★".repeat(Math.round(product.rating))}
              {"☆".repeat(5 - Math.round(product.rating))} {product.rating} ·{" "}
              {t("reviews", { count: product.reviewCount })}
            </p>
            <p className="font-mono text-xs text-muted-foreground">
              SKU: {product.sku}
            </p>
          </div>

          <Price product={product} />

          <p>{product.description}</p>

          <div>
            <h2 className="font-medium">{t("color")}</h2>
            <div className="mt-1 flex flex-wrap gap-2">
              {product.colors.map((c) => (
                <span key={c} className="rounded border px-3 py-1">
                  {c}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-medium">{t("size")}</h2>
            <div className="mt-1 flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <span key={s} className="rounded border px-3 py-1">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <p
            className={
              product.stock < 10 ? "text-orange-600" : "text-green-600"
            }
          >
            {product.stock < 10
              ? t("lowStock", { count: product.stock })
              : t("inStock")}
          </p>

          <Suspense fallback={null}>
            <DeliveryEstimate />
          </Suspense>

          <Button size="lg">{t("addToCart")}</Button>
        </div>
      </section>

      <section className="grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="mb-2 text-lg font-medium">{t("highlights")}</h2>
          <ul className="list-disc pl-5">
            {product.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="mb-2 text-lg font-medium">{t("specifications")}</h2>
          <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1">
            {Object.entries(product.specs).map(([key, value]) => (
              <div key={key} className="contents">
                <dt className="text-muted-foreground">{key}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  )
}

async function Recommendations({ params }: Pick<Props, "params">) {
  await connection()
  const { sku } = await params
  // Simulate a slow recommendation service
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const picks = products
    .filter((p) => p.sku !== sku)
    .map((p) => ({ p, r: Math.random() }))
    .sort((a, b) => a.r - b.r)
    .slice(0, 3)
    .map(({ p }) => p)
  const format = await getFormatter({ locale: await getLocale() })

  return (
    <ul className="grid gap-4 sm:grid-cols-3">
      {picks.map((p) => (
        <li key={p.sku}>
          <Link
            href={`/product/${p.sku}`}
            className="flex flex-col gap-1 rounded-lg border p-4 hover:bg-muted"
          >
            <span className="text-xs text-muted-foreground uppercase">
              {p.brand}
            </span>
            <span className="font-medium">{p.name}</span>
            <span>
              {format.number(p.price, { style: "currency", currency: "EUR" })}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}

async function PromoBanner() {
  const enabled = await getPromoFlag(await getFlagCode())
  if (!enabled) return null
  const t = await getTranslations({
    locale: await getLocale(),
    namespace: "Product",
  })
  return (
    <div className="rounded-lg bg-primary px-4 py-2 text-center text-primary-foreground">
      {t("promoBanner")}
    </div>
  )
}

// Evaluated per request, so it must stay inside a Suspense boundary
async function DeliveryEstimate() {
  if (!(await showDeliveryEstimate())) return null
  const t = await getTranslations({
    locale: await getLocale(),
    namespace: "Product",
  })
  const now = new Date()
  const cutoff = new Date(now)
  cutoff.setHours(14, 0, 0, 0)
  if (cutoff <= now) cutoff.setDate(cutoff.getDate() + 1)
  const minutesLeft = Math.floor((cutoff.getTime() - now.getTime()) / 60000)
  return (
    <p className="rounded border px-3 py-2">
      {t("deliveryEstimate", {
        hours: Math.floor(minutesLeft / 60),
        minutes: minutesLeft % 60,
      })}
    </p>
  )
}

async function Toggles() {
  const [promo, delivery] = await Promise.all([
    getPromoFlag(await getFlagCode()),
    showDeliveryEstimate(),
  ])
  return (
    <FlagToggles
      flags={[
        { key: showPromoBanner.key, label: "precomputed", enabled: promo },
        { key: showDeliveryEstimate.key, label: "dynamic", enabled: delivery },
      ]}
    />
  )
}

function RecommendationsSkeleton() {
  return (
    <ul className="grid gap-4 sm:grid-cols-3">
      {[0, 1, 2].map((i) => (
        <li key={i} className="h-24 animate-pulse rounded-lg bg-muted" />
      ))}
    </ul>
  )
}

export default async function ProductPage({ params }: Props) {
  const locale = await getLocale()
  const t = await getTranslations({ locale, namespace: "Product" })

  return (
    <main className="mx-auto flex min-h-svh max-w-5xl flex-col gap-10 p-6 text-sm">
      <Suspense fallback={null}>
        <Toggles />
      </Suspense>

      <PromoBanner />

      <Suspense
        fallback={<div className="h-96 animate-pulse rounded-lg bg-muted" />}
      >
        <ProductDetails params={params} />
      </Suspense>

      <section>
        <h2 className="mb-4 text-lg font-medium">{t("recommendations")}</h2>
        <Suspense fallback={<RecommendationsSkeleton />}>
          <Recommendations params={params} />
        </Suspense>
      </section>
    </main>
  )
}

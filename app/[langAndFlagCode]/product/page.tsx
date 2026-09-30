import type { Metadata } from "next"
import Link from "next/link"
import { langAndFlagCode } from "next/root-params"
import { getTranslations } from "next-intl/server"

import { ProductCard } from "@/components/product-card"
import { products } from "@/lib/products"

async function getLocale() {
  const token = await langAndFlagCode()
  return token.slice(0, token.indexOf("-"))
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({
    locale: await getLocale(),
    namespace: "Product",
  })
  return { title: t("allProducts") }
}

export default async function ProductsPage() {
  const locale = await getLocale()
  const t = await getTranslations({ locale, namespace: "Product" })

  return (
    <main className="mx-auto flex min-h-svh max-w-5xl flex-col gap-6 p-6 text-sm">
      <nav className="text-muted-foreground">
        <Link href="/" className="hover:underline">
          {t("home")}
        </Link>{" "}
        / <span className="text-foreground">{t("allProducts")}</span>
      </nav>
      <h1 className="text-2xl font-medium">{t("allProducts")}</h1>
      <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {products.map((p) => (
          <li key={p.sku}>
            <ProductCard product={p} locale={locale} className="h-full" />
          </li>
        ))}
      </ul>
    </main>
  )
}

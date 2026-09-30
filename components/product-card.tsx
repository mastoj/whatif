import Link from "next/link"
import { getFormatter } from "next-intl/server"

import type { Product } from "@/lib/products"
import { cn } from "@/lib/utils"

export async function ProductCard({
  product,
  locale,
  className,
}: {
  product: Product
  locale: string
  className?: string
}) {
  const format = await getFormatter({ locale })

  return (
    <Link
      href={`/product/${product.sku}`}
      className={cn(
        "flex flex-col gap-1 rounded-lg border p-4 hover:bg-muted",
        className
      )}
    >
      <span className="text-xs text-muted-foreground uppercase">
        {product.brand}
      </span>
      <span className="font-medium">{product.name}</span>
      <span>
        {format.number(product.price, { style: "currency", currency: "EUR" })}
      </span>
    </Link>
  )
}

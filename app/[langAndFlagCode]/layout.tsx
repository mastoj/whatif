import { Inter, Geist_Mono } from "next/font/google"
import { serialize } from "flags/next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { langAndFlagCode } from "next/root-params"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations } from "next-intl/server"

import "../globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LocaleSwitcher } from "@/components/locale-switcher"
import { precomputeFlags } from "@/flags"
import { defaultLocale, isLocale } from "@/i18n/locales"
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const fontMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" })

// Cache Components needs one value; every other locale/flag combination is rendered on first visit and cached
export async function generateStaticParams() {
  const flagCode = await serialize(
    precomputeFlags,
    precomputeFlags.map(() => false)
  )
  return [{ langAndFlagCode: `${defaultLocale}-${flagCode}` }]
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const token = await langAndFlagCode()
  const [locale, flagCode] = token.split("-")
  if (!(isLocale(locale) && flagCode)) notFound()

  const messages = await getMessages()
  const t = await getTranslations({ locale, namespace: "Product" })

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        inter.variable
      )}
    >
      <body>
        <ThemeProvider>
          <NextIntlClientProvider messages={messages}>
            <header className="flex items-center justify-between border-b px-6 py-3 text-sm">
              <nav className="flex gap-4">
                <Link href="/" className="font-medium">
                  whatif
                </Link>
                <Link
                  href="/product"
                  className="text-muted-foreground hover:text-foreground"
                >
                  {t("allProducts")}
                </Link>
              </nav>
              <LocaleSwitcher locale={locale} />
            </header>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

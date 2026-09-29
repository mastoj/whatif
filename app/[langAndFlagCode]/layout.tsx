import { Inter, Geist_Mono } from "next/font/google"
import { notFound } from "next/navigation"
import { langAndFlagCode } from "next/root-params"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"

import "../globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const fontMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" })

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const token = await langAndFlagCode()
  const [locale, flagCode] = token.split("-")
  if (!(["en", "de"].includes(locale) && flagCode)) notFound()

  const messages = await getMessages()

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
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

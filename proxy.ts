import { precompute } from "flags/next"
import { type NextRequest, NextResponse } from "next/server"

import { precomputeFlags } from "./flags"
import { defaultLocale, isLocale, localeCookie, locales } from "./i18n/locales"

const internalPathPattern = new RegExp(`^/(?:${locales.join("|")})-[^/]+(/.*)?$`)

export async function proxy(request: NextRequest) {
  const internalPath = request.nextUrl.pathname.match(internalPathPattern)
  if (internalPath) {
    const url = request.nextUrl.clone()
    url.pathname = internalPath[1] || "/"
    return NextResponse.redirect(url)
  }

  const cookieLocale = request.cookies.get(localeCookie)?.value
  const headerLocale = request.headers
    .get("accept-language")
    ?.split(",")
    .map((l) => l.split(/[-;]/)[0].trim())
    .map((l) => (l === "nb" || l === "nn" ? "no" : l))
    .find(isLocale)
  const locale = isLocale(cookieLocale)
    ? cookieLocale
    : (headerLocale ?? defaultLocale)
  const code = await precompute(precomputeFlags)
  const url = request.nextUrl.clone()
  url.pathname = `/${locale}-${code}${url.pathname === "/" ? "" : url.pathname}`

  return NextResponse.rewrite(url, { request })
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
}
import { precompute } from "flags/next"
import { type NextRequest, NextResponse } from "next/server"

import { precomputeFlags } from "./flags"

export async function proxy(request: NextRequest) {
  const internalPath = request.nextUrl.pathname.match(/^\/(?:en|de)-[^/]+(\/.*)?$/)
  if (internalPath) {
    const url = request.nextUrl.clone()
    url.pathname = internalPath[1] || "/"
    return NextResponse.redirect(url)
  }

  const language = request.cookies.get("NEXT_LOCALE")?.value
  const preferredLanguage = request.headers.get("accept-language")?.split(",")[0]
  const locale = language === "de" || (language !== "en" && preferredLanguage?.startsWith("de")) ? "de" : "en"
  const code = await precompute(precomputeFlags)
  const url = request.nextUrl.clone()
  url.pathname = `/${locale}-${code}${url.pathname === "/" ? "" : url.pathname}`

  return NextResponse.rewrite(url, { request })
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
}
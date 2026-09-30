import { type NextRequest, NextResponse } from "next/server"

import { isLocale, localeCookie } from "@/i18n/locales"

export async function POST(request: NextRequest) {
  const form = await request.formData()
  const locale = form.get("locale")?.toString()

  // Only redirect back to a path on this origin
  const referer = request.headers.get("referer")
  const back = referer ? new URL(referer) : null
  const target = new URL(
    back && back.origin === request.nextUrl.origin
      ? back.pathname + back.search
      : "/",
    request.nextUrl.origin
  )

  const response = NextResponse.redirect(target, 303)
  if (isLocale(locale)) {
    response.cookies.set(localeCookie, locale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    })
  }
  return response
}

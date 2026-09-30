import { langAndFlagCode } from "next/root-params"
import { getRequestConfig } from "next-intl/server"

import { defaultLocale, isLocale } from "./locales"

export default getRequestConfig(async () => {
  const token = await langAndFlagCode()
  const requested = token?.split("-")[0]
  const locale = isLocale(requested) ? requested : defaultLocale

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  }
})
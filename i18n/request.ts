import { langAndFlagCode } from "next/root-params"
import { getRequestConfig } from "next-intl/server"

export default getRequestConfig(async () => {
  const token = await langAndFlagCode()
  const locale = token?.split("-")[0] === "de" ? "de" : "en"

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  }
})
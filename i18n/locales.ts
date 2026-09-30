export const locales = ["en", "sv", "no"] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = "en"
export const localeCookie = "NEXT_LOCALE"

export const localeNames: Record<Locale, string> = {
  en: "English",
  sv: "Svenska",
  no: "Norsk",
}

export function isLocale(value: string | undefined): value is Locale {
  return locales.includes(value as Locale)
}

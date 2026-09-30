import { type Locale, localeNames, locales } from "@/i18n/locales"
import { cn } from "@/lib/utils"

export function LocaleSwitcher({ locale }: { locale: Locale }) {
  return (
    <form
      action="/api/locale"
      method="post"
      aria-label="Language"
      className="flex rounded-lg border p-0.5 text-xs"
    >
      {locales.map((l) => (
        <button
          key={l}
          type="submit"
          name="locale"
          value={l}
          title={localeNames[l]}
          aria-pressed={l === locale}
          disabled={l === locale}
          className={cn(
            "cursor-pointer rounded-md px-2 py-1 uppercase disabled:cursor-default",
            l === locale
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {l}
        </button>
      ))}
    </form>
  )
}

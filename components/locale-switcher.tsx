"use client"

import { type Locale, localeCookie, localeNames, locales } from "@/i18n/locales"
import { cn } from "@/lib/utils"

export function LocaleSwitcher({ locale }: { locale: Locale }) {
  function select(next: Locale) {
    document.cookie = `${localeCookie}=${next}; path=/; max-age=31536000; samesite=lax`
    // Full reload so the proxy rewrites to the new locale's root layout
    window.location.reload()
  }

  return (
    <div
      role="group"
      aria-label="Language"
      className="flex rounded-lg border p-0.5 text-xs"
    >
      {locales.map((l) => (
        <button
          key={l}
          type="button"
          title={localeNames[l]}
          aria-pressed={l === locale}
          disabled={l === locale}
          onClick={() => select(l)}
          className={cn(
            "rounded-md px-2 py-1 uppercase",
            l === locale
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {l}
        </button>
      ))}
    </div>
  )
}

"use client"

import { useRouter } from "next/navigation"

export function FlagToggles({
  flags,
}: {
  flags: { key: string; label: string; enabled: boolean }[]
}) {
  const router = useRouter()

  function toggle(key: string, enabled: boolean) {
    document.cookie = `${key}=${enabled ? "1" : "0"}; path=/; max-age=31536000; samesite=lax`
    router.refresh()
  }

  return (
    <fieldset className="flex flex-wrap gap-4 rounded-lg border border-dashed p-3 text-xs">
      <legend className="px-1 font-mono">flags</legend>
      {flags.map((f) => (
        <label key={f.key} className="flex items-center gap-2">
          <input
            type="checkbox"
            defaultChecked={f.enabled}
            onChange={(e) => toggle(f.key, e.target.checked)}
          />
          <span className="font-mono">{f.key}</span>
          <span className="text-muted-foreground">({f.label})</span>
        </label>
      ))}
    </fieldset>
  )
}

import { getPrecomputed } from "flags/next"
import type { Metadata } from "next"
import { langAndFlagCode } from "next/root-params"
import { getTranslations } from "next-intl/server"

import { precomputeFlags, showSampleMessage } from "@/flags"
import { SampleNavigation } from "./sample-navigation"

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Sample")
  return { title: t("title"), description: t("description") }
}

export default async function SamplePage() {
  const token = await langAndFlagCode()
  const [locale, flagCode] = token.split("-")
  const enabled = await getPrecomputed(
    showSampleMessage,
    precomputeFlags,
    flagCode
  )
  const t = await getTranslations("Sample")

  return (
    <main className="flex min-h-svh flex-col gap-4 p-6 text-sm">
      <h1 className="text-xl font-medium">{t("title")}</h1>
      <p>{t("description")}</p>
      <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
        <dt>Locale</dt>
        <dd>{locale}</dd>
        <dt>Flag code</dt>
        <dd className="font-mono">{flagCode}</dd>
        <dt>Sample flag</dt>
        <dd>{enabled ? t("enabled") : t("disabled")}</dd>
      </dl>
      <SampleNavigation label={t("back")} />
    </main>
  )
}

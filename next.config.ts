import type { NextConfig } from "next"
import createNextIntlPlugin from "next-intl/plugin"

const nextConfig: NextConfig = {
  distDir: process.env.NEXT_E2E_TEST
    ? `.next-e2e-${process.env.NEXT_E2E_TEST}`
    : ".next",
  cacheComponents: true,
  partialPrefetching: true,
  experimental: {
    exposeTestingApiInProductionBuild: process.env.NEXT_E2E_TEST === "1",
  },
}

export default createNextIntlPlugin()(nextConfig)

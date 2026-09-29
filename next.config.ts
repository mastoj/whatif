import type { NextConfig } from "next"
import createNextIntlPlugin from "next-intl/plugin"

const nextConfig: NextConfig = { cacheComponents: true }

export default createNextIntlPlugin()(nextConfig)

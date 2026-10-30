import { randomBytes } from "node:crypto"
import { defineConfig } from "@playwright/test"

const flagsSecret =
  process.env.FLAGS_SECRET ?? randomBytes(32).toString("base64")

export default defineConfig({
  testDir: "./tests",
  testMatch: "**/*.spec.ts",
  workers: 1,
  timeout: 60_000,
  use: { trace: "retain-on-failure" },
  projects: [
    {
      name: "cache",
      testMatch: "price-cache.spec.ts",
      use: { baseURL: "http://localhost:3100" },
    },
    {
      name: "instant",
      testMatch: "product-shell.spec.ts",
      use: { baseURL: "http://localhost:3102" },
    },
  ],
  webServer: [
    {
      command: "pnpm build && pnpm start --port 3100",
      url: "http://localhost:3100/product",
      reuseExistingServer: false,
      timeout: 120_000,
      env: { NEXT_E2E_TEST: "cache", FLAGS_SECRET: flagsSecret },
    },
    {
      command: "pnpm build && pnpm start --port 3102",
      url: "http://localhost:3102/product",
      reuseExistingServer: false,
      timeout: 120_000,
      env: { NEXT_E2E_TEST: "1", FLAGS_SECRET: flagsSecret },
    },
  ],
})

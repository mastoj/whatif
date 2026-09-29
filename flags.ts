import { flag } from "flags/next"

export const showSampleMessage = flag({
  key: "show-sample-message",
  decide: () => true,
})

export const precomputeFlags = [showSampleMessage] as const
import { flag } from "flags/next"

export const showSampleMessage = flag({
  key: "show-sample-message",
  decide: () => true,
})

// Toggled via cookies set by the FlagToggles component on the product page
export const showPromoBanner = flag<boolean>({
  key: "show-promo-banner",
  options: [false, true],
  decide: ({ cookies }) => cookies.get("show-promo-banner")?.value === "1",
})

export const showDeliveryEstimate = flag<boolean>({
  key: "show-delivery-estimate",
  options: [false, true],
  decide: ({ cookies }) =>
    cookies.get("show-delivery-estimate")?.value === "1",
})

export const precomputeFlags = [showSampleMessage, showPromoBanner] as const
export type Product = {
  sku: string
  name: string
  brand: string
  category: string
  price: number
  compareAtPrice?: number
  rating: number
  reviewCount: number
  stock: number
  description: string
  highlights: string[]
  specs: Record<string, string>
  colors: string[]
  sizes: string[]
}

export const products: Product[] = [
  {
    sku: "TRL-RUN-001",
    name: "Trailblazer GTX Running Shoe",
    brand: "Northpeak",
    category: "Footwear",
    price: 149.95,
    compareAtPrice: 179.95,
    rating: 4.6,
    reviewCount: 1284,
    stock: 23,
    description:
      "A waterproof trail running shoe built for technical terrain. The aggressive lug pattern grips mud and rock, while the responsive foam midsole keeps you fresh over long distances.",
    highlights: [
      "Waterproof, breathable membrane",
      "4 mm lugs for grip on loose terrain",
      "Rock plate protects against sharp stones",
      "8 mm heel-to-toe drop",
    ],
    specs: {
      Weight: "310 g (US 9)",
      Upper: "Recycled mesh with TPU overlays",
      Midsole: "EVA foam",
      Outsole: "Sticky rubber compound",
      Drop: "8 mm",
    },
    colors: ["Black", "Forest", "Slate"],
    sizes: ["40", "41", "42", "43", "44", "45", "46"],
  },
  {
    sku: "JKT-SHL-002",
    name: "Stormline 3L Shell Jacket",
    brand: "Northpeak",
    category: "Outerwear",
    price: 329,
    rating: 4.8,
    reviewCount: 642,
    stock: 8,
    description:
      "A three-layer hardshell for alpine days and stormy commutes. Fully taped seams and a helmet-compatible hood keep the weather out.",
    highlights: [
      "20,000 mm waterproof rating",
      "Pit zips for ventilation",
      "Helmet-compatible hood",
      "Packs into its own chest pocket",
    ],
    specs: {
      Weight: "420 g",
      Fabric: "3-layer recycled nylon",
      Waterproofing: "20,000 mm",
      Breathability: "20,000 g/m²/24h",
      Fit: "Regular",
    },
    colors: ["Red", "Navy", "Black"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  },
  {
    sku: "BPK-DAY-003",
    name: "Summit 28L Daypack",
    brand: "Ridgeway",
    category: "Bags",
    price: 119,
    compareAtPrice: 139,
    rating: 4.5,
    reviewCount: 918,
    stock: 41,
    description:
      "A versatile daypack with a ventilated back panel, hydration sleeve and plenty of organization for full days on the trail.",
    highlights: [
      "Ventilated trampoline back panel",
      "Hydration sleeve up to 3 L",
      "Integrated rain cover",
      "Trekking pole attachments",
    ],
    specs: {
      Volume: "28 L",
      Weight: "1.1 kg",
      Material: "210D ripstop nylon",
      Dimensions: "52 × 30 × 22 cm",
    },
    colors: ["Grey", "Olive"],
    sizes: ["One size"],
  },
  {
    sku: "TNT-2P-004",
    name: "Horizon 2P Ultralight Tent",
    brand: "Ridgeway",
    category: "Camping",
    price: 449,
    rating: 4.7,
    reviewCount: 311,
    stock: 5,
    description:
      "A freestanding two-person tent that weighs under 1.5 kg. Two doors and two vestibules mean nobody has to climb over anyone at 3 a.m.",
    highlights: [
      "Freestanding design",
      "Two doors, two vestibules",
      "Color-coded quick pitch",
      "Includes footprint",
    ],
    specs: {
      Capacity: "2 people",
      "Packed weight": "1.45 kg",
      "Floor area": "2.7 m²",
      "Peak height": "102 cm",
      Poles: "DAC aluminium",
    },
    colors: ["Sand"],
    sizes: ["2P"],
  },
  {
    sku: "BTL-INS-005",
    name: "Thermo Steel Bottle 750 ml",
    brand: "Kettle & Co",
    category: "Accessories",
    price: 34.95,
    rating: 4.4,
    reviewCount: 2210,
    stock: 120,
    description:
      "Double-walled stainless steel bottle that keeps drinks cold for 24 hours or hot for 12.",
    highlights: [
      "24 h cold / 12 h hot",
      "Leak-proof lid",
      "Dishwasher safe",
      "BPA free",
    ],
    specs: {
      Capacity: "750 ml",
      Weight: "380 g",
      Material: "18/8 stainless steel",
    },
    colors: ["Steel", "Black", "Sky"],
    sizes: ["750 ml"],
  },
  {
    sku: "HDL-LMP-006",
    name: "Beam 400 Headlamp",
    brand: "Lumen Works",
    category: "Accessories",
    price: 59.9,
    compareAtPrice: 69.9,
    rating: 4.3,
    reviewCount: 587,
    stock: 64,
    description:
      "A rechargeable 400 lumen headlamp with red night mode and a lock function so it never turns on in your pack.",
    highlights: [
      "400 lumen max output",
      "USB-C rechargeable",
      "Red night mode",
      "IPX4 water resistant",
    ],
    specs: {
      Output: "400 lm",
      "Burn time": "Up to 60 h",
      Weight: "78 g",
      Battery: "1500 mAh Li-ion",
    },
    colors: ["Black", "Orange"],
    sizes: ["One size"],
  },
  {
    sku: "FLC-MID-007",
    name: "Alpine Grid Fleece",
    brand: "Northpeak",
    category: "Midlayers",
    price: 89,
    rating: 4.6,
    reviewCount: 1045,
    stock: 37,
    description:
      "A lightweight grid fleece that traps warmth and dumps excess heat when you work hard.",
    highlights: [
      "Grid fabric for breathability",
      "Half-zip for venting",
      "Thumb loops",
      "Made from recycled polyester",
    ],
    specs: {
      Weight: "260 g",
      Fabric: "Recycled polyester grid fleece",
      Fit: "Slim",
    },
    colors: ["Teal", "Charcoal", "Rust"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    sku: "SOK-MRN-008",
    name: "Merino Hiking Socks (2-pack)",
    brand: "Woolly Trail",
    category: "Footwear",
    price: 29.95,
    rating: 4.7,
    reviewCount: 3302,
    stock: 210,
    description:
      "Cushioned merino wool socks that stay fresh on multi-day trips and prevent blisters.",
    highlights: [
      "Merino wool blend",
      "Cushioned heel and toe",
      "Seamless toe box",
    ],
    specs: {
      Material: "62% merino, 35% nylon, 3% elastane",
      Height: "Crew",
    },
    colors: ["Grey", "Navy"],
    sizes: ["35-38", "39-42", "43-46"],
  },
  {
    sku: "PLS-TRK-009",
    name: "Carbon Trekking Poles",
    brand: "Ridgeway",
    category: "Accessories",
    price: 139,
    rating: 4.5,
    reviewCount: 402,
    stock: 18,
    description:
      "Lightweight carbon fiber poles with quick-lock adjustment and cork grips.",
    highlights: [
      "Carbon fiber shafts",
      "Cork grips",
      "Adjustable 100-135 cm",
      "Folding design",
    ],
    specs: {
      Weight: "420 g per pair",
      Length: "100-135 cm",
      "Packed length": "38 cm",
    },
    colors: ["Black"],
    sizes: ["100-135 cm"],
  },
  {
    sku: "SLP-BAG-010",
    name: "Nightfall -5°C Down Sleeping Bag",
    brand: "Northpeak",
    category: "Camping",
    price: 379,
    compareAtPrice: 429,
    rating: 4.8,
    reviewCount: 256,
    stock: 11,
    description:
      "A three-season down sleeping bag with responsibly sourced 700-fill down and a draft collar.",
    highlights: [
      "700-fill RDS certified down",
      "Comfort rating -5°C",
      "Draft collar and zip baffle",
      "Compression sack included",
    ],
    specs: {
      "Comfort rating": "-5°C",
      "Limit rating": "-11°C",
      Weight: "980 g",
      Fill: "700-fill duck down",
    },
    colors: ["Blue"],
    sizes: ["Regular", "Long"],
  },
]

export function getProduct(sku: string) {
  return products.find((p) => p.sku === sku)
}

// Product Catalog Data & Configuration for Mobile Station
const STORE_CONFIG = {
  primaryPhone: "919876543210", // Mobile Station Retail WhatsApp
  stores: [
    {
      id: "mobile-station",
      name: "Mobile Station",
      tagline: "Your Ultimate Smartphone & Gadget Destination",
      address: "Garud Complex, In front of Sony Novelty",
      phone: "+91 98765 43210",
      whatsapp: "919876543210",
      type: "Retail Showroom & 30-Min Fast Repair Hub",
      timing: "10:00 AM - 9:30 PM (Open All 7 Days)",
      badge: "Flagship Retail Showroom",
      features: ["Brand New 5G Smartphones", "Certified Pre-Owned Devices", "On-Spot Screen & Battery Repair", "0% Easy EMI & Instant Exchange"]
    }
  ]
};

const CATEGORIES = [
  { id: "all", name: "All Products", icon: "📱" },
  { id: "apple", name: "Apple iPhones", icon: "🍏" },
  { id: "flagship", name: "Flagship 5G", icon: "👑" },
  { id: "budget", name: "Budget Champions", icon: "🔥" },
  { id: "refurbished", name: "Certified Pre-Owned", icon: "♻️" },
  { id: "smartwatches", name: "Smartwatches", icon: "⌚" },
  { id: "audio", name: "Earbuds & Audio", icon: "🎧" },
  { id: "accessories", name: "Fast Chargers & Cases", icon: "⚡" }
];

const BRANDS = ["All", "Apple", "Samsung", "Google", "OnePlus", "Vivo", "Xiaomi", "Realme", "Boat", "Anker"];

const PRODUCTS = [
  {
    id: "prod-001",
    name: "Apple iPhone 18 Pro Max",
    tagline: "Latest 2026 Flagship Hero",
    brand: "Apple",
    category: "apple",
    subCategory: "flagship",
    price: 179900,
    originalPrice: 199900,
    discountPercent: 10,
    rating: 5.0,
    reviewsCount: 524,
    badge: "👑 2026 Flagship Hero",
    isHotDeal: true,
    condition: "Brand New Sealed Box Pack (VIP Day-1 Allotment)",
    warranty: "1 Year Official Apple Warranty + VIP Shield Protection",
    image: "iphone-18-pro-finish-select-202609-6-9inch-burgundy.webp",
    colors: [
      { name: "Deep Burgundy Titanium", hex: "#5a202d", image: "iphone-18-pro-finish-select-202609-6-9inch-burgundy.webp" },
      { name: "Desert Titanium", hex: "#cbb799", image: "iphone-18-pro-finish-select-202609-6-9inch-burgundy.webp" },
      { name: "Natural Titanium", hex: "#a8a6a0", image: "iphone-18-pro-finish-select-202609-6-9inch-burgundy.webp" },
      { name: "Space Black Titanium", hex: "#1c1d1f", image: "iphone-18-pro-finish-select-202609-6-9inch-burgundy.webp" }
    ],
    storageOptions: [
      { size: "256GB", price: 179900 },
      { size: "512GB", price: 199900 },
      { size: "1TB", price: 224900 },
      { size: "2TB", price: 249900 }
    ],
    specs: {
      display: "6.9\" Super Retina XDR OLED (120Hz ProMotion & 2400 nits Peak)",
      processor: "Apple A19 Pro Bionic Silicon (2nm Next-Gen Architecture)",
      camera: "48MP Quad-Fusion Main + 48MP Ultra-Wide + 10x Optical Telephoto Prism",
      battery: "Up to 36 hours video playback, MagSafe 35W Ultra-Fast Charging",
      os: "iOS 19 with Apple Intelligence Pro Suite"
    },
    inStock: true,
    emiStart: "₹7,990/mo"
  },
  {
    id: "prod-002",
    name: "Apple iPhone 18 Pro",
    tagline: "Compact 6.3\" Pro Powerhouse",
    brand: "Apple",
    category: "apple",
    subCategory: "flagship",
    price: 134900,
    originalPrice: 149900,
    discountPercent: 10,
    rating: 4.9,
    reviewsCount: 380,
    badge: "🔥 2026 Pro Compact",
    isHotDeal: true,
    condition: "Brand New Sealed Box",
    warranty: "1 Year Official Apple Warranty",
    image: "iphone-18-pro-finish-select-202609-6-9inch-burgundy.webp",
    colors: [
      { name: "Deep Burgundy Titanium", hex: "#5a202d", image: "iphone-18-pro-finish-select-202609-6-9inch-burgundy.webp" },
      { name: "Natural Titanium", hex: "#a8a6a0", image: "iphone-18-pro-finish-select-202609-6-9inch-burgundy.webp" },
      { name: "Space Black Titanium", hex: "#1c1d1f", image: "iphone-18-pro-finish-select-202609-6-9inch-burgundy.webp" }
    ],
    storageOptions: [
      { size: "128GB", price: 134900 },
      { size: "256GB", price: 144900 },
      { size: "512GB", price: 164900 },
      { size: "1TB", price: 184900 }
    ],
    specs: {
      display: "6.3\" Super Retina XDR OLED (120Hz ProMotion)",
      processor: "Apple A19 Pro Bionic Silicon (2nm)",
      camera: "48MP Fusion + 48MP Ultra-Wide + 5x Telephoto Prism",
      battery: "All-Day Pro Battery with MagSafe Charging",
      os: "iOS 19 with Apple Intelligence"
    },
    inStock: true,
    emiStart: "₹5,990/mo"
  },
  {
    id: "prod-003",
    name: "Samsung Galaxy S26 Ultra 5G",
    tagline: "Galaxy AI & S-Pen Flagship",
    brand: "Samsung",
    category: "flagship",
    subCategory: "flagship",
    price: 129999,
    originalPrice: 144999,
    discountPercent: 10,
    rating: 4.9,
    reviewsCount: 420,
    badge: "⭐ Galaxy AI Leader",
    isHotDeal: true,
    condition: "Brand New Sealed Box Pack",
    warranty: "1 Year Samsung India Warranty",
    image: "https://m.media-amazon.com/images/I/71RVuWl+CeL._SL1500_.jpg",
    colors: [
      { name: "Titanium Gray", hex: "#7a7876", image: "https://m.media-amazon.com/images/I/71RVuWl+CeL._SL1500_.jpg" },
      { name: "Phantom Black", hex: "#181819", image: "https://m.media-amazon.com/images/I/71RVuWl+CeL._SL1500_.jpg" },
      { name: "Titanium Violet", hex: "#4b4458", image: "https://m.media-amazon.com/images/I/71RVuWl+CeL._SL1500_.jpg" }
    ],
    storageOptions: [
      { size: "12GB/256GB", price: 129999 },
      { size: "12GB/512GB", price: 139999 },
      { size: "16GB/1TB", price: 159999 }
    ],
    specs: {
      display: "6.8\" Dynamic AMOLED 2X, 2800 nits Peak, Anti-Reflective Armor",
      processor: "Snapdragon 8 Gen 4 for Galaxy",
      camera: "200MP Quad Camera + 100x Space Zoom with Live AI Editing",
      battery: "5000 mAh with 45W Fast Charging & Integrated S-Pen",
      os: "One UI 7.0 (Android 15) with 7 Years Updates"
    },
    inStock: true,
    emiStart: "₹5,850/mo"
  },
  {
    id: "prod-004",
    name: "Google Pixel 11 Pro 5G",
    tagline: "Next-Gen Computational AI & Pure Android",
    brand: "Google",
    category: "flagship",
    subCategory: "flagship",
    price: 109999,
    originalPrice: 119999,
    discountPercent: 8,
    rating: 4.8,
    reviewsCount: 260,
    badge: "🤖 Google Gemini AI",
    isHotDeal: true,
    condition: "Brand New Sealed Box",
    warranty: "1 Year Google India Warranty",
    image: "https://m.media-amazon.com/images/I/71x4xQ7c2GL._SL1500_.jpg",
    colors: [
      { name: "Obsidian Black", hex: "#1e1f22", image: "https://m.media-amazon.com/images/I/71x4xQ7c2GL._SL1500_.jpg" },
      { name: "Porcelain White", hex: "#f0ede6", image: "https://m.media-amazon.com/images/I/71x4xQ7c2GL._SL1500_.jpg" },
      { name: "Hazel Gray", hex: "#7e837f", image: "https://m.media-amazon.com/images/I/71x4xQ7c2GL._SL1500_.jpg" }
    ],
    storageOptions: [
      { size: "128GB", price: 109999 },
      { size: "256GB", price: 119999 },
      { size: "512GB", price: 134999 }
    ],
    specs: {
      display: "6.7\" Super Actua LTPO OLED (1-120Hz, 3000 nits)",
      processor: "Google Tensor G6 with Custom TPU AI Chip",
      camera: "50MP Triple Pro Camera with 30x Super Res Zoom & Best Take 2.0",
      battery: "5050 mAh with 30W Fast Charging & Qi2 Wireless",
      os: "Stock Android 15 with 7 Years Pixel Feature Drops"
    },
    inStock: true,
    emiStart: "₹4,950/mo"
  },
  {
    id: "prod-005",
    name: "OnePlus 13 5G (Emerald Flow)",
    tagline: "Extreme Performance & 120W SuperVOOC",
    brand: "OnePlus",
    category: "flagship",
    subCategory: "flagship",
    price: 69999,
    originalPrice: 74999,
    discountPercent: 7,
    rating: 4.8,
    reviewsCount: 290,
    badge: "⚡ 120W SuperVOOC",
    isHotDeal: false,
    condition: "Brand New Sealed Box",
    warranty: "1 Year OnePlus Warranty",
    image: "https://m.media-amazon.com/images/I/717Qo4MH97L._SL1500_.jpg",
    colors: [
      { name: "Emerald Flow", hex: "#2b4b41", image: "https://m.media-amazon.com/images/I/717Qo4MH97L._SL1500_.jpg" },
      { name: "Silky Black", hex: "#1c1c1e", image: "https://m.media-amazon.com/images/I/717Qo4MH97L._SL1500_.jpg" }
    ],
    storageOptions: [
      { size: "12GB/256GB", price: 69999 },
      { size: "16GB/512GB", price: 76999 }
    ],
    specs: {
      display: "6.82\" 2K 120Hz Oriental Screen (DisplayMate A+)",
      processor: "Snapdragon 8 Gen 4 Flagship Processor",
      camera: "5th Gen Hasselblad 50MP Triple Master Camera",
      battery: "6000 mAh Glacier Battery + 120W Wired & 50W AIRVOOC",
      os: "OxygenOS 15 (Android 15)"
    },
    inStock: true,
    emiStart: "₹3,360/mo"
  },
  {
    id: "prod-006",
    name: "Vivo X200 Pro 5G (ZEISS Master Edition)",
    tagline: "200MP ZEISS APO Telephoto Camera",
    brand: "Vivo",
    category: "flagship",
    subCategory: "flagship",
    price: 89999,
    originalPrice: 99999,
    discountPercent: 10,
    rating: 4.9,
    reviewsCount: 195,
    badge: "📸 200MP ZEISS APO",
    isHotDeal: true,
    condition: "Brand New Sealed Box",
    warranty: "1 Year Vivo India Warranty",
    image: "https://m.media-amazon.com/images/I/71x4xQ7c2GL._SL1500_.jpg",
    colors: [
      { name: "Titanium Blue", hex: "#3b526d", image: "https://m.media-amazon.com/images/I/71x4xQ7c2GL._SL1500_.jpg" },
      { name: "Carbon Black", hex: "#1b1c1e", image: "https://m.media-amazon.com/images/I/71x4xQ7c2GL._SL1500_.jpg" }
    ],
    storageOptions: [
      { size: "16GB/512GB", price: 89999 },
      { size: "16GB/1TB", price: 99999 }
    ],
    specs: {
      display: "6.78\" 1.5K 8T LTPO Eye-Care AMOLED, 4500 nits",
      processor: "MediaTek Dimensity 9400 (3nm)",
      camera: "200MP ZEISS APO Telephoto + 50MP 1-inch Sony LYT-818 Main",
      battery: "6000 mAh BlueVolt Semi-Solid Battery + 90W Flash",
      os: "Funtouch OS 15 (Android 15)"
    },
    inStock: true,
    emiStart: "₹4,299/mo"
  },
  {
    id: "prod-007",
    name: "Samsung Galaxy Z Fold 6 5G",
    tagline: "Next-Gen AI Foldable Powerhouse",
    brand: "Samsung",
    category: "flagship",
    subCategory: "flagship",
    price: 164999,
    originalPrice: 179999,
    discountPercent: 8,
    rating: 4.9,
    reviewsCount: 175,
    badge: "📱 AI Foldable Flagship",
    isHotDeal: true,
    condition: "Brand New Sealed Box",
    warranty: "1 Year Samsung India Warranty",
    image: "https://m.media-amazon.com/images/I/71f2I83DAhL._SL1500_.jpg",
    colors: [
      { name: "Silver Shadow", hex: "#c3c5c9", image: "https://m.media-amazon.com/images/I/71f2I83DAhL._SL1500_.jpg" },
      { name: "Navy", hex: "#232e3d", image: "https://m.media-amazon.com/images/I/71f2I83DAhL._SL1500_.jpg" }
    ],
    storageOptions: [
      { size: "12GB/256GB", price: 164999 },
      { size: "12GB/512GB", price: 176999 },
      { size: "12GB/1TB", price: 199999 }
    ],
    specs: {
      display: "7.6\" Foldable Dynamic AMOLED 2X + 6.3\" Cover Screen (2600 nits)",
      processor: "Snapdragon 8 Gen 3 for Galaxy (4nm)",
      camera: "50MP Triple Camera with Galaxy AI Pro Visual Engine",
      battery: "4400 mAh Dual Battery with 25W Fast Charge",
      os: "One UI 6.1.1 on Android 14"
    },
    inStock: true,
    emiStart: "₹7,910/mo"
  },
  {
    id: "prod-008",
    name: "Apple iPhone 16 (Dynamic Island)",
    tagline: "Apple Intelligence & Camera Control",
    brand: "Apple",
    category: "apple",
    subCategory: "flagship",
    price: 79900,
    originalPrice: 84900,
    discountPercent: 6,
    rating: 4.9,
    reviewsCount: 640,
    badge: "✨ Apple Intelligence",
    isHotDeal: true,
    condition: "Brand New Sealed Box",
    warranty: "1 Year Official Apple Warranty",
    image: "https://m.media-amazon.com/images/I/71d7rfSl0wL._SL1500_.jpg",
    colors: [
      { name: "Ultramarine", hex: "#355291", image: "https://m.media-amazon.com/images/I/71d7rfSl0wL._SL1500_.jpg" },
      { name: "Teal", hex: "#4b8782", image: "https://m.media-amazon.com/images/I/71d7rfSl0wL._SL1500_.jpg" },
      { name: "Pink", hex: "#dd7c93", image: "https://m.media-amazon.com/images/I/71d7rfSl0wL._SL1500_.jpg" }
    ],
    storageOptions: [
      { size: "128GB", price: 79900 },
      { size: "256GB", price: 89900 },
      { size: "512GB", price: 109900 }
    ],
    specs: {
      display: "6.1\" Super Retina XDR OLED with Camera Control & Action Button",
      processor: "A18 Bionic chip (3nm) with Apple Intelligence",
      camera: "48MP Fusion Camera + 12MP Ultra-Wide with Macro Support",
      battery: "All-day battery life, USB-C Fast Charge",
      os: "iOS 18 with Apple Intelligence"
    },
    inStock: true,
    emiStart: "₹3,840/mo"
  },
  {
    id: "prod-009",
    name: "Apple iPhone 13 (Certified Grade A+)",
    tagline: "100% Original Certified Pre-Owned",
    brand: "Apple",
    category: "refurbished",
    subCategory: "refurbished",
    price: 36999,
    originalPrice: 59900,
    discountPercent: 38,
    rating: 4.9,
    reviewsCount: 412,
    badge: "💎 Certified Grade A+",
    isHotDeal: true,
    condition: "Certified Pre-Owned (32-Point Inspected, 100% Original Battery)",
    warranty: "6 Months Mobile Station Replacement Warranty",
    image: "https://m.media-amazon.com/images/I/71xb2xkN5qL._SL1500_.jpg",
    colors: [
      { name: "Midnight", hex: "#1f2022", image: "https://m.media-amazon.com/images/I/71xb2xkN5qL._SL1500_.jpg" },
      { name: "Starlight", hex: "#f0ece4", image: "https://m.media-amazon.com/images/I/71xb2xkN5qL._SL1500_.jpg" }
    ],
    storageOptions: [
      { size: "128GB", price: 36999 },
      { size: "256GB", price: 41999 }
    ],
    specs: {
      display: "6.1\" Super Retina XDR OLED Display (Scratchless)",
      processor: "A15 Bionic chip (Blazing Fast)",
      camera: "Dual 12MP Camera with Cinematic mode 4K",
      battery: "Tested 95%+ Battery Health, Original Parts Guaranteed",
      os: "iOS 18 Ready"
    },
    inStock: true,
    emiStart: "₹1,780/mo"
  },
  {
    id: "prod-010",
    name: "Apple AirPods Pro (2nd Gen USB-C)",
    tagline: "Active Noise Cancellation & Spatial Audio",
    brand: "Apple",
    category: "audio",
    subCategory: "accessories",
    price: 20999,
    originalPrice: 24900,
    discountPercent: 16,
    rating: 4.9,
    reviewsCount: 310,
    badge: "🎧 Active Noise Cancelling",
    isHotDeal: false,
    condition: "Brand New Sealed Box",
    warranty: "1 Year Official Apple Warranty",
    image: "https://m.media-amazon.com/images/I/61SUj2aKoEL._SL1500_.jpg",
    colors: [
      { name: "White", hex: "#ffffff", image: "https://m.media-amazon.com/images/I/61SUj2aKoEL._SL1500_.jpg" }
    ],
    storageOptions: [
      { size: "MagSafe USB-C Case", price: 20999 }
    ],
    specs: {
      display: "Apple H2 Silicon Chip with Personalized Spatial Audio",
      processor: "Up to 2x more Active Noise Cancellation + Adaptive Audio",
      camera: "Touch control volume slider on stem",
      battery: "Up to 6 hours listening (30 hours with MagSafe Case)",
      os: "Universal iOS / Android Support"
    },
    inStock: true,
    emiStart: "₹1,010/mo"
  },
  {
    id: "prod-011",
    name: "boAt Airdopes 141 ANC TWS Earbuds",
    tagline: "32dB ANC & 42 Hours Total Playback",
    brand: "Boat",
    category: "audio",
    subCategory: "accessories",
    price: 1499,
    originalPrice: 4490,
    discountPercent: 67,
    rating: 4.4,
    reviewsCount: 890,
    badge: "💥 67% OFF",
    isHotDeal: true,
    condition: "Brand New Box Pack",
    warranty: "1 Year boAt Warranty",
    image: "https://m.media-amazon.com/images/I/61aYqMskkPL._SL1500_.jpg",
    colors: [
      { name: "Active Black", hex: "#111111", image: "https://m.media-amazon.com/images/I/61aYqMskkPL._SL1500_.jpg" }
    ],
    storageOptions: [
      { size: "Standard Edition", price: 1499 }
    ],
    specs: {
      display: "32dB Active Noise Cancellation (ANC)",
      processor: "42 Hours Total Playback with ASAP Fast Charge",
      camera: "ENx Quad Mics for Crystal Clear Calls",
      battery: "10 mins charge = 150 mins playtime",
      os: "Bluetooth v5.3"
    },
    inStock: true,
    emiStart: "N/A"
  },
  {
    id: "prod-012",
    name: "Samsung Galaxy Watch6 44mm",
    tagline: "Sapphire Crystal & Health Tracking",
    brand: "Samsung",
    category: "smartwatches",
    subCategory: "accessories",
    price: 18999,
    originalPrice: 33999,
    discountPercent: 44,
    rating: 4.7,
    reviewsCount: 142,
    badge: "⌚ Health & ECG Track",
    isHotDeal: true,
    condition: "Brand New Sealed Box",
    warranty: "1 Year Samsung India Warranty",
    image: "https://m.media-amazon.com/images/I/61ZDY5b3K3L._SL1500_.jpg",
    colors: [
      { name: "Graphite", hex: "#2a2b2d", image: "https://m.media-amazon.com/images/I/61ZDY5b3K3L._SL1500_.jpg" }
    ],
    storageOptions: [
      { size: "44mm Bluetooth", price: 18999 },
      { size: "44mm LTE", price: 21999 }
    ],
    specs: {
      display: "1.5\" Super AMOLED Sapphire Crystal Glass",
      processor: "Exynos W930 Dual Core 1.4GHz",
      camera: "BioActive Sensor (Sleep Coaching, ECG, BP, Heart Rate)",
      battery: "Up to 40 Hours + Fast Wireless Charge",
      os: "Wear OS Powered by Samsung"
    },
    inStock: true,
    emiStart: "₹910/mo"
  },
  {
    id: "prod-013",
    name: "Anker 65W GaN III Fast Charger",
    tagline: "3-Port Fast Power for Laptops & Flagships",
    brand: "Anker",
    category: "accessories",
    subCategory: "accessories",
    price: 3499,
    originalPrice: 4999,
    discountPercent: 30,
    rating: 4.8,
    reviewsCount: 230,
    badge: "🔋 GaN Fast Tech",
    isHotDeal: false,
    condition: "Brand New Box Pack",
    warranty: "18 Months Anker Replacement Warranty",
    image: "https://m.media-amazon.com/images/I/61r-GfU+xPL._SL1500_.jpg",
    colors: [
      { name: "Matte Black", hex: "#1b1b1b", image: "https://m.media-amazon.com/images/I/61r-GfU+xPL._SL1500_.jpg" }
    ],
    storageOptions: [
      { size: "65W 3-Port GaN", price: 3499 }
    ],
    specs: {
      display: "2x USB-C + 1x USB-A Simultaneous Fast Charging",
      processor: "Charges Laptops, MacBooks, iPhones, Samsung phones at full speed",
      camera: "GaN III Technology with ActiveShield 2.0 temperature control",
      battery: "Compact foldable plug design",
      os: "Universal Compatibility"
    },
    inStock: true,
    emiStart: "N/A"
  },
  {
    id: "prod-014",
    name: "Apple 20W USB-C Fast Power Adapter",
    tagline: "Original Genuine Apple Fast Charger",
    brand: "Apple",
    category: "accessories",
    subCategory: "accessories",
    price: 1699,
    originalPrice: 1900,
    discountPercent: 11,
    rating: 4.9,
    reviewsCount: 760,
    badge: "⚡ 100% Original Apple",
    isHotDeal: false,
    condition: "Brand New Box Pack",
    warranty: "1 Year Apple Warranty",
    image: "https://m.media-amazon.com/images/I/61vtLhO6fDL._SL1500_.jpg",
    colors: [
      { name: "White", hex: "#ffffff", image: "https://m.media-amazon.com/images/I/61vtLhO6fDL._SL1500_.jpg" }
    ],
    storageOptions: [
      { size: "20W USB-C", price: 1699 }
    ],
    specs: {
      display: "Original Genuine Apple 20W Fast Charger",
      processor: "Supports Power Delivery (PD 3.0)",
      camera: "Charges iPhone 50% in just 30 mins",
      battery: "Over-voltage & overheating protection",
      os: "All iPhones, iPads, Apple Watches"
    },
    inStock: true,
    emiStart: "N/A"
  },
  {
    id: "prod-015",
    name: "MagSafe Armor Case + 9H Glass Combo",
    tagline: "Military-Grade Drop Protection & Strong N52 Magnet",
    brand: "Mobile Station Exclusive",
    category: "accessories",
    subCategory: "accessories",
    price: 699,
    originalPrice: 1499,
    discountPercent: 53,
    rating: 4.9,
    reviewsCount: 540,
    badge: "🛡️ Heavy Duty Combo",
    isHotDeal: true,
    condition: "Brand New Box Pack",
    warranty: "Fitment & Replacement Guarantee",
    image: "https://m.media-amazon.com/images/I/71YvO8g+hBL._SL1500_.jpg",
    colors: [
      { name: "Translucent Matte", hex: "#3a3a3c", image: "https://m.media-amazon.com/images/I/71YvO8g+hBL._SL1500_.jpg" }
    ],
    storageOptions: [
      { size: "All iPhone & Android Models", price: 699 }
    ],
    specs: {
      display: "Strong N52 Magnetic Ring for instant MagSafe latching",
      processor: "Air-cushioned corners with 10ft drop tested protection",
      camera: "Raised 1.5mm lips for Camera Lens & Screen safety",
      battery: "Includes 9H Hardness Edge-to-Edge Tempered Glass",
      os: "Free on-spot installation at Mobile Station store"
    },
    inStock: true,
    emiStart: "N/A"
  }
];

const REPAIR_SERVICES = [
  {
    id: "rep-screen",
    title: "Broken Screen & Display Replacement",
    icon: "📱",
    description: "Original OLED / AMOLED & High Grade IPS displays with touch responsiveness & true-tone support.",
    turnaround: "30 - 45 Minutes",
    warranty: "6 Months Warranty",
    startingPrice: "₹1,199"
  },
  {
    id: "rep-battery",
    title: "Battery Replacement & Health Boost",
    icon: "🔋",
    description: "100% capacity original grade batteries with genuine thermal sensors and fast charge safety.",
    turnaround: "20 Minutes",
    warranty: "6 Months Warranty",
    startingPrice: "₹799"
  },
  {
    id: "rep-water",
    title: "Water Damage & Liquid Recovery",
    icon: "💧",
    description: "Ultrasonic chemical bath PCB cleaning, short circuit repair, and chip-level motherboard revival.",
    turnaround: "Same Day",
    warranty: "Tested Diagnostics",
    startingPrice: "₹499"
  },
  {
    id: "rep-camera",
    title: "Camera Lens & Sensor Repair",
    icon: "📷",
    description: "Fix blurry cameras, cracked outer glass, shaking OIS stabilization, or black camera issues.",
    turnaround: "45 Minutes",
    warranty: "3 Months Warranty",
    startingPrice: "₹699"
  },
  {
    id: "rep-port",
    title: "Charging Port & Speaker Fix",
    icon: "⚡",
    description: "Fix loose charging cables, slow charging, mic issues, ear speaker noise, and loud speaker distortion.",
    turnaround: "25 Minutes",
    warranty: "3 Months Warranty",
    startingPrice: "₹399"
  },
  {
    id: "rep-software",
    title: "Software, Bootloop & Unlocking",
    icon: "💻",
    description: "OS flashing, pattern/PIN recovery, hanging fix, iCloud / Google account guidance, and data transfer.",
    turnaround: "30 Minutes",
    warranty: "100% Safe",
    startingPrice: "₹299"
  }
];

const CUSTOMER_REVIEWS = [
  {
    id: 1,
    name: "Rajesh Sharma",
    location: "Garud Complex, Regular Customer",
    rating: 5,
    date: "2 days ago",
    product: "Apple iPhone 16 Pro Max",
    comment: "Mobile Station se best deal kahin nahi milti! Amazon se bhi saste me sealed pack iPhone 16 Pro Max mil gaya aur free tempered glass bhi lagakar diya. Ekdum trustworthy shop.",
    verified: true
  },
  {
    id: 2,
    name: "Neha Verma",
    location: "Garud Complex, Showroom Customer",
    rating: 5,
    date: "1 week ago",
    product: "Samsung Galaxy S24 Ultra",
    comment: "WhatsApp par direct baat ki, inhone turant color options aur price quotes bhej diye. Shop par jakar 10 minute me purchase kar liya. Mobile Station customer service is top notch!",
    verified: true
  },
  {
    id: 3,
    name: "Amit Patel",
    location: "Corporate Client",
    rating: 5,
    date: "2 weeks ago",
    product: "Bulk Mobile Accessories & Fast Chargers",
    comment: "Mobile Station (Garud Complex) se genuine cases and 65W GaN fast chargers mangwaye the. Rates market se bhi best hain aur delivery instant.",
    verified: true
  },
  {
    id: 4,
    name: "Vikram Chauhan",
    location: "Mobile Repair Customer",
    rating: 5,
    date: "3 weeks ago",
    product: "iPhone 13 Display & Battery Replacement",
    comment: "Display toot gaya tha, Mobile Station par 30 minutes me original OLED screen fit karke diya with warranty. Phone bilkul naya jaisa chal raha hai!",
    verified: true
  },
  {
    id: 5,
    name: "Pooja Deshmukh",
    location: "Student",
    rating: 5,
    date: "A month ago",
    product: "iPhone 13 Certified Pre-Owned",
    comment: "Pre-owned iPhone 13 liya 100% battery health ke sath. Ek bhi scratch nahi tha aur 6 months shop warranty bhi di. Super happy!",
    verified: true
  }
];

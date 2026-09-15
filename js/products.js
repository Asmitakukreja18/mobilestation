// =========================================================================
// MOBILE STATION — FLAGSHIP SMARTPHONE CATALOG & STORE DATA (2026 EDITION)
// 32 Flagship Models across Apple, Samsung, OnePlus, Google, Xiaomi, vivo, OPPO
// =========================================================================

const STORE_CONFIG = {
  primaryPhone: "919322160461",
  storeName: "Mobile Station",
  tagline: "Luxury Multi-Brand Smartphone Showroom",
  currency: "₹",
  locations: [
    {
      city: "Amravati",
      name: "Mobile Station Flagship & Express Lab",
      address: "Garud Complex, In front of Sony Novelty, Amravati, MH",
      phone: "+91 93221 60461",
      timing: "10:00 AM - 10:00 PM (All 7 Days)",
      badge: "Main Flagship & Repair Hub"
    },
    {
      city: "Nagpur",
      name: "Mobile Station Experience Lounge",
      address: "Civil Lines, Near High Court, Nagpur, MH",
      phone: "+91 93221 60461",
      timing: "10:30 AM - 9:30 PM",
      badge: "Luxury VIP Tech Lounge"
    },
    {
      city: "Mumbai",
      name: "Mobile Station BKC Studio",
      address: "Bandra Kurla Complex (BKC), Mumbai, MH",
      phone: "+91 93221 60461",
      timing: "11:00 AM - 10:00 PM",
      badge: "Exclusive Flagship Studio"
    }
  ]
};

const BRANDS_CONFIG = [
  {
    id: "apple",
    name: "Apple",
    tagline: "The Ultimate iPhone Experience",
    description: "Aerospace-grade titanium, custom 2nm Apple Silicon, and breakthrough Apple Intelligence pro camera systems.",
    heroBadge: "Titanium & Apple Intelligence",
    heroImage: "assets/iphone-18-pro-max.png",
    pageUrl: "apple.html",
    accentColor: "#d71942",
    count: 6
  },
  {
    id: "samsung",
    name: "Samsung",
    tagline: "Innovation, Folded Into The Future",
    description: "Galaxy AI powerhouse, 200MP zoom dominance, and fifth-generation ultra-durable foldable flex glass.",
    heroBadge: "Galaxy AI & Ultra Titanium",
    heroImage: "assets/samsung-s26-ultra.png",
    pageUrl: "samsung.html",
    accentColor: "#1d62ec",
    count: 6
  },
  {
    id: "oneplus",
    name: "OnePlus",
    tagline: "Never Settle — Extreme Speed & Ultra Precision",
    description: "Hasselblad generational color science, 150W SuperVOOC charging, and 165Hz ProXDR hyper-fluid displays.",
    heroBadge: "Snapdragon 8 Elite & Hasselblad",
    heroImage: "assets/oneplus-15.png",
    pageUrl: "oneplus.html",
    accentColor: "#eb0028",
    count: 4
  },
  {
    id: "google",
    name: "Google Pixel",
    tagline: "Gemini AI Built-In — The Smartest Flagship",
    description: "Tensor G6 AI core, zero-shutter computational photography, and guaranteed 7-year OS & security feature drops.",
    heroBadge: "Google Tensor G6 & Magic Studio",
    heroImage: "assets/pixel-11-pro.png",
    pageUrl: "google.html",
    accentColor: "#4285f4",
    count: 5
  },
  {
    id: "xiaomi",
    name: "Xiaomi / Redmi",
    tagline: "Leica Optical Masters & HyperCharge Pioneers",
    description: "1-inch Leica Summicron quad-sensor systems, 120W HyperCharge, and ultra-ergonomic curved ceramic unibodies.",
    heroBadge: "Leica Summicron Quad Optical",
    heroImage: "assets/xiaomi-17-ultra.png",
    pageUrl: "xiaomi.html",
    accentColor: "#ff6900",
    count: 5
  },
  {
    id: "vivo",
    name: "vivo",
    tagline: "ZEISS Master Optics & APO Telephoto Vanguard",
    description: "Custom V4+ imaging chips, 200MP ZEISS APO periscope portraits, and 6000mAh blue-ocean silicon batteries.",
    heroBadge: "ZEISS T* Coating & V4+ ISP",
    heroImage: "assets/vivo-x300-ultra.png",
    pageUrl: "vivo.html",
    accentColor: "#0072ff",
    count: 3
  },
  {
    id: "oppo",
    name: "OPPO",
    tagline: "Hasselblad Portrait Masters & Dual Periscope Era",
    description: "World's first dual-periscope telephoto architecture, aerospace unibodies, and 100W SUPERVOOC smart power.",
    heroBadge: "Dual Periscope & Hasselblad Master",
    heroImage: "assets/oppo-find-x9-ultra.png",
    pageUrl: "oppo.html",
    accentColor: "#009b6a",
    count: 3
  }
];

const PRODUCTS = [
{
    "id": "apple-18-pro-max-burgundy",
    "name": "iPhone 18 Pro Max (Burgundy Special)",
    "brand": "Apple",
    "category": "apple",
    "tagline": "Exclusive Deep Burgundy Titanium Edition with 2nm A20 Pro",
    "price": 189900,
    "originalPrice": 199900,
    "badge": "\ud83d\udc51 Special Edition",
    "isFeaturedHero": true,
    "isHero": true,
    "rating": 5.0,
    "reviewsCount": 710,
    "chip": "A20 Pro (2nm Silicon)",
    "display": "6.9\" Super Retina XDR ProMotion 120Hz (3000 nits)",
    "camera": "48MP Fusion Triple Camera + 10x Optical Periscope Zoom",
    "battery": "38 hrs video playback, MagSafe 45W Ultra Charge",
    "image": "assets/user_phone_1.jpg",
    "fallbackImage": "assets/phone.png",
    "colors": [
        {
            "name": "Deep Burgundy Titanium",
            "hex": "#7a1120",
            "image": "assets/user_phone_1.jpg"
        },
        {
            "name": "Champagne Gold",
            "hex": "#d8c49e",
            "image": "assets/user_phone_1.jpg"
        }
    ],
    "storage": [
        "256GB",
        "512GB",
        "1TB",
        "2TB"
    ],
    "emi": "\u20b98,440/mo"
},
{
    "id": "samsung-s26-ultra-sapphire",
    "name": "Samsung Galaxy S26 Ultra (Sapphire)",
    "brand": "Samsung",
    "category": "samsung",
    "tagline": "200MP Quad Camera, S-Pen & Galaxy AI 3.0",
    "price": 149999,
    "originalPrice": 164999,
    "badge": "\ud83e\ude90 Sapphire AI Master",
    "isFeaturedHero": false,
    "isHero": false,
    "rating": 5.0,
    "reviewsCount": 420,
    "chip": "Snapdragon 8 Elite Gen 2 for Galaxy",
    "display": "6.8\" Dynamic AMOLED 2X (3200 nits, Anti-Reflective)",
    "camera": "200MP Main + 50MP 5x Periscope + 50MP 3x + 50MP Ultra-Wide",
    "battery": "5000 mAh + 65W Super Fast Charge 2.0",
    "image": "assets/user_phone_2.jpg",
    "fallbackImage": "assets/phone.png",
    "colors": [
        {
            "name": "Sapphire Blue Titanium",
            "hex": "#1e3a5f",
            "image": "assets/user_phone_2.jpg"
        },
        {
            "name": "Titanium Black",
            "hex": "#1c1c1e",
            "image": "assets/user_phone_2.jpg"
        }
    ],
    "storage": [
        "256GB",
        "512GB",
        "1TB"
    ],
    "emi": "\u20b96,660/mo"
},
{
    "id": "pixel-10-pro-fold",
    "name": "Google Pixel 10 Pro Fold",
    "brand": "Google",
    "category": "google",
    "tagline": "Gemini AI Built-In \u2014 Ultra-Thin Dual Screen Foldable",
    "price": 159999,
    "originalPrice": 172999,
    "badge": "\ud83e\udd16 Gemini Pro Fold",
    "isFeaturedHero": false,
    "isHero": false,
    "rating": 4.9,
    "reviewsCount": 290,
    "chip": "Google Tensor G6 AI Chip",
    "display": "8.0\" Super Actua Flex OLED 120Hz + 6.3\" Outer Display",
    "camera": "48MP Triple Rear Camera + Magic Editor 2.0",
    "battery": "4650 mAh + Wireless Charging",
    "image": "assets/user_phone_3.jpg",
    "fallbackImage": "assets/phone.png",
    "colors": [
        {
            "name": "Obsidian Black",
            "hex": "#191919",
            "image": "assets/user_phone_3.jpg"
        },
        {
            "name": "Porcelain White",
            "hex": "#f0f0ed",
            "image": "assets/user_phone_3.jpg"
        }
    ],
    "storage": [
        "256GB",
        "512GB"
    ],
    "emi": "\u20b97,110/mo"
},
{
    "id": "oneplus-15-pro-hasselblad",
    "name": "OnePlus 15 Pro Hasselblad",
    "brand": "OnePlus",
    "category": "oneplus",
    "tagline": "Never Settle \u2014 150W SuperVOOC & Hasselblad Color Engine",
    "price": 89999,
    "originalPrice": 97999,
    "badge": "\u26a1 150W Hyper Charge",
    "isFeaturedHero": false,
    "isHero": false,
    "rating": 4.9,
    "reviewsCount": 380,
    "chip": "Snapdragon 8 Elite Gen 2",
    "display": "6.82\" QHD+ 165Hz ProXDR AMOLED",
    "camera": "50MP Sony LYT-900 + 64MP 3x Periscope Telephoto",
    "battery": "5800 mAh + 150W SuperVOOC Charge",
    "image": "assets/user_phone_4.jpg",
    "fallbackImage": "assets/phone.png",
    "colors": [
        {
            "name": "Emerald Green",
            "hex": "#1f4a38",
            "image": "assets/user_phone_4.jpg"
        },
        {
            "name": "Silky Black",
            "hex": "#1a1a1b",
            "image": "assets/user_phone_4.jpg"
        }
    ],
    "storage": [
        "256GB",
        "512GB",
        "1TB"
    ],
    "emi": "\u20b94,000/mo"
},
{
    "id": "xiaomi-16-ultra-leica",
    "name": "Xiaomi 16 Ultra Leica Edition",
    "brand": "Xiaomi",
    "category": "xiaomi",
    "tagline": "1-inch Leica Summicron Quad-Camera Mechanical Aperture",
    "price": 109999,
    "originalPrice": 119999,
    "badge": "\ud83d\udd25 1-Inch Leica Sensor",
    "isFeaturedHero": false,
    "isHero": false,
    "rating": 4.9,
    "reviewsCount": 410,
    "chip": "Snapdragon 8 Elite Gen 2",
    "display": "6.73\" WQHD+ 120Hz AMOLED 3000 nits",
    "camera": "50MP 1-inch Main + 50MP 5x Periscope + 50MP 3.2x Telephoto",
    "battery": "5300 mAh + 90W HyperCharge",
    "image": "assets/user_phone_5.jpg",
    "fallbackImage": "assets/phone.png",
    "colors": [
        {
            "name": "Black Leather",
            "hex": "#222224",
            "image": "assets/user_phone_5.jpg"
        },
        {
            "name": "White Ceramic",
            "hex": "#f4f4f6",
            "image": "assets/user_phone_5.jpg"
        }
    ],
    "storage": [
        "512GB",
        "1TB"
    ],
    "emi": "\u20b94,880/mo"
},
{
    "id": "vivo-x200-pro-zeiss",
    "name": "vivo X200 Pro ZEISS Edition",
    "brand": "vivo",
    "category": "vivo",
    "tagline": "ZEISS Master Optics & APO Telephoto Portrait Vanguard",
    "price": 94999,
    "originalPrice": 102999,
    "badge": "\ud83d\udcf8 ZEISS APO Telephoto",
    "isFeaturedHero": false,
    "isHero": false,
    "rating": 5.0,
    "reviewsCount": 350,
    "chip": "MediaTek Dimensity 9500 / V4 ISP",
    "display": "6.78\" 1.5K 120Hz Micro-Quad Curved AMOLED",
    "camera": "200MP ZEISS APO Periscope + 50MP Main Sony LYT-808",
    "battery": "6000 mAh Blue-Ocean Silicon + 90W FlashCharge",
    "image": "assets/user_phone_6.jpg",
    "fallbackImage": "assets/phone.png",
    "colors": [
        {
            "name": "Titanium Blue",
            "hex": "#3a536b",
            "image": "assets/user_phone_6.jpg"
        },
        {
            "name": "Midnight Black",
            "hex": "#17181c",
            "image": "assets/user_phone_6.jpg"
        }
    ],
    "storage": [
        "256GB",
        "512GB"
    ],
    "emi": "\u20b94,220/mo"
},
{
    "id": "oppo-find-x9-pro-hasselblad",
    "name": "OPPO Find X9 Pro Hasselblad",
    "brand": "OPPO",
    "category": "oppo",
    "tagline": "Dual Periscope Telephoto Master & 5000 nits Hyper Display",
    "price": 89999,
    "originalPrice": 97999,
    "badge": "\u2728 Dual Periscope Master",
    "isFeaturedHero": false,
    "isHero": false,
    "rating": 4.8,
    "reviewsCount": 310,
    "chip": "MediaTek Dimensity 9500 / Snapdragon 8 Elite",
    "display": "6.82\" QHD+ 120Hz Curved AMOLED",
    "camera": "50MP Dual Periscope Hasselblad Camera System",
    "battery": "5910 mAh + 80W SUPERVOOC",
    "image": "assets/user_phone_7.jpg",
    "fallbackImage": "assets/phone.png",
    "colors": [
        {
            "name": "Silk Gold",
            "hex": "#dfc7a1",
            "image": "assets/user_phone_7.jpg"
        },
        {
            "name": "Ocean Blue",
            "hex": "#2b547e",
            "image": "assets/user_phone_7.jpg"
        }
    ],
    "storage": [
        "256GB",
        "512GB"
    ],
    "emi": "\u20b94,000/mo"
},
{
    "id": "apple-iphone-air-slim",
    "name": "iPhone Air Titanium Slim",
    "brand": "Apple",
    "category": "apple",
    "tagline": "Ultra-Thin 5mm Grade-5 Titanium Body",
    "price": 109900,
    "originalPrice": 119900,
    "badge": "\ud83e\udeb6 5mm Titanium Slim",
    "isFeaturedHero": false,
    "isHero": false,
    "rating": 4.9,
    "reviewsCount": 280,
    "chip": "A19 Pro Bionic",
    "display": "6.6\" OLED 120Hz Edge-to-Edge Fluid Display",
    "camera": "48MP Dual Fusion Optical Engine",
    "battery": "Solid State Battery (26 hrs playback)",
    "image": "assets/user_phone_8.jpg",
    "fallbackImage": "assets/phone.png",
    "colors": [
        {
            "name": "Titanium White",
            "hex": "#f0f0ed",
            "image": "assets/user_phone_8.jpg"
        },
        {
            "name": "Titanium Space Gray",
            "hex": "#2a2a2c",
            "image": "assets/user_phone_8.jpg"
        }
    ],
    "storage": [
        "256GB",
        "512GB"
    ],
    "emi": "\u20b94,880/mo"
},
{
    "id": "samsung-galaxy-zfold8-luxe",
    "name": "Samsung Galaxy Z Fold 8 Luxe",
    "brand": "Samsung",
    "category": "samsung",
    "tagline": "Zero-Crease Dual 120Hz AMOLED Displays with S-Pen",
    "price": 169999,
    "originalPrice": 184999,
    "badge": "\ud83e\ude90 Ultra Flex Glass",
    "isFeaturedHero": false,
    "isHero": false,
    "rating": 5.0,
    "reviewsCount": 390,
    "chip": "Snapdragon 8 Elite Gen 2 for Galaxy",
    "display": "7.6\" Dynamic AMOLED 2X Inner + 6.3\" Outer Display",
    "camera": "200MP Main + 50MP Telephoto + 12MP Ultra-Wide",
    "battery": "4600 mAh + 45W Fast Charging",
    "image": "assets/user_phone_9.jpg",
    "fallbackImage": "assets/phone.png",
    "colors": [
        {
            "name": "Crafted Black",
            "hex": "#171718",
            "image": "assets/user_phone_9.jpg"
        },
        {
            "name": "Silver Shadow",
            "hex": "#c9cbcf",
            "image": "assets/user_phone_9.jpg"
        }
    ],
    "storage": [
        "256GB",
        "512GB",
        "1TB"
    ],
    "emi": "\u20b97,550/mo"
},
  // ==========================================
  // APPLE COLLECTION (6 MODELS)
  // ==========================================
  {
    id: "apple-18-pro-max",
    name: "iPhone 18 Pro Max",
    brand: "Apple",
    brandId: "apple",
    tagline: "Power. Beauty. Beyond.",
    price: 179900,
    originalPrice: 199900,
    badge: "👑 2026 Flagship Hero",
    isHero: true,
    rating: 5.0,
    reviewsCount: 640,
    chip: "A20 Pro (2nm Silicon)",
    display: "6.9\" Super Retina XDR ProMotion 120Hz (3000 nits)",
    camera: "48MP Fusion Triple Camera + 10x Optical Periscope Zoom",
    battery: "Up to 38 hrs video playback, MagSafe 45W Ultra Charge",
    image: "assets/iphone-18-pro-max.png",
    fallbackImage: "assets/phone.png",
    colors: [
      { name: "Deep Red Titanium", hex: "#7a1120" },
      { name: "Champagne Gold", hex: "#d8c49e" },
      { name: "Natural Titanium", hex: "#9e9d99" },
      { name: "Space Graphite", hex: "#1d1d1f" }
    ],
    storage: ["256GB", "512GB", "1TB", "2TB"],
    emi: "₹7,990/mo"
  },
  {
    id: "apple-18-pro",
    name: "iPhone 18 Pro",
    brand: "Apple",
    brandId: "apple",
    tagline: "Compact Pro Performance Without Compromise",
    price: 139900,
    originalPrice: 149900,
    badge: "🔥 Compact Pro Leader",
    isHero: false,
    rating: 4.9,
    reviewsCount: 480,
    chip: "A20 Pro Bionic",
    display: "6.3\" Super Retina XDR 120Hz ProMotion",
    camera: "48MP Fusion + 48MP Ultra-Wide + 5x Tetraprism Telephoto",
    battery: "All-Day Pro Battery with MagSafe Fast Charge",
    image: "assets/iphone-18-pro.png",
    fallbackImage: "assets/phone.png",
    colors: [
      { name: "Deep Red Titanium", hex: "#7a1120" },
      { name: "Natural Titanium", hex: "#9e9d99" },
      { name: "Space Graphite", hex: "#1d1d1f" }
    ],
    storage: ["128GB", "256GB", "512GB", "1TB"],
    emi: "₹6,220/mo"
  },
  {
    id: "apple-17-pro-max",
    name: "iPhone 17 Pro Max",
    brand: "Apple",
    brandId: "apple",
    tagline: "Titanium Powerhouse with Apple Intelligence",
    price: 144900,
    originalPrice: 159900,
    badge: "⚡ Best Value Pro Max",
    isHero: false,
    rating: 4.9,
    reviewsCount: 890,
    chip: "A19 Pro (3nm Silicon)",
    display: "6.9\" Super Retina XDR 120Hz Ceramic Shield",
    camera: "48MP Pro Triple Camera with 5x Optical Zoom",
    battery: "33 hrs video playback, 30W Fast Charge",
    image: "assets/iphone-17-pro-max.png",
    fallbackImage: "assets/phone.png",
    colors: [
      { name: "Desert Titanium", hex: "#bca487" },
      { name: "Natural Titanium", hex: "#9e9d99" },
      { name: "Black Titanium", hex: "#222224" }
    ],
    storage: ["256GB", "512GB", "1TB"],
    emi: "₹6,440/mo"
  },
  {
    id: "apple-17-pro",
    name: "iPhone 17 Pro",
    brand: "Apple",
    brandId: "apple",
    tagline: "Pro Camera Control & Ultra Light Titanium",
    price: 119900,
    originalPrice: 134900,
    badge: "✨ Pro Creator Choice",
    isHero: false,
    rating: 4.8,
    reviewsCount: 710,
    chip: "A19 Pro Bionic",
    display: "6.3\" Super Retina XDR OLED 120Hz",
    camera: "48MP Fusion + 48MP Ultra-Wide + 12MP 5x Telephoto",
    battery: "27 hrs video playback, USB-C 3.0 Speeds",
    image: "assets/iphone-17-pro.png",
    fallbackImage: "assets/phone.png",
    colors: [
      { name: "Desert Titanium", hex: "#bca487" },
      { name: "White Titanium", hex: "#e5e5ea" },
      { name: "Black Titanium", hex: "#222224" }
    ],
    storage: ["128GB", "256GB", "512GB", "1TB"],
    emi: "₹5,330/mo"
  },
  {
    id: "apple-air",
    name: "iPhone Air",
    brand: "Apple",
    brandId: "apple",
    tagline: "Impossibly Thin. Incredibly Powerful.",
    price: 99900,
    originalPrice: 109900,
    badge: "🌟 All-New Ultra Thin",
    isHero: false,
    rating: 4.9,
    reviewsCount: 320,
    chip: "A19 Bionic Silicon",
    display: "6.6\" Ultra-Slim Super Retina OLED 120Hz",
    camera: "48MP Studio Fusion Camera System",
    battery: "High-density wafer cell, MagSafe Air charging",
    image: "assets/iphone-air.png",
    fallbackImage: "assets/phone.png",
    colors: [
      { name: "Titanium Silver", hex: "#d1d5db" },
      { name: "Sky Blue", hex: "#93c5fd" },
      { name: "Blush Rose", hex: "#fbcfe8" }
    ],
    storage: ["128GB", "256GB", "512GB"],
    emi: "₹4,440/mo"
  },
  {
    id: "apple-17",
    name: "iPhone 17",
    brand: "Apple",
    brandId: "apple",
    tagline: "Apple Intelligence for Everyone",
    price: 79900,
    originalPrice: 89900,
    badge: "🎉 Most Popular Flagship",
    isHero: false,
    rating: 4.8,
    reviewsCount: 1120,
    chip: "A19 Silicon",
    display: "6.1\" Super Retina XDR with Action Button",
    camera: "48MP 2-in-1 Dual Camera with 4K Dolby Vision",
    battery: "22 hrs video playback, 50% charge in 30 min",
    image: "assets/iphone-17.png",
    fallbackImage: "assets/phone.png",
    colors: [
      { name: "Ultramarine", hex: "#3b82f6" },
      { name: "Teal Green", hex: "#14b8a6" },
      { name: "Pink", hex: "#ec4899" },
      { name: "Midnight Black", hex: "#111827" }
    ],
    storage: ["128GB", "256GB", "512GB"],
    emi: "₹3,550/mo"
  },

  // ==========================================
  // SAMSUNG GALAXY COLLECTION (6 MODELS)
  // ==========================================
  {
    id: "samsung-s26-ultra",
    name: "Samsung Galaxy S26 Ultra",
    brand: "Samsung",
    brandId: "samsung",
    tagline: "Galaxy AI. 200MP Master. Built-in S-Pen.",
    price: 139999,
    originalPrice: 154999,
    badge: "🪐 Samsung 2026 Flagship",
    isHero: true,
    rating: 5.0,
    reviewsCount: 520,
    chip: "Snapdragon 8 Elite for Galaxy (3nm)",
    display: "6.8\" Dynamic AMOLED 2X QHD+ 120Hz (3200 nits)",
    camera: "200MP Wide + 50MP 5x Periscope + 50MP Ultra-Wide + 10MP 3x",
    battery: "5,500mAh with 65W Super Fast 2.0 & Qi2 Wireless",
    image: "assets/samsung-s26-ultra.png",
    fallbackImage: "assets/phone.png",
    colors: [
      { name: "Titanium Cobalt", hex: "#1e293b" },
      { name: "Titanium Amber", hex: "#d97706" },
      { name: "Titanium Silver", hex: "#cbd5e1" }
    ],
    storage: ["256GB", "512GB", "1TB"],
    emi: "₹6,220/mo"
  },
  {
    id: "samsung-s26-plus",
    name: "Samsung Galaxy S26+",
    brand: "Samsung",
    brandId: "samsung",
    tagline: "Massive Screen. All-Day Galaxy AI Stamina.",
    price: 104999,
    originalPrice: 114999,
    badge: "🔥 Balanced Flagship Power",
    isHero: false,
    rating: 4.8,
    reviewsCount: 380,
    chip: "Snapdragon 8 Elite for Galaxy",
    display: "6.7\" Dynamic AMOLED 2X QHD+ 120Hz",
    camera: "50MP Dual Pixel + 12MP Ultra-Wide + 10MP 3x Telephoto",
    battery: "4,900mAh with 45W Fast Charging",
    image: "assets/samsung-s26-plus.png",
    fallbackImage: "assets/phone.png",
    colors: [
      { name: "Onyx Black", hex: "#18181b" },
      { name: "Marble Gray", hex: "#e4e4e7" },
      { name: "Cobalt Violet", hex: "#6366f1" }
    ],
    storage: ["256GB", "512GB"],
    emi: "₹4,660/mo"
  },
  {
    id: "samsung-s26",
    name: "Samsung Galaxy S26",
    brand: "Samsung",
    brandId: "samsung",
    tagline: "Compact Form. Pure Flagship Intelligence.",
    price: 84999,
    originalPrice: 92999,
    badge: "✨ Compact Android King",
    isHero: false,
    rating: 4.8,
    reviewsCount: 610,
    chip: "Snapdragon 8 Elite for Galaxy",
    display: "6.2\" Dynamic AMOLED 2X FHD+ 1-120Hz",
    camera: "50MP OIS + 12MP Ultra-Wide + 10MP Telephoto",
    battery: "4,100mAh with 30W Fast Charge",
    image: "assets/samsung-s26.png",
    fallbackImage: "assets/phone.png",
    colors: [
      { name: "Onyx Black", hex: "#18181b" },
      { name: "Amber Yellow", hex: "#fde047" },
      { name: "Jade Green", hex: "#10b981" }
    ],
    storage: ["128GB", "256GB", "512GB"],
    emi: "₹3,770/mo"
  },
  {
    id: "samsung-z-fold8",
    name: "Samsung Galaxy Z Fold8",
    brand: "Samsung",
    brandId: "samsung",
    tagline: "Foldable Monument. Cinematic Productivity.",
    price: 164999,
    originalPrice: 179999,
    badge: "🏆 Luxury Foldable Master",
    isHero: false,
    rating: 4.9,
    reviewsCount: 290,
    chip: "Snapdragon 8 Elite Fold Edition",
    display: "7.6\" Dynamic AMOLED 2X Foldable + 6.3\" Cover Screen",
    camera: "50MP Triple Pro Camera + Under-Display Camera",
    battery: "4,600mAh Dual Cell with Armor Aluminum Hinge",
    image: "assets/samsung-z-fold8.png",
    fallbackImage: "assets/phone.png",
    colors: [
      { name: "Crafted Black", hex: "#09090b" },
      { name: "Navy Blue", hex: "#1e3a8a" },
      { name: "Silver Shadow", hex: "#94a3b8" }
    ],
    storage: ["256GB", "512GB", "1TB"],
    emi: "₹7,330/mo"
  },
  {
    id: "samsung-z-flip8",
    name: "Samsung Galaxy Z Flip8",
    brand: "Samsung",
    brandId: "samsung",
    tagline: "Pocket Icon. FlexCam & Full Outer Display.",
    price: 109999,
    originalPrice: 119999,
    badge: "💖 Style Statement Fold",
    isHero: false,
    rating: 4.8,
    reviewsCount: 440,
    chip: "Snapdragon 8 Elite",
    display: "6.7\" Foldable 120Hz + 3.9\" Full FlexWindow Outer",
    camera: "50MP Dual Camera with Auto Zoom FlexCam",
    battery: "4,000mAh with 35W Super Fast Charge",
    image: "assets/samsung-z-flip8.png",
    fallbackImage: "assets/phone.png",
    colors: [
      { name: "Mint Emerald", hex: "#6ee7b7" },
      { name: "Peach Glow", hex: "#fdba74" },
      { name: "Silver Shadow", hex: "#cbd5e1" }
    ],
    storage: ["256GB", "512GB"],
    emi: "₹4,880/mo"
  },
  {
    id: "samsung-s26-fe",
    name: "Samsung Galaxy S26 FE",
    brand: "Samsung",
    brandId: "samsung",
    tagline: "Fan Edition. Flagship Features at Smart Price.",
    price: 59999,
    originalPrice: 65999,
    badge: "🏷️ Best Flagship Value",
    isHero: false,
    rating: 4.7,
    reviewsCount: 810,
    chip: "Exynos 2500 / Snapdragon 8 Gen 3",
    display: "6.7\" Dynamic AMOLED 2X 120Hz",
    camera: "50MP Main with OIS + 12MP Ultra-Wide + 8MP 3x Telephoto",
    battery: "4,700mAh with 25W Fast Charging",
    image: "assets/samsung-s26-fe.png",
    fallbackImage: "assets/phone.png",
    colors: [
      { name: "Blue Topaz", hex: "#38bdf8" },
      { name: "Graphite", hex: "#27272a" },
      { name: "Mint", hex: "#a7f3d0" }
    ],
    storage: ["128GB", "256GB"],
    emi: "₹2,660/mo"
  },

  // ==========================================
  // ONEPLUS COLLECTION (4 MODELS)
  // ==========================================
  {
    id: "oneplus-15",
    name: "OnePlus 15",
    brand: "OnePlus",
    brandId: "oneplus",
    tagline: "Never Settle. Extreme Speed & 150W SuperVOOC.",
    price: 69999,
    originalPrice: 79999,
    badge: "⚡ OnePlus Flagship",
    isHero: true,
    rating: 4.9,
    reviewsCount: 760,
    chip: "Snapdragon 8 Elite (3nm Extreme OC)",
    display: "6.82\" 2K 165Hz ProXDR Oriental AMOLED (4500 nits)",
    camera: "50MP Sony LYT-808 + 50MP Periscope Telephoto + 50MP Ultra-Wide (Hasselblad)",
    battery: "6,000mAh Glacier Battery with 120W SuperVOOC + 50W AIRVOOC",
    image: "assets/oneplus-15.png",
    fallbackImage: "assets/phone.png",
    colors: [
      { name: "Flowy Emerald", hex: "#065f46" },
      { name: "Silky Black", hex: "#18181b" },
      { name: "Sandstone Gold", hex: "#d4af37" }
    ],
    storage: ["256GB", "512GB", "1TB"],
    emi: "₹3,110/mo"
  },
  {
    id: "oneplus-15r",
    name: "OnePlus 15R",
    brand: "OnePlus",
    brandId: "oneplus",
    tagline: "Performance Titan. 1.5K ProXDR Gaming Beast.",
    price: 49999,
    originalPrice: 54999,
    badge: "🎮 Gaming Champion",
    isHero: false,
    rating: 4.8,
    reviewsCount: 930,
    chip: "Snapdragon 8 Gen 3 Flagship",
    display: "6.78\" 1.5K 120Hz AMOLED (4500 nits peak)",
    camera: "50MP Sony IMX890 OIS + 8MP Ultra-Wide + 2MP Macro",
    battery: "5,800mAh Dual-Cell with 100W SuperVOOC",
    image: "assets/oneplus-15r.png",
    fallbackImage: "assets/phone.png",
    colors: [
      { name: "Cool Blue", hex: "#0284c7" },
      { name: "Iron Gray", hex: "#374151" }
    ],
    storage: ["128GB", "256GB", "512GB"],
    emi: "₹2,220/mo"
  },
  {
    id: "oneplus-n6",
    name: "OnePlus Nord 6 (N6)",
    brand: "OnePlus",
    brandId: "oneplus",
    tagline: "All-Metal Unibody. Fast & Smooth Forever.",
    price: 32999,
    originalPrice: 35999,
    badge: "🔥 Metallic Precision",
    isHero: false,
    rating: 4.8,
    reviewsCount: 650,
    chip: "Snapdragon 7+ Gen 3",
    display: "6.74\" 120Hz Ultra HDR AMOLED",
    camera: "50MP Sony LYT-600 with OIS + 8MP Ultra-Wide",
    battery: "5,500mAh with 100W SuperVOOC Charge",
    image: "assets/oneplus-n6.png",
    fallbackImage: "assets/phone.png",
    colors: [
      { name: "Mercurial Silver", hex: "#94a3b8" },
      { name: "Obsidian Midnight", hex: "#0f172a" },
      { name: "Oasis Green", hex: "#15803d" }
    ],
    storage: ["128GB", "256GB"],
    emi: "₹1,460/mo"
  },
  {
    id: "oneplus-n6x",
    name: "OnePlus Nord CE 6 (N6x)",
    brand: "OnePlus",
    brandId: "oneplus",
    tagline: "Core Edition Flagship DNA at Irresistible Price.",
    price: 24999,
    originalPrice: 27999,
    badge: "✨ Most Loved Mid-Ranger",
    isHero: false,
    rating: 4.7,
    reviewsCount: 880,
    chip: "Snapdragon 7s Gen 3",
    display: "6.7\" 120Hz AMOLED Aqua Touch Display",
    camera: "50MP Sony Dual Camera with OIS",
    battery: "5,500mAh with 80W Fast Charging",
    image: "assets/oneplus-n6x.png",
    fallbackImage: "assets/phone.png",
    colors: [
      { name: "Celadon Marble", hex: "#a7f3d0" },
      { name: "Dark Chrome", hex: "#334155" }
    ],
    storage: ["128GB", "256GB"],
    emi: "₹1,110/mo"
  },

  // ==========================================
  // GOOGLE PIXEL COLLECTION (5 MODELS)
  // ==========================================
  {
    id: "pixel-11-pro",
    name: "Google Pixel 11 Pro",
    brand: "Google",
    brandId: "google",
    tagline: "Engineered by Google. Pure Gemini AI Superpower.",
    price: 119999,
    originalPrice: 129999,
    badge: "🤖 Google 2026 Flagship",
    isHero: true,
    rating: 4.9,
    reviewsCount: 410,
    chip: "Google Tensor G6 with TPU AI Engine",
    display: "6.8\" Super Actua LTPO OLED 1-120Hz (3000 nits)",
    camera: "50MP Octa-PD Wide + 48MP Quad-PD 5x Telephoto + 48MP Ultra-Wide",
    battery: "5,100mAh with 37W Fast Charge + 7 Years OS Updates",
    image: "assets/pixel-11-pro.png",
    fallbackImage: "assets/phone.png",
    colors: [
      { name: "Obsidian Black", hex: "#18181b" },
      { name: "Porcelain White", hex: "#f4f4f5" },
      { name: "Hazel Gray", hex: "#71717a" },
      { name: "Rose Quartz", hex: "#f472b6" }
    ],
    storage: ["128GB", "256GB", "512GB", "1TB"],
    emi: "₹5,330/mo"
  },
  {
    id: "pixel-11",
    name: "Google Pixel 11",
    brand: "Google",
    brandId: "google",
    tagline: "Gemini Built In. Pro Photography in Sleek Design.",
    price: 79999,
    originalPrice: 84999,
    badge: "🔥 Smart AI Everyday Phone",
    isHero: false,
    rating: 4.8,
    reviewsCount: 560,
    chip: "Google Tensor G6",
    display: "6.3\" Actua OLED 60-120Hz (2700 nits)",
    camera: "50MP Main + 48MP Ultra-Wide with Macro Focus",
    battery: "4,700mAh with Fast Wireless Qi2",
    image: "assets/pixel-11.png",
    fallbackImage: "assets/phone.png",
    colors: [
      { name: "Obsidian", hex: "#18181b" },
      { name: "Wintergreen", hex: "#a7f3d0" },
      { name: "Peony Pink", hex: "#f472b6" }
    ],
    storage: ["128GB", "256GB"],
    emi: "₹3,550/mo"
  },
  {
    id: "pixel-10-pro-xl",
    name: "Google Pixel 10 Pro XL",
    brand: "Google",
    brandId: "google",
    tagline: "Extra Large Screen. Legendary Pixel Computational Cameras.",
    price: 104999,
    originalPrice: 124999,
    badge: "⚡ Great Value Pro XL",
    isHero: false,
    rating: 4.8,
    reviewsCount: 680,
    chip: "Google Tensor G5 (3nm TSMC)",
    display: "6.8\" Super Actua LTPO 120Hz",
    camera: "50MP Wide + 48MP 5x Telephoto + 48MP Ultra-Wide",
    battery: "5,060mAh with 37W Fast Charging",
    image: "assets/pixel-10-pro-xl.png",
    fallbackImage: "assets/phone.png",
    colors: [
      { name: "Obsidian", hex: "#18181b" },
      { name: "Porcelain", hex: "#fafafa" },
      { name: "Hazel", hex: "#78716c" }
    ],
    storage: ["128GB", "256GB", "512GB"],
    emi: "₹4,660/mo"
  },
  {
    id: "pixel-10-pro",
    name: "Google Pixel 10 Pro",
    brand: "Google",
    brandId: "google",
    tagline: "Compact Pro Dimensions with Zero Hardware Compromise.",
    price: 89999,
    originalPrice: 109999,
    badge: "✨ Compact Pro Flagship",
    isHero: false,
    rating: 4.8,
    reviewsCount: 510,
    chip: "Google Tensor G5",
    display: "6.3\" Super Actua LTPO 120Hz",
    camera: "50MP Triple Camera System with 30x Super Res Zoom",
    battery: "4,700mAh with Wireless Fast Charging",
    image: "assets/pixel-10-pro.png",
    fallbackImage: "assets/phone.png",
    colors: [
      { name: "Obsidian", hex: "#18181b" },
      { name: "Porcelain", hex: "#fafafa" },
      { name: "Rose Quartz", hex: "#fda4af" }
    ],
    storage: ["128GB", "256GB", "512GB"],
    emi: "₹3,990/mo"
  },
  {
    id: "pixel-10",
    name: "Google Pixel 10",
    brand: "Google",
    brandId: "google",
    tagline: "Clean Android Experience with Magic Editor & Best Take.",
    price: 64999,
    originalPrice: 79999,
    badge: "🌟 Best Software Experience",
    isHero: false,
    rating: 4.7,
    reviewsCount: 920,
    chip: "Google Tensor G5",
    display: "6.3\" Actua OLED 120Hz (2700 nits peak)",
    camera: "50MP Dual Camera with Real Tone & Night Sight",
    battery: "4,700mAh with Extreme Battery Saver",
    image: "assets/pixel-10.png",
    fallbackImage: "assets/phone.png",
    colors: [
      { name: "Obsidian", hex: "#18181b" },
      { name: "Porcelain", hex: "#fafafa" },
      { name: "Wintergreen", hex: "#86efac" }
    ],
    storage: ["128GB", "256GB"],
    emi: "₹2,880/mo"
  },

  // ==========================================
  // XIAOMI / REDMI COLLECTION (5 MODELS)
  // ==========================================
  {
    id: "xiaomi-17-ultra",
    name: "Xiaomi 17 Ultra",
    brand: "Xiaomi",
    brandId: "xiaomi",
    tagline: "Leica Optical Master. 1-inch Quad Sensors.",
    price: 99999,
    originalPrice: 119999,
    badge: "🔥 Leica Optical Master",
    isHero: true,
    rating: 4.9,
    reviewsCount: 380,
    chip: "Snapdragon 8 Elite (3nm Architecture)",
    display: "6.73\" 2K LTPO AMOLED 120Hz (3000 nits Dolby Vision)",
    camera: "50MP 1-inch LYT-900 Variable Aperture + 200MP Periscope + 50MP Telephoto + 50MP Ultra-Wide (Leica Summicron)",
    battery: "5,300mAh with 90W HyperCharge + 80W Wireless",
    image: "assets/xiaomi-17-ultra.png",
    fallbackImage: "assets/phone.png",
    colors: [
      { name: "Titanium Ceramic", hex: "#e2e8f0" },
      { name: "Obsidian Black Leather", hex: "#18181b" },
      { name: "Leica White Edition", hex: "#f8fafc" }
    ],
    storage: ["256GB", "512GB", "1TB"],
    emi: "₹4,440/mo"
  },
  {
    id: "xiaomi-17",
    name: "Xiaomi 17",
    brand: "Xiaomi",
    brandId: "xiaomi",
    tagline: "Compact Form. Pure Leica Master Optical Brilliance.",
    price: 69999,
    originalPrice: 79999,
    badge: "✨ Compact Photography King",
    isHero: false,
    rating: 4.8,
    reviewsCount: 490,
    chip: "Snapdragon 8 Elite",
    display: "6.36\" 1.5K 120Hz LTPO Flat OLED",
    camera: "50MP Light Fusion 900 + 50MP 3.2x Telephoto + 50MP Ultra-Wide (Leica)",
    battery: "4,610mAh with 90W HyperCharge + 50W Wireless",
    image: "assets/xiaomi-17.png",
    fallbackImage: "assets/phone.png",
    colors: [
      { name: "Emerald Green", hex: "#065f46" },
      { name: "Black", hex: "#18181b" },
      { name: "Snow White", hex: "#ffffff" }
    ],
    storage: ["256GB", "512GB"],
    emi: "₹3,110/mo"
  },
  {
    id: "redmi-note-17-pro-max",
    name: "Redmi Note 17 Pro Max",
    brand: "Xiaomi",
    brandId: "xiaomi",
    tagline: "200MP OIS Camera & 120W HyperCharge Flagship Killer.",
    price: 34999,
    originalPrice: 38999,
    badge: "👑 Pro Max Mid-Range King",
    isHero: false,
    rating: 4.8,
    reviewsCount: 1420,
    chip: "MediaTek Dimensity 8400-Ultra / Snapdragon 7+ Gen 3",
    display: "6.67\" 1.5K 120Hz Curved CrystalRes AMOLED",
    camera: "200MP Samsung ISOCELL HP3 with OIS + 8MP Ultra-Wide",
    battery: "5,100mAh with 120W HyperCharge (100% in 19 mins)",
    image: "assets/redmi-note-17-pro-max.png",
    fallbackImage: "assets/phone.png",
    colors: [
      { name: "Midnight Black", hex: "#18181b" },
      { name: "Aurora Purple", hex: "#a855f7" },
      { name: "Fusion Titanium", hex: "#64748b" }
    ],
    storage: ["128GB", "256GB", "512GB"],
    emi: "₹1,550/mo"
  },
  {
    id: "redmi-note-17-pro",
    name: "Redmi Note 17 Pro",
    brand: "Xiaomi",
    brandId: "xiaomi",
    tagline: "Slim Curved Design. 200MP OIS Clarity.",
    price: 27999,
    originalPrice: 31999,
    badge: "⚡ Best Value Note",
    isHero: false,
    rating: 4.7,
    reviewsCount: 1100,
    chip: "MediaTek Dimensity 7300-Ultra",
    display: "6.67\" 1.5K 120Hz AMOLED 3D Curved Screen",
    camera: "200MP OIS Ultra-Clear Main Camera + 8MP Ultra-Wide",
    battery: "5,000mAh with 67W Turbo Charge",
    image: "assets/redmi-note-17-pro.png",
    fallbackImage: "assets/phone.png",
    colors: [
      { name: "Midnight Black", hex: "#18181b" },
      { name: "Coral Purple", hex: "#c084fc" },
      { name: "Arctic White", hex: "#f8fafc" }
    ],
    storage: ["128GB", "256GB"],
    emi: "₹1,240/mo"
  },
  {
    id: "redmi-note-17",
    name: "Redmi Note 17",
    brand: "Xiaomi",
    brandId: "xiaomi",
    tagline: "Super Slim 5G. 108MP Camera. Incredible Value.",
    price: 19999,
    originalPrice: 22999,
    badge: "🌟 Everyday 5G Champ",
    isHero: false,
    rating: 4.7,
    reviewsCount: 1650,
    chip: "MediaTek Dimensity 6300 5G",
    display: "6.67\" 120Hz FHD+ Ultra-Slim Bezel Display",
    camera: "108MP 3x In-Sensor Zoom Camera",
    battery: "5,000mAh with 33W Fast Charge",
    image: "assets/redmi-note-17.png",
    fallbackImage: "assets/phone.png",
    colors: [
      { name: "Prism Gold", hex: "#fbbf24" },
      { name: "Graphite Black", hex: "#18181b" },
      { name: "Ocean Teal", hex: "#0d9488" }
    ],
    storage: ["128GB", "256GB"],
    emi: "₹880/mo"
  },

  // ==========================================
  // VIVO COLLECTION (3 MODELS)
  // ==========================================
  {
    id: "vivo-x300-ultra",
    name: "vivo X300 Ultra",
    brand: "vivo",
    brandId: "vivo",
    tagline: "ZEISS 200MP APO Telephoto. Cinematic Benchmark.",
    price: 94999,
    originalPrice: 109999,
    badge: "📸 ZEISS Master Optics",
    isHero: true,
    rating: 5.0,
    reviewsCount: 310,
    chip: "Snapdragon 8 Elite with V4+ Dual Imaging Chips",
    display: "6.78\" 2K 120Hz 8T LTPO AMOLED (3000 nits)",
    camera: "50MP 1-inch LYT-900 Main + 200MP ZEISS APO Telephoto + 50MP Ultra-Wide",
    battery: "6,000mAh BlueVolt Silicon Anode + 100W FlashCharge",
    image: "assets/vivo-x300-ultra.png",
    fallbackImage: "assets/phone.png",
    colors: [
      { name: "Titanium Sunset", hex: "#d97706" },
      { name: "Asteroid Black", hex: "#18181b" },
      { name: "Moonlight White", hex: "#f8fafc" }
    ],
    storage: ["256GB", "512GB", "1TB"],
    emi: "₹4,220/mo"
  },
  {
    id: "vivo-x300-pro",
    name: "vivo X300 Pro",
    brand: "vivo",
    brandId: "vivo",
    tagline: "Dimensity 9400 & ZEISS Multifocal Portrait Studio.",
    price: 89999,
    originalPrice: 99999,
    badge: "🔥 Portrait Studio Power",
    isHero: false,
    rating: 4.9,
    reviewsCount: 420,
    chip: "MediaTek Dimensity 9400 with V3+ ISP",
    display: "6.78\" 1.5K 120Hz Quad Curved AMOLED",
    camera: "50MP Sony LYT-818 Main + 200MP ZEISS APO Telephoto + 50MP Ultra-Wide",
    battery: "6,000mAh with 90W FlashCharge + 30W Wireless",
    image: "assets/vivo-x300-pro.png",
    fallbackImage: "assets/phone.png",
    colors: [
      { name: "Titanium Gray", hex: "#64748b" },
      { name: "Midnight Black", hex: "#18181b" }
    ],
    storage: ["256GB", "512GB"],
    emi: "₹3,990/mo"
  },
  {
    id: "vivo-x300",
    name: "vivo X300",
    brand: "vivo",
    brandId: "vivo",
    tagline: "Slim Flat Flagship. Pure ZEISS Natural Colors.",
    price: 69999,
    originalPrice: 76999,
    badge: "✨ Slim Flagship Portrait",
    isHero: false,
    rating: 4.8,
    reviewsCount: 390,
    chip: "MediaTek Dimensity 9400",
    display: "6.67\" 1.5K 120Hz Ultra-Slim Flat AMOLED",
    camera: "50MP Sony IMX921 Main + 50MP ZEISS Telephoto + 50MP Ultra-Wide",
    battery: "5,800mAh with 90W FlashCharge",
    image: "assets/vivo-x300.png",
    fallbackImage: "assets/phone.png",
    colors: [
      { name: "Aurora Blue", hex: "#0284c7" },
      { name: "Titanium Gray", hex: "#64748b" },
      { name: "Carbon Black", hex: "#18181b" }
    ],
    storage: ["256GB", "512GB"],
    emi: "₹3,110/mo"
  },

  // ==========================================
  // OPPO COLLECTION (3 MODELS)
  // ==========================================
  {
    id: "oppo-find-x9-ultra",
    name: "OPPO Find X9 Ultra",
    brand: "OPPO",
    brandId: "oppo",
    tagline: "Hasselblad Master. Dual Periscope Quad Camera.",
    price: 99999,
    originalPrice: 114999,
    badge: "✨ Hasselblad Dual Periscope",
    isHero: true,
    rating: 4.9,
    reviewsCount: 280,
    chip: "Snapdragon 8 Elite Extreme",
    display: "6.82\" 2K 120Hz ProXDR Dynamic Curved LTPO",
    camera: "50MP 1-inch LYT-900 + 50MP 3x Periscope + 50MP 6x Periscope + 50MP Ultra-Wide (Hasselblad)",
    battery: "5,800mAh with 100W SUPERVOOC + 50W AIRVOOC",
    image: "assets/oppo-find-x9-ultra.png",
    fallbackImage: "assets/phone.png",
    colors: [
      { name: "Ocean Blue Leather", hex: "#0369a1" },
      { name: "Sepia Brown Leather", hex: "#78350f" },
      { name: "Titanium Black Glass", hex: "#18181b" }
    ],
    storage: ["256GB", "512GB", "1TB"],
    emi: "₹4,440/mo"
  },
  {
    id: "oppo-find-x9-pro",
    name: "OPPO Find X9 Pro",
    brand: "OPPO",
    brandId: "oppo",
    tagline: "Ultra-Thin Quad Curved Screen with Hasselblad Master Optics.",
    price: 84999,
    originalPrice: 94999,
    badge: "🔥 Hasselblad Optical Pro",
    isHero: false,
    rating: 4.8,
    reviewsCount: 360,
    chip: "MediaTek Dimensity 9400 Flagship",
    display: "6.78\" 1.5K 120Hz LTPO Quad Micro-Curved",
    camera: "50MP Sony LYT-808 + 73MP Periscope Telephoto + 50MP Ultra-Wide",
    battery: "5,910mAh with 80W SUPERVOOC + 50W Wireless",
    image: "assets/oppo-find-x9-pro.png",
    fallbackImage: "assets/phone.png",
    colors: [
      { name: "Starry Black", hex: "#18181b" },
      { name: "Space Silver", hex: "#cbd5e1" },
      { name: "Pearl White", hex: "#f8fafc" }
    ],
    storage: ["256GB", "512GB"],
    emi: "₹3,770/mo"
  },
  {
    id: "oppo-find-x9",
    name: "OPPO Find X9",
    brand: "OPPO",
    brandId: "oppo",
    tagline: "Compact Masterpiece. Triple 50MP Hasselblad Camera.",
    price: 64999,
    originalPrice: 72999,
    badge: "🌟 Slim Hasselblad Flagship",
    isHero: false,
    rating: 4.8,
    reviewsCount: 390,
    chip: "MediaTek Dimensity 9400",
    display: "6.59\" 1.5K 120Hz Flat OLED with Ultra-Narrow 1.45mm Bezels",
    camera: "50MP Main + 50MP 3x Periscope + 50MP Ultra-Wide",
    battery: "5,630mAh Glacier Battery with 80W SUPERVOOC",
    image: "assets/oppo-find-x9.png",
    fallbackImage: "assets/phone.png",
    colors: [
      { name: "Starry Black", hex: "#18181b" },
      { name: "Titanium Gray", hex: "#64748b" },
      { name: "Wind Chaser Blue", hex: "#38bdf8" }
    ],
    storage: ["256GB", "512GB"],
    emi: "₹2,880/mo"
  }
];

// Helper Functions
function getProductById(id) {
  return PRODUCTS.find(p => p.id === id);
}

function getProductsByBrand(brandId) {
  if (!brandId || brandId === "all") return PRODUCTS;
  return PRODUCTS.filter(p => p.brandId.toLowerCase() === brandId.toLowerCase());
}

function getBrandConfig(brandId) {
  return BRANDS_CONFIG.find(b => b.id.toLowerCase() === brandId.toLowerCase());
}

function formatPrice(val) {
  return "₹" + Number(val).toLocaleString("en-IN");
}

// =========================================================================
// MOBILE STATION — FLAGSHIP SMARTPHONE CATALOG & STORE DATA (2026 EDITION)
// =========================================================================

const STORE_CONFIG = {
  primaryPhone: "919322160461",
  storeName: "Mobile Station",
  tagline: "Luxury Multi-Brand Smartphone Showroom",
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

const BRANDS = [
  { id: "all", name: "All Flagships", count: 32 },
  { id: "apple", name: "Apple", count: 6, logo: "🍎" },
  { id: "samsung", name: "Samsung", count: 6, logo: "🪐" },
  { id: "oneplus", name: "OnePlus", count: 4, logo: "⚡" },
  { id: "google", name: "Google Pixel", count: 5, logo: "🤖" },
  { id: "xiaomi", name: "Xiaomi / Redmi", count: 5, logo: "🔥" },
  { id: "vivo", name: "vivo", count: 4, logo: "📸" },
  { id: "oppo", name: "OPPO", count: 3, logo: "✨" }
];

const PRODUCTS = [
  // ==========================================
  // APPLE COLLECTION
  // ==========================================
  {
    id: "apple-18-pro-max",
    name: "iPhone 18 Pro Max",
    brand: "Apple",
    category: "apple",
    tagline: "Power. Beauty. Beyond.",
    price: 179900,
    originalPrice: 199900,
    badge: "👑 2026 Flagship Hero",
    isFeaturedHero: true,
    rating: 5.0,
    reviewsCount: 640,
    chip: "A20 Pro (2nm Silicon)",
    display: "6.9\" Super Retina XDR ProMotion 120Hz (3000 nits)",
    camera: "48MP Fusion Triple Camera + 10x Optical Periscope Zoom",
    battery: "Up to 38 hrs video playback, MagSafe 45W Ultra Charge",
    image: "assets/iphone-18-pro-max.png",
    colors: [
      { name: "Deep Red Titanium", hex: "#7a1120", image: "assets/iphone-18-pro-max.png" },
      { name: "Champagne Gold", hex: "#d8c49e", image: "assets/iphone-18-pro-max.png" },
      { name: "Natural Titanium", hex: "#9e9d99", image: "assets/iphone-18-pro-max.png" },
      { name: "Space Graphite", hex: "#1d1d1f", image: "assets/iphone-18-pro-max.png" }
    ],
    storage: ["256GB", "512GB", "1TB", "2TB"],
    emi: "₹7,990/mo"
  },
  {
    id: "apple-18-pro",
    name: "iPhone 18 Pro",
    brand: "Apple",
    category: "apple",
    tagline: "Compact Pro Performance Without Compromise",
    price: 139900,
    originalPrice: 149900,
    badge: "🔥 Compact Pro Leader",
    isFeaturedHero: false,
    rating: 4.9,
    reviewsCount: 480,
    chip: "A20 Pro Bionic",
    display: "6.3\" Super Retina XDR 120Hz ProMotion",
    camera: "48MP Fusion + 48MP Ultra-Wide + 5x Tetraprism Telephoto",
    battery: "All-Day Pro Battery with MagSafe Charging",
    image: "assets/iphone-18-pro.png",
    colors: [
      { name: "Deep Red Titanium", hex: "#7a1120", image: "assets/iphone-18-pro.png" },
      { name: "Natural Titanium", hex: "#9e9d99", image: "assets/iphone-18-pro.png" },
      { name: "Space Graphite", hex: "#1d1d1f", image: "assets/iphone-18-pro.png" }
    ],
    storage: ["128GB", "256GB", "512GB", "1TB"],
    emi: "₹6,210/mo"
  },
  {
    id: "apple-17-pro-max",
    name: "iPhone 17 Pro Max",
    brand: "Apple",
    category: "apple",
    tagline: "Proven Titanium Durability & Pro Cameras",
    price: 144900,
    originalPrice: 159900,
    badge: "⭐ Bestseller Pro",
    isFeaturedHero: false,
    rating: 4.9,
    reviewsCount: 920,
    chip: "A19 Pro Bionic",
    display: "6.9\" Super Retina XDR OLED (120Hz)",
    camera: "48MP Triple Lens with 5x Telephoto & 4K 120fps Dolby Vision",
    battery: "33 hrs video playback, MagSafe Fast Charging",
    image: "assets/iphone-17-pro-max.png",
    colors: [
      { name: "Desert Titanium", hex: "#c7b29a", image: "assets/iphone-17-pro-max.png" },
      { name: "Black Titanium", hex: "#1e1e20", image: "assets/iphone-17-pro-max.png" },
      { name: "White Titanium", hex: "#e5e5ea", image: "assets/iphone-17-pro-max.png" }
    ],
    storage: ["256GB", "512GB", "1TB"],
    emi: "₹6,450/mo"
  },
  {
    id: "apple-17-pro",
    name: "iPhone 17 Pro",
    brand: "Apple",
    category: "apple",
    tagline: "Grade-5 Titanium Architecture & Action Button",
    price: 119900,
    originalPrice: 134900,
    badge: "✨ Pro Grade",
    isFeaturedHero: false,
    rating: 4.8,
    reviewsCount: 510,
    chip: "A19 Pro (3nm)",
    display: "6.3\" ProMotion 120Hz Super Retina XDR",
    camera: "48MP Main + 48MP Ultra-Wide + 5x Telephoto",
    battery: "Full Day Pro Life with Smart Battery Intelligence",
    image: "assets/iphone-17-pro.png",
    colors: [
      { name: "Natural Titanium", hex: "#9e9d99", image: "assets/iphone-17-pro.png" },
      { name: "Black Titanium", hex: "#1e1e20", image: "assets/iphone-17-pro.png" }
    ],
    storage: ["128GB", "256GB", "512GB"],
    emi: "₹5,330/mo"
  },
  {
    id: "apple-iphone-air",
    name: "iPhone Air",
    brand: "Apple",
    category: "apple",
    tagline: "Ultra-Thin 5mm Futuristic Titanium Chassis",
    price: 99900,
    originalPrice: 109900,
    badge: "🪶 Ultra-Slim Luxury",
    isFeaturedHero: false,
    rating: 4.9,
    reviewsCount: 310,
    chip: "A19 Bionic Silicon",
    display: "6.6\" OLED 120Hz Edge-to-Edge Fluid Display",
    camera: "48MP Dual Fusion Optical Engine",
    battery: "Next-Gen Solid State Battery (26 hrs)",
    image: "assets/iphone-air.png",
    colors: [
      { name: "Cloud White", hex: "#f5f5f7", image: "assets/iphone-air.png" },
      { name: "Crimson Red", hex: "#871024", image: "assets/iphone-air.png" },
      { name: "Obsidian", hex: "#18181a", image: "assets/iphone-air.png" }
    ],
    storage: ["256GB", "512GB"],
    emi: "₹4,440/mo"
  },
  {
    id: "apple-17",
    name: "iPhone 17",
    brand: "Apple",
    category: "apple",
    tagline: "Apple Intelligence & 120Hz ProMotion For Everyone",
    price: 79900,
    originalPrice: 84900,
    badge: "🔥 Super Value Flagship",
    isFeaturedHero: false,
    rating: 4.8,
    reviewsCount: 780,
    chip: "A19 Bionic",
    display: "6.1\" 120Hz OLED with Dynamic Island & Camera Control",
    camera: "48MP Fusion Camera + 2x Telephoto Sensor-Crop",
    battery: "24 hrs video playback, USB-C Fast Charge",
    image: "assets/iphone-17.png",
    colors: [
      { name: "Ultramarine", hex: "#2b4c8a", image: "assets/iphone-17.png" },
      { name: "Starlight Red", hex: "#9e1529", image: "assets/iphone-17.png" },
      { name: "Teal", hex: "#43827d", image: "assets/iphone-17.png" }
    ],
    storage: ["128GB", "256GB", "512GB"],
    emi: "₹3,550/mo"
  },

  // ==========================================
  // SAMSUNG COLLECTION
  // ==========================================
  {
    id: "samsung-s26-ultra",
    name: "Samsung Galaxy S26 Ultra",
    brand: "Samsung",
    category: "samsung",
    tagline: "200MP Quad Camera, S-Pen & Galaxy AI 3.0",
    price: 139999,
    originalPrice: 154999,
    badge: "🪐 Ultimate Android King",
    isFeaturedHero: false,
    rating: 5.0,
    reviewsCount: 580,
    chip: "Snapdragon 8 Elite Gen 2 for Galaxy",
    display: "6.8\" Dynamic AMOLED 2X (3200 nits, Anti-Reflective Armor)",
    camera: "200MP Main + 50MP 5x Periscope + 50MP 3x + 50MP Ultra-Wide",
    battery: "5000 mAh + 65W Super Fast Charge 2.0 & Built-in S-Pen",
    image: "assets/samsung-s26-ultra.png",
    colors: [
      { name: "Titanium Wine Red", hex: "#63101b", image: "assets/samsung-s26-ultra.png" },
      { name: "Titanium Black", hex: "#1c1c1e", image: "assets/samsung-s26-ultra.png" },
      { name: "Titanium Silver", hex: "#c4c6cb", image: "assets/samsung-s26-ultra.png" }
    ],
    storage: ["256GB", "512GB", "1TB"],
    emi: "₹6,220/mo"
  },
  {
    id: "samsung-s26-plus",
    name: "Samsung Galaxy S26+",
    brand: "Samsung",
    category: "samsung",
    tagline: "Big Screen Dynamic AMOLED with All-Day AI Power",
    price: 104999,
    originalPrice: 114999,
    badge: "⚡ Power & Style",
    isFeaturedHero: false,
    rating: 4.8,
    reviewsCount: 340,
    chip: "Snapdragon 8 Elite Gen 2",
    display: "6.7\" QHD+ Dynamic AMOLED 2X 120Hz",
    camera: "50MP Triple Camera with AI ProVisual Engine",
    battery: "4900 mAh with 45W Fast Charging",
    image: "assets/samsung-s26-plus.png",
    colors: [
      { name: "Cobalt Violet", hex: "#3b344d", image: "assets/samsung-s26-plus.png" },
      { name: "Amber Yellow", hex: "#d5b47a", image: "assets/samsung-s26-plus.png" },
      { name: "Onyx Black", hex: "#181819", image: "assets/samsung-s26-plus.png" }
    ],
    storage: ["256GB", "512GB"],
    emi: "₹4,660/mo"
  },
  {
    id: "samsung-s26",
    name: "Samsung Galaxy S26",
    brand: "Samsung",
    category: "samsung",
    tagline: "Compact Flagship Powerhouse with Armor Aluminum",
    price: 84999,
    originalPrice: 92999,
    badge: "🌟 Compact Champion",
    isFeaturedHero: false,
    rating: 4.8,
    reviewsCount: 410,
    chip: "Snapdragon 8 Elite / Exynos 2600",
    display: "6.2\" FHD+ Dynamic AMOLED 2X 120Hz",
    camera: "50MP Main + 12MP Ultra-Wide + 10MP 3x Telephoto",
    battery: "4000 mAh with 30W Fast Charge",
    image: "assets/samsung-s26.png",
    colors: [
      { name: "Jade Green", hex: "#3f564d", image: "assets/samsung-s26.png" },
      { name: "Sandstone Gold", hex: "#cfbfa6", image: "assets/samsung-s26.png" }
    ],
    storage: ["128GB", "256GB"],
    emi: "₹3,770/mo"
  },
  {
    id: "samsung-z-fold8",
    name: "Samsung Galaxy Z Fold8",
    brand: "Samsung",
    category: "samsung",
    tagline: "The Thinnest, Lightest AI Foldable Flagship Ever",
    price: 169999,
    originalPrice: 184999,
    badge: "📱 Next-Gen Foldable",
    isFeaturedHero: false,
    rating: 4.9,
    reviewsCount: 220,
    chip: "Snapdragon 8 Elite Gen 2 for Galaxy",
    display: "7.7\" Foldable Dynamic AMOLED 2X + 6.4\" Outer Screen",
    camera: "108MP Pro Sensor with Under-Display Camera",
    battery: "4600 mAh Dual Cell + 45W Fast Charging",
    image: "assets/samsung-z-fold8.png",
    colors: [
      { name: "Crafted Black", hex: "#121213", image: "assets/samsung-z-fold8.png" },
      { name: "Silver Shadow", hex: "#c8cbcf", image: "assets/samsung-z-fold8.png" },
      { name: "Crimson Burgundy", hex: "#6e121e", image: "assets/samsung-z-fold8.png" }
    ],
    storage: ["256GB", "512GB", "1TB"],
    emi: "₹7,550/mo"
  },
  {
    id: "samsung-z-flip8",
    name: "Samsung Galaxy Z Flip8",
    brand: "Samsung",
    category: "samsung",
    tagline: "Full-Cover Screen & Hands-Free FlexCam AI",
    price: 109999,
    originalPrice: 119999,
    badge: "✨ Fashion Icon",
    isFeaturedHero: false,
    rating: 4.8,
    reviewsCount: 310,
    chip: "Snapdragon 8 Elite Gen 2",
    display: "6.7\" Internal Foldable 120Hz + 3.9\" Flex Window",
    camera: "50MP Dual Camera with Auto Zoom & FlexCam",
    battery: "4000 mAh with All-Day AI Battery Management",
    image: "assets/samsung-z-flip8.png",
    colors: [
      { name: "Mint Emerald", hex: "#94bfa5", image: "assets/phone.png" },
      { name: "Lavish Peach", hex: "#e09f87", image: "assets/phone.png" },
      { name: "Midnight Black", hex: "#19191a", image: "assets/phone.png" }
    ],
    storage: ["256GB", "512GB"],
    emi: "₹4,880/mo"
  },
  {
    id: "samsung-s26-fe",
    name: "Samsung Galaxy S26 FE",
    brand: "Samsung",
    category: "samsung",
    tagline: "Flagship Experiences at an Unbeatable Fan Price",
    price: 54999,
    originalPrice: 62999,
    badge: "🔥 Fan Edition Champion",
    isFeaturedHero: false,
    rating: 4.7,
    reviewsCount: 460,
    chip: "Exynos 2500 / Snapdragon 8s Gen 4",
    display: "6.4\" Dynamic AMOLED 2X 120Hz",
    camera: "50MP OIS + 12MP Ultra-Wide + 8MP 3x Telephoto",
    battery: "4700 mAh Fast Charging",
    image: "assets/samsung-s26-fe.png",
    colors: [
      { name: "Blue Topaz", hex: "#3b587d", image: "assets/samsung-s26-fe.png" },
      { name: "Graphite", hex: "#262627", image: "assets/samsung-s26-fe.png" }
    ],
    storage: ["128GB", "256GB"],
    emi: "₹2,440/mo"
  },

  // ==========================================
  // ONEPLUS COLLECTION
  // ==========================================
  {
    id: "oneplus-15",
    name: "OnePlus 15",
    brand: "OnePlus",
    category: "oneplus",
    tagline: "Extreme 2K 165Hz Oriental Display & 150W SuperVOOC",
    price: 74999,
    originalPrice: 79999,
    badge: "⚡ Official 2026 Flagship",
    isFeaturedHero: false,
    rating: 4.9,
    reviewsCount: 430,
    chip: "Snapdragon 8 Elite 3nm Flagship",
    display: "6.82\" 2K 165Hz 10-bit LTPO 4.0 Oriental Display",
    camera: "50MP LYT-900 Main + 50MP Periscope + Hasselblad Color 6.0",
    battery: "6500 mAh Glacier Battery + 150W SuperVOOC & 50W Wireless",
    image: "assets/oneplus-15.png",
    colors: [
      { name: "Sandstone Gold", hex: "#d5c9b1", image: "assets/oneplus-15.png" },
      { name: "Emerald Flow", hex: "#1c3c33", image: "assets/oneplus-15.png" },
      { name: "Silky Black", hex: "#171718", image: "assets/oneplus-15.png" }
    ],
    storage: ["256GB", "512GB", "1TB"],
    emi: "₹3,330/mo"
  },
  {
    id: "oneplus-15r",
    name: "OnePlus 15R",
    brand: "OnePlus",
    category: "oneplus",
    tagline: "Performance Flagship Killer with 6500mAh Glacier Battery",
    price: 49999,
    originalPrice: 54999,
    badge: "🚀 Flagship Killer",
    isFeaturedHero: false,
    rating: 4.8,
    reviewsCount: 390,
    chip: "Snapdragon 8 Gen 4",
    display: "6.78\" 1.5K 144Hz Super Fluid AMOLED",
    camera: "50MP Sony IMX906 OIS Main + 8MP Ultra-Wide",
    battery: "6500 mAh + 100W SUPERVOOC Fast Charge",
    image: "assets/oneplus-15.png",
    colors: [
      { name: "Cool Blue", hex: "#35597a", image: "assets/oneplus-15.png" },
      { name: "Iron Gray", hex: "#2b2c2f", image: "assets/oneplus-15.png" }
    ],
    storage: ["128GB", "256GB"],
    emi: "₹2,220/mo"
  },
  {
    id: "oneplus-n6",
    name: "OnePlus N6",
    brand: "OnePlus",
    category: "oneplus",
    tagline: "Fast & Smooth 5G with OxygenOS 16 Fluid UI",
    price: 24999,
    originalPrice: 28999,
    badge: "⭐ Everyday Power",
    isFeaturedHero: false,
    rating: 4.6,
    reviewsCount: 290,
    chip: "Snapdragon 7+ Gen 3",
    display: "6.72\" 120Hz FHD+ Super AMOLED",
    camera: "64MP Ultra-Clear Camera with OIS",
    battery: "5500 mAh + 80W SUPERVOOC",
    image: "assets/oneplus-n6.png",
    colors: [
      { name: "Champagne Silver", hex: "#d8d0c5", image: "assets/oneplus-n6.png" },
      { name: "Misty Green", hex: "#638977", image: "assets/oneplus-n6.png" },
      { name: "Chromatic Gray", hex: "#3a3c3e", image: "assets/oneplus-n6.png" }
    ],
    storage: ["128GB", "256GB"],
    emi: "₹1,110/mo"
  },
  {
    id: "oneplus-n6x",
    name: "OnePlus N6x",
    brand: "OnePlus",
    category: "oneplus",
    tagline: "All-Day Entertainment & Massive Stereo Speakers",
    price: 19999,
    originalPrice: 22999,
    badge: "🔥 Best Value 5G",
    isFeaturedHero: false,
    rating: 4.6,
    reviewsCount: 310,
    chip: "MediaTek Dimensity 7300 Ultra",
    display: "6.67\" 120Hz Eye-Care Display",
    camera: "50MP AI Portrait Dual Camera",
    battery: "5200 mAh + 67W SuperVOOC",
    image: "assets/oneplus-n6.png",
    colors: [
      { name: "Sky Cyan", hex: "#4b8da1", image: "assets/oneplus-n6.png" },
      { name: "Dark Shadow", hex: "#202124", image: "assets/oneplus-n6.png" }
    ],
    storage: ["128GB"],
    emi: "₹890/mo"
  },

  // ==========================================
  // GOOGLE PIXEL COLLECTION
  // ==========================================
  {
    id: "google-pixel-11-pro",
    name: "Google Pixel 11 Pro",
    brand: "Google",
    category: "google",
    tagline: "Google Tensor G6 & Gemini Nano Live Multimodal AI",
    price: 114999,
    originalPrice: 124999,
    badge: "🤖 Next-Gen Gemini AI",
    isFeaturedHero: false,
    rating: 4.9,
    reviewsCount: 350,
    chip: "Google Tensor G6 (2nm AI Engine)",
    display: "6.8\" Super Actua LTPO OLED (1-120Hz, 3300 nits Peak)",
    camera: "50MP Quad-Bayer Main + 48MP 5x Telephoto + 48MP Macro Ultra-Wide",
    battery: "5200 mAh + 45W Fast Charging & Qi2 Magnetic Wireless",
    image: "assets/phone.png",
    colors: [
      { name: "Obsidian Black", hex: "#18191b", image: "assets/phone.png" },
      { name: "Porcelain White", hex: "#f1eee7", image: "assets/phone.png" },
      { name: "Ruby Sunset", hex: "#7d1627", image: "assets/phone.png" }
    ],
    storage: ["128GB", "256GB", "512GB", "1TB"],
    emi: "₹5,110/mo"
  },
  {
    id: "google-pixel-11",
    name: "Google Pixel 11",
    brand: "Google",
    category: "google",
    tagline: "Pure Android, Best-In-Class Photography & AI Magic",
    price: 82999,
    originalPrice: 89999,
    badge: "✨ Pure Pixel AI",
    isFeaturedHero: false,
    rating: 4.8,
    reviewsCount: 290,
    chip: "Google Tensor G6",
    display: "6.3\" Actua OLED 120Hz Display",
    camera: "50MP Dual Camera with Real Tone & Magic Editor 2.0",
    battery: "4800 mAh with 30W Fast Charge",
    image: "assets/phone.png",
    colors: [
      { name: "Rose Quartz", hex: "#d89c9c", image: "assets/phone.png" },
      { name: "Hazel Gray", hex: "#6c726c", image: "assets/phone.png" },
      { name: "Obsidian", hex: "#18191b", image: "assets/phone.png" }
    ],
    storage: ["128GB", "256GB"],
    emi: "₹3,680/mo"
  },
  {
    id: "google-pixel-10-pro-xl",
    name: "Google Pixel 10 Pro XL",
    brand: "Google",
    category: "google",
    tagline: "Massive 6.8\" Screen with Studio Microphone & Video Boost",
    price: 104999,
    originalPrice: 119999,
    badge: "🎬 Pro Video Leader",
    isFeaturedHero: false,
    rating: 4.8,
    reviewsCount: 420,
    chip: "Google Tensor G5 (Custom TPU)",
    display: "6.8\" Super Actua LTPO OLED (3000 nits)",
    camera: "50MP Main + 48MP 5x Optical Zoom + 8K Video Boost AI",
    battery: "5060 mAh Fast Charge",
    image: "assets/phone.png",
    colors: [
      { name: "Porcelain", hex: "#f0ece4", image: "assets/phone.png" },
      { name: "Obsidian", hex: "#1b1c1d", image: "assets/phone.png" }
    ],
    storage: ["256GB", "512GB"],
    emi: "₹4,660/mo"
  },
  {
    id: "google-pixel-10-pro",
    name: "Google Pixel 10 Pro",
    brand: "Google",
    category: "google",
    tagline: "Compact Form Factor with Full Pro Triple Camera Array",
    price: 94999,
    originalPrice: 106999,
    badge: "⭐ Compact Pro",
    isFeaturedHero: false,
    rating: 4.8,
    reviewsCount: 310,
    chip: "Google Tensor G5",
    display: "6.3\" Super Actua 120Hz LTPO",
    camera: "50MP Main + 48MP 5x Telephoto + 48MP Ultrawide",
    battery: "4700 mAh Fast Charge",
    image: "assets/phone.png",
    colors: [
      { name: "Hazel", hex: "#6c726c", image: "assets/phone.png" },
      { name: "Obsidian", hex: "#1b1c1d", image: "assets/phone.png" }
    ],
    storage: ["128GB", "256GB"],
    emi: "₹4,220/mo"
  },
  {
    id: "google-pixel-10",
    name: "Google Pixel 10",
    brand: "Google",
    category: "google",
    tagline: "Essential Gemini AI Features with 7 Years OS Updates",
    price: 69999,
    originalPrice: 79999,
    badge: "🔥 Value AI Phone",
    isFeaturedHero: false,
    rating: 4.7,
    reviewsCount: 380,
    chip: "Google Tensor G5",
    display: "6.3\" Actua OLED 120Hz",
    camera: "50MP Dual Lens with Night Sight & Best Take",
    battery: "4600 mAh Fast Charge",
    image: "assets/phone.png",
    colors: [
      { name: "Peony Pink", hex: "#e0909f", image: "assets/phone.png" },
      { name: "Obsidian", hex: "#18191b", image: "assets/phone.png" }
    ],
    storage: ["128GB", "256GB"],
    emi: "₹3,110/mo"
  },

  // ==========================================
  // XIAOMI / REDMI COLLECTION
  // ==========================================
  {
    id: "xiaomi-17-ultra",
    name: "Xiaomi 17 Ultra",
    brand: "Xiaomi",
    category: "xiaomi",
    tagline: "1-Inch Leica Summilux Quad-Master Camera with Continuous Optical Zoom",
    price: 109999,
    originalPrice: 119999,
    badge: "📸 Leica 1-Inch Camera Beast",
    isFeaturedHero: false,
    rating: 5.0,
    reviewsCount: 370,
    chip: "Snapdragon 8 Elite 3nm",
    display: "6.73\" 2K C9 LTPO OLED 120Hz (3500 nits, Dolby Vision)",
    camera: "50MP 1-inch Stepless Aperture + 200MP Leica Periscope + 50MP 3.2x + 50MP UW",
    battery: "6000 mAh Silicon-Carbon + 120W Wired & 80W Wireless",
    image: "assets/phone.png",
    colors: [
      { name: "Leica Crimson", hex: "#7a1120", image: "assets/phone.png" },
      { name: "Titanium Silver", hex: "#c2c4c8", image: "assets/phone.png" },
      { name: "Ceramic Black", hex: "#141416", image: "assets/phone.png" }
    ],
    storage: ["256GB", "512GB", "1TB"],
    emi: "₹4,880/mo"
  },
  {
    id: "xiaomi-17",
    name: "Xiaomi 17",
    brand: "Xiaomi",
    category: "xiaomi",
    tagline: "Compact Flagship with Ultra-Thin Bezels & Leica Optics",
    price: 69999,
    originalPrice: 76999,
    badge: "⚡ Compact Monster",
    isFeaturedHero: false,
    rating: 4.8,
    reviewsCount: 290,
    chip: "Snapdragon 8 Elite",
    display: "6.36\" 1.5K 120Hz LTPO OLED (1.38mm Bezel)",
    camera: "50MP Leica Hunter 900 + 50MP Telephoto + 50MP Ultrawide",
    battery: "5400 mAh + 90W HyperCharge",
    image: "assets/phone.png",
    colors: [
      { name: "Alpine Green", hex: "#3e5246", image: "assets/phone.png" },
      { name: "White Velvet", hex: "#f4f3ef", image: "assets/phone.png" }
    ],
    storage: ["256GB", "512GB"],
    emi: "₹3,110/mo"
  },
  {
    id: "redmi-note-17-pro-max",
    name: "Redmi Note 17 Pro Max",
    brand: "Xiaomi",
    category: "xiaomi",
    tagline: "200MP OIS Camera with 120W HyperCharge Under ₹35K",
    price: 32999,
    originalPrice: 36999,
    badge: "🔥 Budget Flagship King",
    isFeaturedHero: false,
    rating: 4.8,
    reviewsCount: 840,
    chip: "MediaTek Dimensity 8400 Ultra",
    display: "6.67\" 1.5K Curved AMOLED 144Hz (Dolby Vision)",
    camera: "200MP Samsung ISOCELL HP3 OIS + 8MP UW + 2MP Macro",
    battery: "5500 mAh + 120W Fast Charger in Box",
    image: "assets/phone.png",
    colors: [
      { name: "Crimson Red", hex: "#871526", image: "assets/phone.png" },
      { name: "Midnight Black", hex: "#1c1c1f", image: "assets/phone.png" },
      { name: "Fusion Purple", hex: "#4a3c5a", image: "assets/phone.png" }
    ],
    storage: ["128GB", "256GB", "512GB"],
    emi: "₹1,460/mo"
  },
  {
    id: "redmi-note-17-pro",
    name: "Redmi Note 17 Pro",
    brand: "Xiaomi",
    category: "xiaomi",
    tagline: "IP68 Water Resistance & 1.5K Crystal-Clear AMOLED",
    price: 26999,
    originalPrice: 29999,
    badge: "⭐ Super Seller",
    isFeaturedHero: false,
    rating: 4.7,
    reviewsCount: 620,
    chip: "Dimensity 7300 Pro 5G",
    display: "6.67\" 120Hz 1.5K AMOLED (Gorilla Glass Victus 2)",
    camera: "50MP Sony LYT-600 OIS Dual Camera",
    battery: "5100 mAh + 67W Turbo Charge",
    image: "assets/phone.png",
    colors: [
      { name: "Ocean Teal", hex: "#3f6e70", image: "assets/phone.png" },
      { name: "Obsidian Black", hex: "#1a1b1d", image: "assets/phone.png" }
    ],
    storage: ["128GB", "256GB"],
    emi: "₹1,190/mo"
  },
  {
    id: "redmi-note-17",
    name: "Redmi Note 17",
    brand: "Xiaomi",
    category: "xiaomi",
    tagline: "Super Slim 5G Smartphone with 108MP Ultra-Clear Camera",
    price: 18999,
    originalPrice: 21999,
    badge: "💸 Best Value Entry",
    isFeaturedHero: false,
    rating: 4.6,
    reviewsCount: 510,
    chip: "Snapdragon 6 Gen 3 5G",
    display: "6.67\" FHD+ 120Hz AMOLED (2100 nits)",
    camera: "108MP 3x In-Sensor Zoom Camera",
    battery: "5000 mAh + 45W Fast Charging",
    image: "assets/phone.png",
    colors: [
      { name: "Prism Gold", hex: "#d5b47a", image: "assets/phone.png" },
      { name: "Graphite Black", hex: "#222325", image: "assets/phone.png" }
    ],
    storage: ["128GB", "256GB"],
    emi: "₹840/mo"
  },

  // ==========================================
  // VIVO COLLECTION
  // ==========================================
  {
    id: "vivo-x300-ultra",
    name: "vivo X300 Ultra",
    brand: "vivo",
    category: "vivo",
    tagline: "200MP ZEISS APO Telephoto & 1-inch Dual Sensor Imaging Beast",
    price: 114999,
    originalPrice: 129999,
    badge: "📸 Ultimate ZEISS Camera",
    isFeaturedHero: false,
    rating: 5.0,
    reviewsCount: 290,
    chip: "Snapdragon 8 Elite Flagship 3nm",
    display: "6.82\" 2K LTPO 120Hz ZEISS Master Color Display (4500 nits)",
    camera: "50MP 1-inch Sony LYT-900 + 200MP ZEISS APO Periscope + 50MP Portrait + 50MP UW",
    battery: "6200 mAh BlueVolt Silicon Anode + 100W Flash & 50W Wireless",
    image: "assets/phone.png",
    colors: [
      { name: "Crimson Titanium", hex: "#7a1120", image: "assets/phone.png" },
      { name: "Titanium Gray", hex: "#8c8e93", image: "assets/phone.png" },
      { name: "Midnight Black", hex: "#161618", image: "assets/phone.png" }
    ],
    storage: ["256GB", "512GB", "1TB"],
    emi: "₹5,110/mo"
  },
  {
    id: "vivo-x300-pro",
    name: "vivo X300 Pro",
    brand: "vivo",
    category: "vivo",
    tagline: "MediaTek Dimensity 9500 with ZEISS T* Coating & 200MP Telephoto",
    price: 89999,
    originalPrice: 99999,
    badge: "⭐ ZEISS Telephoto Pro",
    isFeaturedHero: false,
    rating: 4.9,
    reviewsCount: 380,
    chip: "MediaTek Dimensity 9500 (3nm)",
    display: "6.78\" 1.5K 120Hz Eye-Care AMOLED",
    camera: "50MP Sony LYT-818 Main + 200MP ZEISS APO Telephoto + 50MP UW",
    battery: "6000 mAh BlueVolt Battery + 90W FlashCharge",
    image: "assets/phone.png",
    colors: [
      { name: "Titanium Blue", hex: "#2b4563", image: "assets/phone.png" },
      { name: "Space Black", hex: "#1b1b1d", image: "assets/phone.png" }
    ],
    storage: ["256GB", "512GB"],
    emi: "₹3,990/mo"
  },
  {
    id: "vivo-x300",
    name: "vivo X300",
    brand: "vivo",
    category: "vivo",
    tagline: "Compact Flagship with ZEISS Optics & 5800mAh Huge Battery",
    price: 69999,
    originalPrice: 77999,
    badge: "🔥 Compact ZEISS",
    isFeaturedHero: false,
    rating: 4.8,
    reviewsCount: 310,
    chip: "Dimensity 9500 / 9400",
    display: "6.67\" 1.5K 120Hz Ultra-Bright Display",
    camera: "50MP Sony IMX921 Main + 50MP ZEISS Telephoto + 50MP UW",
    battery: "5800 mAh + 90W FlashCharge",
    image: "assets/phone.png",
    colors: [
      { name: "Aurora White", hex: "#f0f2f5", image: "assets/phone.png" },
      { name: "Carbon Black", hex: "#181819", image: "assets/phone.png" }
    ],
    storage: ["256GB", "512GB"],
    emi: "₹3,110/mo"
  },
  {
    id: "vivo-v50-pro",
    name: "vivo V50 Pro",
    brand: "vivo",
    category: "vivo",
    tagline: "Studio-Quality Studio Aura Light Portrait with ZEISS Style",
    price: 46999,
    originalPrice: 51999,
    badge: "📸 Studio Portrait Master",
    isFeaturedHero: false,
    rating: 4.8,
    reviewsCount: 440,
    chip: "MediaTek Dimensity 9200+ 5G",
    display: "6.78\" 3D Curved 1.5K 120Hz AMOLED",
    camera: "50MP ZEISS OIS Main + 50MP ZEISS Telephoto + 50MP Group Selfie",
    battery: "5500 mAh + 80W FlashCharge",
    image: "assets/phone.png",
    colors: [
      { name: "Ganges Blue", hex: "#325c74", image: "assets/phone.png" },
      { name: "Titanium Silver", hex: "#bfc2c7", image: "assets/phone.png" }
    ],
    storage: ["256GB", "512GB"],
    emi: "₹2,080/mo"
  },

  // ==========================================
  // OPPO COLLECTION
  // ==========================================
  {
    id: "oppo-find-x9-ultra",
    name: "OPPO Find X9 Ultra",
    brand: "OPPO",
    category: "oppo",
    tagline: "Dual Periscope Telephoto & Hasselblad Master Camera System",
    price: 119999,
    originalPrice: 134999,
    badge: "👑 Dual Periscope Beast",
    isFeaturedHero: false,
    rating: 5.0,
    reviewsCount: 260,
    chip: "Snapdragon 8 Elite 3nm",
    display: "6.82\" 2K 120Hz LTPO OLED (4500 nits, ProXDR)",
    camera: "50MP 1-inch LYT-900 + 50MP 3x Periscope + 50MP 6x Periscope + 50MP UW",
    battery: "6100 mAh + 100W SUPERVOOC & 50W AIRVOOC",
    image: "assets/phone.png",
    colors: [
      { name: "Crimson Vegan Leather", hex: "#78121f", image: "assets/phone.png" },
      { name: "Desert Brown", hex: "#8c6b4e", image: "assets/phone.png" },
      { name: "Ocean Blue", hex: "#1e3c54", image: "assets/phone.png" }
    ],
    storage: ["256GB", "512GB", "1TB"],
    emi: "₹5,330/mo"
  },
  {
    id: "oppo-find-x9-pro",
    name: "OPPO Find X9 Pro",
    brand: "OPPO",
    category: "oppo",
    tagline: "Ultra-Lightweight Aerospace Titanium with Hasselblad Master Engine",
    price: 94999,
    originalPrice: 104999,
    badge: "⭐ Hasselblad Pro",
    isFeaturedHero: false,
    rating: 4.9,
    reviewsCount: 310,
    chip: "MediaTek Dimensity 9500 / Snapdragon 8 Elite",
    display: "6.78\" 1.5K 120Hz Micro-Quad Curved AMOLED",
    camera: "50MP Sony LYT-808 + 50MP 3x Periscope + 50MP UW",
    battery: "5910 mAh Silicon-Carbon + 80W SUPERVOOC",
    image: "assets/phone.png",
    colors: [
      { name: "Starry Silver", hex: "#c9cbcf", image: "assets/phone.png" },
      { name: "Space Black", hex: "#18181a", image: "assets/phone.png" }
    ],
    storage: ["256GB", "512GB"],
    emi: "₹4,220/mo"
  },
  {
    id: "oppo-find-x9",
    name: "OPPO Find X9",
    brand: "OPPO",
    category: "oppo",
    tagline: "Flat Display Flagship with Slim Bezel & Hasselblad Portrait",
    price: 74999,
    originalPrice: 82999,
    badge: "🔥 Flat Screen Flagship",
    isFeaturedHero: false,
    rating: 4.8,
    reviewsCount: 280,
    chip: "Dimensity 9400 / 9500",
    display: "6.59\" 1.5K 120Hz Flat AMOLED (1.45mm Symmetrical Bezels)",
    camera: "50MP Sony Main + 50MP 3x Periscope + 50MP Ultra-Wide",
    battery: "5630 mAh + 80W SUPERVOOC",
    image: "assets/phone.png",
    colors: [
      { name: "Wind Chime Blue", hex: "#4b748a", image: "assets/phone.png" },
      { name: "Pure White", hex: "#f3f3f5", image: "assets/phone.png" },
      { name: "Titanium Black", hex: "#1d1d1f", image: "assets/phone.png" }
    ],
    storage: ["256GB", "512GB"],
    emi: "₹3,330/mo"
  }
];

// Trade-In Estimator Benchmark Data
const TRADE_IN_DEVICES = [
  { brand: "Apple", model: "iPhone 16 Pro Max", flawless: 85000, good: 74000, fair: 62000 },
  { brand: "Apple", model: "iPhone 16 Pro", flawless: 68000, good: 59000, fair: 49000 },
  { brand: "Apple", model: "iPhone 15 Pro Max", flawless: 60000, good: 51000, fair: 42000 },
  { brand: "Apple", model: "iPhone 15 Pro", flawless: 48000, good: 41000, fair: 34000 },
  { brand: "Apple", model: "iPhone 14 Pro Max", flawless: 42000, good: 36000, fair: 29000 },
  { brand: "Apple", model: "iPhone 13 / 14", flawless: 26000, good: 22000, fair: 17000 },
  { brand: "Samsung", model: "Galaxy S25 Ultra", flawless: 70000, good: 60000, fair: 49000 },
  { brand: "Samsung", model: "Galaxy S24 Ultra", flawless: 52000, good: 44000, fair: 36000 },
  { brand: "Samsung", model: "Galaxy Z Fold 6", flawless: 65000, good: 54000, fair: 42000 },
  { brand: "OnePlus", model: "OnePlus 13 / 12", flawless: 38000, good: 31000, fair: 24000 },
  { brand: "Google", model: "Pixel 10 Pro / 9 Pro", flawless: 40000, good: 33000, fair: 26000 },
  { brand: "Xiaomi", model: "Xiaomi 15 / 14 Ultra", flawless: 35000, good: 28000, fair: 21000 },
  { brand: "vivo", model: "vivo X200 Pro / X100 Pro", flawless: 38000, good: 31000, fair: 23000 }
];

// Repair Services Data
const REPAIR_SERVICES = [
  {
    id: "screen",
    name: "100% Original Screen Replacement",
    icon: "📱",
    time: "30-45 Mins Express",
    warranty: "6 Months Touch Warranty",
    desc: "OEM 120Hz AMOLED & Super Retina XDR displays with TrueTone & calibration."
  },
  {
    id: "battery",
    name: "High-Capacity Battery Replacement",
    icon: "🔋",
    time: "20 Mins Express",
    warranty: "1 Year Battery Warranty",
    desc: "100% Battery Health restoration with original BMS board preservation."
  },
  {
    id: "camera",
    name: "Pro Lens & Sensor Optical Repair",
    icon: "📸",
    time: "40 Mins Express",
    warranty: "3 Months Warranty",
    desc: "Fix camera jitter, autofocus failure, scratched sapphire glass or sensor spots."
  },
  {
    id: "charging",
    name: "Fast USB-C / Lightning Port Repair",
    icon: "⚡",
    time: "25 Mins Express",
    warranty: "3 Months Warranty",
    desc: "Clean charging pin failure, loose connection, OTG & mic issues."
  },
  {
    id: "water",
    name: "Ultrasonic Water Damage Decontamination",
    icon: "💧",
    time: "Same Day Lab Service",
    warranty: "Diagnostic Guarantee",
    desc: "Chemical PCB wash, short-circuit clearing and critical IC reviving."
  },
  {
    id: "motherboard",
    name: "Micro-Soldering & IC Chip Level Repair",
    icon: "🔬",
    time: "1-2 Days Lab Service",
    warranty: "3 Months Warranty",
    desc: "CPU reballing, dead phone revival, Face ID and network IC troubleshooting."
  }
];

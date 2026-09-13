// Application Logic for Mobile Station & Siddhi Marketing

// App State
const state = {
  currentPage: "home",
  activeCategory: "all",
  activeBrand: "All",
  searchQuery: "",
  priceFilter: "all",
  sortBy: "featured",
  cart: JSON.parse(localStorage.getItem("ms_cart") || "[]"),
  theme: localStorage.getItem("ms_theme") || "light", // Default is White Light Theme
  reviews: [...CUSTOMER_REVIEWS]
};

// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initCountdownTimer();
  renderCategoryFilterStrip();
  renderBrandChips();
  renderAllGrids();
  updateCartBadge();
  setupEventListeners();
  calculateExchangeValue();
});

// Setup Listeners
function setupEventListeners() {
  const searchInput = document.getElementById("searchInput");
  const priceFilter = document.getElementById("priceFilter");
  const sortFilter = document.getElementById("sortFilter");
  const themeToggleBtn = document.getElementById("themeToggleBtn");
  const cartOpenBtn = document.getElementById("cartOpenBtn");

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      state.searchQuery = e.target.value.trim().toLowerCase();
      renderProducts();
    });
  }

  if (priceFilter) {
    priceFilter.addEventListener("change", (e) => {
      state.priceFilter = e.target.value;
      renderProducts();
    });
  }

  if (sortFilter) {
    sortFilter.addEventListener("change", (e) => {
      state.sortBy = e.target.value;
      renderProducts();
    });
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", toggleTheme);
  }

  if (cartOpenBtn) {
    cartOpenBtn.addEventListener("click", openCart);
  }
}

// Multi-Page View Navigation System
function navigateTo(pageId) {
  state.currentPage = pageId;

  // Hide all views
  const views = document.querySelectorAll(".page-view");
  views.forEach(view => view.classList.remove("active-view"));

  // Show selected view
  const targetView = document.getElementById(`view-${pageId}`);
  if (targetView) {
    targetView.classList.add("active-view");
  }

  // Update Nav Buttons
  const navBtns = document.querySelectorAll(".nav-page-btn");
  navBtns.forEach(btn => btn.classList.remove("active"));
  const activeBtn = document.getElementById(`nav-btn-${pageId}`);
  if (activeBtn) {
    activeBtn.classList.add("active");
  }

  // Re-render grids if required
  if (pageId === "shop") {
    renderProducts();
  } else if (pageId === "exchange") {
    renderRefurbishedGrid();
  } else if (pageId === "repair") {
    renderRepairServices();
  } else if (pageId === "reviews") {
    renderReviews();
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Theme Handling (Default: Crisp White Light Theme)
function initTheme() {
  document.documentElement.setAttribute("data-theme", state.theme);
}

function toggleTheme() {
  state.theme = state.theme === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", state.theme);
  localStorage.setItem("ms_theme", state.theme);
  showToast(state.theme === "light" ? "☀️ Switched to White Light Theme" : "🌙 Switched to Dark Theme");
}

// Render All Grids on Startup
function renderAllGrids() {
  renderHomeFeatured();
  renderProducts();
  renderRefurbishedGrid();
  renderRepairServices();
  renderReviews();
}

// Category Filter Pills
function renderCategoryFilterStrip() {
  const container = document.getElementById("categoryFilterStrip");
  if (!container) return;

  container.innerHTML = CATEGORIES.map(cat => `
    <button class="category-pill-btn ${state.activeCategory === cat.id ? 'active' : ''}" onclick="setCategory('${cat.id}')">
      <span>${cat.icon}</span>
      <span>${cat.name}</span>
    </button>
  `).join("");
}

function setCategory(catId) {
  state.activeCategory = catId;
  renderCategoryFilterStrip();
  renderProducts();

  const found = CATEGORIES.find(c => c.id === catId);
  const heading = document.getElementById("catalogHeading");
  const subtitle = document.getElementById("catalogSubtitle");
  if (heading && found) {
    heading.innerHTML = `${found.icon} ${found.name}`;
  }
  if (subtitle && found) {
    subtitle.innerText = catId === 'all'
      ? "Showing all latest smartphones, certified refurbished devices & accessories"
      : `Filtered by ${found.name} collection at Mobile Station`;
  }
}

// Brand Filter Chips
function renderBrandChips() {
  const container = document.getElementById("brandChipsRow");
  if (!container) return;

  container.innerHTML = BRANDS.map(b => `
    <button class="brand-chip ${state.activeBrand === b ? 'active' : ''}" onclick="setBrand('${b}')">
      ${b}
    </button>
  `).join("");
}

function setBrand(brand) {
  state.activeBrand = brand;
  renderBrandChips();
  renderProducts();
}

// Filtering & Sorting Logic
function getFilteredProducts() {
  let filtered = [...PRODUCTS];

  // Category filter
  if (state.activeCategory !== "all") {
    filtered = filtered.filter(p => p.category === state.activeCategory || p.subCategory === state.activeCategory);
  }

  // Brand filter
  if (state.activeBrand !== "All") {
    filtered = filtered.filter(p => p.brand.toLowerCase() === state.activeBrand.toLowerCase());
  }

  // Price range filter
  if (state.priceFilter === "under-15k") {
    filtered = filtered.filter(p => p.price < 15000);
  } else if (state.priceFilter === "15k-35k") {
    filtered = filtered.filter(p => p.price >= 15000 && p.price <= 35000);
  } else if (state.priceFilter === "35k-70k") {
    filtered = filtered.filter(p => p.price > 35000 && p.price <= 70000);
  } else if (state.priceFilter === "above-70k") {
    filtered = filtered.filter(p => p.price > 70000);
  }

  // Search filter
  if (state.searchQuery) {
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(state.searchQuery) ||
      p.brand.toLowerCase().includes(state.searchQuery) ||
      p.condition.toLowerCase().includes(state.searchQuery) ||
      (p.specs && Object.values(p.specs).some(val => val.toLowerCase().includes(state.searchQuery)))
    );
  }

  // Sorting
  if (state.sortBy === "price-low") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (state.sortBy === "price-high") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (state.sortBy === "rating") {
    filtered.sort((a, b) => b.rating - a.rating);
  } else if (state.sortBy === "discount") {
    filtered.sort((a, b) => b.discountPercent - a.discountPercent);
  }

  return filtered;
}

// Generate Product Card HTML
function createProductCardHTML(product) {
  const formatPrice = (val) => "₹" + Number(val).toLocaleString("en-IN");

  return `
    <article class="product-card" data-id="${product.id}">
      <div class="card-badge-row">
        <span class="card-tag">${product.badge}</span>
        ${product.discountPercent > 0 ? `<span class="card-discount-tag">${product.discountPercent}% OFF</span>` : ''}
      </div>

      <div class="product-image-area" onclick="openQuickView('${product.id}')">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        <button class="quick-view-hover-btn">👁️ Quick Specs & Colors</button>
      </div>

      <div class="product-meta-row">
        <span class="product-brand-tag">${product.brand}</span>
        <div class="rating-badge">★ ${product.rating} (${product.reviewsCount})</div>
      </div>

      <h3 class="product-title" onclick="openQuickView('${product.id}')">${product.name}</h3>

      <div class="product-specs-list">
        <span class="spec-badge">🛡️ ${product.condition}</span>
        ${product.specs?.display ? `<span class="spec-badge">${product.specs.display.split(',')[0]}</span>` : ''}
      </div>

      <div class="product-price-section">
        <div class="price-container">
          <span class="price-current">${formatPrice(product.price)}</span>
          ${product.originalPrice ? `<span class="price-original">${formatPrice(product.originalPrice)}</span>` : ''}
        </div>
        ${product.emiStart !== "N/A" ? `<div class="emi-note">0% EMI from ${product.emiStart}*</div>` : ''}
      </div>

      <div class="card-actions-row">
        <button class="btn-whatsapp-order" onclick="orderProductWhatsApp('${product.id}')" title="Direct order on WhatsApp">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
          </svg>
          <span>Order on WhatsApp</span>
        </button>
        
        <button class="btn-bag-add" onclick="addToCart('${product.id}')" title="Add to Inquiry Bag">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
        </button>
      </div>
    </article>
  `;
}

// Render Products for Shop Page
function renderProducts() {
  const container = document.getElementById("productGridContainer");
  if (!container) return;

  const products = getFilteredProducts();

  if (products.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; background: var(--bg-surface); border-radius: var(--radius-lg); border: 1.5px solid var(--border); box-shadow: var(--shadow-sm);">
        <div style="font-size: 3.5rem; margin-bottom: 0.75rem;">🔍</div>
        <h3 style="font-family: var(--font-heading); font-size: 1.5rem; margin-bottom: 0.5rem; font-weight:800;">No Matching Products Found</h3>
        <p style="color: var(--text-muted); margin-bottom: 1.5rem;">Try adjusting your filters, search term, or select another brand.</p>
        <button class="btn-primary" onclick="resetFilters()">Reset All Filters</button>
      </div>
    `;
    return;
  }

  container.innerHTML = products.map(p => createProductCardHTML(p)).join("");
}

// Render Featured Products for Home Page (Top 6 Items)
function renderHomeFeatured() {
  const container = document.getElementById("homeFeaturedGrid");
  if (!container) return;

  const featured = PRODUCTS.filter(p => p.isHotDeal).slice(0, 6);
  container.innerHTML = featured.map(p => createProductCardHTML(p)).join("");
}

// Render Refurbished Grid
function renderRefurbishedGrid() {
  const container = document.getElementById("refurbishedGrid");
  if (!container) return;

  const refurbs = PRODUCTS.filter(p => p.category === "refurbished");
  container.innerHTML = refurbs.map(p => createProductCardHTML(p)).join("");
}

function resetFilters() {
  state.activeCategory = "all";
  state.activeBrand = "All";
  state.searchQuery = "";
  state.priceFilter = "all";
  state.sortBy = "featured";

  const searchInput = document.getElementById("searchInput");
  const priceFilter = document.getElementById("priceFilter");
  const sortFilter = document.getElementById("sortFilter");

  if (searchInput) searchInput.value = "";
  if (priceFilter) priceFilter.value = "all";
  if (sortFilter) sortFilter.value = "featured";

  renderCategoryFilterStrip();
  renderBrandChips();
  renderProducts();
}

// Quick View Modal
let currentQuickViewProduct = null;
let selectedColor = "";
let selectedStorage = "";

function openQuickView(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  currentQuickViewProduct = product;
  selectedColor = product.colors && product.colors.length > 0 ? product.colors[0] : "Standard";
  selectedStorage = product.storageOptions && product.storageOptions.length > 0 ? product.storageOptions[0] : "Standard";

  const formatPrice = (val) => "₹" + Number(val).toLocaleString("en-IN");
  const modal = document.getElementById("quickViewModal");
  const content = document.getElementById("quickViewContent");

  if (!modal || !content) return;

  content.innerHTML = `
    <div style="text-align:center;">
      <div style="background:#f8fafc; padding:2rem; border-radius:var(--radius-lg); margin-bottom:1rem; border:1px solid var(--border);">
        <img src="${product.image}" alt="${product.name}" style="max-height:280px; margin:0 auto; object-fit:contain;">
      </div>
      <div style="font-size:0.85rem; color:#16a34a; font-weight:700;">
        ✅ 100% Verified Original | Ready for Store Pickup at Garud Complex
      </div>
    </div>

    <div>
      <div style="display:flex; gap:0.5rem; margin-bottom:0.5rem;">
        <span class="card-tag">${product.badge}</span>
        <span class="card-discount-tag">${product.discountPercent}% OFF</span>
      </div>

      <h2 style="font-family:var(--font-heading); font-size:1.75rem; font-weight:900; line-height:1.2; margin-bottom:0.5rem;">${product.name}</h2>
      
      <div style="display:flex; align-items:center; gap:0.6rem; margin-bottom:1rem;">
        <div class="rating-badge">★ ${product.rating}</div>
        <span style="font-size:0.85rem; color:var(--text-dim); font-weight:600;">(${product.reviewsCount} Customer Reviews)</span>
      </div>

      <div style="display:flex; align-items:baseline; gap:0.75rem; margin-bottom:1.25rem;">
        <span style="font-family:var(--font-heading); font-size:2rem; font-weight:900; color:#e11d48;">${formatPrice(product.price)}</span>
        <span style="font-size:1.1rem; color:var(--text-dim); text-decoration:line-through;">${formatPrice(product.originalPrice)}</span>
        <span style="font-size:0.9rem; color:#16a34a; font-weight:800;">Save ${formatPrice(product.originalPrice - product.price)}</span>
      </div>

      <!-- Color Swatches -->
      ${product.colors && product.colors.length > 0 ? `
        <div style="margin-bottom:1rem;">
          <label style="font-size:0.85rem; font-weight:800; color:var(--text-muted); display:block; margin-bottom:0.4rem;">
            Select Color: <span id="qvSelectedColorText" style="color:var(--text-main); font-weight:900;">${selectedColor}</span>
          </label>
          <div style="display:flex; flex-wrap:wrap; gap:0.45rem;">
            ${product.colors.map(col => `
              <button class="category-pill-btn ${col === selectedColor ? 'active' : ''}" style="font-size:0.82rem; padding:0.4rem 0.85rem;" onclick="selectQVColor('${col}')">
                ${col}
              </button>
            `).join("")}
          </div>
        </div>
      ` : ''}

      <!-- Storage Options -->
      ${product.storageOptions && product.storageOptions.length > 0 ? `
        <div style="margin-bottom:1.25rem;">
          <label style="font-size:0.85rem; font-weight:800; color:var(--text-muted); display:block; margin-bottom:0.4rem;">
            Select Variant: <span id="qvSelectedStorageText" style="color:var(--text-main); font-weight:900;">${selectedStorage}</span>
          </label>
          <div style="display:flex; flex-wrap:wrap; gap:0.45rem;">
            ${product.storageOptions.map(st => `
              <button class="category-pill-btn ${st === selectedStorage ? 'active' : ''}" style="font-size:0.82rem; padding:0.4rem 0.85rem;" onclick="selectQVStorage('${st}')">
                ${st}
              </button>
            `).join("")}
          </div>
        </div>
      ` : ''}

      <!-- Key Specifications -->
      <div style="background:var(--bg-input); padding:1rem; border-radius:var(--radius-md); margin-bottom:1.5rem; font-size:0.85rem;">
        <strong style="display:block; margin-bottom:0.5rem; color:#e11d48;">⚙️ Key Specifications:</strong>
        <div style="display:grid; grid-template-columns:1fr; gap:0.4rem; color:var(--text-muted);">
          <div>📱 <strong>Display:</strong> ${product.specs?.display || 'Super High Resolution'}</div>
          <div>⚡ <strong>Processor:</strong> ${product.specs?.processor || 'Ultra-Fast Performance'}</div>
          <div>📸 <strong>Camera:</strong> ${product.specs?.camera || 'Pro Grade Camera'}</div>
          <div>🔋 <strong>Battery:</strong> ${product.specs?.battery || 'All-day battery life'}</div>
          <div>🛡️ <strong>Warranty:</strong> ${product.warranty}</div>
        </div>
      </div>

      <div style="display:grid; grid-template-columns:1.2fr 0.8fr; gap:0.75rem;">
        <button class="btn-whatsapp-large" onclick="orderCurrentQuickViewWhatsApp()">
          ⚡ WhatsApp Order
        </button>
        <button class="btn-secondary" onclick="addToCart('${product.id}')">
          🛒 Add to Bag
        </button>
      </div>
    </div>
  `;

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function selectQVColor(color) {
  selectedColor = color;
  openQuickView(currentQuickViewProduct.id);
}

function selectQVStorage(storage) {
  selectedStorage = storage;
  openQuickView(currentQuickViewProduct.id);
}

function closeQuickViewModal() {
  const modal = document.getElementById("quickViewModal");
  if (modal) modal.classList.remove("active");
  document.body.style.overflow = "";
}

// 3D Visiting Card Flip Handler
function toggleCardFlip(cardContainer) {
  cardContainer.classList.toggle("flipped");
}

// Old Phone Exchange Value Calculator
function calculateExchangeValue() {
  const brand = document.getElementById("calcBrand")?.value || "Apple";
  const condition = document.getElementById("calcCondition")?.value || "flawless";
  const display = document.getElementById("exchangePriceDisplay");

  const baseValues = {
    Apple: { flawless: "₹24,000 - ₹48,000", good: "₹18,000 - ₹34,000", cracked: "₹10,000 - ₹22,000" },
    Samsung: { flawless: "₹16,000 - ₹38,000", good: "₹12,000 - ₹26,000", cracked: "₹7,000 - ₹16,000" },
    OnePlus: { flawless: "₹14,000 - ₹28,000", good: "₹10,000 - ₹20,000", cracked: "₹6,000 - ₹12,000" },
    Xiaomi: { flawless: "₹8,000 - ₹16,000", good: "₹6,000 - ₹11,000", cracked: "₹3,500 - ₹7,000" },
    Vivo: { flawless: "₹9,000 - ₹18,000", good: "₹6,500 - ₹12,000", cracked: "₹4,000 - ₹8,000" },
    Realme: { flawless: "₹7,000 - ₹14,000", good: "₹5,000 - ₹9,500", cracked: "₹3,000 - ₹6,000" }
  };

  const val = baseValues[brand]?.[condition] || "₹10,000 - ₹20,000";
  if (display) display.innerText = val;
}

function sendExchangeWhatsApp() {
  const brand = document.getElementById("calcBrand")?.value || "Apple";
  const condition = document.getElementById("calcCondition")?.value || "flawless";
  const estVal = document.getElementById("exchangePriceDisplay")?.innerText || "";
  const phone = STORE_CONFIG.primaryPhone;

  const msg = `Hello Mobile Station (Garud Complex)! ♻️

I want to exchange my old smartphone:
📱 *Old Phone Brand:* ${brand}
🔍 *Physical Condition:* ${condition.toUpperCase()}
💰 *Estimated Valuation:* ${estVal}

Please evaluate my phone and let me know the final discount for upgrading. Thank you!`;

  const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
  window.open(url, "_blank");
}

// Direct WhatsApp Order Handlers
function orderProductWhatsApp(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const phone = STORE_CONFIG.primaryPhone;
  const message = `Hello Mobile Station (Garud Complex)! 👋

I want to purchase this item from your catalog:
📱 *Product:* ${product.name}
🏷️ *Brand:* ${product.brand}
💰 *Offer Price:* ₹${product.price.toLocaleString("en-IN")}
🛡️ *Condition:* ${product.condition}
✨ *Warranty:* ${product.warranty}
📍 *Store Pickup:* Garud Complex showroom

Please confirm stock & payment options. Thank you!`;

  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

function orderCurrentQuickViewWhatsApp() {
  if (!currentQuickViewProduct) return;

  const phone = STORE_CONFIG.primaryPhone;
  const message = `Hello Mobile Station! 👋

I want to order:
📱 *Product:* ${currentQuickViewProduct.name}
🎨 *Color:* ${selectedColor}
💾 *Storage / Variant:* ${selectedStorage}
💰 *Price:* ₹${currentQuickViewProduct.price.toLocaleString("en-IN")}
📍 *Store:* Garud Complex, In front of Sony Novelty

Please share pickup details.`;

  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

// Cart Management
function addToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const existing = state.cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    state.cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      brand: product.brand,
      qty: 1
    });
  }

  saveCart();
  updateCartBadge();
  showToast(`🛒 Added "${product.name}" to Inquiry Bag!`);
}

function saveCart() {
  localStorage.setItem("ms_cart", JSON.stringify(state.cart));
}

function updateCartBadge() {
  const count = state.cart.reduce((sum, item) => sum + item.qty, 0);
  const badge = document.getElementById("cartBadgeCount");
  const drawerCount = document.getElementById("cartDrawerCount");
  if (badge) badge.innerText = count;
  if (drawerCount) drawerCount.innerText = count;
}

function openCart() {
  renderCartDrawer();
  const drawer = document.getElementById("cartDrawer");
  const overlay = document.getElementById("cartOverlay");
  if (drawer) drawer.classList.add("active");
  if (overlay) overlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeCart() {
  const drawer = document.getElementById("cartDrawer");
  const overlay = document.getElementById("cartOverlay");
  if (drawer) drawer.classList.remove("active");
  if (overlay) overlay.classList.remove("active");
  document.body.style.overflow = "";
}

function updateCartQty(productId, delta) {
  const item = state.cart.find(i => i.id === productId);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    state.cart = state.cart.filter(i => i.id !== productId);
  }

  saveCart();
  updateCartBadge();
  renderCartDrawer();
}

function renderCartDrawer() {
  const container = document.getElementById("cartDrawerItems");
  const subtotalEl = document.getElementById("cartSubtotal");
  if (!container || !subtotalEl) return;

  if (state.cart.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
        <div style="font-size: 3.5rem; margin-bottom: 0.5rem;">🛍️</div>
        <p style="font-weight: 800; font-size:1.1rem; color:var(--text-main);">Your Inquiry Bag is Empty</p>
        <p style="font-size: 0.88rem; margin-top: 0.35rem;">Add any smartphone, charger or gadget to send an all-in-one WhatsApp inquiry!</p>
      </div>
    `;
    subtotalEl.innerText = "₹0";
    return;
  }

  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  subtotalEl.innerText = "₹" + subtotal.toLocaleString("en-IN");

  container.innerHTML = state.cart.map(item => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}">
      <div style="flex:1;">
        <h4 style="font-size:0.92rem; font-weight:800; line-height:1.25; margin-bottom:0.25rem;">${item.name}</h4>
        <div style="font-size:0.9rem; font-weight:900; color:#e11d48;">₹${(item.price * item.qty).toLocaleString("en-IN")}</div>
        <div style="display:flex; align-items:center; gap:0.5rem; margin-top:0.4rem;">
          <button style="background:var(--bg-surface); border:1px solid var(--border); width:26px; height:26px; border-radius:4px; font-weight:800; cursor:pointer;" onclick="updateCartQty('${item.id}', -1)">-</button>
          <span style="font-weight:800; font-size:0.9rem;">${item.qty}</span>
          <button style="background:var(--bg-surface); border:1px solid var(--border); width:26px; height:26px; border-radius:4px; font-weight:800; cursor:pointer;" onclick="updateCartQty('${item.id}', 1)">+</button>
        </div>
      </div>
    </div>
  `).join("");
}

function sendCartWhatsApp() {
  if (state.cart.length === 0) {
    showToast("⚠️ Your bag is empty! Add products first.");
    return;
  }

  const phone = STORE_CONFIG.primaryPhone;
  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  
  let itemList = state.cart.map((item, idx) => 
    `${idx + 1}. *${item.name}* (Qty: ${item.qty}) - ₹${(item.price * item.qty).toLocaleString("en-IN")}`
  ).join("\n");

  const message = `Hello Mobile Station & Siddhi Marketing! 👋

I have prepared an inquiry checklist on your website:

${itemList}

━━━━━━━━━━━━━━━━━
💰 *Estimated Total:* ₹${subtotal.toLocaleString("en-IN")}
━━━━━━━━━━━━━━━━━

Please confirm availability and best discounted price. Thank you!`;

  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

// Repair Services Rendering
function renderRepairServices() {
  const container = document.getElementById("repairServicesGrid");
  if (!container) return;

  container.innerHTML = REPAIR_SERVICES.map(rep => `
    <div class="repair-item-card">
      <div class="repair-icon-large">${rep.icon}</div>
      <h3>${rep.title}</h3>
      <p>${rep.description}</p>
      
      <div class="repair-meta-box">
        <span style="color:#d97706;">⏱️ ${rep.turnaround}</span>
        <span style="color:#16a34a;">🛡️ ${rep.warranty}</span>
      </div>

      <div style="display:flex; justify-content:space-between; align-items:center; margin-top:auto;">
        <div>
          <span style="font-size:0.75rem; color:var(--text-dim); font-weight:700;">Starting at</span>
          <div style="font-family:var(--font-heading); font-weight:900; font-size:1.25rem; color:#e11d48;">${rep.startingPrice}</div>
        </div>
        <button class="btn-whatsapp-order" style="padding:0.6rem 0.9rem; font-size:0.82rem;" onclick="bookRepairServiceWhatsApp('${rep.title}', '${rep.startingPrice}')">
          ⚡ Book on WhatsApp
        </button>
      </div>
    </div>
  `).join("");
}

function bookRepairServiceWhatsApp(serviceTitle, startingPrice) {
  const phone = STORE_CONFIG.primaryPhone;
  const message = `Hello Mobile Station Repair Station (Garud Complex)! 🔧

I want to book an express 30-min repair:
🛠️ *Service:* ${serviceTitle}
💰 *Est. Price:* ${startingPrice}

Please tell me the earliest technician slot today.`;

  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

function submitRepairInquiry() {
  const model = document.getElementById("repairModelInput")?.value.trim() || "Unspecified Model";
  const issue = document.getElementById("repairIssueSelect")?.value || "General Inspection";
  const phone = STORE_CONFIG.primaryPhone;

  const message = `Hello Mobile Station Repair Hub! 📱🔧

*30-Min Fast Repair Request:*
📱 *Phone Model:* ${model}
⚠️ *Issue:* ${issue}
📍 *Store:* Garud Complex, In front of Sony Novelty

Please quote the estimate cost and turnaround time.`;

  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

// Reviews Rendering
function renderReviews() {
  const container = document.getElementById("reviewsGridView");
  if (!container) return;

  container.innerHTML = state.reviews.map(rev => `
    <div class="review-card-item">
      <div>
        <div class="review-stars-row">${"★".repeat(rev.rating)}</div>
        <p class="review-quote">"${rev.comment}"</p>
      </div>
      <div class="reviewer-meta">
        <div class="reviewer-avatar">${rev.name.charAt(0)}</div>
        <div>
          <strong style="display:block; font-size:0.95rem; color:var(--text-main);">${rev.name}</strong>
          <span style="font-size:0.78rem; color:var(--text-dim);">${rev.location} • 🛍️ ${rev.product}</span>
        </div>
      </div>
    </div>
  `).join("");
}

function openReviewModal() {
  const modal = document.getElementById("reviewModal");
  if (modal) modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeReviewModal() {
  const modal = document.getElementById("reviewModal");
  if (modal) modal.classList.remove("active");
  document.body.style.overflow = "";
}

function handleReviewSubmit(e) {
  e.preventDefault();
  const author = document.getElementById("reviewAuthor")?.value.trim();
  const loc = document.getElementById("reviewLoc")?.value.trim();
  const prod = document.getElementById("reviewProd")?.value.trim();
  const rating = Number(document.getElementById("reviewRating")?.value || 5);
  const comment = document.getElementById("reviewText")?.value.trim();

  if (!author || !comment) return;

  state.reviews.unshift({
    id: Date.now(),
    name: author,
    location: loc || "Verified Buyer",
    rating: rating,
    date: "Just now",
    product: prod || "Smartphone / Accessory",
    comment: comment,
    verified: true
  });

  renderReviews();
  closeReviewModal();
  showToast("🌟 Thank you! Your review has been added.");
}

// Contact Form WhatsApp Submission
function handleFormWhatsAppSubmit(e) {
  e.preventDefault();
  const name = document.getElementById("formName")?.value.trim();
  const branch = document.getElementById("formBranch")?.value;
  const interest = document.getElementById("formInterest")?.value;
  const messageText = document.getElementById("formMessage")?.value.trim();

  const phone = branch.includes("Siddhi Marketing") ? STORE_CONFIG.siddhiPhone : STORE_CONFIG.primaryPhone;

  const msg = `Hello *${branch}*! 👋

*Customer Inquiry:*
👤 *Name:* ${name}
🎯 *Interest:* ${interest}
🏢 *Branch:* ${branch}
${messageText ? `💬 *Details:* ${messageText}` : ''}

Please share current offers and availability.`;

  const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
  window.open(url, "_blank");
  showToast("🚀 Redirecting to WhatsApp...");
}

// Digital Visiting Card .VCF Download Generator
function downloadVCard(storeId) {
  const store = STORE_CONFIG.stores.find(s => s.id === storeId);
  if (!store) return;

  const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:${store.name}
ORG:${store.name}
TITLE:${store.tagline}
TEL;TYPE=CELL,VOICE:${store.phone}
${store.email ? `EMAIL;TYPE=INTERNET:${store.email}` : ''}
ADR;TYPE=WORK:;;${store.address};;;;
NOTE:${store.badge} - ${store.timing}
END:VCARD`;

  const blob = new Blob([vCardData], { type: "text/vcard;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${store.name.replace(/\s+/g, "_")}_Contact.vcf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  showToast(`🪪 Saved ${store.name} Contact Card!`);
}

// Countdown Timer for Deal of the Day
function initCountdownTimer() {
  const timerEl = document.getElementById("dealTimer");
  if (!timerEl) return;

  let totalSeconds = 8 * 3600 + 42 * 60 + 19;

  setInterval(() => {
    if (totalSeconds > 0) {
      totalSeconds--;
    } else {
      totalSeconds = 24 * 3600;
    }

    const hrs = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
    const secs = String(totalSeconds % 60).padStart(2, "0");

    timerEl.innerText = `${hrs}h : ${mins}m : ${secs}s`;
  }, 1000);
}

// Toast Notifications
function showToast(message) {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "toast-msg";
  toast.innerText = message;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(-30px)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

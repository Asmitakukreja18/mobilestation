// Application Logic for Mobile Station & Siddhi Marketing Storefront

// App State
const state = {
  activeCategory: "all",
  activeBrand: "All",
  searchQuery: "",
  priceFilter: "all",
  sortBy: "featured",
  cart: JSON.parse(localStorage.getItem("ms_cart") || "[]"),
  theme: localStorage.getItem("ms_theme") || "dark",
  reviews: [...CUSTOMER_REVIEWS]
};

// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initCountdownTimer();
  renderCategoryTabs();
  renderBrandPills();
  renderProducts();
  renderRepairServices();
  renderReviews();
  updateCartBadge();
  setupEventListeners();
});

// Setup Listeners
function setupEventListeners() {
  const searchInput = document.getElementById("searchInput");
  const searchSubmitBtn = document.getElementById("searchSubmitBtn");
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

  if (searchSubmitBtn && searchInput) {
    searchSubmitBtn.addEventListener("click", () => {
      state.searchQuery = searchInput.value.trim().toLowerCase();
      renderProducts();
      document.getElementById("products-catalog")?.scrollIntoView({ behavior: "smooth" });
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

// Theme Handling
function initTheme() {
  document.documentElement.setAttribute("data-theme", state.theme);
}

function toggleTheme() {
  state.theme = state.theme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", state.theme);
  localStorage.setItem("ms_theme", state.theme);
  showToast(state.theme === "dark" ? "🌙 Switched to Dark Theme" : "☀️ Switched to Light Theme");
}

// Category Tabs
function renderCategoryTabs() {
  const container = document.getElementById("categoryTabs");
  if (!container) return;

  container.innerHTML = CATEGORIES.map(cat => `
    <button class="category-tab ${state.activeCategory === cat.id ? 'active' : ''}" onclick="setCategoryFilter('${cat.id}')">
      <span>${cat.icon}</span>
      <span>${cat.name}</span>
    </button>
  `).join("");
}

function setCategoryFilter(categoryId) {
  state.activeCategory = categoryId;
  renderCategoryTabs();
  renderProducts();
  
  // Update Catalog Heading
  const found = CATEGORIES.find(c => c.id === categoryId);
  const heading = document.getElementById("catalogHeading");
  const subtitle = document.getElementById("catalogSubtitle");
  if (heading && found) {
    heading.innerHTML = `${found.icon} ${found.name}`;
  }
  if (subtitle && found) {
    subtitle.innerText = categoryId === 'all' 
      ? "Showing all latest smartphones, refurbished certified devices & accessories"
      : `Filtered by ${found.name} collection at Mobile Station`;
  }
}

// Brand Filter Pills
function renderBrandPills() {
  const container = document.getElementById("brandPills");
  if (!container) return;

  container.innerHTML = BRANDS.map(brand => `
    <button class="brand-pill ${state.activeBrand === brand ? 'active' : ''}" onclick="setBrandFilter('${brand}')">
      ${brand}
    </button>
  `).join("");
}

function setBrandFilter(brand) {
  state.activeBrand = brand;
  renderBrandPills();
  renderProducts();
}

// Product Filtering & Sorting
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

// Render Products Grid
function renderProducts() {
  const container = document.getElementById("productGridContainer");
  if (!container) return;

  const products = getFilteredProducts();

  if (products.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3.5rem 1rem; background: var(--bg-card); border-radius: var(--radius-lg); border: 1px solid var(--border);">
        <div style="font-size: 3rem; margin-bottom: 0.75rem;">🔍</div>
        <h3 style="font-family: var(--font-heading); font-size: 1.35rem; margin-bottom: 0.5rem;">No Matching Products Found</h3>
        <p style="color: var(--text-muted); margin-bottom: 1.25rem;">Try adjusting your filters, search term, or select another brand.</p>
        <button class="btn-primary" onclick="resetFilters()">Reset All Filters</button>
      </div>
    `;
    return;
  }

  container.innerHTML = products.map(product => {
    const formatPrice = (val) => "₹" + Number(val).toLocaleString("en-IN");

    return `
      <article class="product-card" data-id="${product.id}">
        <div class="card-top-badges">
          <span class="badge-tag">${product.badge}</span>
          ${product.discountPercent > 0 ? `<span class="badge-discount">${product.discountPercent}% OFF</span>` : ''}
        </div>

        <div class="product-img-wrapper" onclick="openQuickView('${product.id}')">
          <img src="${product.image}" alt="${product.name}" class="product-img" loading="lazy">
          <button class="quick-view-overlay-btn">👁️ Quick View & Specs</button>
        </div>

        <div class="product-meta">
          <span class="brand-label">${product.brand}</span>
          <div class="rating-box">
            <span>★</span>
            <span>${product.rating}</span>
            <span class="rating-count">(${product.reviewsCount})</span>
          </div>
        </div>

        <h3 class="product-name" onclick="openQuickView('${product.id}')">${product.name}</h3>

        <div class="product-specs-chips">
          <span class="spec-chip">🛡️ ${product.condition}</span>
          ${product.specs?.display ? `<span class="spec-chip">${product.specs.display.split(',')[0]}</span>` : ''}
        </div>

        <div class="product-pricing">
          <div class="price-row-main">
            <span class="card-current-price">${formatPrice(product.price)}</span>
            ${product.originalPrice ? `<span class="card-original-price">${formatPrice(product.originalPrice)}</span>` : ''}
          </div>
          ${product.emiStart !== "N/A" ? `<div class="card-emi-note">EMI from ${product.emiStart}*</div>` : ''}
        </div>

        <div class="product-actions">
          <button class="btn-whatsapp-card" onclick="orderProductWhatsApp('${product.id}')" title="Direct order on WhatsApp">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
            </svg>
            <span>Order on WhatsApp</span>
          </button>
          
          <button class="btn-cart-card" onclick="addToCart('${product.id}')" title="Add to Inquiry Bag">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
          </button>
        </div>
      </article>
    `;
  }).join("");
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

  renderCategoryTabs();
  renderBrandPills();
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
      <div style="background:rgba(255,255,255,0.03); padding:1.5rem; border-radius:var(--radius-lg); margin-bottom:1rem;">
        <img src="${product.image}" alt="${product.name}" style="max-height:280px; margin:0 auto; object-fit:contain;">
      </div>
      <div style="font-size:0.85rem; color:var(--text-muted);">
        ✅ Verified Original | In Stock at Mobile Station (Garud Complex)
      </div>
    </div>

    <div>
      <div style="display:flex; gap:0.5rem; margin-bottom:0.5rem;">
        <span class="badge-tag">${product.badge}</span>
        <span class="badge-discount">${product.discountPercent}% OFF</span>
      </div>

      <h2 style="font-family:var(--font-heading); font-size:1.6rem; font-weight:800; line-height:1.25; margin-bottom:0.5rem;">${product.name}</h2>
      
      <div style="display:flex; align-items:center; gap:0.6rem; margin-bottom:1rem;">
        <div class="rating-box">★ ${product.rating}</div>
        <span style="font-size:0.85rem; color:var(--text-dim);">${product.reviewsCount} customer reviews</span>
      </div>

      <div style="display:flex; align-items:baseline; gap:0.75rem; margin-bottom:1.25rem;">
        <span style="font-family:var(--font-heading); font-size:1.85rem; font-weight:900; color:#38bdf8;">${formatPrice(product.price)}</span>
        <span style="font-size:1.05rem; color:var(--text-dim); text-decoration:line-through;">${formatPrice(product.originalPrice)}</span>
        <span style="font-size:0.88rem; color:var(--accent-green); font-weight:700;">Save ${formatPrice(product.originalPrice - product.price)}</span>
      </div>

      <!-- Color Selection -->
      ${product.colors && product.colors.length > 0 ? `
        <div style="margin-bottom:1rem;">
          <label style="font-size:0.85rem; font-weight:700; color:var(--text-muted); display:block; margin-bottom:0.4rem;">
            Select Color: <span id="qvSelectedColorText" style="color:var(--text-main);">${selectedColor}</span>
          </label>
          <div style="display:flex; flex-wrap:wrap; gap:0.4rem;">
            ${product.colors.map(col => `
              <button class="category-tab ${col === selectedColor ? 'active' : ''}" style="font-size:0.8rem; padding:0.35rem 0.75rem;" onclick="selectQVColor('${col}')">
                ${col}
              </button>
            `).join("")}
          </div>
        </div>
      ` : ''}

      <!-- Storage Selection -->
      ${product.storageOptions && product.storageOptions.length > 0 ? `
        <div style="margin-bottom:1.25rem;">
          <label style="font-size:0.85rem; font-weight:700; color:var(--text-muted); display:block; margin-bottom:0.4rem;">
            Select Variant / Storage: <span id="qvSelectedStorageText" style="color:var(--text-main);">${selectedStorage}</span>
          </label>
          <div style="display:flex; flex-wrap:wrap; gap:0.4rem;">
            ${product.storageOptions.map(st => `
              <button class="category-tab ${st === selectedStorage ? 'active' : ''}" style="font-size:0.8rem; padding:0.35rem 0.75rem;" onclick="selectQVStorage('${st}')">
                ${st}
              </button>
            `).join("")}
          </div>
        </div>
      ` : ''}

      <!-- Technical Specifications Sheet -->
      <div style="background:var(--bg-input); padding:1rem; border-radius:var(--radius-md); margin-bottom:1.5rem; font-size:0.82rem;">
        <strong style="display:block; margin-bottom:0.5rem; color:#38bdf8;">⚙️ Key Specifications:</strong>
        <div style="display:grid; grid-template-columns:1fr; gap:0.4rem; color:var(--text-muted);">
          <div>📱 <strong>Display:</strong> ${product.specs?.display || 'Super Retina High Resolution'}</div>
          <div>⚡ <strong>Processor:</strong> ${product.specs?.processor || 'High performance chipset'}</div>
          <div>📸 <strong>Camera:</strong> ${product.specs?.camera || 'Pro Grade Camera System'}</div>
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
  const txt = document.getElementById("qvSelectedColorText");
  if (txt) txt.innerText = color;
  openQuickView(currentQuickViewProduct.id);
}

function selectQVStorage(storage) {
  selectedStorage = storage;
  const txt = document.getElementById("qvSelectedStorageText");
  if (txt) txt.innerText = storage;
  openQuickView(currentQuickViewProduct.id);
}

function closeQuickViewModal() {
  const modal = document.getElementById("quickViewModal");
  if (modal) modal.classList.remove("active");
  document.body.style.overflow = "";
}

// Direct WhatsApp Order Handlers
function orderProductWhatsApp(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const phone = STORE_CONFIG.primaryPhone;
  const message = `Hello Mobile Station (Garud Complex)! 👋

I am interested in buying this product from your website:
📱 *Product:* ${product.name}
🏷️ *Brand:* ${product.brand}
💰 *Offer Price:* ₹${product.price.toLocaleString("en-IN")} (M.R.P. ₹${product.originalPrice?.toLocaleString("en-IN")})
🛡️ *Condition:* ${product.condition}
✨ *Warranty:* ${product.warranty}

Please let me know if this is ready for pickup or delivery today. Thank you!`;

  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

function orderCurrentQuickViewWhatsApp() {
  if (!currentQuickViewProduct) return;

  const phone = STORE_CONFIG.primaryPhone;
  const message = `Hello Mobile Station! 👋

I want to order / inquire about:
📱 *Product:* ${currentQuickViewProduct.name}
🎨 *Selected Color:* ${selectedColor}
💾 *Selected Variant:* ${selectedStorage}
💰 *Price:* ₹${currentQuickViewProduct.price.toLocaleString("en-IN")}
📍 *Store Pickup:* Garud Complex showroom

Please share payment/pickup details.`;

  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

// Cart / Inquiry Bag Logic
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
        <div style="font-size: 3rem; margin-bottom: 0.5rem;">🛍️</div>
        <p style="font-weight: 600;">Your Inquiry Bag is Empty</p>
        <p style="font-size: 0.85rem; margin-top: 0.35rem;">Add any smartphone, charger or gadget to inquire in a single WhatsApp message!</p>
      </div>
    `;
    subtotalEl.innerText = "₹0";
    return;
  }

  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  subtotalEl.innerText = "₹" + subtotal.toLocaleString("en-IN");

  container.innerHTML = state.cart.map(item => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}" class="cart-item-img">
      <div class="cart-item-details">
        <h4 class="cart-item-name">${item.name}</h4>
        <div class="cart-item-price">₹${(item.price * item.qty).toLocaleString("en-IN")}</div>
        <div class="cart-item-actions">
          <button class="cart-qty-btn" onclick="updateCartQty('${item.id}', -1)">-</button>
          <span class="cart-qty-val">${item.qty}</span>
          <button class="cart-qty-btn" onclick="updateCartQty('${item.id}', 1)">+</button>
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

Please confirm availability, store pickup location (Garud Complex / Balaji Mandir Road), and final discount. Thank you!`;

  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

// Repair Services Rendering
function renderRepairServices() {
  const container = document.getElementById("repairServicesGrid");
  if (!container) return;

  container.innerHTML = REPAIR_SERVICES.map(rep => `
    <div class="repair-card">
      <div class="repair-icon-box">${rep.icon}</div>
      <h3>${rep.title}</h3>
      <p>${rep.description}</p>
      
      <div class="repair-meta-row">
        <span class="repair-time">⏱️ ${rep.turnaround}</span>
        <span class="repair-warranty">🛡️ ${rep.warranty}</span>
      </div>

      <div style="display:flex; justify-content:space-between; align-items:center; margin-top:auto;">
        <div>
          <span style="font-size:0.75rem; color:var(--text-dim);">Starting at</span>
          <div style="font-family:var(--font-heading); font-weight:800; font-size:1.15rem; color:#38bdf8;">${rep.startingPrice}</div>
        </div>
        <button class="btn-whatsapp-card" onclick="bookRepairServiceWhatsApp('${rep.title}', '${rep.startingPrice}')">
          ⚡ Book on WhatsApp
        </button>
      </div>
    </div>
  `).join("");
}

function bookRepairServiceWhatsApp(serviceTitle, startingPrice) {
  const phone = STORE_CONFIG.primaryPhone;
  const message = `Hello Mobile Station Repair Hub (Garud Complex)! 🔧

I need to book a repair service:
🛠️ *Service Required:* ${serviceTitle}
💰 *Est. Starting Price:* ${startingPrice}

Please tell me the earliest slot and technician availability.`;

  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

function submitRepairInquiry() {
  const model = document.getElementById("repairModelInput")?.value.trim() || "Unspecified Model";
  const issue = document.getElementById("repairIssueSelect")?.value || "General Inspection";
  const phone = STORE_CONFIG.primaryPhone;

  const message = `Hello Mobile Station Repair Station! 📱🔧

*Fast Repair Estimation Request:*
📱 *Phone Model:* ${model}
⚠️ *Issue / Fault:* ${issue}
📍 *Store Location:* Garud Complex, In front of Sony Novelty

Please quote the estimate repair cost & turnaround time.`;

  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

// Reviews Rendering & Adding
function renderReviews() {
  const container = document.getElementById("reviewsGrid");
  if (!container) return;

  container.innerHTML = state.reviews.map(rev => `
    <div class="review-card">
      <div>
        <div class="review-header">
          <div>
            <div class="reviewer-name">${rev.name}</div>
            <div class="reviewer-location">${rev.location}</div>
          </div>
          <div class="review-stars">${"★".repeat(rev.rating)}</div>
        </div>
        <p class="review-text">"${rev.comment}"</p>
      </div>
      <div>
        <span class="review-product-tag">🛍️ ${rev.product}</span>
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
  showToast("🌟 Thank you! Your review has been posted.");
}

// Contact Form WhatsApp Submission
function handleFormWhatsAppSubmit(e) {
  e.preventDefault();
  const name = document.getElementById("formName")?.value.trim();
  const branch = document.getElementById("formBranch")?.value;
  const interest = document.getElementById("formInterest")?.value;
  const messageText = document.getElementById("formMessage")?.value.trim();

  const phone = branch.includes("Siddhi Marketing") ? "919876543211" : STORE_CONFIG.primaryPhone;

  const msg = `Hello *${branch}*! 👋

*New Customer Inquiry via Website Form:*
👤 *Customer Name:* ${name}
🎯 *Looking for:* ${interest}
🏢 *Preferred Branch:* ${branch}
${messageText ? `💬 *Message / Query:* ${messageText}` : ''}

Please connect with me regarding current best offers and availability.`;

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
      totalSeconds = 24 * 3600; // Reset next cycle
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

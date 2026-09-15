/* =========================================================================
   MOBILE STATION — LUXURY SHOWROOM INTERACTION ENGINE (2026)
   - 3D Physics & Continuous Orbit/Gyroscope Engine
   - Dynamic Multi-Brand Product Catalog (Apple, Samsung, OnePlus, Google, Xiaomi, Vivo, OPPO)
   - Real-Time Shopping Bag & WhatsApp Concierge Dispatch
   - Interactive Trade-In Estimator & Express Repair Lab
========================================================================= */

// Global State
const WHATSAPP_NUMBER = "919322160461";

let bag = [];
try {
  const saved = localStorage.getItem("ms_showroom_bag_v2");
  if (saved) bag = JSON.parse(saved);
} catch (e) {
  bag = [];
}

let activeBrandFilter = "all";
let currentSearchQuery = "";

// Hero 3D Rotation State
let heroState = {
  rotateX: -4,
  rotateY: 12,
  targetRotateX: -4,
  targetRotateY: 12,
  isDragging: false,
  startX: 0,
  startY: 0,
  autoRotationSpeed: 0.008,
  selectedColor: "Deep Red Titanium",
  selectedStorage: "256GB",
  basePrice: 179900,
  currentPrice: 179900,
  productName: "iPhone 18 Pro Max"
};

// =========================================================================
// INITIALIZATION
// =========================================================================
document.addEventListener("DOMContentLoaded", () => {
  initHero3DInteractive();
  initHeroSelectors();
  initProductsShowroom();
  initSearch();
  initTradeInCalculator();
  initRepairLab();
  initNavbarScroll();
  updateBagUI();
});


// =========================================================================
// 1. HERO 3D PHYSICS, CONTINUOUS ROTATION & PARALLAX ENGINE
// =========================================================================
function initHero3DInteractive() {
  const phoneContainer = document.getElementById("phoneContainer");
  const phoneScene = document.getElementById("phoneScene");
  const phoneGlare = document.getElementById("phoneGlare");
  if (!phoneContainer || !phoneScene) return;

  // Mouse Parallax on Desktop
  window.addEventListener("mousemove", (e) => {
    if (heroState.isDragging) return;
    const nx = (e.clientX / window.innerWidth - 0.5) * 2;
    const ny = (e.clientY / window.innerHeight - 0.5) * 2;

    heroState.targetRotateX = ny * -14;
    heroState.targetRotateY = 12 + nx * 20;
  });

  // Desktop Click & Drag 3D Interaction
  phoneScene.addEventListener("mousedown", (e) => {
    heroState.isDragging = true;
    heroState.startX = e.clientX;
    heroState.startY = e.clientY;
  });

  window.addEventListener("mouseup", () => {
    heroState.isDragging = false;
  });

  window.addEventListener("mousemove", (e) => {
    if (!heroState.isDragging) return;
    const dx = e.clientX - heroState.startX;
    const dy = e.clientY - heroState.startY;

    heroState.targetRotateY += dx * 0.4;
    heroState.targetRotateX -= dy * 0.4;

    heroState.startX = e.clientX;
    heroState.startY = e.clientY;
  });

  // Mobile Touch Drag 3D Interaction
  phoneScene.addEventListener("touchstart", (e) => {
    if (e.touches.length === 1) {
      heroState.isDragging = true;
      heroState.startX = e.touches[0].clientX;
      heroState.startY = e.touches[0].clientY;
    }
  }, { passive: true });

  window.addEventListener("touchend", () => {
    heroState.isDragging = false;
  });

  window.addEventListener("touchmove", (e) => {
    if (!heroState.isDragging || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - heroState.startX;
    const dy = e.touches[0].clientY - heroState.startY;

    heroState.targetRotateY += dx * 0.5;
    heroState.targetRotateX -= dy * 0.5;

    heroState.startX = e.touches[0].clientX;
    heroState.startY = e.touches[0].clientY;
  }, { passive: true });

  // Render Loop with Continuous Subtle Rotation + Scroll Interpolation
  let lastTime = performance.now();

  function render3DLoop(currentTime) {
    const delta = currentTime - lastTime;
    lastTime = currentTime;

    // Continuous slow orbit when not dragging
    if (!heroState.isDragging) {
      heroState.targetRotateY += heroState.autoRotationSpeed * (delta || 16);
    }

    // Smooth Damping
    heroState.rotateX += (heroState.targetRotateX - heroState.rotateX) * 0.08;
    heroState.rotateY += (heroState.targetRotateY - heroState.rotateY) * 0.08;

    // Scroll Reactions
    const scrollY = window.scrollY;
    const scrollFactor = Math.min(scrollY / 800, 1);
    const scrollMoveY = scrollFactor * 60;
    const scrollScale = Math.max(1 - scrollFactor * 0.12, 0.88);
    const scrollRotateZ = scrollFactor * 10;

    phoneContainer.style.transform = `
      translateY(${scrollMoveY}px)
      scale(${scrollScale})
      rotateX(${heroState.rotateX}deg)
      rotateY(${heroState.rotateY}deg)
      rotateZ(${scrollRotateZ}deg)
    `;

    // Dynamic Lens Glare Shift
    if (phoneGlare) {
      const glarePos = 50 + (heroState.rotateY % 360) * 0.4;
      phoneGlare.style.background = `linear-gradient(${125 + heroState.rotateX}deg, transparent 35%, rgba(255,255,255,0.3) ${glarePos}%, transparent 65%)`;
    }

    requestAnimationFrame(render3DLoop);
  }

  requestAnimationFrame(render3DLoop);
}


// =========================================================================
// 2. HERO VARIANT, COLOR & STORAGE SELECTORS
// =========================================================================
function initHeroSelectors() {
  const phoneImage = document.getElementById("phoneImage");
  const phoneReflectionImg = document.getElementById("phoneReflectionImg");
  const heroCardPrice = document.getElementById("heroCardPrice");
  const heroEmiTag = document.getElementById("heroEmiTag");
  const heroSelectedColorName = document.getElementById("heroSelectedColorName");
  const selectedStorageText = document.getElementById("selectedStorageText");

  // Storage Options
  const storageBtns = document.querySelectorAll("#heroStorageSelector .storage-btn");
  storageBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      storageBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const storage = btn.getAttribute("data-storage");
      const price = parseInt(btn.getAttribute("data-price"), 10);

      heroState.selectedStorage = storage;
      heroState.currentPrice = price;

      if (selectedStorageText) selectedStorageText.textContent = storage;
      if (heroCardPrice) heroCardPrice.textContent = `₹${price.toLocaleString("en-IN")}`;
      if (heroEmiTag) {
        const emi = Math.round(price / 24);
        heroEmiTag.textContent = `EMI starts at ₹${emi.toLocaleString("en-IN")}/mo`;
      }
    });
  });

  // Color Swatches
  const colorSwatches = document.querySelectorAll("#heroColorSelector .color-swatch");
  colorSwatches.forEach((swatch) => {
    swatch.addEventListener("click", () => {
      colorSwatches.forEach((s) => s.classList.remove("active"));
      swatch.classList.add("active");

      const colorName = swatch.getAttribute("data-color");
      const filterStyle = swatch.getAttribute("data-filter");

      heroState.selectedColor = colorName;
      if (heroSelectedColorName) heroSelectedColorName.textContent = colorName;

      if (phoneImage) phoneImage.style.filter = filterStyle || "none";
      if (phoneReflectionImg) phoneReflectionImg.style.filter = filterStyle || "none";

      showToast(`Selected ${colorName}`);
    });
  });

  // Thumbnail Dock Buttons
  const thumbBtns = document.querySelectorAll("#heroThumbnailsDock .thumb-btn");
  thumbBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      thumbBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const angle = parseFloat(btn.getAttribute("data-angle") || "0");
      const color = btn.getAttribute("data-color");

      heroState.targetRotateY = angle;
      if (color) {
        const matchingSwatch = document.querySelector(`.color-swatch[data-color="${color}"]`);
        if (matchingSwatch) matchingSwatch.click();
      }
    });
  });

  // Hero Add To Bag Button
  const heroAddBagBtn = document.getElementById("heroAddBagBtn");
  if (heroAddBagBtn) {
    heroAddBagBtn.addEventListener("click", () => {
      addToBag({
        id: "apple-18-pro-max",
        name: heroState.productName,
        price: heroState.currentPrice,
        variant: `${heroState.selectedStorage} • ${heroState.selectedColor}`,
        image: "assets/phone.png"
      });
    });
  }
}

function openHeroWhatsApp() {
  const text = `Hi Mobile Station! I am interested in purchasing:
• ${heroState.productName}
• Variant: ${heroState.selectedStorage} - ${heroState.selectedColor}
• Price: ₹${heroState.currentPrice.toLocaleString("en-IN")}

Please confirm immediate showroom availability and sharing payment/allotment details.`;

  openWhatsApp(text);
}


// =========================================================================
// 3. DYNAMIC MULTI-BRAND FLAGSHIPS SHOWROOM CATALOG
// =========================================================================
function initProductsShowroom() {
  renderProductCards();

  // Brand Tabs Click Listener
  const brandTabs = document.querySelectorAll(".brand-tab");
  brandTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      brandTabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      activeBrandFilter = tab.getAttribute("data-brand");
      renderProductCards();
    });
  });

  // Inline Search Filter
  const inlineSearch = document.getElementById("flagshipSearchInput");
  if (inlineSearch) {
    inlineSearch.addEventListener("input", (e) => {
      currentSearchQuery = e.target.value.toLowerCase().trim();
      renderProductCards();
    });
  }
}

function filterByBrand(brandId) {
  activeBrandFilter = brandId;
  const brandTabs = document.querySelectorAll(".brand-tab");
  brandTabs.forEach((tab) => {
    if (tab.getAttribute("data-brand") === brandId) {
      tab.classList.add("active");
    } else {
      tab.classList.remove("active");
    }
  });

  renderProductCards();
  scrollToSection("flagships");
}

function renderProductCards() {
  const grid = document.getElementById("productsShowroomGrid");
  if (!grid || typeof PRODUCTS === "undefined") return;

  const filtered = PRODUCTS.filter((p) => {
    const matchesBrand = activeBrandFilter === "all" || p.category === activeBrandFilter;
    const matchesQuery =
      !currentSearchQuery ||
      p.name.toLowerCase().includes(currentSearchQuery) ||
      p.brand.toLowerCase().includes(currentSearchQuery) ||
      (p.chip && p.chip.toLowerCase().includes(currentSearchQuery)) ||
      (p.tagline && p.tagline.toLowerCase().includes(currentSearchQuery));

    return matchesBrand && matchesQuery;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: var(--text-muted);">
        <div style="font-size: 36px; margin-bottom: 12px;">🔍</div>
        <h3>No flagship smartphones found</h3>
        <p style="margin-top: 6px;">Try adjusting your search query or select another brand tab.</p>
        <button class="btn btn-crimson" style="margin-top: 16px;" onclick="resetProductFilters()">
          View All Flagships
        </button>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered
    .map((product) => {
      return `
        <article class="phone-card">
          <div class="card-top-badges">
            <span class="card-brand-tag">${product.brand}</span>
            <span class="card-deal-badge">${product.badge || "👑 Flagship"}</span>
          </div>

          <div class="card-visual-stage" onclick="openProductModal('${product.id}')" style="cursor: pointer;">
            <div class="card-stage-glow"></div>
            <img
              src="${product.image}"
              alt="${product.name}"
              class="card-phone-image"
              loading="lazy"
            />
          </div>

          <h3 class="card-product-title" onclick="openProductModal('${product.id}')" style="cursor: pointer;">
            ${product.name}
          </h3>
          <p class="card-tagline">${product.tagline || "Latest 2026 Smartphone Technology"}</p>

          <div class="card-specs-list">
            <div class="spec-item-row">
              <i>⚡</i> <span>${product.chip || "Flagship 3nm Processor"}</span>
            </div>
            <div class="spec-item-row">
              <i>📸</i> <span>${product.camera ? product.camera.substring(0, 42) + '...' : "Pro Camera Array"}</span>
            </div>
            <div class="spec-item-row">
              <i>✨</i> <span>${product.display ? product.display.substring(0, 38) + '...' : "120Hz Pro Display"}</span>
            </div>
          </div>

          <div class="card-price-row">
            <div>
              <strong>₹${product.price.toLocaleString("en-IN")}</strong>
            </div>
            <div class="card-emi-text">
              ${product.emi || `EMI ₹${Math.round(product.price / 24).toLocaleString("en-IN")}/mo`}
            </div>
          </div>

          <div class="card-actions-grid">
            <button
              class="btn btn-crimson card-btn-primary"
              onclick="addToBag({ id: '${product.id}', name: '${product.name.replace(/'/g, "\\'")}', price: ${product.price}, variant: '${product.storage ? product.storage[0] : "Standard"}', image: '${product.image}' })"
            >
              Add to Bag
            </button>
            <button
              class="btn btn-outline-light card-btn-sub"
              onclick="openProductModal('${product.id}')"
            >
              View Details
            </button>
            <button
              class="btn btn-whatsapp-secondary card-btn-sub"
              onclick="openWhatsApp('Hi Mobile Station! I am enquiring about ${encodeURIComponent(product.name)} (₹${product.price.toLocaleString("en-IN")}). Please share details.')"
            >
              WhatsApp
            </button>
          </div>
        </article>
      `;
    })
    .join("");
}

function resetProductFilters() {
  activeBrandFilter = "all";
  currentSearchQuery = "";
  const inlineSearch = document.getElementById("flagshipSearchInput");
  if (inlineSearch) inlineSearch.value = "";
  const brandTabs = document.querySelectorAll(".brand-tab");
  brandTabs.forEach((tab) => {
    if (tab.getAttribute("data-brand") === "all") tab.classList.add("active");
    else tab.classList.remove("active");
  });
  renderProductCards();
}


// =========================================================================
// 4. INSTANT SEARCH OVERLAY
// =========================================================================
function initSearch() {
  const openSearchBtn = document.getElementById("openSearchBtn");
  const closeSearchBtn = document.getElementById("closeSearchBtn");
  const searchOverlay = document.getElementById("searchOverlay");
  const globalSearchInput = document.getElementById("globalSearchInput");
  const searchResultsContainer = document.getElementById("searchResultsContainer");

  if (!searchOverlay || !globalSearchInput) return;

  if (openSearchBtn) {
    openSearchBtn.addEventListener("click", () => {
      searchOverlay.classList.add("open");
      globalSearchInput.focus();
    });
  }

  if (closeSearchBtn) {
    closeSearchBtn.addEventListener("click", () => {
      searchOverlay.classList.remove("open");
    });
  }

  searchOverlay.addEventListener("click", (e) => {
    if (e.target === searchOverlay) {
      searchOverlay.classList.remove("open");
    }
  });

  globalSearchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase().trim();
    if (!query) {
      searchResultsContainer.innerHTML = `
        <div class="search-hint">Type any brand, model, chip or feature to filter instantly...</div>
      `;
      return;
    }

    const matches = PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.brand.toLowerCase().includes(query) ||
        (p.chip && p.chip.toLowerCase().includes(query)) ||
        (p.tagline && p.tagline.toLowerCase().includes(query))
    );

    if (matches.length === 0) {
      searchResultsContainer.innerHTML = `
        <div class="search-hint">No matching smartphones found for "${query}".</div>
      `;
      return;
    }

    searchResultsContainer.innerHTML = matches
      .map(
        (p) => `
        <div class="search-result-item" onclick="selectSearchResult('${p.id}')">
          <div class="search-result-left">
            <img src="${p.image}" alt="${p.name}" />
            <div class="search-result-info">
              <strong>${p.name}</strong>
              <span>${p.brand} • ${p.chip || "Flagship"}</span>
            </div>
          </div>
          <div class="search-result-price">
            ₹${p.price.toLocaleString("en-IN")}
          </div>
        </div>
      `
      )
      .join("");
  });
}

function selectSearchResult(productId) {
  const searchOverlay = document.getElementById("searchOverlay");
  if (searchOverlay) searchOverlay.classList.remove("open");
  openProductModal(productId);
}


// =========================================================================
// 5. SHOPPING BAG / CART SYSTEM
// =========================================================================
function addToBag(item) {
  const existingIndex = bag.findIndex(
    (b) => b.id === item.id && b.variant === item.variant
  );

  if (existingIndex > -1) {
    bag[existingIndex].qty += 1;
  } else {
    bag.push({
      id: item.id,
      name: item.name,
      price: item.price,
      variant: item.variant || "Standard Edition",
      image: item.image || "assets/phone.png",
      qty: 1
    });
  }

  saveBag();
  updateBagUI();
  showToast(`Added ${item.name} to your bag`);
  openBagDrawer();
}

function updateQty(index, change) {
  if (!bag[index]) return;
  bag[index].qty += change;
  if (bag[index].qty <= 0) {
    bag.splice(index, 1);
  }
  saveBag();
  updateBagUI();
}

function removeBagItem(index) {
  if (!bag[index]) return;
  const name = bag[index].name;
  bag.splice(index, 1);
  saveBag();
  updateBagUI();
  showToast(`Removed ${name} from bag`);
}

function saveBag() {
  try {
    localStorage.setItem("ms_showroom_bag_v2", JSON.stringify(bag));
  } catch (e) {}
}

function updateBagUI() {
  const bagCount = document.getElementById("bagCount");
  const drawerItemCount = document.getElementById("drawerItemCount");
  const bagItemsList = document.getElementById("bagItemsList");
  const bagSubtotalAmount = document.getElementById("bagSubtotalAmount");

  const totalQty = bag.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = bag.reduce((sum, item) => sum + item.price * item.qty, 0);

  if (bagCount) bagCount.textContent = totalQty;
  if (drawerItemCount) drawerItemCount.textContent = `(${totalQty} items)`;
  if (bagSubtotalAmount) bagSubtotalAmount.textContent = `₹${totalPrice.toLocaleString("en-IN")}`;

  if (!bagItemsList) return;

  if (bag.length === 0) {
    bagItemsList.innerHTML = `
      <div class="empty-bag-state">
        <div class="empty-icon">🛍️</div>
        <h4>Your Shopping Bag is Empty</h4>
        <p style="font-size: 13px; margin-top: 6px;">Explore our 2026 flagship lineup and add your favorite device.</p>
      </div>
    `;
    return;
  }

  bagItemsList.innerHTML = bag
    .map(
      (item, idx) => `
      <div class="bag-item-card">
        <img src="${item.image}" alt="${item.name}" />
        <div class="bag-item-details">
          <strong>${item.name}</strong>
          <div class="bag-item-variant">${item.variant}</div>
          <div class="bag-item-price">₹${(item.price * item.qty).toLocaleString("en-IN")}</div>
          <div class="bag-item-controls">
            <div class="qty-stepper">
              <button class="qty-btn" onclick="updateQty(${idx}, -1)">−</button>
              <span class="qty-val">${item.qty}</span>
              <button class="qty-btn" onclick="updateQty(${idx}, 1)">+</button>
            </div>
            <button class="remove-btn" onclick="removeBagItem(${idx})">Remove</button>
          </div>
        </div>
      </div>
    `
    )
    .join("");
}

function openBagDrawer() {
  const drawer = document.getElementById("bagDrawer");
  const overlay = document.getElementById("bagOverlay");
  if (drawer && overlay) {
    drawer.classList.add("open");
    overlay.classList.add("show");
  }
}

function closeBagDrawer() {
  const drawer = document.getElementById("bagDrawer");
  const overlay = document.getElementById("bagOverlay");
  if (drawer && overlay) {
    drawer.classList.remove("open");
    overlay.classList.remove("show");
  }
}

const openBagBtn = document.getElementById("openBagBtn");
if (openBagBtn) {
  openBagBtn.addEventListener("click", openBagDrawer);
}

function checkoutBagWhatsApp() {
  if (bag.length === 0) {
    showToast("Your shopping bag is empty");
    return;
  }

  const itemsList = bag
    .map(
      (item) =>
        `• ${item.name} (${item.variant}) x${item.qty} = ₹${(item.price * item.qty).toLocaleString("en-IN")}`
    )
    .join("\n");

  const total = bag.reduce((sum, item) => sum + item.price * item.qty, 0);

  const message = `Hi Mobile Station! 📱

I would like to order the following items from the Showroom Bag:

${itemsList}

========================
Total Amount: ₹${total.toLocaleString("en-IN")}
========================

Please confirm immediate stock availability and share payment / showroom delivery details.`;

  openWhatsApp(message);
}


// =========================================================================
// 6. INTERACTIVE TRADE-IN ESTIMATOR
// =========================================================================
let currentTradeCondition = "flawless";

function initTradeInCalculator() {
  onTradeBrandChange();
}

function onTradeBrandChange() {
  const brandSelect = document.getElementById("tradeBrandSelect");
  const modelSelect = document.getElementById("tradeModelSelect");
  if (!brandSelect || !modelSelect || typeof TRADE_IN_DEVICES === "undefined") return;

  const brand = brandSelect.value;
  const models = TRADE_IN_DEVICES.filter((d) => d.brand === brand);

  modelSelect.innerHTML = models
    .map((m) => `<option value="${m.model}">${m.model}</option>`)
    .join("");

  calculateTradeValue();
}

function setTradeCondition(cond) {
  currentTradeCondition = cond;
  const chips = document.querySelectorAll("#tradeConditionChips .cond-btn");
  chips.forEach((btn) => {
    if (btn.getAttribute("data-cond") === cond) btn.classList.add("active");
    else btn.classList.remove("active");
  });

  calculateTradeValue();
}

function calculateTradeValue() {
  const brandSelect = document.getElementById("tradeBrandSelect");
  const modelSelect = document.getElementById("tradeModelSelect");
  const valueDisplay = document.getElementById("tradeValueDisplay");

  if (!brandSelect || !modelSelect || !valueDisplay || typeof TRADE_IN_DEVICES === "undefined") return;

  const brand = brandSelect.value;
  const model = modelSelect.value;

  const match = TRADE_IN_DEVICES.find((d) => d.brand === brand && d.model === model);
  if (match) {
    const val = match[currentTradeCondition] || match.flawless;
    valueDisplay.textContent = `₹${val.toLocaleString("en-IN")}`;
  } else {
    valueDisplay.textContent = "₹35,000";
  }
}

function claimTradeInWhatsApp() {
  const brandSelect = document.getElementById("tradeBrandSelect");
  const modelSelect = document.getElementById("tradeModelSelect");
  const valueDisplay = document.getElementById("tradeValueDisplay");

  const brand = brandSelect ? brandSelect.value : "Smartphone";
  const model = modelSelect ? modelSelect.value : "Current Phone";
  const val = valueDisplay ? valueDisplay.textContent : "₹85,000";

  const msg = `Hi Mobile Station! 🔄

I want to exchange my old phone:
• Brand: ${brand}
• Model: ${model}
• Condition: ${currentTradeCondition.toUpperCase()}
• Estimated Trade-In Valuation: ${val} (+ ₹6,000 Upgrade Bonus)

Please evaluate my device and help me upgrade to the latest 2026 flagship!`;

  openWhatsApp(msg);
}

function openTradeInModal() {
  scrollToSection("trade");
}


// =========================================================================
// 7. REPAIR LAB DYNAMIC GRID
// =========================================================================
function initRepairLab() {
  const grid = document.getElementById("repairServicesGrid");
  if (!grid || typeof REPAIR_SERVICES === "undefined") return;

  grid.innerHTML = REPAIR_SERVICES.map(
    (srv) => `
    <article class="repair-service-card">
      <div class="repair-icon">${srv.icon}</div>
      <h3>${srv.name}</h3>
      <div class="repair-meta-row">
        <span>⏱️ ${srv.time}</span>
        <span>🛡️ ${srv.warranty}</span>
      </div>
      <p>${srv.desc}</p>
      <button class="btn btn-outline-hero btn-full" style="margin-top: 16px; font-size: 12px;" onclick="bookRepairService('${srv.name}')">
        Book This Repair →
      </button>
    </article>
  `
  ).join("");
}

function bookRepairService(serviceName) {
  openCallbackModal(`Repair Service: ${serviceName}`);
}

function openRepairBookingModal() {
  openCallbackModal("Express Repair Diagnostic");
}


// =========================================================================
// 8. PRODUCT SPECIFICATIONS MODAL
// =========================================================================
let currentModalProduct = null;
let currentModalSelectedStorage = null;

function openProductModal(productId) {
  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) return;

  currentModalProduct = product;
  const backdrop = document.getElementById("productModalBackdrop");
  const modalImg = document.getElementById("modalProductImg");
  const modalBadge = document.getElementById("modalBadge");
  const modalTitle = document.getElementById("modalTitle");
  const modalTagline = document.getElementById("modalTagline");
  const modalPrice = document.getElementById("modalPrice");
  const modalEmi = document.getElementById("modalEmi");
  const modalSpecChip = document.getElementById("modalSpecChip");
  const modalSpecDisplay = document.getElementById("modalSpecDisplay");
  const modalSpecCamera = document.getElementById("modalSpecCamera");
  const modalSpecBattery = document.getElementById("modalSpecBattery");
  const modalStorageGrid = document.getElementById("modalStorageGrid");
  const modalColorSwatches = document.getElementById("modalColorSwatches");
  const modalAddBagBtn = document.getElementById("modalAddBagBtn");
  const modalWhatsAppBtn = document.getElementById("modalWhatsAppBtn");
  const modalCallbackBtn = document.getElementById("modalCallbackBtn");

  if (modalImg) modalImg.src = product.image;
  if (modalBadge) modalBadge.textContent = product.badge || `${product.brand} Flagship`;
  if (modalTitle) modalTitle.textContent = product.name;
  if (modalTagline) modalTagline.textContent = product.tagline || "";
  if (modalPrice) modalPrice.textContent = `₹${product.price.toLocaleString("en-IN")}`;
  if (modalEmi) modalEmi.textContent = product.emi || `EMI from ₹${Math.round(product.price / 24).toLocaleString("en-IN")}/mo`;

  if (modalSpecChip) modalSpecChip.textContent = product.chip || "Flagship Silicon";
  if (modalSpecDisplay) modalSpecDisplay.textContent = product.display || "120Hz AMOLED Display";
  if (modalSpecCamera) modalSpecCamera.textContent = product.camera || "Pro Multi-Camera Setup";
  if (modalSpecBattery) modalSpecBattery.textContent = product.battery || "All-Day Fast Charging";

  // Storage Options
  if (modalStorageGrid) {
    const storages = product.storage || ["256GB", "512GB", "1TB"];
    currentModalSelectedStorage = storages[0];
    modalStorageGrid.innerHTML = storages
      .map(
        (s, i) =>
          `<button class="modal-storage-btn ${i === 0 ? "active" : ""}" onclick="selectModalStorage('${s}', this)">${s}</button>`
      )
      .join("");
  }

  // Color Swatches
  if (modalColorSwatches) {
    const colors = product.colors || [{ name: "Standard", hex: "#7a1120" }];
    modalColorSwatches.innerHTML = colors
      .map(
        (c, i) =>
          `<div class="color-swatch ${i === 0 ? "active" : ""}" style="background: ${c.hex};" title="${c.name}"></div>`
      )
      .join("");
  }

  // Actions
  if (modalAddBagBtn) {
    modalAddBagBtn.onclick = () => {
      addToBag({
        id: product.id,
        name: product.name,
        price: product.price,
        variant: currentModalSelectedStorage || "Standard",
        image: product.image
      });
      closeProductModal();
    };
  }

  if (modalWhatsAppBtn) {
    modalWhatsAppBtn.onclick = () => {
      openWhatsApp(`Hi Mobile Station! I am interested in ${product.name} (₹${product.price.toLocaleString("en-IN")}). Please share immediate delivery and EMI details.`);
    };
  }

  if (modalCallbackBtn) {
    modalCallbackBtn.onclick = () => {
      closeProductModal();
      openCallbackModal(product.name);
    };
  }

  if (backdrop) backdrop.classList.add("open");
}

function selectModalStorage(storage, btn) {
  currentModalSelectedStorage = storage;
  const btns = document.querySelectorAll(".modal-storage-btn");
  btns.forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
}

function closeProductModal() {
  const backdrop = document.getElementById("productModalBackdrop");
  if (backdrop) backdrop.classList.remove("open");
}


// =========================================================================
// 9. CALLBACK REQUEST MODAL
// =========================================================================
function openCallbackModal(subject = "Smartphone Enquiry") {
  const backdrop = document.getElementById("callbackModalBackdrop");
  const subjectInput = document.getElementById("cbSubject");
  const successMsg = document.getElementById("callbackSuccessMsg");
  const form = document.getElementById("callbackRequestForm");

  if (subjectInput) subjectInput.value = subject;
  if (successMsg) successMsg.style.display = "none";
  if (form) form.style.display = "block";

  if (backdrop) backdrop.classList.add("open");
}

function closeCallbackModal() {
  const backdrop = document.getElementById("callbackModalBackdrop");
  if (backdrop) backdrop.classList.remove("open");
}

function handleCallbackSubmit(e) {
  e.preventDefault();
  const name = document.getElementById("cbName").value;
  const phone = document.getElementById("cbPhone").value;
  const subject = document.getElementById("cbSubject").value;

  const successMsg = document.getElementById("callbackSuccessMsg");
  const form = document.getElementById("callbackRequestForm");

  if (form) form.style.display = "none";
  if (successMsg) successMsg.style.display = "block";

  // Optionally send notice to WhatsApp concierge
  const text = `Hi Mobile Station! 📞 Callback Request:
• Name: ${name}
• Phone: ${phone}
• Subject: ${subject}`;

  showToast("Callback request submitted successfully!");
  setTimeout(() => {
    closeCallbackModal();
    if (form) form.reset();
  }, 2500);
}


// =========================================================================
// 10. NAVBAR, MOBILE DRAWER & UTILITIES
// =========================================================================
function initNavbarScroll() {
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    if (!navbar) return;
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  const menuToggle = document.getElementById("mobileMenuToggle");
  const mobileDrawer = document.getElementById("mobileNavDrawer");
  if (menuToggle && mobileDrawer) {
    menuToggle.addEventListener("click", () => {
      mobileDrawer.classList.toggle("open");
    });
  }
}

function closeMobileMenu() {
  const mobileDrawer = document.getElementById("mobileNavDrawer");
  if (mobileDrawer) mobileDrawer.classList.remove("open");
}

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

function openWhatsApp(message = "") {
  const text =
    message ||
    "Hi Mobile Station! I want to enquire about the latest 2026 flagship smartphones.";
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank");
}

let toastTimer;
function showToast(message) {
  const toast = document.getElementById("toastNotification");
  const msgEl = document.getElementById("toastMessage");
  if (!toast || !msgEl) return;

  msgEl.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2800);
}

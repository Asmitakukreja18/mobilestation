// =========================================================================
// MOBILE STATION — BRAND SHOWROOM LOGIC (js/brand.js)
// Powering Apple, Samsung, OnePlus, Google, Xiaomi, vivo, OPPO Showrooms
// =========================================================================

function initBrandPage(brandKey) {
  if (typeof PRODUCTS === "undefined") return;

  const brandProducts = getProductsByBrand(brandKey);
  const brandMeta = getBrandConfig(brandKey) || {
    name: brandKey.toUpperCase(),
    tagline: "Exclusive Flagship Showcase",
    description: "Explore the official flagship series at Mobile Station.",
    heroBadge: "Official Flagship Showcase",
    heroImage: "assets/phone.png"
  };

  // Populate Brand Hero
  const heroTitle = document.getElementById("brandHeroTitle");
  const heroBadge = document.getElementById("brandHeroBadge");
  const heroDesc = document.getElementById("brandHeroDesc");
  const heroPhoneImg = document.getElementById("brandHeroPhoneImg");
  const heroEmi = document.getElementById("brandHeroEmi");
  const heroPrice = document.getElementById("brandHeroPrice");

  const heroProduct = brandProducts.find(p => p.isHero) || brandProducts[0];

  if (heroTitle && heroProduct) heroTitle.innerHTML = `${brandMeta.name} <span>${heroProduct.name.replace(brandMeta.name, "").trim() || "Flagship Series"}</span>`;
  if (heroBadge && brandMeta) heroBadge.textContent = brandMeta.heroBadge;
  if (heroDesc && brandMeta) heroDesc.textContent = brandMeta.description;
  if (heroPhoneImg && heroProduct) {
    heroPhoneImg.src = heroProduct.image;
    heroPhoneImg.onerror = () => { heroPhoneImg.src = heroProduct.fallbackImage; };
  }
  if (heroPrice && heroProduct) heroPrice.textContent = "₹" + heroProduct.price.toLocaleString("en-IN");
  if (heroEmi && heroProduct) heroEmi.textContent = heroProduct.emi;

  // Render Brand Product Cards Grid
  const gridContainer = document.getElementById("brandProductsGrid");
  if (gridContainer) {
    gridContainer.innerHTML = brandProducts.map(p => `
      <div class="product-card glass-card" id="${p.id}">
        <div class="product-card-badge">${p.badge}</div>

        <div class="product-image-container">
          <img src="${p.image}" alt="${p.name}" class="product-img" onerror="this.src='${p.fallbackImage}';" />
        </div>

        <div class="product-details">
          <div class="product-brand-tag">${p.brand}</div>
          <h3 class="product-title">${p.name}</h3>
          <p class="product-tagline">${p.tagline}</p>

          <div class="product-specs-list">
            <div class="spec-row">
              <span class="spec-label">Chipset:</span>
              <span class="spec-value">${p.chip}</span>
            </div>
            <div class="spec-row">
              <span class="spec-label">Display:</span>
              <span class="spec-value">${p.display}</span>
            </div>
            <div class="spec-row">
              <span class="spec-label">Camera:</span>
              <span class="spec-value">${p.camera}</span>
            </div>
            <div class="spec-row">
              <span class="spec-label">Battery:</span>
              <span class="spec-value">${p.battery}</span>
            </div>
          </div>

          <!-- Color Dots -->
          <div class="variant-group">
            <span class="variant-label">Finishes:</span>
            <div class="color-dots-row">
              ${p.colors.map((c, i) => `
                <button class="color-dot ${i === 0 ? 'active' : ''}" 
                        style="background-color: ${c.hex};" 
                        title="${c.name}"
                        onclick="selectCardColor('${p.id}', '${c.name}', this)">
                </button>
              `).join('')}
            </div>
          </div>

          <!-- Storage Selector -->
          <div class="variant-group" style="margin-top: 10px;">
            <span class="variant-label">Storage:</span>
            <div class="storage-pills-row">
              ${p.storage.map((s, i) => `
                <button class="storage-pill ${i === 0 ? 'active' : ''}" 
                        onclick="selectCardStorage('${p.id}', '${s}', this)">
                  ${s}
                </button>
              `).join('')}
            </div>
          </div>

          <div class="product-price-row">
            <div class="price-block">
              <div class="current-price">₹${p.price.toLocaleString("en-IN")}</div>
              <div class="mrp-price">MRP ₹${p.originalPrice.toLocaleString("en-IN")}</div>
            </div>
            <div class="emi-pill">
              <small>0% EMI from</small>
              <strong>${p.emi}</strong>
            </div>
          </div>

          <div class="product-card-actions">
            <button class="btn btn-crimson btn-full" onclick="handleAddCardToBag('${p.id}')">
              🛍️ Add to Bag
            </button>
            <button class="btn btn-whatsapp-secondary btn-full" onclick="enquireWhatsApp('${p.name}', '${p.price}')">
              💬 Enquire on WhatsApp
            </button>
          </div>
        </div>
      </div>
    `).join("");
  }
}

// Color and Storage state on cards
const cardSelectionState = {};

function selectCardColor(productId, colorName, btn) {
  if (!cardSelectionState[productId]) cardSelectionState[productId] = {};
  cardSelectionState[productId].color = colorName;

  const card = document.getElementById(productId);
  if (card) {
    const dots = card.querySelectorAll(".color-dot");
    dots.forEach(d => d.classList.remove("active"));
    btn.classList.add("active");
  }
}

function selectCardStorage(productId, storage, btn) {
  if (!cardSelectionState[productId]) cardSelectionState[productId] = {};
  cardSelectionState[productId].storage = storage;

  const card = document.getElementById(productId);
  if (card) {
    const pills = card.querySelectorAll(".storage-pill");
    pills.forEach(p => p.classList.remove("active"));
    btn.classList.add("active");
  }
}

function handleAddCardToBag(productId) {
  const p = getProductById(productId);
  if (!p) return;

  const state = cardSelectionState[productId] || {};
  const chosenColor = state.color || (p.colors[0] ? p.colors[0].name : "Standard");
  const chosenStorage = state.storage || (p.storage[0] ? p.storage[0] : "Standard");

  if (typeof Cart !== "undefined") {
    Cart.addItem(p, chosenColor, chosenStorage);
  }
}

function enquireWhatsApp(productName, price) {
  const msg = `Hi Mobile Station! I am interested in *${productName}* (₹${Number(price).toLocaleString("en-IN")}) at your showroom. Please tell me current offers, delivery time, and 0% EMI options.`;
  openWhatsApp(msg);
}

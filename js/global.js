// =========================================================================
// MOBILE STATION — GLOBAL SHARED SCRIPTS (js/global.js)
// =========================================================================

function openWhatsApp(customMsg) {
  const defaultMsg = "Hi Mobile Station! I am interested in visiting your luxury smartphone showroom and exploring the 2026 flagship collection.";
  const text = customMsg || defaultMsg;
  const url = `https://wa.me/919322160461?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank");
}

function openCallbackModal(productName) {
  const modal = document.getElementById("callbackModal");
  if (!modal) return;
  const title = document.getElementById("callbackProductTitle");
  if (title && productName) title.textContent = productName;
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeCallbackModal() {
  const modal = document.getElementById("callbackModal");
  if (!modal) return;
  modal.classList.remove("active");
  document.body.style.overflow = "";
}

function submitCallbackRequest(e) {
  if (e) e.preventDefault();
  const name = document.getElementById("cbName") ? document.getElementById("cbName").value : "";
  const phone = document.getElementById("cbPhone") ? document.getElementById("cbPhone").value : "";
  const city = document.getElementById("cbCity") ? document.getElementById("cbCity").value : "Amravati";
  const product = document.getElementById("callbackProductTitle") ? document.getElementById("callbackProductTitle").textContent : "Flagship Smartphone";

  const msg = `Hi Mobile Station Concierge! 📞\nPlease arrange a priority VIP callback for me.\n\nName: ${name}\nPhone: ${phone}\nLocation: ${city}\nInterested in: ${product}`;
  const url = `https://wa.me/919322160461?text=${encodeURIComponent(msg)}`;
  window.open(url, "_blank");
  closeCallbackModal();
}

// Mobile Menu Handler
function toggleMobileMenu() {
  const drawer = document.getElementById("mobileNavDrawer");
  const toggle = document.getElementById("mobileMenuToggle");
  if (!drawer) return;
  drawer.classList.toggle("active");
  if (toggle) toggle.classList.toggle("open");
}

function closeMobileMenu() {
  const drawer = document.getElementById("mobileNavDrawer");
  const toggle = document.getElementById("mobileMenuToggle");
  if (drawer) drawer.classList.remove("active");
  if (toggle) toggle.classList.remove("open");
}

// Global Init on DOM Ready
document.addEventListener("DOMContentLoaded", () => {
  // Navbar scroll background change
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    if (!navbar) return;
    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Mobile menu toggle button
  const toggleBtn = document.getElementById("mobileMenuToggle");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", toggleMobileMenu);
  }

  // Quick Global Search Modal
  const openSearchBtn = document.getElementById("openSearchBtn");
  const searchModal = document.getElementById("searchModal");
  const closeSearchBtn = document.getElementById("closeSearchBtn");
  const globalSearchInput = document.getElementById("globalSearchInput");
  const searchResults = document.getElementById("searchResults");

  if (openSearchBtn && searchModal) {
    openSearchBtn.addEventListener("click", () => {
      searchModal.classList.add("active");
      if (globalSearchInput) {
        setTimeout(() => globalSearchInput.focus(), 100);
      }
    });
  }

  if (closeSearchBtn && searchModal) {
    closeSearchBtn.addEventListener("click", () => {
      searchModal.classList.remove("active");
    });
  }

  if (globalSearchInput && searchResults) {
    globalSearchInput.addEventListener("input", (e) => {
      const q = e.target.value.toLowerCase().trim();
      if (!q || typeof PRODUCTS === "undefined") {
        searchResults.innerHTML = `<div class="search-empty">Type to search 32 flagship models (e.g. iPhone 18, S26 Ultra, OnePlus 15, Pixel 11)...</div>`;
        return;
      }

      const matches = PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.brand.toLowerCase().includes(q) || 
        p.chip.toLowerCase().includes(q)
      );

      if (matches.length === 0) {
        searchResults.innerHTML = `<div class="search-empty">No smartphones found for "${q}". Search by brand or model name.</div>`;
        return;
      }

      searchResults.innerHTML = matches.map(p => `
        <div class="search-result-item" onclick="window.location.href='${p.brandId}.html#${p.id}'">
          <img src="${p.image}" alt="${p.name}" onerror="this.src='${p.fallbackImage}';" />
          <div class="search-item-info">
            <span class="search-item-brand">${p.brand}</span>
            <div class="search-item-name">${p.name}</div>
            <div class="search-item-price">₹${p.price.toLocaleString("en-IN")} • <span style="color:#d71942;">${p.emi}</span></div>
          </div>
          <button class="btn btn-outline-hero" style="padding: 6px 14px; font-size: 12px;">Explore →</button>
        </div>
      `).join("");
    });
  }
});

// =========================================================================
// GLOBAL PRODUCT DETAILS MODAL (RESPONSIVE ACROSS ALL PAGES)
// =========================================================================
function ensureProductModalDOM() {
  if (document.getElementById("productModalBackdrop")) return;

  const modalHtml = `
    <div class="modal-backdrop" id="productModalBackdrop" style="position:fixed; inset:0; background:rgba(10,2,4,0.85); backdrop-filter:blur(16px); -webkit-backdrop-filter:blur(16px); z-index:9999; display:none; align-items:center; justify-content:center; padding:16px 12px; overflow-y:auto;">
      <div class="product-detail-modal" style="background:#ffffff; border-radius:24px; max-width:860px; width:100%; max-height:92vh; overflow-y:auto; padding:28px 20px; position:relative; box-shadow:0 25px 60px rgba(0,0,0,0.35); margin:auto;">
        <button class="modal-close-btn" onclick="closeProductModal()" style="position:absolute; top:14px; right:14px; width:36px; height:36px; border-radius:50%; background:#f0eae4; border:none; cursor:pointer; color:#0f0f0e; font-weight:800; font-size:18px; display:flex; align-items:center; justify-content:center;" aria-label="Close Modal">✕</button>
        <div class="modal-grid" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap:24px; align-items:center;">
          <div class="modal-phone-preview" style="text-align:center;">
            <div class="modal-img-wrapper" style="height:240px; display:flex; align-items:center; justify-content:center;">
              <img src="" id="modalProductImg" alt="Product" style="max-height:100%; max-width:90%; object-fit:contain; filter:drop-shadow(0 15px 25px rgba(0,0,0,0.18));" />
            </div>
            <div class="modal-color-swatches" id="modalColorSwatches" style="display:flex; justify-content:center; gap:8px; margin-top:14px;"></div>
          </div>
          <div class="modal-details-col">
            <span class="modal-badge" id="modalBadge" style="font-size:11px; font-weight:800; text-transform:uppercase; color:#d71942; background:rgba(215,25,66,0.08); border:1px solid rgba(215,25,66,0.2); padding:4px 12px; border-radius:20px; display:inline-block;">👑 Flagship</span>
            <h2 class="modal-title" id="modalTitle" style="font-size:24px; font-weight:900; color:#0f0f0e; margin:8px 0 4px; line-height:1.2;">Smartphone</h2>
            <p class="modal-tagline" id="modalTagline" style="font-size:13px; color:#584147; margin-bottom:14px;"></p>
            <div class="modal-price-box" style="display:flex; align-items:baseline; gap:12px; margin-bottom:16px; flex-wrap:wrap;">
              <div class="modal-price" id="modalPrice" style="font-size:26px; font-weight:900; color:#0f0f0e;">₹0</div>
              <div class="modal-emi" id="modalEmi" style="font-size:12px; font-weight:800; color:#15803d;">EMI</div>
            </div>
            <div class="modal-specs-table" style="background:#f8f7f4; border-radius:14px; padding:12px 14px; margin-bottom:18px; display:flex; flex-direction:column; gap:8px; font-size:12px; border:1px solid rgba(215,175,155,0.35);">
              <div style="display:flex; justify-content:space-between; gap:10px;"><span style="color:#6b5258; font-weight:600;">Processor:</span><strong id="modalSpecChip" style="color:#0f0f0e; font-weight:800;">-</strong></div>
              <div style="display:flex; justify-content:space-between; gap:10px;"><span style="color:#6b5258; font-weight:600;">Display:</span><strong id="modalSpecDisplay" style="color:#0f0f0e; font-weight:800;">-</strong></div>
              <div style="display:flex; justify-content:space-between; gap:10px;"><span style="color:#6b5258; font-weight:600;">Camera:</span><strong id="modalSpecCamera" style="color:#0f0f0e; font-weight:800;">-</strong></div>
              <div style="display:flex; justify-content:space-between; gap:10px;"><span style="color:#6b5258; font-weight:600;">Battery:</span><strong id="modalSpecBattery" style="color:#0f0f0e; font-weight:800;">-</strong></div>
            </div>
            <div style="display:flex; flex-direction:column; gap:10px;">
              <button class="btn btn-crimson btn-full" id="modalAddBagBtn" style="padding:14px; font-weight:800; width:100%; border-radius:20px;">🛍️ Add to Bag</button>
              <button class="btn btn-whatsapp-secondary btn-full" id="modalWhatsAppBtn" style="padding:12px; font-weight:700; width:100%; border-radius:20px;">💬 Chat on WhatsApp</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML("beforeend", modalHtml);
}

function openProductModal(productId) {
  if (typeof PRODUCTS === "undefined") return;
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  ensureProductModalDOM();
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
  const modalAddBagBtn = document.getElementById("modalAddBagBtn");
  const modalWhatsAppBtn = document.getElementById("modalWhatsAppBtn");

  if (modalImg) modalImg.src = product.image;
  if (modalBadge) modalBadge.textContent = product.badge || `${product.brand} Flagship`;
  if (modalTitle) modalTitle.textContent = product.name;
  if (modalTagline) modalTagline.textContent = product.tagline || "";
  if (modalPrice) modalPrice.textContent = "₹" + product.price.toLocaleString("en-IN");
  if (modalEmi) modalEmi.textContent = product.emi || `EMI from ₹${Math.round(product.price / 24).toLocaleString("en-IN")}/mo`;

  if (modalSpecChip) modalSpecChip.textContent = product.chip || "Flagship Silicon";
  if (modalSpecDisplay) modalSpecDisplay.textContent = product.display || "120Hz Pro Display";
  if (modalSpecCamera) modalSpecCamera.textContent = product.camera || "Pro Studio Optics";
  if (modalSpecBattery) modalSpecBattery.textContent = product.battery || "All-Day Fast Charging";

  if (modalAddBagBtn) {
    modalAddBagBtn.onclick = () => {
      if (typeof addToBag === "function") {
        addToBag({ id: product.id, name: product.name, price: product.price, variant: "Standard", image: product.image });
      } else if (typeof handleAddCardToBag === "function") {
        handleAddCardToBag(product.id);
      }
      closeProductModal();
    };
  }

  if (modalWhatsAppBtn) {
    modalWhatsAppBtn.onclick = () => {
      openWhatsApp(`Hi Mobile Station! I am interested in ${product.name} (₹${product.price.toLocaleString("en-IN")}). Please share full details and EMI options.`);
    };
  }

  if (backdrop) {
    backdrop.classList.add("open");
    backdrop.style.display = "flex";
    document.body.style.overflow = "hidden";
  }
}

function closeProductModal() {
  const backdrop = document.getElementById("productModalBackdrop");
  if (backdrop) {
    backdrop.classList.remove("open");
    backdrop.style.display = "none";
    document.body.style.overflow = "";
  }
}

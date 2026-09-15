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

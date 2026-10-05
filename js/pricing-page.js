// =========================================================================
// MOBILE STATION — OFFICIAL PRICING & FESTIVE OFFERS INTERACTIVE ENGINE
// =========================================================================

document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.getElementById("pricingTableBody");
  const cardsGrid = document.getElementById("pricingCardsGrid");
  const searchInput = document.getElementById("pricingSearchInput");
  const clearSearchBtn = document.getElementById("clearSearchBtn");
  const categoryPills = document.querySelectorAll(".cat-pill");
  const brandPills = document.querySelectorAll(".brand-chip-btn");
  const sortSelect = document.getElementById("pricingSortSelect");
  const viewToggleBtn = document.getElementById("viewToggleBtn");
  const resultsCountEl = document.getElementById("resultsCount");
  const emptyStateEl = document.getElementById("pricingEmptyState");
  const printBtn = document.getElementById("printPriceListBtn");

  // State
  let currentBrand = "all";
  let currentCategory = "all";
  let searchQuery = "";
  let currentSort = "default";
  let currentView = "table"; // 'table' or 'grid'

  // Safety check on data
  const dataList = (typeof OFFICIAL_PRICE_LIST_2026 !== "undefined") ? OFFICIAL_PRICE_LIST_2026 : [];

  // Update Brand Badge Counts
  function updateBrandCounts() {
    const counts = { all: dataList.length };
    dataList.forEach(item => {
      const b = item.brand;
      counts[b] = (counts[b] || 0) + 1;
    });

    brandPills.forEach(btn => {
      const brandKey = btn.dataset.brand;
      const countSpan = btn.querySelector(".chip-count");
      if (countSpan) {
        if (brandKey === "all") countSpan.textContent = counts.all || 0;
        else if (counts[brandKey]) countSpan.textContent = counts[brandKey];
        else countSpan.textContent = 0;
      }
    });
  }

  // Calculate 0% EMI installment
  function calcEmi(mop) {
    if (!mop || mop <= 0) return "₹0/mo";
    const monthly = Math.round(mop / 6);
    return `₹${monthly.toLocaleString("en-IN")}/mo (6M 0%)`;
  }

  // Calculate savings
  function calcSavings(mrp, mop) {
    if (!mrp || !mop || mrp <= mop) return null;
    const diff = mrp - mop;
    const pct = Math.round((diff / mrp) * 100);
    return { diff: `Save ₹${diff.toLocaleString("en-IN")}`, pct: `${pct}% OFF` };
  }

  // WhatsApp Link Builder
  function getWhatsAppUrl(model, mop, specs) {
    const cleanPhone = "919322160461";
    const msg = `Hi Mobile Station Showroom! I want to check availability & festive offers for ${model} (${specs}) at the official October 2026 Festive MOP rate of ₹${Number(mop).toLocaleString("en-IN")}. Please share booking details!`;
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`;
  }

  // Get brand badge class
  function getBrandClass(brand) {
    const b = (brand || "").toLowerCase();
    if (b.includes("apple")) return "apple";
    if (b.includes("poco")) return "poco";
    if (b.includes("xiaomi") || b.includes("redmi")) return "xiaomi";
    if (b.includes("nothing") || b.includes("cmf")) return "nothing";
    if (b.includes("itel")) return "itel";
    if (b.includes("lava")) return "lava";
    return "";
  }

  // Render Function
  function renderProducts() {
    let filtered = dataList.filter(item => {
      // Brand filter
      if (currentBrand !== "all") {
        if (currentBrand === "Apple" && item.brand !== "Apple") return false;
        if (currentBrand === "POCO" && item.brand !== "POCO") return false;
        if (currentBrand === "Nothing" && item.brand !== "Nothing") return false;
        if (currentBrand === "Xiaomi / Redmi" && item.brand !== "Xiaomi / Redmi") return false;
        if (currentBrand === "itel" && item.brand !== "itel") return false;
        if (currentBrand === "Lava" && item.brand !== "Lava") return false;
      }

      // Category filter
      if (currentCategory !== "all" && item.category !== currentCategory) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase().trim();
        const m = (item.model || "").toLowerCase();
        const s = (item.specs || "").toLowerCase();
        const b = (item.brand || "").toLowerCase();
        const sb = (item.subBrand || "").toLowerCase();
        if (!m.includes(q) && !s.includes(q) && !b.includes(q) && !sb.includes(q)) {
          return false;
        }
      }

      return true;
    });

    // Sorting
    filtered.sort((a, b) => {
      if (currentSort === "price-asc") return (a.mop || 0) - (b.mop || 0);
      if (currentSort === "price-desc") return (b.mop || 0) - (a.mop || 0);
      if (currentSort === "savings-desc") {
        const saveA = (a.mrp && a.mop) ? (a.mrp - a.mop) : 0;
        const saveB = (b.mrp && b.mop) ? (b.mrp - b.mop) : 0;
        return saveB - saveA;
      }
      if (currentSort === "name-asc") return a.model.localeCompare(b.model);
      return 0; // default order
    });

    // Update count
    if (resultsCountEl) {
      resultsCountEl.textContent = `${filtered.length} Official Products`;
    }

    // Handle Empty State
    if (filtered.length === 0) {
      if (tableBody) tableBody.innerHTML = "";
      if (cardsGrid) cardsGrid.innerHTML = "";
      if (emptyStateEl) emptyStateEl.style.display = "block";
      return;
    } else {
      if (emptyStateEl) emptyStateEl.style.display = "none";
    }

    // Render Table
    if (tableBody) {
      tableBody.innerHTML = filtered.map(item => {
        const savings = calcSavings(item.mrp, item.mop);
        const emiText = calcEmi(item.mop);
        const waLink = getWhatsAppUrl(item.model, item.mop, item.specs);
        const brandBadgeClass = getBrandClass(item.brand);

        return `
          <tr>
            <td>
              <span class="brand-badge-tag ${brandBadgeClass}">${item.subBrand || item.brand}</span>
            </td>
            <td>
              <div class="model-info-block">
                <strong>${item.model}</strong>
                <span class="model-specs">${item.specs}</span>
                ${item.badge ? `<span class="model-badge-mini">${item.badge}</span>` : ""}
              </div>
            </td>
            <td>
              <div class="mop-price-cell">₹${Number(item.mop).toLocaleString("en-IN")}</div>
              ${item.mrp && item.mrp > item.mop ? `<div class="mrp-price-cell">MRP ₹${Number(item.mrp).toLocaleString("en-IN")}</div>` : ""}
            </td>
            <td>
              ${savings ? `
                <div class="savings-cell">
                  <span>${savings.diff}</span>
                  <small style="display:block; color:#0d8750; font-weight:600;">(${savings.pct})</small>
                </div>
              ` : `<span style="color:#887076; font-size:0.8rem;">Showroom MOP</span>`}
            </td>
            <td>
              <div class="emi-cell">
                <strong>${emiText}</strong>
                <span>0% Interest Available</span>
              </div>
            </td>
            <td style="text-align: right;">
              <a href="${waLink}" target="_blank" rel="noopener noreferrer" class="book-whatsapp-btn" title="Book or Inquire on WhatsApp">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
                <span>Book @ MOP</span>
              </a>
            </td>
          </tr>
        `;
      }).join("");
    }

    // Render Grid Cards
    if (cardsGrid) {
      cardsGrid.innerHTML = filtered.map(item => {
        const savings = calcSavings(item.mrp, item.mop);
        const emiText = calcEmi(item.mop);
        const waLink = getWhatsAppUrl(item.model, item.mop, item.specs);
        const brandBadgeClass = getBrandClass(item.brand);

        return `
          <div class="pricing-card-item">
            <div>
              <div class="pricing-card-header">
                <span class="brand-badge-tag ${brandBadgeClass}">${item.subBrand || item.brand}</span>
                ${item.badge ? `<span class="model-badge-mini">${item.badge}</span>` : ""}
              </div>
              <h3 class="pricing-card-title">${item.model}</h3>
              <p class="pricing-card-specs">${item.specs}</p>
            </div>

            <div>
              <div class="pricing-card-pricing-block">
                <div class="pricing-card-mop-row">
                  <span class="pricing-card-mop">₹${Number(item.mop).toLocaleString("en-IN")}</span>
                  ${item.mrp && item.mrp > item.mop ? `<span class="pricing-card-mrp">₹${Number(item.mrp).toLocaleString("en-IN")}</span>` : ""}
                </div>
                <div class="pricing-card-savings">
                  ${savings ? `<span class="card-save-tag">${savings.diff} (${savings.pct})</span>` : `<span>Showroom Verified MOP</span>`}
                  <span class="card-emi-tag">EMI: <strong>${emiText}</strong></span>
                </div>
              </div>

              <div class="pricing-card-actions">
                <a href="${waLink}" target="_blank" rel="noopener noreferrer" class="book-whatsapp-btn">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
                  <span>Book on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        `;
      }).join("");
    }
  }

  // Brand Pill Click Handler
  brandPills.forEach(btn => {
    btn.addEventListener("click", () => {
      brandPills.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentBrand = btn.dataset.brand;
      renderProducts();
    });
  });

  // Category Pill Click Handler
  categoryPills.forEach(pill => {
    pill.addEventListener("click", () => {
      categoryPills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      currentCategory = pill.dataset.cat;
      renderProducts();
    });
  });

  // Live Search Input Handler
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value;
      if (clearSearchBtn) {
        clearSearchBtn.style.display = searchQuery ? "block" : "none";
      }
      renderProducts();
    });
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener("click", () => {
      if (searchInput) searchInput.value = "";
      searchQuery = "";
      clearSearchBtn.style.display = "none";
      renderProducts();
    });
  }

  // Sort Select Handler
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      currentSort = e.target.value;
      renderProducts();
    });
  }

  // View Switcher (Table vs Grid)
  if (viewToggleBtn) {
    viewToggleBtn.addEventListener("click", () => {
      const tableWrapper = document.getElementById("pricingTableWrapper");
      if (currentView === "table") {
        currentView = "grid";
        if (tableWrapper) tableWrapper.style.display = "none";
        if (cardsGrid) cardsGrid.style.display = "grid";
        viewToggleBtn.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
          <span>Table View</span>
        `;
      } else {
        currentView = "table";
        if (tableWrapper) tableWrapper.style.display = "block";
        if (cardsGrid) cardsGrid.style.display = "none";
        viewToggleBtn.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
          <span>Grid View</span>
        `;
      }
    });
  }

  // Print Handler
  if (printBtn) {
    printBtn.addEventListener("click", () => {
      window.print();
    });
  }

  // Initial Run
  updateBrandCounts();
  renderProducts();
});

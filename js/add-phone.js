/* =========================================================================
   MOBILE STATION — ADD NEW PHONE MODAL & CATALOG MANAGEMENT ENGINE (2026)
   - Store Manager / User dynamic product entry form
   - LocalStorage persistence (ms_custom_products)
   - Real-time catalog grid re-rendering
   - File upload & Image URL live preview
   ========================================================================= */

// Ensure custom products are loaded into global PRODUCTS array on startup
(function loadSavedCustomProducts() {
  try {
    const saved = localStorage.getItem("ms_custom_products");
    if (saved) {
      const customProducts = JSON.parse(saved);
      if (Array.isArray(customProducts) && typeof PRODUCTS !== "undefined") {
        customProducts.forEach(cp => {
          if (!PRODUCTS.some(p => p.id === cp.id)) {
            PRODUCTS.unshift(cp);
          }
        });
      }
    }
  } catch (e) {
    console.warn("Could not load custom products:", e);
  }
})();

document.addEventListener("DOMContentLoaded", () => {
  injectAddPhoneModal();
  initAddPhoneListeners();
});

// Inject Add Phone Modal HTML into body if not present
function injectAddPhoneModal() {
  if (document.getElementById("addPhoneModal")) return;

  const modalHTML = `
  <div class="add-phone-modal-overlay" id="addPhoneModal" aria-hidden="true">
    <div class="add-phone-modal-card">
      <div class="add-phone-header">
        <div class="header-title-block">
          <div class="header-badge">📱 Store Admin & Manager Panel</div>
          <h2>Add New <span>Smartphone</span></h2>
          <p>Publish a new flagship device to the Mobile Station live catalog.</p>
        </div>
        <button class="add-phone-close-btn" id="closeAddPhoneModalBtn" aria-label="Close Modal">&times;</button>
      </div>

      <form id="addPhoneForm" class="add-phone-form">
        <div class="form-grid">
          <!-- Phone Name -->
          <div class="form-group col-span-2">
            <label for="phoneNameInput">Phone Name <span class="required">*</span></label>
            <input type="text" id="phoneNameInput" placeholder="e.g. iPhone 18 Pro Max Titanium" required />
          </div>

          <!-- Brand Selection -->
          <div class="form-group">
            <label for="phoneBrandSelect">Brand <span class="required">*</span></label>
            <select id="phoneBrandSelect" required>
              <option value="Apple">Apple</option>
              <option value="Samsung">Samsung</option>
              <option value="OnePlus">OnePlus</option>
              <option value="Google">Google Pixel</option>
              <option value="Xiaomi">Xiaomi / Redmi</option>
              <option value="vivo">vivo</option>
              <option value="OPPO">OPPO</option>
              <option value="Other">Other / Custom Brand</option>
            </select>
          </div>

          <!-- Badge / Tag -->
          <div class="form-group">
            <label for="phoneBadgeInput">Deal / Highlight Badge</label>
            <input type="text" id="phoneBadgeInput" placeholder="e.g. 👑 2026 Flagship Hero, 🔥 Bestseller" value="👑 New Arrival" />
          </div>

          <!-- Price -->
          <div class="form-group">
            <label for="phonePriceInput">Selling Price (₹) <span class="required">*</span></label>
            <input type="number" id="phonePriceInput" placeholder="e.g. 149900" min="1000" required />
          </div>

          <!-- Original Price -->
          <div class="form-group">
            <label for="phoneOrigPriceInput">Original Price / MRP (₹)</label>
            <input type="number" id="phoneOrigPriceInput" placeholder="e.g. 164900" min="1000" />
          </div>

          <!-- Tagline -->
          <div class="form-group col-span-2">
            <label for="phoneTaglineInput">Marketing Tagline / Slogan</label>
            <input type="text" id="phoneTaglineInput" placeholder="e.g. Power. Beauty. Beyond limits." />
          </div>

          <!-- Specs: Chipset -->
          <div class="form-group">
            <label for="phoneChipInput">Processor / Chipset</label>
            <input type="text" id="phoneChipInput" placeholder="e.g. A20 Pro Silicon / Snapdragon 8 Elite" />
          </div>

          <!-- Specs: Display -->
          <div class="form-group">
            <label for="phoneDisplayInput">Display Specs</label>
            <input type="text" id="phoneDisplayInput" placeholder="e.g. 6.9\" Super Retina 120Hz OLED" />
          </div>

          <!-- Specs: Camera -->
          <div class="form-group">
            <label for="phoneCameraInput">Camera System</label>
            <input type="text" id="phoneCameraInput" placeholder="e.g. 200MP Quad Lens + 10x Periscope" />
          </div>

          <!-- Specs: Battery -->
          <div class="form-group">
            <label for="phoneBatteryInput">Battery & Charging</label>
            <input type="text" id="phoneBatteryInput" placeholder="e.g. 5000 mAh + 65W Fast Charge" />
          </div>

          <!-- Image Selection: URL or Upload -->
          <div class="form-group col-span-2">
            <label>Phone Image <span class="required">*</span></label>
            <div class="image-input-tabs">
              <div class="image-input-row">
                <input type="url" id="phoneImageUrlInput" placeholder="Paste Image URL (e.g. https://... or assets/user_phone_1.jpg)" />
                <span class="input-or-divider">OR</span>
                <label for="phoneFileInput" class="file-upload-btn">
                  📁 Choose Local Image File
                  <input type="file" id="phoneFileInput" accept="image/*" style="display:none;" />
                </label>
              </div>
            </div>
            <!-- Image Live Preview -->
            <div class="image-live-preview-box" id="imagePreviewBox" style="display:none;">
              <img id="imagePreviewImg" src="" alt="Phone Preview" />
              <span class="preview-tag">Live Image Preview</span>
            </div>
          </div>

          <!-- Primary Color Finish -->
          <div class="form-group">
            <label for="phoneColorNameInput">Primary Color Name</label>
            <input type="text" id="phoneColorNameInput" placeholder="e.g. Deep Burgundy Titanium" value="Titanium Edition" />
          </div>

          <!-- Color Hex -->
          <div class="form-group">
            <label for="phoneColorHexInput">Color Accent (Hex Code)</label>
            <div class="color-picker-row">
              <input type="color" id="phoneColorHexPicker" value="#d71942" />
              <input type="text" id="phoneColorHexInput" value="#d71942" placeholder="#d71942" />
            </div>
          </div>

          <!-- Storage Options -->
          <div class="form-group col-span-2">
            <label>Available Storage Variants</label>
            <div class="storage-checkbox-group">
              <label class="storage-check-label"><input type="checkbox" name="storageOption" value="128GB" /> 128GB</label>
              <label class="storage-check-label"><input type="checkbox" name="storageOption" value="256GB" checked /> 256GB</label>
              <label class="storage-check-label"><input type="checkbox" name="storageOption" value="512GB" checked /> 512GB</label>
              <label class="storage-check-label"><input type="checkbox" name="storageOption" value="1TB" checked /> 1TB</label>
              <label class="storage-check-label"><input type="checkbox" name="storageOption" value="2TB" /> 2TB</label>
            </div>
          </div>
        </div>

        <div class="add-phone-footer">
          <button type="button" class="btn btn-outline" id="cancelAddPhoneBtn">Cancel</button>
          <button type="submit" class="btn btn-crimson btn-glow">
            ✨ Add Phone to Catalog
          </button>
        </div>
      </form>
    </div>
  </div>
  `;

  document.body.insertAdjacentHTML("beforeend", modalHTML);
}

function initAddPhoneListeners() {
  const modal = document.getElementById("addPhoneModal");
  const closeBtn = document.getElementById("closeAddPhoneModalBtn");
  const cancelBtn = document.getElementById("cancelAddPhoneBtn");
  const form = document.getElementById("addPhoneForm");
  const urlInput = document.getElementById("phoneImageUrlInput");
  const fileInput = document.getElementById("phoneFileInput");
  const previewBox = document.getElementById("imagePreviewBox");
  const previewImg = document.getElementById("imagePreviewImg");
  const colorHexPicker = document.getElementById("phoneColorHexPicker");
  const colorHexInput = document.getElementById("phoneColorHexInput");

  if (closeBtn) closeBtn.addEventListener("click", closeAddPhoneModal);
  if (cancelBtn) cancelBtn.addEventListener("click", closeAddPhoneModal);

  // Sync Color Picker & Hex Input
  if (colorHexPicker && colorHexInput) {
    colorHexPicker.addEventListener("input", (e) => {
      colorHexInput.value = e.target.value;
    });
    colorHexInput.addEventListener("input", (e) => {
      if (/^#[0-9A-F]{6}$/i.test(e.target.value)) {
        colorHexPicker.value = e.target.value;
      }
    });
  }

  // Handle Image Live Preview (URL)
  if (urlInput && previewImg && previewBox) {
    urlInput.addEventListener("input", () => {
      const val = urlInput.value.trim();
      if (val) {
        previewImg.src = val;
        previewBox.style.display = "flex";
      } else {
        previewBox.style.display = "none";
      }
    });
  }

  // Handle Image Live Preview (File Upload)
  if (fileInput && previewImg && previewBox) {
    fileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          previewImg.src = event.target.result;
          urlInput.value = event.target.result; // Store base64 data URL
          previewBox.style.display = "flex";
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Handle Form Submission
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      saveNewPhoneFromForm();
    });
  }
}

function openAddPhoneModal() {
  const modal = document.getElementById("addPhoneModal");
  if (modal) {
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
}

function closeAddPhoneModal() {
  const modal = document.getElementById("addPhoneModal");
  if (modal) {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
}

function saveNewPhoneFromForm() {
  const name = document.getElementById("phoneNameInput").value.trim();
  const brand = document.getElementById("phoneBrandSelect").value;
  const badge = document.getElementById("phoneBadgeInput").value.trim() || "👑 New Arrival";
  const price = parseInt(document.getElementById("phonePriceInput").value, 10);
  const origPriceVal = document.getElementById("phoneOrigPriceInput").value;
  const originalPrice = origPriceVal ? parseInt(origPriceVal, 10) : price + 10000;
  const tagline = document.getElementById("phoneTaglineInput").value.trim() || `${brand} Flagship Performance & Design`;
  const chip = document.getElementById("phoneChipInput").value.trim() || "Pro Ultra Silicon";
  const display = document.getElementById("phoneDisplayInput").value.trim() || "6.7\" 120Hz AMOLED Display";
  const camera = document.getElementById("phoneCameraInput").value.trim() || "50MP Triple Camera System";
  const battery = document.getElementById("phoneBatteryInput").value.trim() || "5000 mAh Fast Charging";
  const image = document.getElementById("phoneImageUrlInput").value.trim() || "assets/phone.png";
  const colorName = document.getElementById("phoneColorNameInput").value.trim() || "Signature Edition";
  const colorHex = document.getElementById("phoneColorHexInput").value.trim() || "#d71942";

  // Storage checkboxes
  const storageChecked = Array.from(document.querySelectorAll('input[name="storageOption"]:checked')).map(c => c.value);
  const storage = storageChecked.length > 0 ? storageChecked : ["256GB", "512GB"];

  const category = brand.toLowerCase().replace(/\s+/g, "");
  const id = `phone-custom-${Date.now()}`;
  const emi = `₹${Math.round(price / 24).toLocaleString("en-IN")}/mo`;

  const newProductObj = {
    id,
    name,
    brand,
    category,
    tagline,
    price,
    originalPrice,
    badge,
    isFeaturedHero: false,
    isHero: false,
    rating: 5.0,
    reviewsCount: 1,
    chip,
    display,
    camera,
    battery,
    image,
    fallbackImage: "assets/phone.png",
    colors: [
      { name: colorName, hex: colorHex, image }
    ],
    storage,
    emi
  };

  // 1. Add to in-memory PRODUCTS array
  if (typeof PRODUCTS !== "undefined") {
    PRODUCTS.unshift(newProductObj);
  }

  // 2. Persist to localStorage
  try {
    const saved = localStorage.getItem("ms_custom_products");
    const existing = saved ? JSON.parse(saved) : [];
    existing.unshift(newProductObj);
    localStorage.setItem("ms_custom_products", JSON.stringify(existing));
  } catch (err) {
    console.error("Failed to save to localStorage:", err);
  }

  // 3. Reset Form & Close Modal
  document.getElementById("addPhoneForm").reset();
  document.getElementById("imagePreviewBox").style.display = "none";
  closeAddPhoneModal();

  // 4. Show success toast notification
  if (typeof showToast === "function") {
    showToast(`📱 "${name}" added to catalog!`);
  } else {
    alert(`📱 "${name}" successfully added to Mobile Station catalog!`);
  }

  // 5. Re-render UI grids dynamically
  if (typeof renderProductCards === "function") {
    renderProductCards();
  }
  if (typeof renderFlagshipsPage === "function") {
    renderFlagshipsPage();
  }
}

// Global window handle to call openAddPhoneModal from anywhere
window.openAddPhoneModal = openAddPhoneModal;
window.closeAddPhoneModal = closeAddPhoneModal;

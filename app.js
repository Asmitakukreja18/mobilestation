// Application Logic: Cinematic Luxury Experience for Mobile Station & Siddhi Marketing

const state = {
  activeGalleryFilter: "all",
  cart: JSON.parse(localStorage.getItem("ms_luxury_cart") || "[]"),
  heroAngle: 0
};

const HERO_ANGLES = [
  { name: "Desert Titanium", img: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=700&q=80", tilt: 6 },
  { name: "Natural Titanium", img: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=700&q=80", tilt: -6 },
  { name: "Black Titanium", img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=700&q=80", tilt: 0 }
];

document.addEventListener("DOMContentLoaded", () => {
  initHero3DParallax();
  renderCuratedGallery();
  updateCartUI();
  runDeviceScan();
  setupNavScrollSpy();
});

// 3D Mouse Parallax & Dynamic Perspective Tilt on Hero Phone Rig
function initHero3DParallax() {
  const heroStage = document.querySelector(".hero-stage");
  const phoneRig = document.getElementById("heroPhoneElement");

  if (!heroStage || !phoneRig) return;

  heroStage.addEventListener("mousemove", (e) => {
    const rect = heroStage.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    const rotX = -y * 18; // Degrees
    const rotY = x * 24;  // Degrees

    phoneRig.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(10px)`;
  });

  heroStage.addEventListener("mouseleave", () => {
    phoneRig.style.transform = `rotateX(0deg) rotateY(0deg) translateZ(0px)`;
  });
}

// Switch Hero Color & Visual Angle
function switchHeroAngle(idx) {
  state.heroAngle = idx;
  const config = HERO_ANGLES[idx];
  const img = document.getElementById("heroPhoneImage");
  const phoneRig = document.getElementById("heroPhoneElement");
  const buttons = document.querySelectorAll(".angle-switch-btn");

  if (img && config) {
    img.style.opacity = "0.3";
    img.style.transform = "scale(0.95)";
    setTimeout(() => {
      img.src = config.img;
      img.style.opacity = "1";
      img.style.transform = "scale(1)";
    }, 200);
  }

  buttons.forEach((btn, i) => {
    btn.classList.toggle("active", i === idx);
  });
}

// Render Curated Gallery Grid
function renderCuratedGallery() {
  const container = document.getElementById("curatedGrid");
  const countEl = document.getElementById("galleryCount");
  if (!container) return;

  let filtered = [...PRODUCTS];
  if (state.activeGalleryFilter !== "all") {
    filtered = filtered.filter(p => p.category === state.activeGalleryFilter || p.subCategory === state.activeGalleryFilter);
  }

  if (countEl) countEl.innerText = filtered.length;

  container.innerHTML = filtered.map(product => {
    const formatPrice = (val) => "₹" + Number(val).toLocaleString("en-IN");

    return `
      <article class="luxury-phone-card">
        <div class="card-stage-wrap" onclick="orderWhatsAppDirect('${product.id}')">
          <img src="${product.image}" alt="${product.name}" loading="lazy">
        </div>

        <div class="card-brand-kicker">${product.brand} • ${product.condition.includes('Pre-Owned') ? 'CERTIFIED PRE-OWNED' : 'FACTORY SEALED'}</div>
        <h3 class="card-phone-name">${product.name}</h3>
        <p class="card-specs-line">${product.specs?.display ? product.specs.display.split(',')[0] : 'High Resolution Display'} • ${product.warranty}</p>

        <div class="card-bottom-row">
          <div>
            <span style="font-size:0.75rem; color:var(--text-tertiary); display:block; font-weight:700;">SHOWROOM PRICE</span>
            <div class="card-price-value">${formatPrice(product.price)}</div>
          </div>

          <div style="display:flex; gap:0.4rem;">
            <button class="btn-card-inquire" onclick="addToLuxuryCart('${product.id}')" title="Add to Showroom Bag">
              🛒 Bag
            </button>
            <button class="btn-card-inquire" style="background:var(--text-primary); color:#ffffff;" onclick="orderWhatsAppDirect('${product.id}')">
              ⚡ Inquire
            </button>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

function filterGallery(category) {
  state.activeGalleryFilter = category;
  const pills = document.querySelectorAll("#galleryPills .filter-tab-pill");
  pills.forEach(p => p.classList.remove("active"));
  event?.target?.classList.add("active");
  renderCuratedGallery();
}

// Repair Demo State Switcher
function setRepairDemoState(type) {
  const dial = document.getElementById("repairDialStatus");
  const img = document.getElementById("repairVisualImg");

  if (type === "battery") {
    if (dial) dial.innerText = "🔋 Battery Health Boosted to 100% (Original OEM Cell)";
    if (img) img.src = "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=600&q=80";
  } else {
    if (dial) dial.innerText = "✨ Restored: 120Hz Super Retina OLED";
    if (img) img.src = "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=600&q=80";
  }
}

// Trade-In Scanner Calculation
function runDeviceScan() {
  const brand = document.getElementById("tradeBrand")?.value || "Apple";
  const condition = document.getElementById("tradeCondition")?.value || "flawless";
  const output = document.getElementById("tradeValueOutput");

  const matrix = {
    Apple: { flawless: "₹26,000 - ₹52,000", good: "₹19,000 - ₹36,000", cracked: "₹12,000 - ₹24,000" },
    Samsung: { flawless: "₹18,000 - ₹42,000", good: "₹13,000 - ₹28,000", cracked: "₹8,000 - ₹18,000" },
    OnePlus: { flawless: "₹15,000 - ₹30,000", good: "₹11,000 - ₹22,000", cracked: "₹6,500 - ₹14,000" },
    Vivo: { flawless: "₹10,000 - ₹20,000", good: "₹7,500 - ₹14,000", cracked: "₹4,500 - ₹9,000" },
    Xiaomi: { flawless: "₹9,000 - ₹18,000", good: "₹6,500 - ₹12,000", cracked: "₹4,000 - ₹8,000" }
  };

  const computed = matrix[brand]?.[condition] || "₹15,000 - ₹30,000";
  if (output) {
    output.style.opacity = "0.5";
    setTimeout(() => {
      output.innerText = computed;
      output.style.opacity = "1";
    }, 150);
  }
}

// WhatsApp Order Direct
function orderWhatsAppDirect(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const phone = STORE_CONFIG.primaryPhone;
  const msg = `Hello Mobile Station (Garud Complex)! 👋

I am viewing this smartphone in your showroom catalog:
📱 *Model:* ${product.name}
🏷️ *Brand:* ${product.brand}
💰 *Showroom Price:* ₹${product.price.toLocaleString("en-IN")}
🛡️ *Condition:* ${product.condition}
✨ *Warranty:* ${product.warranty}

Please confirm reserve availability for store pickup today.`;

  const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
  window.open(url, "_blank");
}

// Showroom Bag Management
function addToLuxuryCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const exist = state.cart.find(i => i.id === productId);
  if (exist) {
    exist.qty += 1;
  } else {
    state.cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      qty: 1
    });
  }

  saveCart();
  updateCartUI();
  openCartDrawer();
}

function saveCart() {
  localStorage.setItem("ms_luxury_cart", JSON.stringify(state.cart));
}

function updateCartUI() {
  const count = state.cart.reduce((s, i) => s + i.qty, 0);
  const badge = document.getElementById("cartCountBadge");
  const drawerCount = document.getElementById("drawerBagCount");
  if (badge) badge.innerText = count;
  if (drawerCount) drawerCount.innerText = count;
  renderDrawerItems();
}

function openCartDrawer() {
  const drawer = document.getElementById("luxuryDrawer");
  const overlay = document.getElementById("drawerOverlay");
  if (drawer) drawer.classList.add("active");
  if (overlay) overlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeCartDrawer() {
  const drawer = document.getElementById("luxuryDrawer");
  const overlay = document.getElementById("drawerOverlay");
  if (drawer) drawer.classList.remove("active");
  if (overlay) overlay.classList.remove("active");
  document.body.style.overflow = "";
}

function updateCartItemQty(id, delta) {
  const item = state.cart.find(i => i.id === id);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    state.cart = state.cart.filter(i => i.id !== id);
  }

  saveCart();
  updateCartUI();
}

function renderDrawerItems() {
  const container = document.getElementById("drawerItemsList");
  const subtotalEl = document.getElementById("drawerSubtotal");
  if (!container || !subtotalEl) return;

  if (state.cart.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding:3rem 1rem; color:var(--text-tertiary);">
        <p style="font-weight:700; color:var(--text-secondary);">Your Showroom Bag is Empty</p>
        <p style="font-size:0.85rem; margin-top:0.35rem;">Select any flagship or accessory to send an all-in-one inquiry.</p>
      </div>
    `;
    subtotalEl.innerText = "₹0";
    return;
  }

  const subtotal = state.cart.reduce((s, i) => s + (i.price * i.qty), 0);
  subtotalEl.innerText = "₹" + subtotal.toLocaleString("en-IN");

  container.innerHTML = state.cart.map(item => `
    <div style="display:flex; gap:1rem; padding:0.85rem; border-bottom:1px solid var(--border-subtle); align-items:center;">
      <img src="${item.image}" alt="${item.name}" style="width:55px; height:55px; object-fit:contain; background:#f4f5f8; border-radius:var(--radius-sm); padding:4px;">
      <div style="flex:1;">
        <h4 style="font-size:0.9rem; font-weight:800; line-height:1.2; margin-bottom:0.2rem;">${item.name}</h4>
        <div style="font-size:0.85rem; font-weight:900; color:var(--accent-crimson);">₹${(item.price * item.qty).toLocaleString("en-IN")}</div>
        <div style="display:flex; align-items:center; gap:0.4rem; margin-top:0.35rem;">
          <button style="border:1px solid var(--border-subtle); width:22px; height:22px; border-radius:4px; font-weight:800;" onclick="updateCartItemQty('${item.id}', -1)">-</button>
          <span style="font-size:0.85rem; font-weight:800;">${item.qty}</span>
          <button style="border:1px solid var(--border-subtle); width:22px; height:22px; border-radius:4px; font-weight:800;" onclick="updateCartItemQty('${item.id}', 1)">+</button>
        </div>
      </div>
    </div>
  `).join("");
}

function sendLuxuryBagWhatsApp() {
  if (state.cart.length === 0) return;

  const phone = STORE_CONFIG.primaryPhone;
  const subtotal = state.cart.reduce((s, i) => s + (i.price * i.qty), 0);
  
  const list = state.cart.map((item, idx) => 
    `${idx + 1}. *${item.name}* (Qty: ${item.qty}) - ₹${(item.price * item.qty).toLocaleString("en-IN")}`
  ).join("\n");

  const msg = `Hello Mobile Station & Siddhi Marketing! 👋

I have assembled an inquiry bag from your showroom website:

${list}

━━━━━━━━━━━━━━━━━
💰 *Total Valuation:* ₹${subtotal.toLocaleString("en-IN")}
━━━━━━━━━━━━━━━━━

Please confirm availability at Garud Complex / Balaji Mandir Road.`;

  const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
  window.open(url, "_blank");
}

// Nav Scroll Spy
function setupNavScrollSpy() {
  const trigger = document.getElementById("cartTriggerBtn");
  if (trigger) trigger.addEventListener("click", openCartDrawer);
}

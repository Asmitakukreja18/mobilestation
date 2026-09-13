// Application Controller: Next-Level Cinematic Showroom Experience

const appState = {
  activeHeroFinish: 0,
  activeStoryStep: 0,
  activeRepairComponent: "screen",
  bag: JSON.parse(localStorage.getItem("ms_studio_bag") || "[]")
};

// Hero Finish Palette
const HERO_FINISHES = [
  { name: "Desert Titanium", img: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=700&q=80" },
  { name: "Natural Titanium", img: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=700&q=80" },
  { name: "Black Titanium", img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=700&q=80" }
];

// Story Exploration Steps
const STORY_STEPS = [
  {
    num: "01",
    title: "Super Retina XDR Display",
    body: "6.9-inch OLED with ProMotion 120Hz adaptive refresh rate and 2,000 nits peak outdoor brightness. Scratchless ceramic shield glass protection.",
    img: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80"
  },
  {
    num: "02",
    title: "Aerospace Titanium Profile",
    body: "Precision micro-blasted Grade 5 titanium chassis. Ultra-narrow borders with highest strength-to-weight ratio in any smartphone.",
    img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80"
  },
  {
    num: "03",
    title: "Pro 48MP Triple Lens Module",
    body: "Next-gen quad-pixel sensor with 5x optical telephoto zoom, anti-reflective lens coating, and zero-shutter-lag action capture.",
    img: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80"
  }
];

// Component Repair Views
const REPAIR_DATA = {
  screen: {
    banner: "✨ Active: 120Hz Super Retina Display Replacement",
    img: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=600&q=80"
  },
  battery: {
    banner: "🔋 Active: 100% OEM Battery Health Boost",
    img: "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=600&q=80"
  },
  charging: {
    banner: "⚡ Active: Fast Charging Port & Mic Clean",
    img: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80"
  }
};

document.addEventListener("DOMContentLoaded", () => {
  initHeroParallax();
  initHeaderScroll();
  runScannerSimulation();
  updateBagUI();
  setupEventListeners();
});

// Setup Listeners
function setupEventListeners() {
  const bagOpenBtn = document.getElementById("cartOpenBtn");
  if (bagOpenBtn) bagOpenBtn.addEventListener("click", openBagDrawer);
}

// 1. 3D Mouse Parallax & Dynamic Tilt Rig
function initHeroParallax() {
  const stage = document.getElementById("heroStageContainer");
  const rotator = document.getElementById("heroPhoneRotator");

  if (!stage || !rotator) return;

  stage.addEventListener("mousemove", (e) => {
    const rect = stage.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    const rotX = -y * 20; // Deg
    const rotY = x * 26;  // Deg

    rotator.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(15px)`;
  });

  stage.addEventListener("mouseleave", () => {
    rotator.style.transform = `rotateX(0deg) rotateY(0deg) translateZ(0px)`;
  });
}

// 2. Hero Finish Switcher
function setHeroFinish(index) {
  appState.activeHeroFinish = index;
  const finish = HERO_FINISHES[index];
  const render = document.getElementById("heroPhoneRender");
  const buttons = document.querySelectorAll(".finish-pill-btn");

  if (render && finish) {
    render.style.opacity = "0.2";
    render.style.transform = "scale(0.96)";
    setTimeout(() => {
      render.src = finish.img;
      render.style.opacity = "1";
      render.style.transform = "scale(1)";
    }, 180);
  }

  buttons.forEach((b, idx) => {
    b.classList.toggle("active", idx === index);
  });
}

// 3. Story Pinned Step Switcher
function setStoryStep(index) {
  appState.activeStoryStep = index;
  const step = STORY_STEPS[index];
  const numEl = document.getElementById("storyStepNum");
  const titleEl = document.getElementById("storyStepTitle");
  const bodyEl = document.getElementById("storyStepBody");
  const imgEl = document.getElementById("storyRenderImg");
  const buttons = document.querySelectorAll(".stepper-btn");

  if (numEl) numEl.innerText = step.num;
  if (titleEl) titleEl.innerText = step.title;
  if (bodyEl) bodyEl.innerText = step.body;

  if (imgEl) {
    imgEl.style.opacity = "0.2";
    imgEl.style.transform = "scale(0.95)";
    setTimeout(() => {
      imgEl.src = step.img;
      imgEl.style.opacity = "1";
      imgEl.style.transform = "scale(1)";
    }, 180);
  }

  buttons.forEach((btn, idx) => {
    btn.classList.toggle("active", idx === index);
  });
}

// 4. Header Scroll Frosted Glass Effect
function initHeaderScroll() {
  const header = document.getElementById("siteHeader");
  if (!header) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}

// 5. Interactive Repair Lab Component Switcher
function switchRepairLabComponent(componentKey) {
  appState.activeRepairComponent = componentKey;
  const data = REPAIR_DATA[componentKey];
  const visual = document.getElementById("repairLabVisual");
  const banner = document.getElementById("repairLabBanner");
  const cards = document.querySelectorAll(".component-switch-card");

  if (visual && data) {
    visual.style.opacity = "0.4";
    setTimeout(() => {
      visual.src = data.img;
      visual.style.opacity = "1";
    }, 150);
  }

  if (banner && data) banner.innerText = data.banner;

  cards.forEach(c => c.classList.remove("active"));
  event?.currentTarget?.classList.add("active");
}

// 6. Diagnostic Trade-In Scanner
function runScannerSimulation() {
  const brand = document.getElementById("scannerBrand")?.value || "Apple";
  const condition = document.getElementById("scannerCondition")?.value || "flawless";
  const display = document.getElementById("scannerValueDisplay");

  const matrix = {
    Apple: { flawless: "₹26,000 - ₹52,000", good: "₹19,000 - ₹36,000", cracked: "₹12,000 - ₹24,000" },
    Samsung: { flawless: "₹18,000 - ₹42,000", good: "₹13,000 - ₹28,000", cracked: "₹8,000 - ₹18,000" },
    OnePlus: { flawless: "₹15,000 - ₹30,000", good: "₹11,000 - ₹22,000", cracked: "₹6,500 - ₹14,000" },
    Vivo: { flawless: "₹10,000 - ₹20,000", good: "₹7,500 - ₹14,000", cracked: "₹4,500 - ₹9,000" },
    Xiaomi: { flawless: "₹9,000 - ₹18,000", good: "₹6,500 - ₹12,000", cracked: "₹4,000 - ₹8,000" }
  };

  const computed = matrix[brand]?.[condition] || "₹15,000 - ₹30,000";

  if (display) {
    display.style.opacity = "0.4";
    setTimeout(() => {
      display.innerText = computed;
      display.style.opacity = "1";
    }, 150);
  }
}

// 7. Direct WhatsApp Single Order
function orderWhatsAppDirect(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const phone = STORE_CONFIG.primaryPhone;
  const msg = `Hello Mobile Station (Garud Complex)! 👋

I am viewing this flagship model on your showroom website:
📱 *Model:* ${product.name}
🏷️ *Brand:* ${product.brand}
💰 *Showroom Price:* ₹${product.price.toLocaleString("en-IN")}
🛡️ *Condition:* ${product.condition}
✨ *Warranty:* ${product.warranty}

Please share payment options and store pickup details today.`;

  const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
  window.open(url, "_blank");
}

// 8. Showroom Bag Management
function addToStudioBag(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const exist = appState.bag.find(i => i.id === productId);
  if (exist) {
    exist.qty += 1;
  } else {
    appState.bag.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      qty: 1
    });
  }

  saveBag();
  updateBagUI();
  openBagDrawer();
}

function saveBag() {
  localStorage.setItem("ms_studio_bag", JSON.stringify(appState.bag));
}

function updateBagUI() {
  const count = appState.bag.reduce((s, i) => s + i.qty, 0);
  const badge = document.getElementById("cartCountBadge");
  const countText = document.getElementById("bagCountText");
  if (badge) badge.innerText = count;
  if (countText) countText.innerText = count;
  renderBagItems();
}

function openBagDrawer() {
  const drawer = document.getElementById("bagDrawer");
  const overlay = document.getElementById("drawerOverlay");
  if (drawer) drawer.classList.add("active");
  if (overlay) overlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeBagDrawer() {
  const drawer = document.getElementById("bagDrawer");
  const overlay = document.getElementById("drawerOverlay");
  if (drawer) drawer.classList.remove("active");
  if (overlay) overlay.classList.remove("active");
  document.body.style.overflow = "";
}

function updateBagItemQty(id, delta) {
  const item = appState.bag.find(i => i.id === id);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    appState.bag = appState.bag.filter(i => i.id !== id);
  }

  saveBag();
  updateBagUI();
}

function renderBagItems() {
  const container = document.getElementById("bagItemsContainer");
  const subtotalEl = document.getElementById("bagSubtotalDisplay");
  if (!container || !subtotalEl) return;

  if (appState.bag.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding:3.5rem 1rem; color:var(--text-muted);">
        <p style="font-weight:700; color:var(--text-headline);">Your Showroom Bag is Empty</p>
        <p style="font-size:0.85rem; margin-top:0.35rem;">Select any flagship smartphone or accessory to assemble a direct inquiry.</p>
      </div>
    `;
    subtotalEl.innerText = "₹0";
    return;
  }

  const subtotal = appState.bag.reduce((s, i) => s + (i.price * i.qty), 0);
  subtotalEl.innerText = "₹" + subtotal.toLocaleString("en-IN");

  container.innerHTML = appState.bag.map(item => `
    <div style="display:flex; gap:1rem; padding:0.85rem 0; border-bottom:1px solid var(--border-hairline); align-items:center;">
      <img src="${item.image}" alt="${item.name}" style="width:55px; height:55px; object-fit:contain; background:var(--bg-surface); border-radius:var(--radius-xs); padding:4px;">
      <div style="flex:1;">
        <h4 style="font-size:0.9rem; font-weight:800; line-height:1.2; margin-bottom:0.2rem;">${item.name}</h4>
        <div style="font-size:0.85rem; font-weight:900; color:var(--crimson);">₹${(item.price * item.qty).toLocaleString("en-IN")}</div>
        <div style="display:flex; align-items:center; gap:0.4rem; margin-top:0.35rem;">
          <button style="border:1px solid var(--border-hairline); width:22px; height:22px; border-radius:4px; font-weight:800;" onclick="updateBagItemQty('${item.id}', -1)">-</button>
          <span style="font-size:0.85rem; font-weight:800;">${item.qty}</span>
          <button style="border:1px solid var(--border-hairline); width:22px; height:22px; border-radius:4px; font-weight:800;" onclick="updateBagItemQty('${item.id}', 1)">+</button>
        </div>
      </div>
    </div>
  `).join("");
}

function transmitBagWhatsApp() {
  if (appState.bag.length === 0) return;

  const phone = STORE_CONFIG.primaryPhone;
  const subtotal = appState.bag.reduce((s, i) => s + (i.price * i.qty), 0);
  
  const list = appState.bag.map((item, idx) => 
    `${idx + 1}. *${item.name}* (Qty: ${item.qty}) - ₹${(item.price * item.qty).toLocaleString("en-IN")}`
  ).join("\n");

  const msg = `Hello Mobile Station & Siddhi Marketing! 👋

I have prepared an inquiry checklist from your showroom website:

${list}

━━━━━━━━━━━━━━━━━
💰 *Estimated Total:* ₹${subtotal.toLocaleString("en-IN")}
━━━━━━━━━━━━━━━━━

Please confirm availability at Garud Complex / Balaji Mandir Road. Thank you!`;

  const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
  window.open(url, "_blank");
}

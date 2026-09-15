// Mobile Station — Flagship Smartphone Showroom
// Warm Champagne Studio Theme & 3D Interactive Engine

// Initialize Lenis Smooth Scroll
let lenis;
if (typeof Lenis !== 'undefined') {
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}

// Global Showroom & Cart State
let showroomCart = [];
try {
  const savedCart = localStorage.getItem("ms_showroom_bag");
  if (savedCart) showroomCart = JSON.parse(savedCart);
} catch (e) {
  showroomCart = [];
}

let heroSelectedState = {
  id: "prod-001",
  name: "Apple iPhone 18 Pro Max",
  storage: "256GB",
  price: 179900,
  color: "Deep Burgundy Titanium",
  image: "iphone-18-pro-finish-select-202609-6-9inch-burgundy.webp"
};

let currentViewerProduct = null;
let currentViewerSelectedStorage = null;
let currentViewerSelectedColor = null;

document.addEventListener("DOMContentLoaded", () => {
  initSimplePreloader();
  initHeroElectricCanvas();
  initHero3DShowroom();
  initStory3D();
  initScrollHeader();
  initScrollRevealObserver();
  triggerScannerSequence();
  updateCartBadge();
});

// =========================================================================
// 0. SIMPLE CLEAN PRELOADER & HERO ENTRANCE
// =========================================================================
function initSimplePreloader() {
  const preloader = document.getElementById("sitePreloader");
  if (!preloader) return;

  setTimeout(() => {
    preloader.classList.add("fade-out");
    triggerHeroEntrance();
    setTimeout(() => {
      preloader.style.display = "none";
    }, 450);
  }, 400);
}

function toggleMobileMenu() {
  const drawer = document.getElementById("mobileNavDrawer");
  const btn = document.getElementById("mobileMenuBtn");
  if (drawer && btn) {
    drawer.classList.toggle("open");
    btn.classList.toggle("active");
  }
}

function closeMobileMenu() {
  const drawer = document.getElementById("mobileNavDrawer");
  const btn = document.getElementById("mobileMenuBtn");
  if (drawer && btn) {
    drawer.classList.remove("open");
    btn.classList.remove("active");
  }
}

function triggerHeroEntrance() {
  if (typeof gsap !== 'undefined') {
    const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.9 } });
    tl.fromTo(".site-header-clean", { y: -25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0.05)
      .fromTo(".cinematic-intro-overlay .hero-kicker-tag", { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 0.15)
      .fromTo(".cinematic-hero-title", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 0.25)
      .fromTo(".cinematic-hero-subtext", { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65 }, 0.38)
      .fromTo(".hero-cta-buttons-row", { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65 }, 0.48)
      .fromTo("#cinematicPhoneWrapper", { scale: 0.88, opacity: 0, x: 60, rotationY: -45 }, { scale: 1, opacity: 1, x: 0, rotationY: 0, duration: 1.2, ease: "expo.out" }, 0.25)
      .fromTo("#heroFloatingCard", { opacity: 0, y: 30, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.85, ease: "power3.out" }, 0.5)
      .fromTo(".cinematic-bottom-bar", { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6 }, 0.65);
  }
}

// =========================================================================
// 1. SUBTLE RED ENERGY TRAILS & CINEMATIC ELECTRIC CANVAS FX
// =========================================================================
function initHeroElectricCanvas() {
  const canvas = document.getElementById("heroElectricCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let width, height;
  let particles = [];
  let lightningArcs = [];
  let animFrameId = null;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  // Initialize Particles (Red glowing motes & subtle trails)
  const PARTICLE_COUNT = 45;
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.2 + 0.8,
      speedX: (Math.random() - 0.5) * 0.7,
      speedY: -Math.random() * 0.9 - 0.3,
      alpha: Math.random() * 0.6 + 0.2,
      maxAlpha: Math.random() * 0.7 + 0.3,
      pulseSpeed: Math.random() * 0.02 + 0.01,
      color: Math.random() > 0.3 ? "rgba(223, 19, 73," : "rgba(255, 90, 120,"
    });
  }

  function createLightningArc() {
    if (Math.random() > 0.08) return; // Rare, subtle cinematic flash
    const centerX = width * 0.58;
    const centerY = height * 0.5;
    const radius = Math.min(width, height) * 0.26;
    const angle = Math.random() * Math.PI * 2;
    
    const startX = centerX + Math.cos(angle) * radius;
    const startY = centerY + Math.sin(angle) * (radius * 0.85);

    const segments = [];
    let curX = startX;
    let curY = startY;
    const steps = Math.floor(Math.random() * 4) + 3;

    for (let i = 0; i < steps; i++) {
      curX += (Math.random() - 0.5) * 40;
      curY += (Math.random() - 0.5) * 40;
      segments.push({ x: curX, y: curY });
    }

    lightningArcs.push({
      startX,
      startY,
      segments,
      alpha: 0.85,
      life: 1.0,
      decay: 0.075
    });
  }

  function drawElectricFX() {
    ctx.clearRect(0, 0, width, height);

    // 1. Soft Red Studio Halo behind phone
    const centerX = width > 1024 ? width * 0.58 : width * 0.5;
    const centerY = height * 0.48;
    const grad = ctx.createRadialGradient(centerX, centerY, 40, centerX, centerY, Math.min(width, height) * 0.45);
    grad.addColorStop(0, "rgba(223, 19, 73, 0.065)");
    grad.addColorStop(0.5, "rgba(223, 19, 73, 0.025)");
    grad.addColorStop(1, "rgba(223, 19, 73, 0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // 2. Draw Floating Energy Particles
    particles.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;
      p.alpha += Math.sin(Date.now() * 0.003) * p.pulseSpeed;

      if (p.y < 0) {
        p.y = height + 10;
        p.x = Math.random() * width;
      }
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `${p.color} ${Math.max(0.05, Math.min(p.maxAlpha, p.alpha))})`;
      ctx.shadowColor = "rgba(223, 19, 73, 0.8)";
      ctx.shadowBlur = 10;
      ctx.fill();
    });

    // 3. Draw Subtle Electric Arcs
    createLightningArc();
    for (let i = lightningArcs.length - 1; i >= 0; i--) {
      const arc = lightningArcs[i];
      arc.life -= arc.decay;
      if (arc.life <= 0) {
        lightningArcs.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(arc.startX, arc.startY);
      arc.segments.forEach(seg => {
        ctx.lineTo(seg.x, seg.y);
      });

      ctx.strokeStyle = `rgba(255, 120, 160, ${arc.life * 0.7})`;
      ctx.lineWidth = 1.5;
      ctx.shadowColor = "rgba(223, 19, 73, 0.9)";
      ctx.shadowBlur = 14;
      ctx.stroke();

      // Core white-hot thread
      ctx.strokeStyle = `rgba(255, 255, 255, ${arc.life * 0.9})`;
      ctx.lineWidth = 0.8;
      ctx.shadowBlur = 4;
      ctx.stroke();
      ctx.restore();
    }

    ctx.shadowBlur = 0; // reset
    animFrameId = requestAnimationFrame(drawElectricFX);
  }

  drawElectricFX();
}

// =========================================================================
// 2. HERO 3D SHOWROOM: CONTINUOUS IDLE 360° SPIN + SCROLL + TOUCH/MOUSE DRAG
// =========================================================================
function initHero3DShowroom() {
  const phoneWrapper = document.getElementById("cinematicPhoneWrapper");
  const phone3D = document.getElementById("cinematicPhone3D");
  const introOverlay = document.getElementById("heroIntroOverlay");
  const callout1 = document.getElementById("calloutTitanium");
  const callout2 = document.getElementById("calloutCamera");
  const callout3 = document.getElementById("calloutDisplay");

  if (!phoneWrapper || !phone3D) return;

  // 1. GSAP ScrollTrigger Pinned Timeline (Scroll Drives Camera & Keynote Highlights)
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    const masterTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#heroTrack",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.0,
        pin: "#heroStickyStage",
        anticipatePin: 1,
        invalidateOnRefresh: true
      }
    });

    // SCROLL PHASE 1 (0% -> 22%): Intro Fades, Phone Centers & Zooms
    masterTimeline
      .to(introOverlay, {
        opacity: 0,
        y: -40,
        scale: 0.94,
        ease: "power2.inOut",
        duration: 0.2
      }, 0)
      .to("#heroFloatingCard", {
        opacity: 0.4,
        scale: 0.92,
        y: 20,
        ease: "power2.inOut",
        duration: 0.2
      }, 0)
      .to(phoneWrapper, {
        xPercent: -18,
        yPercent: 0,
        scale: 1.18,
        ease: "power1.inOut",
        duration: 0.25
      }, 0);

    // SCROLL PHASE 2 (22% -> 50%): 180° Spin to Back, Titanium Architecture Callout
    masterTimeline
      .to(callout1, {
        opacity: 1,
        y: 0,
        scale: 1,
        ease: "back.out(1.4)",
        duration: 0.12
      }, 0.24)
      .to(callout1, {
        opacity: 0,
        y: -25,
        scale: 0.95,
        ease: "power2.in",
        duration: 0.1
      }, 0.45);

    // SCROLL PHASE 3 (50% -> 75%): Zoom into Quad-Optics Visor, Camera Callout
    masterTimeline
      .to(callout2, {
        opacity: 1,
        y: 0,
        scale: 1,
        ease: "back.out(1.4)",
        duration: 0.12
      }, 0.52)
      .to(callout2, {
        opacity: 0,
        y: -25,
        scale: 0.95,
        ease: "power2.in",
        duration: 0.1
      }, 0.70);

    // SCROLL PHASE 4 (75% -> 92%): Front Face Rotation, ProMotion Display Callout
    masterTimeline
      .to(callout3, {
        opacity: 1,
        y: 0,
        scale: 1,
        ease: "back.out(1.4)",
        duration: 0.12
      }, 0.75)
      .to(callout3, {
        opacity: 0,
        y: 30,
        scale: 0.95,
        ease: "power2.in",
        duration: 0.08
      }, 0.90);

    // SCROLL PHASE 5 (92% -> 100%): Majestic Out-Transition
    masterTimeline
      .to(phoneWrapper, {
        scale: 0.88,
        yPercent: -45,
        opacity: 0,
        ease: "power2.in",
        duration: 0.1
      }, 0.90);
  }

  // 2. CONTINUOUS 360° CIRCULAR IDLE ROTATION + MOUSE/TOUCH DRAG PHYSICS
  let isDragging = false;
  let previousX = 0;
  let manualSpinY = 0;
  let velocityY = 0;
  let idleAngle = 0;
  let ambientTiltX = 0, ambientTiltY = 0;
  let curTiltX = 0, curTiltY = 0;
  let isIdleActive = true;
  let lastUserInteractionTime = Date.now();

  window.addEventListener("mousemove", (e) => {
    if (isDragging || window.scrollY > 1200) return;
    ambientTiltX = (e.clientX / window.innerWidth - 0.5) * 14;
    ambientTiltY = (e.clientY / window.innerHeight - 0.5) * 10;
  });

  // Desktop Mouse Drag
  phone3D.style.cursor = "grab";
  phone3D.addEventListener("mousedown", (e) => {
    isDragging = true;
    isIdleActive = false;
    previousX = e.clientX;
    phone3D.style.cursor = "grabbing";
    lastUserInteractionTime = Date.now();
  });

  window.addEventListener("mouseup", () => {
    if (isDragging) {
      isDragging = false;
      phone3D.style.cursor = "grab";
      lastUserInteractionTime = Date.now();
    }
  });

  window.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - previousX;
    previousX = e.clientX;
    velocityY = deltaX * 0.75;
    manualSpinY += velocityY;
    lastUserInteractionTime = Date.now();
  });

  // Mobile Touch Swipe
  phone3D.addEventListener("touchstart", (e) => {
    if (e.touches.length === 1) {
      isDragging = true;
      isIdleActive = false;
      previousX = e.touches[0].clientX;
      lastUserInteractionTime = Date.now();
    }
  }, { passive: true });

  window.addEventListener("touchend", () => {
    isDragging = false;
    lastUserInteractionTime = Date.now();
  });

  window.addEventListener("touchmove", (e) => {
    if (!isDragging || e.touches.length !== 1) return;
    const deltaX = e.touches[0].clientX - previousX;
    previousX = e.touches[0].clientX;
    velocityY = deltaX * 0.85;
    manualSpinY += velocityY;
    lastUserInteractionTime = Date.now();
  }, { passive: true });

  // Main 60fps Physics & Idle Rotation Loop
  function updateShowroomPhoneLoop() {
    const now = Date.now();
    const isAtHero = window.scrollY < 1200;

    if (!isDragging) {
      velocityY *= 0.92;
      manualSpinY += velocityY;

      // Resume smooth continuous idle rotation if user has been idle for >1.5s
      if (now - lastUserInteractionTime > 1500) {
        isIdleActive = true;
      }

      if (isIdleActive && isAtHero) {
        idleAngle += 0.45; // Smooth slow circular continuous 360° spin
      }
    }

    curTiltX += (ambientTiltX - curTiltX) * 0.08;
    curTiltY += (ambientTiltY - curTiltY) * 0.08;

    const totalRotationY = (idleAngle + manualSpinY) % 360;
    const totalRotationX = -curTiltY * 0.4;
    const totalTiltZ = curTiltX * 0.2;

    phone3D.style.transform = `rotateY(${totalRotationY}deg) rotateX(${totalRotationX}deg) rotateZ(${totalTiltZ}deg)`;

    requestAnimationFrame(updateShowroomPhoneLoop);
  }

  requestAnimationFrame(updateShowroomPhoneLoop);
}

// =========================================================================
// 3. FLOATING HERO PRODUCT CUSTOMIZER HELPERS
// =========================================================================
function selectHeroStorage(storageSize, priceVal, btnElem) {
  heroSelectedState.storage = storageSize;
  heroSelectedState.price = priceVal;

  const pills = document.querySelectorAll(".hero-card-storage-row .hero-storage-pill");
  pills.forEach(p => p.classList.remove("active"));
  if (btnElem) btnElem.classList.add("active");

  const priceLabel = document.getElementById("heroDisplayPrice");
  if (priceLabel) {
    priceLabel.innerHTML = `₹${priceVal.toLocaleString('en-IN')} <span class="onwards-text">onwards</span>`;
  }
}

function selectHeroColor(colorName, dotElem) {
  heroSelectedState.color = colorName;

  const dots = document.querySelectorAll(".hero-card-color-row .color-swatch-dot");
  dots.forEach(d => d.classList.remove("active"));
  if (dotElem) dotElem.classList.add("active");

  const finishLabel = document.getElementById("heroSelectedFinishLabel");
  if (finishLabel) {
    finishLabel.innerText = colorName;
  }

  // Smooth color morphing on the hero phone render
  const phoneImg = document.getElementById("cinematicPhoneImg");
  if (phoneImg) {
    phoneImg.style.transition = "filter 0.35s ease, opacity 0.35s ease";
    phoneImg.style.opacity = "0.75";
    setTimeout(() => {
      phoneImg.style.opacity = "1";
    }, 200);
  }
}

function addHeroToBag(event) {
  const heroBtn = event.currentTarget;
  flyToCart(heroBtn, {
    id: heroSelectedState.id,
    name: heroSelectedState.name,
    storage: heroSelectedState.storage,
    color: heroSelectedState.color,
    price: heroSelectedState.price,
    image: heroSelectedState.image
  });
}

// =========================================================================
// 4. FLY-TO-CART PARABOLIC CURVED ANIMATION & BAG STATE
// =========================================================================
function flyToCart(startElement, productItem) {
  const cartBtn = document.getElementById("cartOpenBtn");
  if (!cartBtn) return;

  const startRect = startElement.getBoundingClientRect();
  const targetRect = cartBtn.getBoundingClientRect();

  // Create flying projectile
  const flyer = document.createElement("img");
  flyer.src = productItem.image || "iphone-18-pro-finish-select-202609-6-9inch-burgundy.webp";
  flyer.className = "flying-cart-thumb";
  flyer.style.top = `${startRect.top}px`;
  flyer.style.left = `${startRect.left + startRect.width / 2 - 29}px`;
  document.body.appendChild(flyer);

  // Parabolic translation to navbar cart icon
  requestAnimationFrame(() => {
    const deltaX = targetRect.left + targetRect.width / 2 - (startRect.left + startRect.width / 2);
    const deltaY = targetRect.top + targetRect.height / 2 - startRect.top;

    flyer.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(0.35) rotate(360deg)`;
    flyer.style.opacity = "0.2";
  });

  setTimeout(() => {
    flyer.remove();
    // Pulse cart badge
    const badge = document.getElementById("cartBadgeCount");
    if (badge) {
      badge.classList.remove("badge-pulse");
      void badge.offsetWidth; // trigger reflow
      badge.classList.add("badge-pulse");
    }

    // Add item to state
    addToCartState(productItem);

    // Show Toast Notification
    showToastNotification(`Added ${productItem.name} (${productItem.storage}) to Bag ✓`);
  }, 850);
}

function addToCartState(item) {
  const existingIdx = showroomCart.findIndex(i => i.id === item.id && i.storage === item.storage && i.color === item.color);
  if (existingIdx > -1) {
    showroomCart[existingIdx].qty += 1;
  } else {
    showroomCart.push({
      id: item.id,
      name: item.name,
      storage: item.storage,
      color: item.color,
      price: item.price,
      image: item.image,
      qty: 1
    });
  }

  try {
    localStorage.setItem("ms_showroom_bag", JSON.stringify(showroomCart));
  } catch (e) {}

  updateCartBadge();
  renderCartItems();
}

function updateCartBadge() {
  const badge = document.getElementById("cartBadgeCount");
  if (!badge) return;
  const totalCount = showroomCart.reduce((sum, i) => sum + i.qty, 0);
  badge.innerText = totalCount;
  badge.style.display = totalCount > 0 ? "inline-flex" : "none";
}

function showToastNotification(msg) {
  const toast = document.getElementById("toastNotification");
  const msgEl = document.getElementById("toastMessage");
  if (!toast || !msgEl) return;

  msgEl.innerText = msg;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2800);
}

// =========================================================================
// 5. FULL SHOPPING BAG / CART DRAWER CONTROLLER
// =========================================================================
function openCartDrawer() {
  renderCartItems();
  const drawer = document.getElementById("cartDrawer");
  if (drawer) drawer.classList.add("open");
}

function closeCartDrawer() {
  const drawer = document.getElementById("cartDrawer");
  if (drawer) drawer.classList.remove("open");
}

function renderCartItems() {
  const container = document.getElementById("cartItemsContainer");
  const subtotalEl = document.getElementById("cartSubtotalVal");
  if (!container || !subtotalEl) return;

  if (showroomCart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty-state">
        <div class="cart-empty-icon">🛍️</div>
        <h4 style="font-family:var(--font-display); font-size:1.2rem; margin-bottom:0.4rem; color:var(--text-headline);">Your Showroom Bag is Empty</h4>
        <p style="font-size:0.88rem; color:var(--text-muted); margin-bottom:1.5rem;">Explore latest sealed 2026 flagships and add to bag.</p>
        <button class="btn-primary-pink" style="padding:0.75rem 1.4rem;" onclick="closeCartDrawer(); document.getElementById('flagships').scrollIntoView({behavior:'smooth'});">
          Explore Flagships →
        </button>
      </div>
    `;
    subtotalEl.innerText = "₹0";
    return;
  }

  let totalAmount = 0;
  let html = "";

  showroomCart.forEach((item, index) => {
    const itemTotal = item.price * item.qty;
    totalAmount += itemTotal;

    html += `
      <div class="cart-item-row">
        <div class="cart-item-thumb">
          <img src="${item.image || 'iphone-18-pro-finish-select-202609-6-9inch-burgundy.webp'}" alt="${item.name}">
        </div>
        <div class="cart-item-details">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-meta">${item.storage} • ${item.color}</div>
          <div class="cart-item-price">₹${item.price.toLocaleString('en-IN')}</div>
          <div class="cart-qty-stepper">
            <button class="qty-btn" onclick="updateCartQty(${index}, -1)">−</button>
            <span class="qty-val">${item.qty}</span>
            <button class="qty-btn" onclick="updateCartQty(${index}, 1)">+</button>
          </div>
        </div>
        <button class="cart-item-remove-btn" onclick="removeCartItem(${index})" title="Remove">✕</button>
      </div>
    `;
  });

  container.innerHTML = html;
  subtotalEl.innerText = `₹${totalAmount.toLocaleString('en-IN')}`;
}

function updateCartQty(index, delta) {
  if (!showroomCart[index]) return;
  showroomCart[index].qty += delta;
  if (showroomCart[index].qty <= 0) {
    showroomCart.splice(index, 1);
  }
  try {
    localStorage.setItem("ms_showroom_bag", JSON.stringify(showroomCart));
  } catch (e) {}
  updateCartBadge();
  renderCartItems();
}

function removeCartItem(index) {
  showroomCart.splice(index, 1);
  try {
    localStorage.setItem("ms_showroom_bag", JSON.stringify(showroomCart));
  } catch (e) {}
  updateCartBadge();
  renderCartItems();
}

function checkoutCartWhatsApp() {
  if (showroomCart.length === 0) {
    alert("Your showroom bag is empty!");
    return;
  }

  let total = 0;
  let itemsList = showroomCart.map((item, idx) => {
    total += item.price * item.qty;
    return `${idx + 1}. *${item.name}*\n   • Storage: ${item.storage}\n   • Color: ${item.color}\n   • Qty: ${item.qty} × ₹${item.price.toLocaleString('en-IN')} = ₹${(item.price * item.qty).toLocaleString('en-IN')}`;
  }).join("\n\n");

  const message = `Hello Mobile Station (Garud Complex)! I would like to order the following flagship devices from my Showroom Bag:

${itemsList}

💰 *Estimated Subtotal: ₹${total.toLocaleString('en-IN')}*

Please confirm official stock availability, 0% EMI finance options, and dispatch timeline.`;

  const url = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

// =========================================================================
// 6. WHATSAPP DYNAMIC MESSAGING HELPER
// =========================================================================
function chatWhatsAppForProduct(productId, customStorage, customColor) {
  let prodName = "iPhone 18 Pro Max";
  let prodPrice = "₹1,79,900";

  if (typeof PRODUCTS !== 'undefined') {
    const found = PRODUCTS.find(p => p.id === productId);
    if (found) {
      prodName = found.name;
      prodPrice = `₹${found.price.toLocaleString('en-IN')}`;
      if (customStorage && found.storageOptions) {
        const matchedStorage = found.storageOptions.find(s => s.size === customStorage);
        if (matchedStorage) prodPrice = `₹${matchedStorage.price.toLocaleString('en-IN')}`;
      }
    }
  }

  const storageTxt = customStorage ? ` (${customStorage})` : "";
  const colorTxt = customColor ? ` in ${customColor}` : "";

  const message = `Hi Mobile Station, I'm interested in the ${prodName}${storageTxt}${colorTxt} (${prodPrice}). Please share availability, pricing and offers.`;
  const url = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

function addToBagDirect(productId, event) {
  const btn = event.currentTarget;
  let item = {
    id: productId,
    name: "Apple iPhone 18 Pro Max",
    storage: "256GB",
    color: "Deep Burgundy Titanium",
    price: 179900,
    image: "iphone-18-pro-finish-select-202609-6-9inch-burgundy.webp"
  };

  if (typeof PRODUCTS !== 'undefined') {
    const found = PRODUCTS.find(p => p.id === productId);
    if (found) {
      item = {
        id: found.id,
        name: found.name,
        storage: found.storageOptions ? found.storageOptions[0].size : "256GB",
        color: found.colors ? found.colors[0].name : "Standard Finish",
        price: found.price,
        image: found.image
      };
    }
  }

  flyToCart(btn, item);
}

// =========================================================================
// 7. REQUEST CALLBACK MODAL SYSTEM
// =========================================================================
function openCallbackModal(productIdOrName) {
  let devName = "iPhone 18 Pro Max";
  if (typeof PRODUCTS !== 'undefined') {
    const found = PRODUCTS.find(p => p.id === productIdOrName);
    if (found) devName = found.name;
    else if (typeof productIdOrName === 'string' && productIdOrName.length > 0) {
      devName = productIdOrName;
    }
  }

  const deviceInput = document.getElementById("cbDeviceName");
  if (deviceInput) deviceInput.value = devName;

  const formView = document.getElementById("callbackFormView");
  const successView = document.getElementById("callbackSuccessView");
  if (formView) formView.style.display = "block";
  if (successView) successView.classList.remove("show");

  const modal = document.getElementById("callbackModal");
  if (modal) modal.classList.add("open");
}

function closeCallbackModal() {
  const modal = document.getElementById("callbackModal");
  if (modal) modal.classList.remove("open");
}

function submitCallbackForm(e) {
  e.preventDefault();
  const name = document.getElementById("cbCustomerName")?.value || "Valued Customer";
  const phone = document.getElementById("cbCustomerPhone")?.value || "";
  const timeSlot = document.getElementById("cbTimeSlot")?.value || "Afternoon";
  const device = document.getElementById("cbDeviceName")?.value || "Flagship Smartphone";

  const formView = document.getElementById("callbackFormView");
  const successView = document.getElementById("callbackSuccessView");
  const successMsg = document.getElementById("cbSuccessMsg");

  if (formView) formView.style.display = "none";
  if (successView) successView.classList.add("show");
  if (successMsg) {
    successMsg.innerHTML = `Thanks <strong>${name}</strong>! Our Mobile Station team will call you at <strong>${phone}</strong> during <strong>${timeSlot}</strong> regarding the <strong>${device}</strong>.`;
  }
}

// =========================================================================
// 8. INTERACTIVE 3D PRODUCT DETAIL SHOWROOM VIEWER MODAL
// =========================================================================
function openProductDetailViewer(productId) {
  let prod = null;
  if (typeof PRODUCTS !== 'undefined') {
    prod = PRODUCTS.find(p => p.id === productId);
  }

  if (!prod) {
    prod = {
      id: "prod-001",
      name: "Apple iPhone 18 Pro Max",
      brand: "Apple",
      price: 179900,
      image: "iphone-18-pro-finish-select-202609-6-9inch-burgundy.webp",
      colors: [
        { name: "Deep Burgundy Titanium", hex: "#5a202d", image: "iphone-18-pro-finish-select-202609-6-9inch-burgundy.webp" },
        { name: "Desert Titanium", hex: "#cbb799", image: "iphone-18-pro-finish-select-202609-6-9inch-burgundy.webp" },
        { name: "Natural Titanium", hex: "#a8a6a0", image: "iphone-18-pro-finish-select-202609-6-9inch-burgundy.webp" },
        { name: "Space Black Titanium", hex: "#1c1d1f", image: "iphone-18-pro-finish-select-202609-6-9inch-burgundy.webp" }
      ],
      storageOptions: [
        { size: "256GB", price: 179900 },
        { size: "512GB", price: 199900 },
        { size: "1TB", price: 224900 },
        { size: "2TB", price: 249900 }
      ],
      specs: {
        display: "6.9\" Super Retina XDR OLED (120Hz ProMotion)",
        processor: "Apple A19 Pro Bionic Silicon (2nm Architecture)",
        camera: "48MP Quad-Fusion Main + 10x Optical Telephoto Prism",
        battery: "All-Day Pro Endurance + MagSafe 35W Charging",
        os: "iOS 19 with Apple Intelligence Suite"
      }
    };
  }

  currentViewerProduct = prod;
  currentViewerSelectedStorage = prod.storageOptions ? prod.storageOptions[0] : { size: "256GB", price: prod.price };
  currentViewerSelectedColor = prod.colors ? prod.colors[0] : { name: "Standard Finish", hex: "#000", image: prod.image };

  // Set Title & Details
  document.getElementById("viewerBrandKicker").innerText = `${prod.brand.toUpperCase()} FLAGSHIP SHOWROOM`;
  document.getElementById("viewerTitle").innerText = prod.name;
  document.getElementById("viewerFinishName").innerText = currentViewerSelectedColor.name;
  document.getElementById("viewerPrice").innerText = `₹${currentViewerSelectedStorage.price.toLocaleString('en-IN')}`;

  const masterImg = document.getElementById("viewerMasterImg");
  if (masterImg) {
    masterImg.src = currentViewerSelectedColor.image || prod.image;
    masterImg.alt = prod.name;
  }

  // Render Color Swatches
  const colorContainer = document.getElementById("viewerColorSwatches");
  if (colorContainer && prod.colors) {
    colorContainer.innerHTML = prod.colors.map((c, i) => `
      <span class="color-swatch-dot ${i === 0 ? 'active' : ''}" 
            style="background: ${c.hex};" 
            onclick="selectViewerColor('${c.name}', '${c.image || prod.image}', this)" 
            title="${c.name}"></span>
    `).join("");
  }

  // Render Storage Options
  const storageContainer = document.getElementById("viewerStoragePills");
  if (storageContainer && prod.storageOptions) {
    storageContainer.innerHTML = prod.storageOptions.map((s, i) => `
      <button class="hero-storage-pill ${i === 0 ? 'active' : ''}" 
              onclick="selectViewerStorage('${s.size}', ${s.price}, this)">
        ${s.size}
      </button>
    `).join("");
  }

  // Render Specs Matrix
  const specsContainer = document.getElementById("viewerSpecsTable");
  if (specsContainer && prod.specs) {
    specsContainer.innerHTML = `
      <div class="viewer-spec-item">
        <div class="viewer-spec-key">Display</div>
        <div class="viewer-spec-val">${prod.specs.display || 'Pro OLED 120Hz'}</div>
      </div>
      <div class="viewer-spec-item">
        <div class="viewer-spec-key">Silicon / CPU</div>
        <div class="viewer-spec-val">${prod.specs.processor || 'Next-Gen Flagship'}</div>
      </div>
      <div class="viewer-spec-item">
        <div class="viewer-spec-key">Studio Optics</div>
        <div class="viewer-spec-val">${prod.specs.camera || 'Quad Fusion System'}</div>
      </div>
      <div class="viewer-spec-item">
        <div class="viewer-spec-key">Battery / Fast Charging</div>
        <div class="viewer-spec-val">${prod.specs.battery || 'All-Day High Endurance'}</div>
      </div>
    `;
  }

  const modal = document.getElementById("productDetailModal");
  if (modal) modal.classList.add("open");
}

function closeProductDetailModal() {
  const modal = document.getElementById("productDetailModal");
  if (modal) modal.classList.remove("open");
}

// Smooth Color Morphing in Viewer Modal
function selectViewerColor(colorName, imageSrc, dotElem) {
  currentViewerSelectedColor = { name: colorName, image: imageSrc };
  
  const finishLabel = document.getElementById("viewerFinishName");
  if (finishLabel) finishLabel.innerText = colorName;

  const dots = document.querySelectorAll("#viewerColorSwatches .color-swatch-dot");
  dots.forEach(d => d.classList.remove("active"));
  if (dotElem) dotElem.classList.add("active");

  const masterImg = document.getElementById("viewerMasterImg");
  if (masterImg) {
    masterImg.classList.add("morphing");
    setTimeout(() => {
      masterImg.src = imageSrc;
      masterImg.classList.remove("morphing");
    }, 220);
  }
}

function selectViewerStorage(size, price, btnElem) {
  currentViewerSelectedStorage = { size, price };

  const pills = document.querySelectorAll("#viewerStoragePills .hero-storage-pill");
  pills.forEach(p => p.classList.remove("active"));
  if (btnElem) btnElem.classList.add("active");

  const priceEl = document.getElementById("viewerPrice");
  if (priceEl) priceEl.innerText = `₹${price.toLocaleString('en-IN')}`;
}

function addViewerProductToBag(event) {
  if (!currentViewerProduct) return;
  const btn = event.currentTarget;
  flyToCart(btn, {
    id: currentViewerProduct.id,
    name: currentViewerProduct.name,
    storage: currentViewerSelectedStorage ? currentViewerSelectedStorage.size : "256GB",
    color: currentViewerSelectedColor ? currentViewerSelectedColor.name : "Titanium Finish",
    price: currentViewerSelectedStorage ? currentViewerSelectedStorage.price : currentViewerProduct.price,
    image: currentViewerSelectedColor ? currentViewerSelectedColor.image : currentViewerProduct.image
  });
}

function chatWhatsAppForCurrentViewer() {
  if (!currentViewerProduct) return;
  chatWhatsAppForProduct(
    currentViewerProduct.id,
    currentViewerSelectedStorage ? currentViewerSelectedStorage.size : null,
    currentViewerSelectedColor ? currentViewerSelectedColor.name : null
  );
}

// =========================================================================
// 9. PROCEDURAL 3D PHONE FOR HARDWARE STORY SECTION
// =========================================================================
let storyScene, storyCamera, storyRenderer, storyPhoneGroup;
let storyChassisMesh, storyBackMesh;

const FINISH_COLORS = {
  burgundy: { chassis: 0x5a202d, back: 0x471520, rim: 0x8a2d42 },
  desert: { chassis: 0xcbb799, back: 0xdecbb4, rim: 0xf5dfc6 },
  natural: { chassis: 0xa8a6a0, back: 0xc4c2bb, rim: 0xe8e6df },
  black: { chassis: 0x242528, back: 0x1a1b1d, rim: 0x5a5d66 }
};

function initStory3D() {
  const canvas = document.getElementById("storyWebGLCanvas");
  if (!canvas || typeof THREE === 'undefined') return;

  const container = canvas.parentElement;
  const width = container.clientWidth || 560;
  const height = container.clientHeight || 520;

  storyScene = new THREE.Scene();

  storyCamera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
  storyCamera.position.set(0, 0, 8.0);

  storyRenderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
    powerPreference: "high-performance"
  });
  storyRenderer.setSize(width, height);
  storyRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  storyRenderer.toneMapping = THREE.ACESFilmicToneMapping;
  storyRenderer.toneMappingExposure = 1.35;

  // Studio Lighting
  const keyLight = new THREE.DirectionalLight(0xffffff, 2.6);
  keyLight.position.set(5, 5, 5);
  storyScene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0xfff7ed, 1.4);
  fillLight.position.set(-5, -2, 4);
  storyScene.add(fillLight);

  const rimLight = new THREE.PointLight(0xdf1349, 3.0, 12);
  rimLight.position.set(0, 3, -3);
  storyScene.add(rimLight);

  const ambient = new THREE.AmbientLight(0xffffff, 0.85);
  storyScene.add(ambient);

  // Build Procedural 3D Phone
  storyPhoneGroup = buildProceduralPhone(FINISH_COLORS.desert);
  storyScene.add(storyPhoneGroup);

  storyChassisMesh = storyPhoneGroup.userData.chassis;
  storyBackMesh = storyPhoneGroup.userData.back;

  // Render Loop
  function renderStory() {
    requestAnimationFrame(renderStory);
    storyRenderer.render(storyScene, storyCamera);
  }
  renderStory();
}

function buildProceduralPhone(colorConfig) {
  const group = new THREE.Group();

  const chassisGeo = new THREE.BoxGeometry(2.35, 4.85, 0.22);
  const chassisMat = new THREE.MeshStandardMaterial({
    color: colorConfig.chassis,
    metalness: 0.94,
    roughness: 0.22
  });
  const chassis = new THREE.Mesh(chassisGeo, chassisMat);
  group.add(chassis);

  const backGeo = new THREE.BoxGeometry(2.28, 4.78, 0.05);
  const backMat = new THREE.MeshPhysicalMaterial({
    color: colorConfig.back,
    metalness: 0.1,
    roughness: 0.15,
    transmission: 0.25,
    thickness: 0.5
  });
  const back = new THREE.Mesh(backGeo, backMat);
  back.position.z = -0.11;
  group.add(back);

  // Front Screen
  const screenGeo = new THREE.PlaneGeometry(2.26, 4.76);
  const screenMat = new THREE.MeshBasicMaterial({ color: 0x05070a });
  const screen = new THREE.Mesh(screenGeo, screenMat);
  screen.position.z = 0.115;
  group.add(screen);

  group.userData = { chassis, back };
  return group;
}

const STORY_STAGES = [
  {
    badge: "01",
    title: "Super Retina XDR Display",
    desc: "6.9-inch OLED display with ProMotion 120Hz adaptive refresh rate and 2,000 nits peak outdoor brightness. Scratchless ceramic shield glass engineered for pure visual fidelity.",
    rot: { x: 0, y: 0, z: 0 },
    pos: { x: 0, y: 0, z: 0 }
  },
  {
    badge: "02",
    title: "Aerospace Grade 5 Titanium Chassis",
    desc: "Forged with precision aerospace grade titanium alloy. Micro-blasted satin finish provides an ultra-light, rigid contour chassis that dissipates heat instantly during peak gaming.",
    rot: { x: 0.1, y: 1.57, z: 0 },
    pos: { x: 0, y: 0, z: 0 }
  },
  {
    badge: "03",
    title: "48MP Quad-Fusion Studio Camera",
    desc: "10x Optical Telephoto Prism with anti-reflective nano-coating. Capture ultra-wide cinematic 4K 120fps Dolby Vision video with studio audio recording precision.",
    rot: { x: -0.15, y: 3.14, z: 0 },
    pos: { x: 0, y: 0, z: 0 }
  },
  {
    badge: "04",
    title: "A19 Pro Silicon & 36-Hour Battery",
    desc: "Engineered on next-gen 2nm architecture with 6-core GPU and hardware-accelerated ray tracing. Delivers uncompromised multi-day endurance with MagSafe 35W Ultra-Fast Charging.",
    rot: { x: 0.45, y: 0.65, z: -0.15 },
    pos: { x: 0, y: 0, z: 0 }
  }
];

function switchStoryStage(stageIdx, tabElement) {
  const stage = STORY_STAGES[stageIdx];
  if (!stage) return;

  const tabs = document.querySelectorAll(".story-tab-btn");
  tabs.forEach(t => t.classList.remove("active"));
  if (tabElement) tabElement.classList.add("active");

  const badge = document.getElementById("storyBadge");
  const title = document.getElementById("storyTitle");
  const desc = document.getElementById("storyDesc");

  if (badge) badge.innerText = stage.badge;
  if (title) title.innerText = stage.title;
  if (desc) desc.innerText = stage.desc;

  if (storyPhoneGroup && typeof gsap !== 'undefined') {
    gsap.to(storyPhoneGroup.rotation, {
      x: stage.rot.x,
      y: stage.rot.y,
      z: stage.rot.z,
      duration: 1.2,
      ease: "power3.inOut"
    });
  }
}

// =========================================================================
// 10. REPAIR LAB SIMULATION
// =========================================================================
function simulateRepairAnimation(type) {
  const overlay = document.getElementById("crackOverlay");
  const counterVal = document.getElementById("batteryCounterVal");
  const btnScreen = document.getElementById("btnSimScreen");
  const btnBatt = document.getElementById("btnSimBatt");

  if (type === "screen") {
    btnScreen?.classList.add("active");
    btnBatt?.classList.remove("active");
    if (overlay) {
      overlay.classList.add("active");
      setTimeout(() => {
        overlay.classList.remove("active");
      }, 900);
    }
  } else if (type === "battery") {
    btnBatt?.classList.add("active");
    btnScreen?.classList.remove("active");

    let count = 12;
    const interval = setInterval(() => {
      count += 4;
      if (counterVal) counterVal.innerText = `${count}%`;
      if (count >= 100) {
        clearInterval(interval);
        if (counterVal) counterVal.innerText = "100%";
      }
    }, 45);
  }
}

// =========================================================================
// 11. FLAGSHIP FILTER SYSTEM
// =========================================================================
function filterFlagshipCards(category, btnElement) {
  const pills = document.querySelectorAll(".filter-pill-btn");
  pills.forEach(p => p.classList.remove("active"));
  if (btnElement) btnElement.classList.add("active");

  const cards = document.querySelectorAll(".quad-phone-card");
  cards.forEach(card => {
    const cardCat = card.getAttribute("data-cat") || "";
    if (category === "all" || cardCat.includes(category)) {
      card.style.display = "flex";
      card.style.opacity = "0";
      setTimeout(() => {
        card.style.opacity = "1";
      }, 50);
    } else {
      card.style.display = "none";
    }
  });
}

// =========================================================================
// 12. ADVANCED TRADE-IN SCANNER & EVALUATION
// =========================================================================
const TRADE_MODELS = {
  "Apple": [
    { id: "15-promax", name: "iPhone 15 Pro Max", base: 68000 },
    { id: "15-pro", name: "iPhone 15 Pro", base: 58000 },
    { id: "15", name: "iPhone 15 / 15 Plus", base: 45000 },
    { id: "14-promax", name: "iPhone 14 Pro Max", base: 52000 },
    { id: "14-pro", name: "iPhone 14 Pro", base: 46000 },
    { id: "14", name: "iPhone 14 / 14 Plus", base: 36000 },
    { id: "13", name: "iPhone 13 / 13 Pro", base: 31000 },
    { id: "12", name: "iPhone 12 / 12 Pro", base: 22000 },
    { id: "11", name: "iPhone 11 Series", base: 16000 }
  ],
  "Samsung": [
    { id: "s24-ultra", name: "Galaxy S24 Ultra 5G", base: 72000 },
    { id: "s23-ultra", name: "Galaxy S23 Ultra 5G", base: 48000 },
    { id: "z-fold5", name: "Galaxy Z Fold 5", base: 56000 },
    { id: "s23", name: "Galaxy S23 / S23 Plus", base: 34000 },
    { id: "s22-ultra", name: "Galaxy S22 Ultra", base: 32000 },
    { id: "s21-series", name: "Galaxy S21 Series / FE", base: 18000 }
  ],
  "OnePlus": [
    { id: "op-12", name: "OnePlus 12 5G", base: 44000 },
    { id: "op-open", name: "OnePlus Open Foldable", base: 62000 },
    { id: "op-11", name: "OnePlus 11 5G", base: 28000 },
    { id: "op-10pro", name: "OnePlus 10 Pro / 10T", base: 19000 },
    { id: "op-9pro", name: "OnePlus 9 Pro / 9 Series", base: 14000 }
  ],
  "Vivo": [
    { id: "vivo-x100", name: "Vivo X100 / X100 Pro", base: 42000 },
    { id: "vivo-x90", name: "Vivo X90 Pro / Series", base: 27000 },
    { id: "vivo-v30", name: "Vivo V30 Pro / V29 Pro", base: 21000 }
  ],
  "Xiaomi": [
    { id: "mi-14", name: "Xiaomi 14 / 14 Ultra", base: 46000 },
    { id: "mi-13pro", name: "Xiaomi 13 Pro (Leica)", base: 29000 },
    { id: "redmi-note", name: "Redmi Note 13 / 12 Pro+", base: 13000 }
  ],
  "Google": [
    { id: "pixel-8pro", name: "Google Pixel 8 Pro", base: 45000 },
    { id: "pixel-7pro", name: "Google Pixel 7 Pro", base: 26000 },
    { id: "pixel-7a", name: "Google Pixel 7a / 6a", base: 16000 }
  ]
};

function onTradeBrandChange() {
  const brand = document.getElementById("tradeScanBrand")?.value || "Apple";
  const modelSelect = document.getElementById("tradeScanModel");
  if (!modelSelect) return;

  const models = TRADE_MODELS[brand] || TRADE_MODELS["Apple"];
  modelSelect.innerHTML = models.map(m => `<option value="${m.id}">${m.name}</option>`).join("");
  triggerScannerSequence();
}

function triggerScannerSequence() {
  const brand = document.getElementById("tradeScanBrand")?.value || "Apple";
  const modelId = document.getElementById("tradeScanModel")?.value;
  const storage = parseInt(document.getElementById("tradeScanStorage")?.value || "256", 10);
  const condition = document.getElementById("tradeScanCondition")?.value || "good";
  const func = document.getElementById("tradeScanFunction")?.value || "perfect";
  const box = document.getElementById("tradeScanBox")?.value || "box-bill";
  const ticker = document.getElementById("scannerValTicker");

  const models = TRADE_MODELS[brand] || TRADE_MODELS["Apple"];
  const matched = models.find(m => m.id === modelId) || models[0];
  let basePrice = matched ? matched.base : 35000;

  if (storage === 128) basePrice *= 0.92;
  else if (storage === 512) basePrice *= 1.10;
  else if (storage === 1024) basePrice *= 1.20;

  const conditionMult = {
    "flawless": 1.05,
    "good": 0.95,
    "cracked-glass": 0.72,
    "heavy-dent": 0.78,
    "display-line": 0.55
  };
  basePrice *= (conditionMult[condition] || 0.95);

  const funcMult = {
    "perfect": 1.0,
    "batt-service": 0.88,
    "camera-issue": 0.82,
    "minor-fault": 0.85
  };
  basePrice *= (funcMult[func] || 1.0);

  if (box === "box-bill") basePrice += 1500;
  else if (box === "handset-only") basePrice -= 800;

  const minVal = Math.round((basePrice * 0.96) / 500) * 500;
  const maxVal = Math.round((basePrice * 1.05) / 500) * 500;

  if (ticker) {
    ticker.innerText = `₹${minVal.toLocaleString('en-IN')} – ₹${maxVal.toLocaleString('en-IN')}`;
  }
}

function sendTradeInWhatsApp() {
  const brand = document.getElementById("tradeScanBrand")?.value || "Apple";
  const modelText = document.getElementById("tradeScanModel")?.selectedOptions[0]?.text || "Smartphone";
  const storageText = document.getElementById("tradeScanStorage")?.selectedOptions[0]?.text || "256 GB";
  const conditionText = document.getElementById("tradeScanCondition")?.selectedOptions[0]?.text || "Good";
  const funcText = document.getElementById("tradeScanFunction")?.selectedOptions[0]?.text || "All Working";
  const boxText = document.getElementById("tradeScanBox")?.selectedOptions[0]?.text || "Box Available";
  const tickerText = document.getElementById("scannerValTicker")?.innerText || "Indicative Estimate";

  const message = `Hello Mobile Station (Garud Complex)! I evaluated my phone for Exchange/Trade-In:
• Brand & Model: ${brand} ${modelText} (${storageText})
• Physical Condition: ${conditionText}
• Functional Status: ${funcText}
• Box/Invoice: ${boxText}
• Indicative Online Estimate: ${tickerText}

Please confirm the spot valuation and best exchange upgrade offer at Garud Complex showroom.`;

  const url = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

function initScrollRevealObserver() {
  const revealElements = document.querySelectorAll(".story-split-grid, .section-editorial-header, .quad-phone-card, .repair-split-box, .scanner-monolith-box, .showroom-single-pavilion, .footer-main-grid, .scheme-feature-card");
  
  if (!('IntersectionObserver' in window)) {
    revealElements.forEach(el => el.classList.add("is-revealed"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: "0px 0px -40px 0px"
  });

  revealElements.forEach(el => {
    el.classList.add("reveal-on-scroll");
    observer.observe(el);
  });
}

function initScrollHeader() {
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

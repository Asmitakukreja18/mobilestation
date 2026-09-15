/* =====================================================
   MOBILE STATION — MASTER JAVASCRIPT & 3D SHOWROOM ENGINE
   Official Contact: +91 93221 60461
===================================================== */

const WHATSAPP_PHONE = "919322160461";

const catalogProducts = [
  {
    id: "prod-001",
    name: "iPhone 18 Pro Max",
    price: 179900,
    color: "Deep Red",
    image: "assets/phone.png",
    specs: { chip: "A20 Pro", display: "120Hz", camera: "48MP", battery: "All-Day" }
  },
  {
    id: "prod-002",
    name: "Galaxy S26 Ultra",
    price: 139999,
    color: "Titanium Black",
    image: "https://m.media-amazon.com/images/I/71RVuWl+CeL._SL1500_.jpg",
    specs: { chip: "SD 8 Gen 4", display: "120Hz", camera: "200MP", battery: "5000mAh" }
  },
  {
    id: "prod-003",
    name: "Pixel 11 Pro XL",
    price: 124999,
    color: "Obsidian",
    image: "https://m.media-amazon.com/images/I/71x4xQ7c2GL._SL1500_.jpg",
    specs: { chip: "Tensor G6", display: "120Hz", camera: "50MP", battery: "5050mAh" }
  },
  {
    id: "prod-004",
    name: "OnePlus 13 5G",
    price: 69999,
    color: "Emerald Flow",
    image: "https://m.media-amazon.com/images/I/717Qo4MH97L._SL1500_.jpg",
    specs: { chip: "SD 8 Gen 4", display: "2K 120Hz", camera: "50MP", battery: "6000mAh" }
  }
];

let cart = JSON.parse(localStorage.getItem("mobileStationShowroomBag")) || [];

const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];

function money(number) {
  return "₹" + Number(number).toLocaleString("en-IN");
}

/* =====================================================
   CART PERSISTENCE & TOAST
===================================================== */
function saveCart() {
  localStorage.setItem("mobileStationShowroomBag", JSON.stringify(cart));
  renderCart();
}

function showToast(msg) {
  const toast = $("#toast");
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 2200);
}

/* =====================================================
   ADD TO BAG WITH PHYSICAL FLY-TO-CART ANIMATION
===================================================== */
function addProduct(name, price, imageSrc, triggerElem) {
  const currentColor = $("#colourName")?.textContent.trim() || "Deep Red";
  const existing = cart.find(i => i.name === name && i.color === currentColor);

  if (existing) {
    existing.qty++;
  } else {
    cart.push({
      name,
      price,
      color: currentColor,
      image: imageSrc || "assets/phone.png",
      qty: 1
    });
  }

  // Parabolic Fly-to-Cart Animation
  const bagBtn = $("#bagBtn");
  if (triggerElem && bagBtn) {
    const startRect = triggerElem.getBoundingClientRect();
    const targetRect = bagBtn.getBoundingClientRect();

    const flyer = document.createElement("div");
    flyer.className = "flyer-bullet";
    flyer.style.top = `${startRect.top}px`;
    flyer.style.left = `${startRect.left + startRect.width / 2}px`;
    document.body.appendChild(flyer);

    requestAnimationFrame(() => {
      const deltaX = targetRect.left + targetRect.width / 2 - (startRect.left + startRect.width / 2);
      const deltaY = targetRect.top + targetRect.height / 2 - startRect.top;
      flyer.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(0.2)`;
      flyer.style.opacity = "0.2";
    });

    setTimeout(() => {
      flyer.remove();
      bagBtn.classList.remove("pulse");
      void bagBtn.offsetWidth;
      bagBtn.classList.add("pulse");
    }, 750);
  }

  saveCart();
  showToast(`${name} added to bag ✓`);

  $("#cartDrawer")?.classList.add("open");
  $("#overlay")?.classList.add("show");
}

/* =====================================================
   RENDER CART DRAWER
===================================================== */
function renderCart() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  const bagCountEl = $("#bagCount");
  if (bagCountEl) bagCountEl.textContent = count;

  const cartContainer = $("#cartItems");
  const cartTotalEl = $("#cartTotal");
  if (!cartContainer || !cartTotalEl) return;

  if (cart.length === 0) {
    cartContainer.innerHTML = `
      <div class="empty-cart">
        <div style="font-size:3rem; margin-bottom:0.75rem; opacity:0.6;">🛍️</div>
        <div>Your showroom bag is empty.</div>
      </div>
    `;
    cartTotalEl.textContent = "₹0";
    return;
  }

  let total = 0;
  cartContainer.innerHTML = cart.map((item, index) => {
    total += item.price * item.qty;
    return `
      <div class="cart-item-card">
        <div>
          <b>${item.name}</b>
          <small>${item.color} · Qty ${item.qty}</small>
          <div class="cart-item-price">${money(item.price * item.qty)}</div>
        </div>
        <div class="cart-qty-row">
          <button class="qty-step" onclick="updateQty(${index}, -1)">−</button>
          <span>${item.qty}</span>
          <button class="qty-step" onclick="updateQty(${index}, 1)">+</button>
          <button class="item-delete" onclick="removeItem(${index})" title="Remove">✕</button>
        </div>
      </div>
    `;
  }).join("");

  cartTotalEl.textContent = money(total);
}

function updateQty(index, delta) {
  if (!cart[index]) return;
  cart[index].qty += delta;
  if (cart[index].qty <= 0) cart.splice(index, 1);
  saveCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
}

/* =====================================================
   WHATSAPP CONCIERGE HELPERS
===================================================== */
function openWhatsAppConcierge(customMessage) {
  const message = customMessage || "Hi Mobile Station, I want help choosing a flagship smartphone from your showroom.";
  const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

/* =====================================================
   CALLBACK MODAL CONTROLLER
===================================================== */
function openCallback() {
  $("#callbackModal")?.classList.add("open");
}

function closeCallback() {
  $("#callbackModal")?.classList.remove("open");
  $("#callbackSuccess")?.classList.remove("show");
}

/* =====================================================
   MAIN DOM BINDINGS
===================================================== */
document.addEventListener("DOMContentLoaded", () => {
  renderCart();

  // Bag Drawer Open / Close
  const bagBtn = $("#bagBtn");
  if (bagBtn) {
    bagBtn.onclick = () => {
      $("#cartDrawer")?.classList.add("open");
      $("#overlay")?.classList.add("show");
    };
  }

  const closeCart = $("#closeCart");
  if (closeCart) {
    closeCart.onclick = () => {
      $("#cartDrawer")?.classList.remove("open");
      $("#overlay")?.classList.remove("show");
    };
  }

  const overlay = $("#overlay");
  if (overlay) {
    overlay.onclick = () => {
      $("#cartDrawer")?.classList.remove("open");
      overlay.classList.remove("show");
    };
  }

  // Navbar WhatsApp & Search
  $("#whatsappTop")?.addEventListener("click", () => openWhatsAppConcierge());
  $("#showroomWhatsapp")?.addEventListener("click", () => openWhatsAppConcierge());
  $("#contactWhatsapp")?.addEventListener("click", () => openWhatsAppConcierge());

  $("#searchBtn")?.addEventListener("click", () => {
    const q = prompt("Search flagship models, trade-in, or repair lab:");
    if (q) {
      showToast("Searching for: " + q);
      document.getElementById("flagships")?.scrollIntoView({ behavior: "smooth" });
    }
  });

  // Hero Add Bag Button
  const addBagBtn = $("#addBag");
  if (addBagBtn) {
    addBagBtn.onclick = (e) => {
      const currentTitle = $("#heroTitle")?.textContent.trim() || "iPhone 18 Pro Max";
      const currentPrice = parseInt($("#cardPrice")?.textContent.replace(/[^0-9]/g, "") || "179900", 10);
      const phoneImgSrc = $("#heroPhone")?.getAttribute("src") || "assets/phone.png";
      addProduct(currentTitle, currentPrice, phoneImgSrc, e.currentTarget);
    };
  }

  // Hero WhatsApp Button
  const heroWhatsapp = $("#heroWhatsapp");
  if (heroWhatsapp) {
    heroWhatsapp.onclick = () => {
      const currentTitle = $("#heroTitle")?.textContent.trim() || "iPhone 18 Pro Max";
      const currentColor = $("#colourName")?.textContent.trim() || "Deep Red";
      const currentPrice = $("#cardPrice")?.textContent.trim() || "₹1,79,900";
      openWhatsAppConcierge(`Hi Mobile Station, I'm interested in the ${currentTitle} (${currentColor}) (${currentPrice}). Please share availability and showroom offers.`);
    };
  }

  // Callback Modal Triggers
  $("#callbackBtn")?.addEventListener("click", openCallback);
  $("#closeModal")?.addEventListener("click", closeCallback);
  $("#callbackModal")?.addEventListener("click", (e) => {
    if (e.target === $("#callbackModal")) closeCallback();
  });

  // Callback Form Submit
  const cbForm = $("#callbackForm");
  if (cbForm) {
    cbForm.addEventListener("submit", (e) => {
      e.preventDefault();
      $("#callbackSuccess")?.classList.add("show");
      cbForm.reset();
      setTimeout(closeCallback, 2400);
    });
  }

  // Storage Selection
  $$(".storage").forEach(btn => {
    btn.onclick = () => {
      $$(".storage").forEach(s => s.classList.remove("active"));
      btn.classList.add("active");

      const storage = btn.textContent.trim();
      let priceVal = 179900;
      if (storage === "512GB") priceVal = 199900;
      else if (storage === "1TB") priceVal = 224900;
      else if (storage === "2TB") priceVal = 249900;

      const cardPrice = $("#cardPrice");
      if (cardPrice) cardPrice.textContent = money(priceVal);
    };
  });

  // Color Swatches
  $$(".colour").forEach(btn => {
    btn.onclick = () => {
      $$(".colour").forEach(c => c.classList.remove("active"));
      btn.classList.add("active");

      const color = btn.dataset.colour;
      const colorNames = {
        red: "Deep Red",
        cream: "Titanium Cream",
        silver: "Natural Titanium Silver",
        black: "Space Black"
      };

      const colorNameEl = $("#colourName");
      if (colorNameEl) colorNameEl.textContent = colorNames[color] || "Deep Red";

      // Subtle phone visual tint transition
      const heroPhone = $("#heroPhone");
      if (heroPhone) {
        heroPhone.classList.add("color-transition");
        setTimeout(() => {
          if (color === "cream") {
            heroPhone.style.filter = "drop-shadow(0 20px 40px rgba(11, 15, 25, 0.35)) drop-shadow(0 0 25px rgba(207, 161, 92, 0.45)) sepia(0.35) hue-rotate(-20deg)";
          } else if (color === "silver") {
            heroPhone.style.filter = "drop-shadow(0 20px 40px rgba(11, 15, 25, 0.35)) drop-shadow(0 0 25px rgba(180, 190, 200, 0.45)) grayscale(0.85)";
          } else if (color === "black") {
            heroPhone.style.filter = "drop-shadow(0 20px 40px rgba(11, 15, 25, 0.35)) drop-shadow(0 0 25px rgba(0, 0, 0, 0.6)) brightness(0.65)";
          } else {
            heroPhone.style.filter = "drop-shadow(0 20px 40px rgba(11, 15, 25, 0.35)) drop-shadow(0 0 25px rgba(223, 19, 73, 0.35))";
          }
          heroPhone.classList.remove("color-transition");
        }, 180);
      }
    };
  });

  // Product Switcher (Thumbnails)
  const thumbs = $$(".product-thumb");
  thumbs.forEach(thumb => {
    thumb.onclick = () => {
      thumbs.forEach(t => t.classList.remove("active"));
      thumb.classList.add("active");

      const idx = Number(thumb.dataset.index) || 0;
      const prod = catalogProducts[idx];
      if (!prod) return;

      const heroTitle = $("#heroTitle");
      if (heroTitle) heroTitle.textContent = prod.name;

      const cardTitle = $("#cardTitle");
      if (cardTitle) cardTitle.textContent = prod.name;

      const cardPrice = $("#cardPrice");
      if (cardPrice) cardPrice.textContent = money(prod.price);

      const colorName = $("#colourName");
      if (colorName) colorName.textContent = prod.color;

      const heroPhone = $("#heroPhone");
      if (heroPhone) {
        heroPhone.src = prod.image;
        heroPhone.style.filter = "drop-shadow(0 20px 40px rgba(11, 15, 25, 0.35)) drop-shadow(0 0 25px rgba(223, 19, 73, 0.35))";
      }

      const reflection = $("#phoneReflection");
      if (reflection) {
        reflection.style.backgroundImage = `url('${prod.image}')`;
      }
    };
  });

  // Cart Drawer WhatsApp Checkout
  const checkoutBtn = $("#checkoutWhatsapp");
  if (checkoutBtn) {
    checkoutBtn.onclick = () => {
      if (cart.length === 0) {
        showToast("Your bag is empty");
        return;
      }

      let total = 0;
      const itemsList = cart.map((item, idx) => {
        total += item.price * item.qty;
        return `${idx + 1}. *${item.name}* (${item.color}) x${item.qty} — ${money(item.price * item.qty)}`;
      }).join("\n");

      openWhatsAppConcierge(`Hello Mobile Station (Garud Complex)! I would like to place an order from my Showroom Bag:\n\n${itemsList}\n\n*Total Amount: ${money(total)}*\n\nPlease confirm availability and dispatch.`);
    };
  }
});

/* =====================================================
   INTERACTIVE 3D PHONE SPRING MOTION & SCROLL ROTATION
===================================================== */
let targetX = 0;
let targetY = 0;
let currentX = 0;
let currentY = 0;

window.addEventListener("pointermove", (e) => {
  const x = e.clientX / window.innerWidth - 0.5;
  const y = e.clientY / window.innerHeight - 0.5;
  targetX = x * 22;
  targetY = y * 14;
});

function animateHeroPhone() {
  currentX += (targetX - currentX) * 0.08;
  currentY += (targetY - currentY) * 0.08;

  const phoneWrapper = $("#phoneWrapper");
  const reflection = $("#phoneReflection");

  if (phoneWrapper) {
    const scrollY = window.scrollY || 0;
    const hero = $(".hero");
    const heroHeight = hero ? hero.offsetHeight : 800;
    const progress = Math.max(0, Math.min(1, scrollY / (heroHeight * 0.75)));

    const scrollRotate = progress * 75;
    const scrollMove = progress * 70;

    phoneWrapper.style.transform = `
      rotateY(${-18 + currentX + scrollRotate}deg)
      rotateX(${currentY - progress * 10}deg)
      rotateZ(${-4 + progress * 6}deg)
      translateY(${-15 - scrollMove}px)
    `;

    if (reflection) {
      reflection.style.transform = `
        scaleY(-0.45)
        rotateX(45deg)
        rotateY(${currentX * 0.5}deg)
        translateY(${scrollMove * 0.3}px)
      `;
    }
  }

  requestAnimationFrame(animateHeroPhone);
}

animateHeroPhone();

/* =====================================================
   SCROLL SPY NAVIGATION
===================================================== */
const mainSections = $$("main section[id]");
const navbarLinks = $$("nav a");

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navbarLinks.forEach(l => l.classList.remove("active"));
        const activeLink = document.querySelector(`nav a[href="#${entry.target.id}"]`);
        if (activeLink) activeLink.classList.add("active");
      }
    });
  }, { threshold: 0.4 });

  mainSections.forEach(s => observer.observe(s));
}

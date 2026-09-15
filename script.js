/* =====================================================
   MOBILE STATION
   MAIN WEBSITE JAVASCRIPT & 3D INTERACTION ENGINE
===================================================== */

const products = [
  {
    name: "iPhone 18 Pro Max",
    price: 179900,
    color: "Deep Red",
    brand: "Apple",
    tagline: "A20 Pro Silicon • 48MP Quad Prism",
    image: "iphone-18-pro-finish-select-202609-6-9inch-burgundy.webp"
  },
  {
    name: "Galaxy S26 Ultra",
    price: 139999,
    color: "Titanium Black",
    brand: "Samsung",
    tagline: "200MP Quad Zoom • Snapdragon 8 Gen 4",
    image: "https://m.media-amazon.com/images/I/71RVuWl+CeL._SL1500_.jpg"
  },
  {
    name: "Pixel 11 Pro XL",
    price: 124999,
    color: "Obsidian",
    brand: "Google",
    tagline: "Google Tensor G6 • Gemini Live AI",
    image: "https://m.media-amazon.com/images/I/71x4xQ7c2GL._SL1500_.jpg"
  },
  {
    name: "OnePlus 13 5G",
    price: 69999,
    color: "Emerald Flow",
    brand: "OnePlus",
    tagline: "2K 120Hz Oriental • 120W SuperVOOC",
    image: "https://m.media-amazon.com/images/I/717Qo4MH97L._SL1500_.jpg"
  },
  {
    name: "Vivo X200 Pro ZEISS",
    price: 89999,
    color: "Titanium Blue",
    brand: "Vivo",
    tagline: "200MP ZEISS APO Telephoto • 6000mAh",
    image: "https://m.media-amazon.com/images/I/71x4xQ7c2GL._SL1500_.jpg"
  },
  {
    name: "Galaxy Z Fold 6 5G",
    price: 164999,
    color: "Silver Shadow",
    brand: "Samsung",
    tagline: "7.6\" Foldable Dynamic AMOLED • AI Fold",
    image: "https://m.media-amazon.com/images/I/71f2I83DAhL._SL1500_.jpg"
  }
];

let cart = JSON.parse(localStorage.getItem("mobileStationCart")) || [];

const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];

/* =====================================================
   PRICE FORMATTER
===================================================== */
function money(number) {
  return "₹" + Number(number).toLocaleString("en-IN");
}

/* =====================================================
   CART STORAGE & STATE
===================================================== */
function saveCart() {
  localStorage.setItem("mobileStationCart", JSON.stringify(cart));
  renderCart();
}

/* =====================================================
   TOAST NOTIFICATION
===================================================== */
function toast(message) {
  const element = $("#toast");
  if (!element) return;
  element.textContent = message;
  element.classList.add("show");

  setTimeout(() => {
    element.classList.remove("show");
  }, 2200);
}

/* =====================================================
   ADD TO BAG WITH PHYSICAL FLY-TO-CART ANIMATION
===================================================== */
function addToBag(product, startElem) {
  const existing = cart.find(item => item.name === product.name && item.color === product.color);

  if (existing) {
    existing.qty++;
  } else {
    cart.push({
      ...product,
      qty: 1
    });
  }

  // If triggered by a button, create flying element
  if (startElem) {
    const cartBtn = $("#cartBtn");
    if (cartBtn) {
      const startRect = startElem.getBoundingClientRect();
      const targetRect = cartBtn.getBoundingClientRect();

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
        cartBtn.classList.remove("pulse");
        void cartBtn.offsetWidth;
        cartBtn.classList.add("pulse");
      }, 700);
    }
  }

  saveCart();
  toast(product.name + " added to bag ✓");

  $("#cartDrawer")?.classList.add("open");
  $("#overlay")?.classList.add("show");
}

/* =====================================================
   RENDER CART DRAWER
===================================================== */
function renderCart() {
  const count = cart.reduce((total, item) => total + item.qty, 0);

  const cartCountEl = $("#cartCount");
  if (cartCountEl) {
    cartCountEl.textContent = count;
  }

  const cartItems = $("#cartItems");
  if (!cartItems) return;

  if (!cart.length) {
    cartItems.innerHTML = `
      <div class="empty">
        <div style="font-size:2.8rem; margin-bottom:0.75rem; opacity:0.6;">🛍️</div>
        <div>Your showroom bag is empty.</div>
      </div>
    `;
  } else {
    cartItems.innerHTML = cart.map((item, index) => `
      <div class="cart-item">
        <div>
          <b>${item.name}</b>
          <small>${item.color || 'Standard Finish'} · Qty ${item.qty}</small>
          <div class="cart-item-price">${money(item.price * item.qty)}</div>
        </div>
        <div class="cart-qty-ctrls">
          <button class="qty-btn" data-minus="${index}">−</button>
          <span>${item.qty}</span>
          <button class="qty-btn" data-plus="${index}">+</button>
          <button class="remove" data-remove="${index}" title="Remove">✕</button>
        </div>
      </div>
    `).join("");
  }

  const subtotal = cart.reduce((total, item) => total + item.price * item.qty, 0);
  const subtotalEl = $("#subtotal");
  if (subtotalEl) {
    subtotalEl.textContent = money(subtotal);
  }

  // Bind Steppers and Remove
  $$("[data-remove]").forEach(button => {
    button.onclick = () => {
      cart.splice(Number(button.dataset.remove), 1);
      saveCart();
    };
  });

  $$("[data-plus]").forEach(button => {
    button.onclick = () => {
      const idx = Number(button.dataset.plus);
      if (cart[idx]) {
        cart[idx].qty++;
        saveCart();
      }
    };
  });

  $$("[data-minus]").forEach(button => {
    button.onclick = () => {
      const idx = Number(button.dataset.minus);
      if (cart[idx]) {
        cart[idx].qty--;
        if (cart[idx].qty <= 0) {
          cart.splice(idx, 1);
        }
        saveCart();
      }
    };
  });
}

/* =====================================================
   WHATSAPP INTEGRATION
===================================================== */
function openWhatsApp(productName = "") {
  const phone = "919322160461"; // Official Mobile Station Concierge

  let message;
  if (productName) {
    message = `Hi Mobile Station, I'm interested in the ${productName}. Please share availability, best showroom offers and pricing.`;
  } else {
    message = `Hi Mobile Station, I want help choosing a smartphone from your showroom.`;
  }

  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
}

/* =====================================================
   CALLBACK MODAL
===================================================== */
function openCallback() {
  $("#callbackModal")?.classList.add("open");
}

function closeCallback() {
  $("#callbackModal")?.classList.remove("open");
  $("#successMsg")?.classList.remove("show");
}

/* =====================================================
   EVENT LISTENERS & BINDINGS
===================================================== */
document.addEventListener("DOMContentLoaded", () => {
  renderCart();

  // Cart Drawer open / close
  const cartBtn = $("#cartBtn");
  if (cartBtn) {
    cartBtn.onclick = () => {
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

  // Top & Bottom WhatsApp Buttons
  const waTop = $("#waTop");
  if (waTop) {
    waTop.onclick = event => {
      event.preventDefault();
      openWhatsApp();
    };
  }

  const waBottom = $("#waBottom");
  if (waBottom) {
    waBottom.onclick = event => {
      event.preventDefault();
      openWhatsApp();
    };
  }

  // Main Hero Add to Bag
  const addMainBtn = $(".add-main");
  if (addMainBtn) {
    addMainBtn.onclick = (e) => {
      const currentTitle = $("#heroTitle")?.textContent.trim() || "iPhone 18 Pro Max";
      const currentColor = $("#colorName")?.textContent.trim() || "Deep Red";
      const currentPriceText = $("#cardPrice")?.textContent.replace(/[^0-9]/g, "") || "179900";
      
      addToBag({
        name: currentTitle,
        price: parseInt(currentPriceText, 10),
        color: currentColor
      }, e.currentTarget);
    };
  }

  // Product WhatsApp Buttons
  $$(".product-wa").forEach(button => {
    button.onclick = () => {
      openWhatsApp(button.dataset.product || $("#heroTitle")?.textContent);
    };
  });

  // Callback Buttons
  $$(".callback-open").forEach(button => {
    button.onclick = openCallback;
  });

  const closeModal = $("#closeModal");
  if (closeModal) closeModal.onclick = closeCallback;

  const callbackModal = $("#callbackModal");
  if (callbackModal) {
    callbackModal.addEventListener("click", event => {
      if (event.target === callbackModal) {
        closeCallback();
      }
    });
  }

  // Callback Form Submission
  const callbackForm = $("#callbackForm");
  if (callbackForm) {
    callbackForm.addEventListener("submit", event => {
      event.preventDefault();
      $("#successMsg")?.classList.add("show");
      callbackForm.reset();
      setTimeout(closeCallback, 2400);
    });
  }

  // Storage Choices
  $$(".choice").forEach(button => {
    button.onclick = () => {
      $$(".choice").forEach(item => item.classList.remove("active"));
      button.classList.add("active");

      // Dynamic Price Multiplier based on Storage
      const storageText = button.textContent.trim();
      let basePrice = 179900;
      if (storageText === "512GB") basePrice = 199900;
      else if (storageText === "1TB") basePrice = 224900;
      else if (storageText === "2TB") basePrice = 249900;

      const priceEl = $("#cardPrice");
      if (priceEl) priceEl.textContent = money(basePrice);
    };
  });

  // Phone Color Swatches
  $$(".swatch").forEach(button => {
    button.onclick = () => {
      $$(".swatch").forEach(item => item.classList.remove("active"));
      button.classList.add("active");

      const color = button.dataset.color;
      const colorNameEl = $("#colorName");
      if (colorNameEl) {
        colorNameEl.textContent = button.getAttribute("aria-label");
      }

      const phoneColors = {
        red: "linear-gradient(135deg, #680d19 0%, #b81432 45%, #3d060e 100%)",
        cream: "linear-gradient(135deg, #b7a995 0%, #eee4d5 45%, #81786f 100%)",
        silver: "linear-gradient(135deg, #747a80 0%, #d8dce0 45%, #676c71 100%)",
        black: "linear-gradient(135deg, #050608 0%, #272a2e 45%, #050506 100%)"
      };

      const heroPhone = $("#heroPhone");
      if (heroPhone && phoneColors[color]) {
        heroPhone.style.background = phoneColors[color];
        heroPhone.classList.add("color-pulse");
        setTimeout(() => heroPhone.classList.remove("color-pulse"), 400);
      }
    };
  });

  // Render Flagship Grid Cards
  const productGrid = $("#productGrid");
  if (productGrid) {
    productGrid.innerHTML = products.map((product, index) => `
      <article class="product-card">
        <div class="product-art">
          <div class="mini-phone" style="background: ${index === 0 ? 'linear-gradient(135deg, #b81432, #3d060e)' : index === 1 ? 'linear-gradient(135deg, #333, #111)' : 'linear-gradient(135deg, #2b4b41, #12211c)'};">
            <span class="mini-cam"></span>
          </div>
        </div>

        <span class="product-brand">${product.brand || 'Flagship'}</span>
        <h3>${product.name}</h3>
        <p>${product.tagline || 'Latest flagship smartphone'}</p>

        <div class="product-meta">
          <span>${money(product.price)}</span>
          <button class="buy-mini" data-index="${index}">
            Add to Bag
          </button>
        </div>
      </article>
    `).join("");

    $$(".buy-mini").forEach(button => {
      button.onclick = (e) => {
        const prod = products[Number(button.dataset.index)];
        addToBag(prod, e.currentTarget);
      };
    });
  }

  // Mini Product Selectors
  const miniProducts = $("#miniProducts");
  if (miniProducts) {
    miniProducts.innerHTML = products.slice(0, 4).map((product, index) => `
      <button data-mini="${index}" title="${product.name}" class="${index === 0 ? 'active' : ''}">
        ${index === 0 ? "RED" : index === 1 ? "S26" : index === 2 ? "P11" : "OP13"}
      </button>
    `).join("");

    $$("[data-mini]").forEach(button => {
      button.onclick = () => {
        $$("[data-mini]").forEach(b => b.classList.remove("active"));
        button.classList.add("active");

        const product = products[Number(button.dataset.mini)];
        const heroTitle = $("#heroTitle");
        if (heroTitle) heroTitle.textContent = product.name;

        const cardTitle = $("#cardTitle");
        if (cardTitle) cardTitle.textContent = product.name;

        const cardPrice = $("#cardPrice");
        if (cardPrice) cardPrice.textContent = money(product.price);

        const colorName = $("#colorName");
        if (colorName) colorName.textContent = product.color;
      };
    });
  }

  // Checkout via WhatsApp
  const checkoutWa = $("#checkoutWa");
  if (checkoutWa) {
    checkoutWa.onclick = () => {
      if (!cart.length) {
        toast("Your bag is empty");
        return;
      }

      const lines = cart.map(item => `• *${item.name}* (${item.color || 'Standard'}) x${item.qty} — ${money(item.price * item.qty)}`).join("\n");
      const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

      openWhatsApp(`Hello Mobile Station (Garud Complex)! I would like to order from my Showroom Bag:\n\n${lines}\n\n*Total Amount: ${money(total)}*\n\nPlease confirm availability and dispatch.`);
    };
  }

  // Search
  const searchBtn = $("#searchBtn");
  if (searchBtn) {
    searchBtn.onclick = () => {
      const query = prompt("Search flagship phones, trade-in, or repair lab:");
      if (query) {
        toast("Searching for: " + query);
        document.getElementById("flagships")?.scrollIntoView({ behavior: "smooth" });
      }
    };
  }

  // View All Button
  const viewAllBtn = $("#viewAllBtn");
  if (viewAllBtn) {
    viewAllBtn.onclick = () => {
      toast("Showing full 2026 flagship catalog");
    };
  }

  // Mobile Menu Toggle
  const menuBtn = $("#menuBtn");
  if (menuBtn) {
    menuBtn.onclick = () => {
      const nav = document.querySelector("nav");
      if (!nav) return;
      nav.classList.toggle("mobile-open");
    };
  }
});

/* =====================================================
   INTERACTIVE 3D PHONE MOTION (SPRING PHYSICS & SCROLL)
===================================================== */
let targetX = 0;
let targetY = 0;
let currentX = 0;
let currentY = 0;

window.addEventListener("pointermove", event => {
  const x = event.clientX / window.innerWidth - 0.5;
  const y = event.clientY / window.innerHeight - 0.5;
  targetX = x * 22;
  targetY = y * 14;
});

function animatePhone() {
  currentX += (targetX - currentX) * 0.08;
  currentY += (targetY - currentY) * 0.08;

  const phone = $("#heroPhone");
  if (phone) {
    const scrollY = window.scrollY || 0;
    const hero = $(".hero");
    const heroHeight = hero ? hero.offsetHeight : 800;
    const progress = Math.max(0, Math.min(1, scrollY / (heroHeight * 0.75)));

    const scrollRotate = progress * 75;
    const scrollMove = progress * 80;

    phone.style.transform = `
      rotateY(${-24 + currentX + scrollRotate}deg)
      rotateX(${currentY - progress * 10}deg)
      rotateZ(${-7 + progress * 8}deg)
      translateY(${-25 - scrollMove}px)
    `;
  }

  requestAnimationFrame(animatePhone);
}

animatePhone();

/* =====================================================
   ACTIVE NAVIGATION SCROLL SPY
===================================================== */
const sections = $$("main section[id]");
const navLinks = $$("nav a");

if ('IntersectionObserver' in window) {
  const navObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove("active"));
        const active = document.querySelector(`nav a[href="#${entry.target.id}"]`);
        if (active) active.classList.add("active");
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(section => navObserver.observe(section));
}

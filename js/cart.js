// =========================================================================
// MOBILE STATION — SHOPPING BAG & CONCIERGE CART SYSTEM (js/cart.js)
// =========================================================================

const Cart = {
  items: [],

  init() {
    this.loadFromStorage();
    this.updateUI();
    this.bindEvents();
  },

  loadFromStorage() {
    try {
      const saved = localStorage.getItem("ms_cart");
      if (saved) {
        this.items = JSON.parse(saved);
      }
    } catch (e) {
      console.warn("Could not load cart from storage", e);
      this.items = [];
    }
  },

  saveToStorage() {
    try {
      localStorage.setItem("ms_cart", JSON.stringify(this.items));
    } catch (e) {
      console.warn("Could not save cart", e);
    }
  },

  addItem(product, selectedColor, selectedStorage) {
    if (!product) return;

    const color = selectedColor || (product.colors && product.colors[0] ? product.colors[0].name : "Standard");
    const storage = selectedStorage || (product.storage && product.storage[0] ? product.storage[0] : "Standard");
    const cartId = `${product.id}_${color}_${storage}`.replace(/\s+/g, "_");

    const existingIndex = this.items.findIndex(item => item.cartId === cartId);

    if (existingIndex > -1) {
      this.items[existingIndex].quantity += 1;
    } else {
      this.items.push({
        cartId: cartId,
        id: product.id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        image: product.image || "assets/phone.png",
        fallbackImage: product.fallbackImage || "assets/phone.png",
        color: color,
        storage: storage,
        quantity: 1
      });
    }

    this.saveToStorage();
    this.updateUI();
    this.openDrawer();
    this.showToast(`✨ ${product.name} (${storage}, ${color}) added to your Bag!`);
  },

  removeItem(cartId) {
    this.items = this.items.filter(item => item.cartId !== cartId);
    this.saveToStorage();
    this.updateUI();
  },

  updateQuantity(cartId, delta) {
    const item = this.items.find(i => i.cartId === cartId);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
      this.removeItem(cartId);
    } else {
      this.saveToStorage();
      this.updateUI();
    }
  },

  clearCart() {
    this.items = [];
    this.saveToStorage();
    this.updateUI();
  },

  getTotalCount() {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  },

  getTotalPrice() {
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  },

  updateUI() {
    const count = this.getTotalCount();
    const total = this.getTotalPrice();

    // Update all badge counters
    const badges = document.querySelectorAll(".bag-badge, #bagCount");
    badges.forEach(b => {
      b.textContent = count;
      b.style.display = count > 0 ? "inline-flex" : "none";
    });

    // Update Drawer Contents
    const cartContainer = document.getElementById("cartItemsContainer");
    const emptyState = document.getElementById("cartEmptyState");
    const cartSubtotal = document.getElementById("cartSubtotal");
    const cartCheckoutBtn = document.getElementById("cartCheckoutBtn");

    if (cartSubtotal) {
      cartSubtotal.textContent = "₹" + total.toLocaleString("en-IN");
    }

    if (!cartContainer) return;

    if (this.items.length === 0) {
      if (emptyState) emptyState.style.display = "block";
      cartContainer.innerHTML = "";
      if (cartCheckoutBtn) cartCheckoutBtn.classList.add("disabled");
    } else {
      if (emptyState) emptyState.style.display = "none";
      if (cartCheckoutBtn) cartCheckoutBtn.classList.remove("disabled");

      cartContainer.innerHTML = this.items.map(item => `
        <div class="cart-item">
          <div class="cart-item-img-wrap">
            <img src="${item.image}" alt="${item.name}" onerror="this.src='${item.fallbackImage}';" />
          </div>
          <div class="cart-item-info">
            <div class="cart-item-brand">${item.brand}</div>
            <h4 class="cart-item-title">${item.name}</h4>
            <div class="cart-item-specs">${item.storage} • ${item.color}</div>
            <div class="cart-item-price">₹${(item.price * item.quantity).toLocaleString("en-IN")}</div>
          </div>
          <div class="cart-item-actions">
            <button class="cart-qty-btn" onclick="Cart.updateQuantity('${item.cartId}', -1)">-</button>
            <span class="cart-qty">${item.quantity}</span>
            <button class="cart-qty-btn" onclick="Cart.updateQuantity('${item.cartId}', 1)">+</button>
            <button class="cart-remove-btn" onclick="Cart.removeItem('${item.cartId}')" title="Remove">✕</button>
          </div>
        </div>
      `).join("");
    }
  },

  openDrawer() {
    const drawer = document.getElementById("cartDrawer");
    const overlay = document.getElementById("cartOverlay");
    if (drawer) drawer.classList.add("active");
    if (overlay) overlay.classList.add("active");
    document.body.style.overflow = "hidden";
  },

  closeDrawer() {
    const drawer = document.getElementById("cartDrawer");
    const overlay = document.getElementById("cartOverlay");
    if (drawer) drawer.classList.remove("active");
    if (overlay) overlay.classList.remove("active");
    document.body.style.overflow = "";
  },

  checkoutViaWhatsApp() {
    if (this.items.length === 0) {
      alert("Your bag is empty! Please add a flagship phone first.");
      return;
    }

    const itemsSummary = this.items.map(i => `• ${i.name} (${i.storage}, ${i.color}) x${i.quantity} = ₹${(i.price * i.quantity).toLocaleString("en-IN")}`).join("\n");
    const total = "₹" + this.getTotalPrice().toLocaleString("en-IN");

    const message = `Hello Mobile Station Showroom Concierge! 📱\n\nI want to place an order / reserve the following flagship smartphones from your showroom:\n\n${itemsSummary}\n\n*Total Estimate: ${total}*\n\nPlease confirm showroom availability, 0% EMI eligibility, and delivery / store pickup options.`;

    const url = `https://wa.me/919322160461?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  },

  showToast(msg) {
    let toast = document.getElementById("msToast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "msToast";
      toast.className = "ms-toast";
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 3500);
  },

  bindEvents() {
    const openBtns = document.querySelectorAll("#openBagBtn, .open-bag-trigger");
    openBtns.forEach(btn => btn.addEventListener("click", () => this.openDrawer()));

    const closeBtn = document.getElementById("closeCartBtn");
    if (closeBtn) closeBtn.addEventListener("click", () => this.closeDrawer());

    const overlay = document.getElementById("cartOverlay");
    if (overlay) overlay.addEventListener("click", () => this.closeDrawer());

    const checkoutBtn = document.getElementById("cartCheckoutBtn");
    if (checkoutBtn) checkoutBtn.addEventListener("click", () => this.checkoutViaWhatsApp());
  }
};

document.addEventListener("DOMContentLoaded", () => {
  Cart.init();
});

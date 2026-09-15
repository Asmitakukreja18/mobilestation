/* =====================================================
   MOBILE STATION
   INTERACTIONS & LOGIC
===================================================== */

const phone = document.getElementById("phoneContainer");
const scene = document.getElementById("phoneScene");

let mouseX = 0;
let mouseY = 0;

let currentRotateX = 0;
let currentRotateY = -12;


/* =====================================================
   MOUSE PARALLAX + PHONE ROTATION
===================================================== */

window.addEventListener("mousemove", (event) => {
  const x = (event.clientX / window.innerWidth - 0.5) * 2;
  const y = (event.clientY / window.innerHeight - 0.5) * 2;

  mouseX = x;
  mouseY = y;
});


function animatePhone() {
  const targetX = mouseY * -8;
  const targetY = -12 + mouseX * 14;

  currentRotateX += (targetX - currentRotateX) * 0.08;
  currentRotateY += (targetY - currentRotateY) * 0.08;

  if (phone) {
    phone.style.transform = `
      translate(-50%, -50%)
      rotateX(${currentRotateX}deg)
      rotateY(${currentRotateY}deg)
      rotateZ(-7deg)
    `;
  }

  requestAnimationFrame(animatePhone);
}

animatePhone();


/* =====================================================
   SCROLL-LINKED PHONE MOVEMENT
===================================================== */

window.addEventListener("scroll", () => {
  if (!phone || !scene) return;

  const scroll = Math.min(window.scrollY / window.innerHeight, 1);

  const moveX = scroll * 100;
  const moveY = scroll * 80;
  const rotate = scroll * 35;
  const scale = 1 - scroll * 0.15;

  phone.style.transform = `
    translate(
      calc(-50% + ${moveX}px),
      calc(-50% + ${moveY}px)
    )
    rotateX(${currentRotateX}deg)
    rotateY(${currentRotateY + rotate}deg)
    rotateZ(${-7 + rotate / 2}deg)
    scale(${scale})
  `;
});


/* =====================================================
   STORAGE SELECTION
===================================================== */

document.querySelectorAll(".storage").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".storage").forEach((item) => {
      item.classList.remove("active");
    });
    button.classList.add("active");
  });
});


/* =====================================================
   COLOUR SELECTOR
===================================================== */

const colourNames = {
  red: "Deep Red",
  cream: "Champagne",
  silver: "Silver",
  black: "Graphite"
};

document.querySelectorAll(".colour").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".colour").forEach((item) => {
      item.classList.remove("active");
    });
    button.classList.add("active");

    const colour = [...button.classList].find((c) => colourNames[c]);
    if (colour) {
      const colourNameEl = document.getElementById("colourName");
      if (colourNameEl) {
        colourNameEl.textContent = colourNames[colour];
      }
    }
  });
});


/* =====================================================
   BAG / CART STATE
===================================================== */

let cart = [];

function addProduct(name, price) {
  cart.push({
    name,
    price
  });

  updateCart();
  showToast(`${name} added to your bag`);
}

const addBagBtn = document.getElementById("addBag");
if (addBagBtn) {
  addBagBtn.addEventListener("click", () => {
    addProduct("iPhone 18 Pro Max", 179900);
  });
}

function updateCart() {
  const count = document.getElementById("bagCount");
  const items = document.getElementById("cartItems");
  const total = document.getElementById("cartTotal");

  if (count) count.textContent = cart.length;

  if (!items || !total) return;

  if (!cart.length) {
    items.innerHTML = `
      <div class="empty">
        Your bag is empty.
      </div>
    `;
    total.textContent = "₹0";
    return;
  }

  items.innerHTML = cart
    .map(
      (item, index) => `
      <div
        style="
          padding: 16px 0;
          border-bottom: 1px solid #eaded9;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
        "
      >
        <div>
          <strong style="font-size: 15px; color: #17151a;">
            ${item.name}
          </strong>
          <div style="margin-top: 4px; color: #777; font-size: 13px;">
            ₹${item.price.toLocaleString("en-IN")}
          </div>
        </div>

        <button
          onclick="removeProduct(${index})"
          style="
            background: none;
            color: #d71942;
            font-weight: 600;
            font-size: 13px;
            cursor: pointer;
          "
        >
          Remove
        </button>
      </div>
    `
    )
    .join("");

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
  total.textContent = `₹${totalPrice.toLocaleString("en-IN")}`;
}

function removeProduct(index) {
  cart.splice(index, 1);
  updateCart();
}


/* =====================================================
   DRAWER / BAG TOGGLE
===================================================== */

const cartDrawer = document.getElementById("cart");
const overlay = document.getElementById("overlay");
const openBagBtn = document.getElementById("openBag");
const closeBagBtn = document.getElementById("closeBag");

if (openBagBtn && cartDrawer && overlay) {
  openBagBtn.addEventListener("click", () => {
    cartDrawer.classList.add("open");
    overlay.classList.add("show");
  });
}

if (closeBagBtn) {
  closeBagBtn.addEventListener("click", closeBag);
}

if (overlay) {
  overlay.addEventListener("click", () => {
    closeBag();
    closeModalFunc();
  });
}

function closeBag() {
  if (cartDrawer) cartDrawer.classList.remove("open");
  if (overlay) overlay.classList.remove("show");
}


/* =====================================================
   WHATSAPP INTEGRATION (919322160461)
===================================================== */

const WHATSAPP_NUMBER = "919322160461";

function openWhatsApp(message = "") {
  const text =
    message ||
    "Hi Mobile Station! I want to know more about your latest flagship smartphones.";
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank");
}

function checkoutWhatsApp() {
  if (!cart.length) {
    showToast("Your bag is empty");
    return;
  }

  const products = cart
    .map((item) => `• ${item.name} - ₹${item.price.toLocaleString("en-IN")}`)
    .join("\n");

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const message = `Hi Mobile Station!

I would like to purchase the following items:

${products}

Total Amount: ₹${total.toLocaleString("en-IN")}

Please confirm availability and share payment/delivery details.`;

  openWhatsApp(message);
}


/* =====================================================
   CALLBACK MODAL
===================================================== */

const callbackModal = document.getElementById("callbackModal");
const callbackBtn = document.getElementById("callbackButton");
const closeModalBtn = document.getElementById("closeModal");
const callbackForm = document.getElementById("callbackForm");
const successMsg = document.getElementById("success");

if (callbackBtn && callbackModal) {
  callbackBtn.addEventListener("click", () => {
    callbackModal.classList.add("show");
    if (successMsg) successMsg.style.display = "none";
  });
}

function closeModalFunc() {
  if (callbackModal) callbackModal.classList.remove("show");
}

if (closeModalBtn) {
  closeModalBtn.addEventListener("click", closeModalFunc);
}

if (callbackForm) {
  callbackForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (successMsg) successMsg.style.display = "block";
    callbackForm.reset();
  });
}


/* =====================================================
   TOAST NOTIFICATION
===================================================== */

let toastTimer;

function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}


/* =====================================================
   THUMBNAILS SELECTION
===================================================== */

document.querySelectorAll(".thumbnail").forEach((thumbnail) => {
  thumbnail.addEventListener("click", () => {
    document.querySelectorAll(".thumbnail").forEach((item) => {
      item.classList.remove("active");
    });
    thumbnail.classList.add("active");
  });
});


/* =====================================================
   NAVBAR ACTIVE LINK HIGHLIGHT
===================================================== */

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".navigation a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const top = section.offsetTop - 150;
    if (window.scrollY >= top) {
      current = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

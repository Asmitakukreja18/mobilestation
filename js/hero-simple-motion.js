/**
 * MOBILE STATION — ELEGANT HERO SECTION ANIMATION & MODEL SWITCHER
 * Simple, smooth, high-performance animation with zero scroll-jacking.
 */

(function () {
  'use strict';

  const HERO_MODELS = {
    iphone: {
      name: "iPhone 18 Pro Max",
      subtitle: "Power. Beauty. Beyond. Deep Burgundy Titanium Edition with 2nm A20 Pro Silicon.",
      image: "assets/iphone-18-pro-max.png",
      alt: "Apple iPhone 18 Pro Max Titanium Burgundy",
      auraColor: "rgba(215, 25, 66, 0.32)",
      glowGradient: "radial-gradient(circle at 50% 50%, rgba(215, 25, 66, 0.35) 0%, rgba(139, 12, 38, 0.22) 40%, rgba(245, 236, 229, 0) 70%)",
      specs: [
        { icon: "👑", title: "A20 Pro (2nm)", sub: "Next-Gen Extreme Silicon" },
        { icon: "✨", title: "3000 Nits LTPO", sub: "120Hz Super Retina XDR" },
        { icon: "📸", title: "200MP Quad", sub: "Studio Periscope Optics" },
        { icon: "🏷️", title: "Special Festive MOP", sub: "₹1,79,900 (100% Sealed)" }
      ]
    },
    samsung: {
      name: "Galaxy S26 Ultra",
      subtitle: "The Peak of Galaxy AI. Titanium Armor Chassis with Built-in S-Pen & 200MP Quad Telephoto.",
      image: "assets/samsung-s26-ultra.png",
      alt: "Samsung Galaxy S26 Ultra 5G",
      auraColor: "rgba(37, 99, 235, 0.32)",
      glowGradient: "radial-gradient(circle at 50% 50%, rgba(37, 99, 235, 0.32) 0%, rgba(30, 58, 138, 0.2) 40%, rgba(245, 236, 229, 0) 70%)",
      specs: [
        { icon: "⚡", title: "Snapdragon 8 Elite", sub: "Galaxy AI 2026 Engine" },
        { icon: "🖊️", title: "Integrated S-Pen", sub: "Built-in Bluetooth Stylus" },
        { icon: "📸", title: "200MP Quad Zoom", sub: "100x Space Zoom Vision" },
        { icon: "🏷️", title: "Special Festive MOP", sub: "₹1,39,999 (₹10k Off)" }
      ]
    },
    oneplus: {
      name: "OnePlus 15",
      subtitle: "Extreme Velocity. Gen 6 Hasselblad Optics, 6000mAh Battery with 120W SuperVOOC Charge.",
      image: "assets/oneplus-15.png",
      alt: "OnePlus 15 5G Emerald Forest",
      auraColor: "rgba(16, 185, 129, 0.30)",
      glowGradient: "radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.3) 0%, rgba(6, 95, 70, 0.18) 40%, rgba(245, 236, 229, 0) 70%)",
      specs: [
        { icon: "⚡", title: "Snapdragon 8 Elite", sub: "16GB LPDDR5X + 512GB" },
        { icon: "🔋", title: "6000mAh Glacier", sub: "120W SUPERVOOC Fast" },
        { icon: "📷", title: "Hasselblad Gen 6", sub: "HyperTone Camera System" },
        { icon: "🏷️", title: "Special Festive MOP", sub: "₹72,999 (Festive Scheme)" }
      ]
    },
    pixel: {
      name: "Google Pixel 11 Pro",
      subtitle: "Intelligent Supercomputing. Powered by Tensor G6 Silicon and Gemini 3 Live Audio Assistant.",
      image: "assets/pixel-11-pro.png",
      alt: "Google Pixel 11 Pro 5G",
      auraColor: "rgba(245, 158, 11, 0.30)",
      glowGradient: "radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.3) 0%, rgba(180, 83, 9, 0.18) 40%, rgba(245, 236, 229, 0) 70%)",
      specs: [
        { icon: "🤖", title: "Tensor G6 Silicon", sub: "Gemini 3 Ultra Built-In" },
        { icon: "📸", title: "50MP Triple Array", sub: "Pro Video Boost HDR" },
        { icon: "🌟", title: "Super Actua OLED", sub: "3000 Nits Peak Smooth" },
        { icon: "🏷️", title: "Special Festive MOP", sub: "₹1,09,999 (Showroom Offer)" }
      ]
    }
  };

  let currentKey = 'iphone';
  let autoTimer = null;
  let userInteracted = false;

  function switchHeroPhone(key) {
    if (!HERO_MODELS[key]) return;
    currentKey = key;

    const data = HERO_MODELS[key];

    // Update Buttons
    const buttons = document.querySelectorAll('.hero-switch-btn');
    buttons.forEach(btn => {
      if (btn.dataset.phone === key) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Update Titles with cross-fade
    const titleEl = document.getElementById('heroModelName');
    const subEl = document.getElementById('heroModelSubtitle');
    if (titleEl) {
      titleEl.style.opacity = '0';
      titleEl.style.transform = 'translateY(6px)';
      setTimeout(() => {
        titleEl.textContent = data.name;
        titleEl.style.opacity = '1';
        titleEl.style.transform = 'translateY(0)';
      }, 150);
    }
    if (subEl) {
      subEl.style.opacity = '0';
      setTimeout(() => {
        subEl.textContent = data.subtitle;
        subEl.style.opacity = '1';
      }, 150);
    }

    // Update Phone Image with cross-fade
    const imgEl = document.getElementById('heroActivePhoneImg');
    const cardEl = document.getElementById('heroPhoneCard');
    if (imgEl && cardEl) {
      cardEl.classList.add('switching');
      setTimeout(() => {
        imgEl.src = data.image;
        imgEl.alt = data.alt;
        cardEl.classList.remove('switching');
      }, 200);
    }

    // Update Aura Glow
    const auraEl = document.getElementById('heroVisualAura');
    if (auraEl) {
      auraEl.style.background = data.glowGradient;
    }

    // Update Spec Pills
    for (let i = 0; i < 4; i++) {
      const pill = document.getElementById(`specPill${i + 1}`);
      if (pill && data.specs[i]) {
        const iconEl = pill.querySelector('.spec-bullet');
        const strongEl = pill.querySelector('strong');
        const smallEl = pill.querySelector('small');
        if (iconEl) iconEl.textContent = data.specs[i].icon;
        if (strongEl) strongEl.textContent = data.specs[i].title;
        if (smallEl) smallEl.textContent = data.specs[i].sub;
      }
    }
  }

  // Interactive 3D Cursor Tilt
  function init3DTilt() {
    const stage = document.getElementById('heroVisualStage');
    const card = document.getElementById('heroPhoneCard');
    if (!stage || !card) return;

    let targetRX = 0;
    let targetRY = 0;
    let currentRX = 0;
    let currentRY = 0;
    let isHovering = false;
    let animId = null;

    function onMouseMove(e) {
      const rect = stage.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Subtle tilt: max 12 degrees
      targetRY = ((x - centerX) / centerX) * 12;
      targetRX = -((y - centerY) / centerY) * 10;
      isHovering = true;
    }

    function onMouseLeave() {
      targetRX = 0;
      targetRY = 0;
      isHovering = false;
    }

    stage.addEventListener('mousemove', onMouseMove, { passive: true });
    stage.addEventListener('mouseleave', onMouseLeave, { passive: true });

    // Touch tilt support
    stage.addEventListener('touchmove', function (e) {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = stage.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        targetRY = ((x - centerX) / centerX) * 8;
        targetRX = -((y - centerY) / centerY) * 6;
      }
    }, { passive: true });

    stage.addEventListener('touchend', function () {
      targetRX = 0;
      targetRY = 0;
    }, { passive: true });

    function renderTilt() {
      currentRX += (targetRX - currentRX) * 0.1;
      currentRY += (targetRY - currentRY) * 0.1;

      card.style.setProperty('--tilt-x', `${currentRX.toFixed(2)}deg`);
      card.style.setProperty('--tilt-y', `${currentRY.toFixed(2)}deg`);

      animId = requestAnimationFrame(renderTilt);
    }
    renderTilt();
  }

  // Auto-switch models gently every 7 seconds if user hasn't manually clicked
  function initAutoCycle() {
    const keys = ['iphone', 'samsung', 'oneplus', 'pixel'];
    let idx = 0;

    autoTimer = setInterval(() => {
      if (userInteracted) return;
      idx = (idx + 1) % keys.length;
      switchHeroPhone(keys[idx]);
    }, 6500);

    // Pause auto timer on user click
    const buttons = document.querySelectorAll('.hero-switch-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        userInteracted = true;
        if (autoTimer) clearInterval(autoTimer);
      });
    });
  }

  // Expose globally
  window.switchHeroPhone = function (key) {
    userInteracted = true;
    if (autoTimer) clearInterval(autoTimer);
    switchHeroPhone(key);
  };

  document.addEventListener('DOMContentLoaded', function () {
    init3DTilt();
    initAutoCycle();
  });

})();

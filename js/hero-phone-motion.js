/**
 * MOBILE STATION — VIEWPORT-PINNED 3D DUAL-FACE PHONE FLIP & ZIG-ZAG ENGINE
 * 
 * Flow:
 *   1. Direct Body Mount:
 *      Phone is mounted directly to document.body with position: fixed and z-index: 99999.
 *      It can never be clipped, can never be covered, and can never scroll off into space.
 *   2. Initial Hero View (Scroll = 0):
 *      Positioned seamlessly over .product-stage, showing luxury Titanium Rear View (0° Back).
 *   3. Smooth Scroll Tracking ("scroll ke sath smooth ho"):
 *      As user scrolls, phone stays in the viewport line of sight, smoothly gliding from hero
 *      into the viewport focal zone, weaving in an organic 3D zig-zag wave.
 *   4. First 3D Flip ("back se sidha honga"):
 *      Flips 180° around Y-axis to reveal the razor-sharp Super Retina front lock screen display.
 *   5. Second 3D Flip & Docking ("n sidhe se back like fir card mai jayega"):
 *      Flips 180° from Sidha back to Back view, dampening all zig-zag sways as it lands with
 *      millimeter precision directly onto the showroom card.
 *   6. Seamless Pinning:
 *      Once docked, it stays pinned to the card as the page continues scrolling, and reverses
 *      with 60 FPS precision on scroll up.
 */

(function () {
  'use strict';

  function initViewportHeroMotion() {
    const phone = document.getElementById('heroPhoneArt') || document.querySelector('.phone-art');
    const phone3D = document.getElementById('heroPhone3D') || (phone ? phone.querySelector('.phone-3d-card') : null);
    const backFace = document.getElementById('phoneBackFace') || (phone ? phone.querySelector('.phone-face-back') : null);
    const frontFace = document.getElementById('phoneFrontFace') || (phone ? phone.querySelector('.phone-face-front') : null);

    const stage = document.querySelector('.product-stage');
    const halo = stage ? stage.querySelector('.image-halo') : null;
    const chips = stage ? stage.querySelectorAll('.spec-chip, .stage-caption, .stage-ring') : [];

    if (!phone) return;

    // Accessibility fallback
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      phone.style.position = 'relative';
      phone.style.transform = 'none';
      if (phone3D) phone3D.style.transform = 'none';
      phone.style.opacity = '1';
      return;
    }

    // Mount to document.body to break free from any ancestor clipping or perspective contexts
    if (phone.parentElement !== document.body) {
      document.body.appendChild(phone);
    }

    // Fixed viewport styling
    phone.style.position = 'fixed';
    phone.style.left = '0';
    phone.style.top = '0';
    phone.style.margin = '0';
    phone.style.zIndex = '99999';
    phone.style.display = 'block';
    phone.style.visibility = 'visible';
    phone.style.opacity = '1';
    phone.style.pointerEvents = 'none';
    phone.style.willChange = 'transform, opacity';
    phone.style.transformStyle = 'preserve-3d';

    if (phone3D) {
      phone3D.style.willChange = 'transform';
      phone3D.style.transformStyle = 'preserve-3d';
    }

    // Trajectory coordinates (in document space)
    let heroDocX = window.innerWidth * 0.5;
    let heroDocY = 480;
    let cardDocX = window.innerWidth * 0.5;
    let cardDocY = 1350;
    let targetScale = 0.88;
    let dockScrollY = 600;

    function measureLayout() {
      if (!phone) return;

      const w = window.innerWidth;
      const scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;

      // 1. Measure initial hero position from .product-stage
      if (stage) {
        const sRect = stage.getBoundingClientRect();
        heroDocX = sRect.left + sRect.width / 2;
        heroDocY = sRect.top + scrollY + sRect.height / 2;
      } else {
        heroDocX = w * (w >= 1024 ? 0.72 : 0.5);
        heroDocY = 480;
      }

      // 2. Measure target card from #productsShowroomGrid
      const targetCard =
        document.querySelector('#productsShowroomGrid .phone-card') ||
        document.querySelector('.products-showroom-grid .phone-card') ||
        document.querySelector('.phone-card');

      if (targetCard) {
        const targetVisual =
          targetCard.querySelector('.card-visual-stage') ||
          targetCard.querySelector('.card-phone-image') ||
          targetCard;

        const cRect = targetVisual.getBoundingClientRect();
        cardDocX = cRect.left + cRect.width / 2;
        cardDocY = cRect.top + scrollY + cRect.height / 2;

        const pWidth = phone.offsetWidth || 280;
        targetScale = Math.min(1.0, Math.max(0.68, (cRect.width * 0.88) / pWidth));
        dockScrollY = Math.max(260, cardDocY - window.innerHeight * 0.44);
      } else {
        if (w >= 1024) {
          cardDocX = w * 0.28;
          cardDocY = heroDocY + 860;
          targetScale = 0.88;
          dockScrollY = 650;
        } else {
          cardDocX = w * 0.5;
          cardDocY = heroDocY + 760;
          targetScale = 0.85;
          dockScrollY = 580;
        }
      }
    }

    measureLayout();

    // Recalibrate on image load, resize, orientation change, or DOM injection
    const imgs = phone.querySelectorAll('img');
    imgs.forEach((img) => {
      if (!img.complete) {
        img.addEventListener('load', measureLayout, { once: true });
      }
    });

    window.addEventListener('resize', measureLayout, { passive: true });
    window.addEventListener('orientationchange', measureLayout, { passive: true });

    const grid = document.getElementById('productsShowroomGrid');
    if (grid && window.MutationObserver) {
      const observer = new MutationObserver(() => {
        measureLayout();
      });
      observer.observe(grid, { childList: true, subtree: true });
    }

    // Scroll state tracking
    let targetProgress = 0;
    let smoothProgress = 0;

    function onScroll() {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
      const rawProgress = scrollY / Math.max(200, dockScrollY);
      targetProgress = Math.max(0, Math.min(1.0, rawProgress));
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Smoothstep easing helper
    function smoothstep(edge0, edge1, x) {
      const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
      return t * t * (3 - 2 * t);
    }

    // 60 FPS Render Loop
    function renderLoop() {
      requestAnimationFrame(renderLoop);

      // Smooth damped lerp
      smoothProgress += (targetProgress - smoothProgress) * 0.115;
      const p = smoothProgress;

      const scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
      const isMobile = window.innerWidth < 768;

      // -----------------------------------------------------------------------
      // VIEWPORT POSITION TRACKING ("scroll ke sath smooth ho")
      // -----------------------------------------------------------------------
      const viewportCenterY = window.innerHeight * 0.46;
      const viewportCenterX = isMobile ? (window.innerWidth / 2) : (window.innerWidth * 0.50);

      // Current position of hero stage and card in viewport coordinates
      const curHeroScreenY = heroDocY - scrollY;
      const curCardScreenY = cardDocY - scrollY;

      let baseScreenX = 0;
      let baseScreenY = 0;
      let curZ = 0;
      let curRotX = 0;
      let curRotY = 0;
      let curScale = 1.0;

      // Trajectory interpolation
      if (p <= 0.40) {
        // Phase A: Float smoothly from hero stage position into viewport focal center
        const tA = smoothstep(0, 0.40, p);
        baseScreenX = heroDocX + (viewportCenterX - heroDocX) * tA;
        baseScreenY = curHeroScreenY + (viewportCenterY - curHeroScreenY) * tA;
      } else if (p <= 0.60) {
        // Phase B: Hold in viewport focal zone while screen faces user
        const tB = (p - 0.40) / 0.20;
        baseScreenX = viewportCenterX;
        baseScreenY = viewportCenterY + (tB * 14);
      } else {
        // Phase C: Glide from focal center directly into the showroom card
        const tC = smoothstep(0.60, 1.0, p);
        const startX = viewportCenterX;
        const startY = viewportCenterY + 14;
        baseScreenX = startX + (cardDocX - startX) * tC;
        baseScreenY = startY + (curCardScreenY - startY) * tC;
      }

      // If user scrolls past docking position, stay locked to card's viewport position
      if (p >= 1.0) {
        baseScreenX = cardDocX;
        baseScreenY = curCardScreenY;
      }

      // -----------------------------------------------------------------------
      // 3D FLIP TIMELINE ("back se sidha honga n sidhe se back like fir card mai jayega")
      // -----------------------------------------------------------------------
      if (p <= 0.08) {
        curRotY = 0; // 0° = Back View (Titanium rear view)
        curZ = 0;
        curRotX = 0;
        curScale = 1.0;
      } else if (p <= 0.44) {
        const t1 = smoothstep(0.08, 0.44, p);
        curRotY = 180 * t1; // Flips 0° (Back) -> 180° (Sidha / Front)
        curZ = 85 * Math.sin(t1 * Math.PI);
        curRotX = -5.0 * Math.sin(t1 * Math.PI);
        curScale = 1.0 + 0.14 * t1;
      } else if (p <= 0.60) {
        curRotY = 180; // Holds Front View facing user
        curZ = 85;
        curRotX = 0;
        curScale = 1.14;
      } else {
        const t2 = smoothstep(0.60, 0.96, p);
        curRotY = 180 + 180 * t2; // Flips 180° (Sidha) -> 360° (Back view in card)
        curZ = 85 * (1 - t2);
        curRotX = -4.0 * Math.sin(t2 * Math.PI);
        curScale = 1.14 + (targetScale - 1.14) * t2;
      }

      // -----------------------------------------------------------------------
      // ZIG-ZAG 3D WAVE ENGINE ("zig zag m ghumega jese jese scroll krr hu")
      // -----------------------------------------------------------------------
      // Dampens gracefully as phone docks into card so it lands steady & straight
      const dockDampen = (p > 0.03 && p < 0.96) ? (1 - smoothstep(0.80, 0.96, p)) * smoothstep(0.03, 0.12, p) : 0;
      const wavePhase = p * Math.PI * 5.0;

      // Spatial Zig-Zag Sway
      const maxSwayX = isMobile ? Math.min(32, window.innerWidth * 0.08) : Math.min(60, window.innerWidth * 0.05);
      const zigZagSwayX = Math.sin(wavePhase) * maxSwayX * dockDampen;

      // 3D Banking Roll (rotateZ)
      const maxRollZ = isMobile ? 8.0 : 10.5;
      const zigZagRollZ = Math.sin(wavePhase) * maxRollZ * dockDampen;

      // 3D Gyroscopic Yaw (rotateY wobble)
      const maxYawWobble = isMobile ? 12.0 : 18.0;
      const zigZagYaw = Math.cos(wavePhase * 0.9) * maxYawWobble * dockDampen;

      // 3D Pitch (rotateX)
      const maxPitch = 5.0;
      const zigZagPitch = Math.sin(wavePhase * 1.2) * maxPitch * dockDampen;

      // Combine base trajectory with dynamic zig-zag oscillations
      const finalScreenX = baseScreenX + zigZagSwayX;
      const finalScreenY = baseScreenY;
      const finalRotX = curRotX + zigZagPitch;
      const finalRotY = curRotY + zigZagYaw;
      const finalRotZ = zigZagRollZ;

      // Opacity: 100% visible from hero through card docking.
      // Softly fades only if card scrolls far off the top of viewport.
      const cardExitThreshold = dockScrollY + window.innerHeight * 0.85;
      let curOpacity = 1.0;

      if (scrollY > cardExitThreshold) {
        const overScroll = (scrollY - cardExitThreshold) / 250;
        curOpacity = Math.max(0, 1 - overScroll);
      }

      // Center offset calculation for fixed viewport element
      const pWidth = phone.offsetWidth || 280;
      const pHeight = phone.offsetHeight || 560;

      const tx = finalScreenX - pWidth / 2;
      const ty = finalScreenY - pHeight / 2;

      // Apply 3D transform directly in viewport coordinates
      phone.style.transform = `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, ${curZ.toFixed(1)}px) scale(${curScale.toFixed(4)}) rotateX(${finalRotX.toFixed(2)}deg) rotateZ(${finalRotZ.toFixed(2)}deg)`;
      phone.style.opacity = curOpacity.toFixed(3);

      if (phone3D) {
        phone3D.style.transform = `rotateY(${finalRotY.toFixed(2)}deg)`;
      }

      // Cross-face visibility fail-safe
      const normY = ((finalRotY % 360) + 360) % 360;
      const isFrontFacing = normY > 90 && normY < 270;

      if (backFace && frontFace) {
        backFace.style.opacity = isFrontFacing ? '0' : '1';
        frontFace.style.opacity = isFrontFacing ? '1' : '0';
      }

      // Softness on ambient hero stage halo and spec chips as phone leaves stage
      const ambientFade = Math.max(0, 1 - smoothstep(0.04, 0.30, p) * 1.5);

      if (chips && chips.length > 0) {
        chips.forEach((chip) => {
          chip.style.opacity = ambientFade.toFixed(2);
        });
      }

      if (halo) {
        halo.style.opacity = (ambientFade * 0.5).toFixed(2);
      }
    }

    requestAnimationFrame(renderLoop);
  }

  // Safe startup on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initViewportHeroMotion);
  } else {
    initViewportHeroMotion();
  }
})();

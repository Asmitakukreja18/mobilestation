/**
 * MOBILE STATION — 3D DUAL-FACE PHONE FLIP, ZIG-ZAG WEAVE & SHOWROOM CARD DOCKING
 * 
 * Flow:
 *   1. Starts in Hero Showcase Stage (scrollY = 0):
 *      Luxury Titanium Rear View (0° Back).
 *   2. Glides DOWNWARDS towards Showroom Card (Never into Header!):
 *      As user scrolls down, phone descends from hero directly toward the first
 *      flagship card (#productsShowroomGrid .phone-card:first-child).
 *   3. Dynamic 3D Zig-Zag Weave:
 *      Weaves in an organic left-right wave with 3D banking roll (rotateZ)
 *      and gyroscopic yaw wobble, dampening smoothly into card docking.
 *   4. First 3D Flip ("back se sidha honga"):
 *      Flips 0° -> 180° to reveal the razor-sharp Super Retina front OLED display
 *      with Dynamic Island and 9:41 lock screen.
 *   5. Second 3D Flip ("n sidhe se back like fir card mai jayega"):
 *      Flips 180° -> 360° back to Titanium Rear view as it descends into the card.
 *   6. Millimeter Card Docking:
 *      Lands directly on the card's visual pedestal, perfectly scaled.
 *      Seamlessly pins to the card as the page continues scrolling, and fades
 *      safely before the header if scrolled far off top.
 *   7. Header Safeguard:
 *      Phone is strictly clamped below the navbar (Y >= 84px) so it can NEVER
 *      overlap or enter the header.
 */

(function () {
  'use strict';

  function initHeroPhoneMotion() {
    const phone = document.getElementById('heroPhoneArt') || document.querySelector('.phone-art');
    const phone3D = document.getElementById('heroPhone3D') || (phone ? phone.querySelector('.phone-3d-card') : null);
    const backFace = document.getElementById('phoneBackFace') || (phone ? phone.querySelector('.phone-face-back') : null);
    const frontFace = document.getElementById('phoneFrontFace') || (phone ? phone.querySelector('.phone-face-front') : null);

    const stage = document.querySelector('.product-stage');
    const halo = stage ? stage.querySelector('.image-halo') : null;
    const chips = stage ? stage.querySelectorAll('.spec-chip, .stage-caption, .stage-ring') : [];

    if (!phone) return;

    // Direct body mount to escape ancestor transform/perspective/clipping boundaries
    if (phone.parentElement !== document.body) {
      document.body.appendChild(phone);
    }

    // Viewport fixed styling
    phone.style.position = 'fixed';
    phone.style.left = '0';
    phone.style.top = '0';
    phone.style.margin = '0';
    phone.style.zIndex = '99990';
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

    function getScrollTop() {
      return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || window.scrollY || 0;
    }

    // Trajectory coordinates in document space
    let heroDocX = window.innerWidth * 0.5;
    let heroDocY = 500;
    let cardDocX = window.innerWidth * 0.5;
    let cardDocY = 1350;
    let targetScale = 0.85;
    let dockScrollY = 650;
    let targetCardImg = null;

    function measureLayout() {
      if (!phone) return;

      const w = window.innerWidth;
      const scrollY = getScrollTop();

      // 1. Initial Hero Stage center in document space
      if (stage) {
        const sRect = stage.getBoundingClientRect();
        heroDocX = sRect.left + sRect.width / 2;
        heroDocY = sRect.top + scrollY + sRect.height / 2;
      } else {
        heroDocX = w * 0.5;
        heroDocY = 480;
      }

      // 2. Target Showroom Card in document space
      const targetCard =
        document.querySelector('#productsShowroomGrid .phone-card:first-child') ||
        document.querySelector('#productsShowroomGrid .phone-card') ||
        document.querySelector('.phone-card');

      if (targetCard) {
        const targetVisual =
          targetCard.querySelector('.card-visual-stage') ||
          targetCard.querySelector('.card-phone-image') ||
          targetCard;

        targetCardImg = targetCard.querySelector('.card-phone-image');

        const cRect = targetVisual.getBoundingClientRect();
        cardDocX = cRect.left + cRect.width / 2;
        cardDocY = cRect.top + scrollY + cRect.height / 2;

        const pWidth = phone.offsetWidth || (w < 768 ? 220 : 280);
        targetScale = Math.min(1.0, Math.max(0.65, (cRect.width * 0.88) / pWidth));
        dockScrollY = Math.max(220, cardDocY - window.innerHeight * 0.44);
      } else {
        cardDocX = w < 1024 ? w * 0.5 : w * 0.28;
        cardDocY = heroDocY + 860;
        targetScale = 0.85;
        dockScrollY = 620;
      }
    }

    measureLayout();

    // Recalibrate on image load, resize, orientation change, or dynamic catalog rendering
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

    // Smoothstep easing helper
    function smoothstep(edge0, edge1, x) {
      const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
      return t * t * (3 - 2 * t);
    }

    // Scroll progress state
    let targetProgress = 0;
    let smoothProgress = 0;

    function updateScrollProgress() {
      const scrollY = getScrollTop();
      const raw = scrollY / Math.max(100, dockScrollY);
      targetProgress = Math.max(0, Math.min(1.0, raw));
    }

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    window.addEventListener('touchmove', updateScrollProgress, { passive: true });
    updateScrollProgress();

    // 60/120 FPS Fluid Render Loop
    function renderLoop() {
      requestAnimationFrame(renderLoop);

      updateScrollProgress();

      const isMobile = window.innerWidth < 768;
      const lerpSpeed = isMobile ? 0.12 : 0.10;
      smoothProgress += (targetProgress - smoothProgress) * lerpSpeed;
      const p = smoothProgress;

      const scrollY = getScrollTop();

      // -----------------------------------------------------------------------
      // 1. FLIGHT TRAJECTORY FROM HERO TO CARD (Downwards, Never Into Header!)
      // -----------------------------------------------------------------------
      // Interpolate in DOCUMENT space so the phone moves naturally with the page
      const tFlight = smoothstep(0, 1.0, p);
      let curDocX = heroDocX + (cardDocX - heroDocX) * tFlight;
      let curDocY = heroDocY + (cardDocY - heroDocY) * tFlight;

      // When scrolled past dock position, lock to the card as it scrolls
      if (p >= 1.0) {
        curDocX = cardDocX;
        curDocY = cardDocY;
      }

      // Convert document coordinates to fixed viewport screen coordinates
      const baseScreenX = curDocX;
      const baseScreenY = curDocY - scrollY;

      // -----------------------------------------------------------------------
      // 2. DYNAMIC 3D ZIG-ZAG ENGINE ("zig zag m ghumega jese jese scroll krr hu")
      // -----------------------------------------------------------------------
      // Sway is active only during flight (0 at hero, max at mid-flight, 0 at card docking)
      const swayDampen = Math.sin(p * Math.PI);
      const wavePhase = p * Math.PI * 4.0; // 2 complete fluid weaves

      // Lateral Sway X
      const maxSwayX = isMobile
        ? Math.min(30, window.innerWidth * 0.08)
        : Math.min(55, window.innerWidth * 0.05);
      const zigZagSwayX = Math.sin(wavePhase) * maxSwayX * swayDampen;

      // 3D Banking Roll (banks into turns)
      const maxRoll = isMobile ? 7.5 : 10.5;
      const zigZagRollZ = Math.sin(wavePhase) * maxRoll * swayDampen;

      // Gyroscopic Yaw wobble
      const maxYaw = isMobile ? 12.0 : 16.0;
      const zigZagYaw = Math.cos(wavePhase * 0.9) * maxYaw * swayDampen;

      // Aerodynamic Pitch
      const zigZagPitch = Math.sin(wavePhase * 1.2) * 3.5 * swayDampen;

      // -----------------------------------------------------------------------
      // 3. 3D FLIP TIMELINE ("back se sidha honga n sidhe se back like fir card mai jayega")
      // -----------------------------------------------------------------------
      let baseRotY = 0;
      let curZ = 0;
      let flipScaleBonus = 0;

      if (p <= 0.08) {
        // 0.00 - 0.08: Titanium Rear View (0° Back in Hero)
        baseRotY = 0;
        curZ = 0;
      } else if (p <= 0.46) {
        // 0.08 - 0.46: First 3D Flip (0° -> 180° Sidha / Super Retina Front View)
        const t1 = smoothstep(0.08, 0.46, p);
        baseRotY = 180 * t1;
        curZ = 75 * Math.sin(t1 * Math.PI);
        flipScaleBonus = 0.08 * Math.sin(t1 * Math.PI);
      } else if (p <= 0.58) {
        // 0.46 - 0.58: Holds Sidha / Front View facing user
        baseRotY = 180;
        curZ = 0;
      } else if (p <= 0.96) {
        // 0.58 - 0.96: Second 3D Flip (180° -> 360° Titanium Rear View)
        const t2 = smoothstep(0.58, 0.96, p);
        baseRotY = 180 + 180 * t2;
        curZ = 75 * Math.sin(t2 * Math.PI);
        flipScaleBonus = 0.08 * Math.sin(t2 * Math.PI);
      } else {
        // 0.96 - 1.00: Docks at 360° (Back View) directly into Showroom Card
        baseRotY = 360;
        curZ = 0;
      }

      // Combine Rotations & Coordinates
      const finalScreenX = baseScreenX + zigZagSwayX;
      const finalScreenY = baseScreenY;
      const finalRotX = zigZagPitch;
      const finalRotY = baseRotY + zigZagYaw;
      const finalRotZ = zigZagRollZ;

      // Scale: interpolates smoothly from hero size (1.0) to card size (targetScale)
      const baseScale = 1.0 + (targetScale - 1.0) * tFlight;
      const curScale = baseScale + flipScaleBonus;

      // Center offset calculation for fixed viewport element
      const pWidth = phone.offsetWidth || (isMobile ? 220 : 280);
      const pHeight = phone.offsetHeight || (isMobile ? 440 : 560);

      const tx = finalScreenX - pWidth / 2;
      let ty = finalScreenY - pHeight / 2;

      // -----------------------------------------------------------------------
      // 4. HEADER SAFEGUARD (Phone NEVER Penetrates Header / Navbar)
      // -----------------------------------------------------------------------
      // Navbar is 76px tall. Clamp ty so phone's top NEVER enters the navbar area
      const minHeaderSafeY = 82;
      if (ty < minHeaderSafeY && p < 0.98) {
        ty = minHeaderSafeY;
      }

      // Smooth fade-out if card scrolls far off the top of the viewport
      let curOpacity = 1.0;
      if (p >= 0.98) {
        const phoneTopOnScreen = finalScreenY - (pHeight * curScale) / 2;
        if (phoneTopOnScreen < 85) {
          curOpacity = Math.max(0, (phoneTopOnScreen - 25) / 60);
        }
      }

      // Apply 3D transforms
      phone.style.transform = `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, ${curZ.toFixed(1)}px) scale(${curScale.toFixed(4)}) rotateX(${finalRotX.toFixed(2)}deg) rotateZ(${finalRotZ.toFixed(2)}deg)`;
      phone.style.opacity = curOpacity.toFixed(3);

      if (phone3D) {
        phone3D.style.transform = `rotateY(${finalRotY.toFixed(2)}deg)`;
      }

      // Cross-face visibility: ensures crisp rendering without backface flicker
      const normY = ((finalRotY % 360) + 360) % 360;
      const isFrontFacing = normY > 90 && normY < 270;

      if (backFace && frontFace) {
        backFace.style.opacity = isFrontFacing ? '0' : '1';
        frontFace.style.opacity = isFrontFacing ? '1' : '0';
      }

      // Hide card's static image when 3D phone is docked (prevents image collision)
      if (targetCardImg) {
        if (p >= 0.92) {
          const imgFade = Math.max(0, 1 - smoothstep(0.92, 0.98, p));
          targetCardImg.style.opacity = imgFade.toFixed(2);
        } else {
          targetCardImg.style.opacity = '1';
        }
      }

      // Ambient hero stage halo & spec chips fade softly as phone leaves hero stage
      const ambientFade = Math.max(0, 1 - smoothstep(0.02, 0.14, p) * 1.5);
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
    document.addEventListener('DOMContentLoaded', initHeroPhoneMotion);
  } else {
    initHeroPhoneMotion();
  }
})();

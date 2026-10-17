/**
 * MOBILE STATION — 3D DUAL-FACE PHONE FLIP & CARD TRANSITION ENGINE
 * Sequence:
 *   1. Initial View: Phone starts showing its luxury TITANIUM BACK VIEW (camera, Apple logo).
 *   2. Scroll Forward: Flips in 3D around Y-axis (0deg -> 180deg) from BACK to SEEDHA (FRONT lock screen).
 *   3. Center Focal Moment: Large, centered, razor-sharp front display with Dynamic Island.
 *   4. Transition into Card ("fir card mai jayega like iphone banke"):
 *      Glides smoothly downward towards the featured card position below.
 *   5. Scroll Reverse: Flips from SEEDHA back to BACK seamlessly.
 */

(function () {
  'use strict';

  function initFlipPhoneMotion() {
    const phone = document.getElementById('heroPhoneArt') || document.querySelector('.phone-art');
    const phone3D = document.getElementById('heroPhone3D') || (phone ? phone.querySelector('.phone-3d-card') : null);
    const backFace = document.getElementById('phoneBackFace') || (phone ? phone.querySelector('.phone-back') : null);
    const frontFace = document.getElementById('phoneFrontFace') || (phone ? phone.querySelector('.phone-front') : null);

    const stage = document.querySelector('.product-stage');
    const hero = document.getElementById('home') || document.querySelector('.hero');
    const stageContainer = document.querySelector('.hero-stage-container') || hero;
    const halo = stage ? stage.querySelector('.image-halo') : null;
    const chips = stage ? stage.querySelectorAll('.spec-chip, .stage-caption, .stage-ring') : [];

    if (!phone) return;

    // Accessibility fallback
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      phone.style.transform = 'none';
      if (phone3D) phone3D.style.transform = 'none';
      return;
    }

    // Prepare GPU acceleration
    phone.style.willChange = 'transform, opacity';
    phone.style.transformStyle = 'preserve-3d';

    if (phone3D) {
      phone3D.style.willChange = 'transform';
      phone3D.style.transformStyle = 'preserve-3d';
    }

    if (stage) {
      stage.style.perspective = '1400px';
      stage.style.transformStyle = 'preserve-3d';
      stage.style.overflow = 'visible';
    }

    // Layout calibration
    let baseDeltaX = 0;
    let baseDeltaY = 0;
    let baseFocalScale = 1.44;
    let baseCardDist = 340;

    function measureLayout() {
      if (!phone || !stageContainer) return;

      const prevTransform = phone.style.transform;
      phone.style.transform = 'none';

      const w = window.innerWidth;
      const cRect = stageContainer.getBoundingClientRect();
      const pRect = phone.getBoundingClientRect();

      if (w >= 1024) {
        // Desktop: Center in hero stage container
        const containerCenterX = cRect.left + cRect.width / 2;
        const containerCenterY = cRect.top + cRect.height / 2;
        const phoneCenterX = pRect.left + pRect.width / 2;
        const phoneCenterY = pRect.top + pRect.height / 2;

        baseDeltaX = containerCenterX - phoneCenterX;
        baseDeltaY = (containerCenterY - phoneCenterY) - 15;
        baseFocalScale = 1.44;
        baseCardDist = 360;
      } else if (w >= 768) {
        // Tablet
        const containerCenterX = cRect.left + cRect.width / 2;
        const containerCenterY = cRect.top + cRect.height / 2;
        const phoneCenterX = pRect.left + pRect.width / 2;
        const phoneCenterY = pRect.top + pRect.height / 2;

        baseDeltaX = (containerCenterX - phoneCenterX) * 0.75;
        baseDeltaY = (containerCenterY - phoneCenterY) - 10;
        baseFocalScale = 1.28;
        baseCardDist = 280;
      } else {
        // Mobile
        baseDeltaX = 0;
        baseDeltaY = -15;
        baseFocalScale = 1.20;
        baseCardDist = 240;
      }

      phone.style.transform = prevTransform;
    }

    measureLayout();

    // Ensure layout recalibrates once images finish loading
    const imgs = phone.querySelectorAll('img');
    imgs.forEach((img) => {
      if (!img.complete) {
        img.addEventListener('load', measureLayout, { once: true });
      }
    });

    window.addEventListener('resize', measureLayout, { passive: true });

    // Scroll state tracking
    let targetProgress = 0;
    let smoothProgress = 0;

    function updateScrollProgress() {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop || window.scrollY || 0;
      if (!hero) {
        targetProgress = Math.max(0, Math.min(1.0, scrollY / 600));
        return;
      }

      const rect = hero.getBoundingClientRect();
      const heroHeight = hero.offsetHeight || window.innerHeight || 750;
      const scrolled = Math.max(0, -rect.top);

      // Section scroll progression: 0.0 -> 1.0 across hero section
      const travelDistance = Math.max(450, heroHeight * 0.90);
      targetProgress = Math.max(0, Math.min(1.0, scrolled / travelDistance));
    }

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    updateScrollProgress();

    // Smoothstep interpolation helper
    function smoothstep(edge0, edge1, x) {
      const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
      return t * t * (3 - 2 * t);
    }

    // 60 FPS Render Loop
    function renderLoop() {
      requestAnimationFrame(renderLoop);

      // Damped lerp easing
      smoothProgress += (targetProgress - smoothProgress) * 0.095;
      const p = smoothProgress;

      let currentX = 0;
      let currentY = 0;
      let currentScale = 1.0;
      let currentZ = 0;
      let currentPitchX = 0;
      let currentRotY = 0; // 0deg = BACK view, 180deg = FRONT (seedha) view
      let currentOpacity = 1.0;

      // -----------------------------------------------------------------------
      // 3D MOTION TIMELINE: BACK -> SEEDHA (FRONT) -> CARD BELOW
      // -----------------------------------------------------------------------

      if (p <= 0.10) {
        // --- PHASE 1: INITIAL VIEW (BACK VIEW) ---
        currentX = 0;
        currentY = 0;
        currentScale = 1.0;
        currentZ = 0;
        currentPitchX = 0;
        currentRotY = 0; // Back face visible
        currentOpacity = 1.0;
      } else if (p <= 0.50) {
        // --- PHASE 2: GLIDE TO CENTER & 3D FLIP (BACK -> SEEDHA) ---
        const t = smoothstep(0.10, 0.50, p);
        currentX = baseDeltaX * t;
        currentY = baseDeltaY * t;
        currentScale = 1.0 + (baseFocalScale - 1.0) * t;
        currentZ = 120 * t;
        // 3D Flip from 0deg (Back) to 180deg (Seedha / Front)
        currentRotY = 180 * t;
        currentPitchX = -3.5 * Math.sin(t * Math.PI); // subtle dynamic pitch during flip
        currentOpacity = 1.0;
      } else if (p <= 0.68) {
        // --- PHASE 3: LARGE HERO MOMENT (SEEDHA / FRONT FOCAL VIEW) ---
        const tMid = (p - 0.50) / 0.18;
        currentX = baseDeltaX;
        currentY = baseDeltaY + (tMid * 10);
        currentScale = baseFocalScale;
        currentZ = 120;
        currentRotY = 180; // Front face facing viewer
        currentPitchX = 0;
        currentOpacity = 1.0;
      } else {
        // --- PHASE 4 & 5: TRANSITION DOWNWARD INTO CARD BELOW ---
        // ("fir card mai jayega like iphone banke")
        const tCard = smoothstep(0.68, 1.0, p);
        currentX = baseDeltaX;
        // Glides smoothly down towards the featured card position below
        currentY = (baseDeltaY + 10) + (baseCardDist * tCard);
        // Scales down smoothly to merge into card dimensions
        currentScale = baseFocalScale - (baseFocalScale - 0.96) * tCard;
        currentZ = 120 * (1 - tCard);
        // Keeps front face aligned with card below
        currentRotY = 180;
        currentPitchX = 2.0 * tCard;
        // Blends smoothly into the card at the very end of scroll transition
        currentOpacity = tCard < 0.65 ? 1.0 : Math.max(0.05, 1 - (tCard - 0.65) / 0.35);
      }

      // Apply 3D transforms to phone card
      phone.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, ${currentZ.toFixed(1)}px) scale(${currentScale.toFixed(4)}) rotateX(${currentPitchX.toFixed(2)}deg)`;
      phone.style.opacity = currentOpacity.toFixed(3);

      if (phone3D) {
        phone3D.style.transform = `rotateY(${currentRotY.toFixed(2)}deg)`;
      }

      // Smooth face cross-visibility helper for 100% crispness across all engines
      if (backFace && frontFace) {
        if (currentRotY < 90) {
          backFace.style.opacity = '1';
          frontFace.style.opacity = '0';
        } else {
          backFace.style.opacity = '0';
          frontFace.style.opacity = '1';
        }
      }

      // Background depth & ambient chips softness
      const depthStrength = smoothstep(0.18, 0.45, p) * (1 - smoothstep(0.72, 0.95, p));

      if (chips && chips.length > 0) {
        const chipOpacity = (1 - depthStrength * 0.85).toFixed(2);
        chips.forEach((chip) => {
          chip.style.opacity = chipOpacity;
        });
      }

      // Synchronize background halo bloom
      if (halo) {
        const haloScale = (1 + depthStrength * 0.45).toFixed(3);
        halo.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0) scale(${haloScale})`;
        halo.style.opacity = (0.5 + depthStrength * 0.45).toFixed(2);
      }
    }

    requestAnimationFrame(renderLoop);
  }

  // Safe startup on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFlipPhoneMotion);
  } else {
    initFlipPhoneMotion();
  }
})();

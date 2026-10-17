/**
 * MOBILE STATION — CINEMATIC SCROLL-DRIVEN PRODUCT TRANSITION
 * Strictly recreates the reference motion sequence:
 *
 *  PHASE 1 (0% - 15%): INITIAL VIEW
 *    - Phone remains at its normal size and original position.
 *    - Static, sharp, and stable. Zero unsolicited movement.
 *
 *  PHASE 2 (15% - 45%): COMES FORWARD INTO CENTER
 *    - As user scrolls, phone glides smoothly toward the visual center.
 *    - Gradually scales up and comes forward toward the viewer.
 *
 *  PHASE 3 (45% - 70%): LARGE HERO PHONE MOMENT
 *    - Phone reaches primary focal position (centered, enlarged, razor sharp).
 *    - Dominant flagship presence close to the viewer.
 *
 *  PHASE 4 (DEPTH & SOFTNESS):
 *    - Surrounding stage chips and rings soften/fade out to let the phone dominate.
 *    - Text remains completely static.
 *
 *  PHASE 5 (70% - 100%): PHONE EXITS UPWARD / TRANSITIONS OUT
 *    - Phone smoothly glides upward and out of the focal position.
 *    - Scale gently eases down as next section content naturally comes into view.
 *    - Seamlessly reverses when scrolling upward.
 *
 *  STRICT RULES OBSERVED:
 *    - NO infinite floating loops, NO continuous bouncing, NO spinning, NO pulsing.
 *    - 100% scroll-driven with silky damped lerp interpolation.
 *    - Transform-only GPU acceleration (translate3d, scale, subtle perspective pitch).
 *    - Zero layout shifts, zero text alterations, zero redesign.
 */

(function () {
  'use strict';

  function initCinematicPhoneMotion() {
    const phone = document.getElementById('heroPhoneArt') || document.querySelector('.phone-art');
    const stage = document.querySelector('.product-stage');
    const hero = document.getElementById('home') || document.querySelector('.hero');
    const stageContainer = document.querySelector('.hero-stage-container') || hero;
    const halo = stage ? stage.querySelector('.image-halo') : null;
    const chips = stage ? stage.querySelectorAll('.spec-chip, .stage-caption, .stage-ring') : [];

    if (!phone) return;

    // Accessibility: Return to stable static state if user prefers reduced motion
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      phone.style.transform = 'none';
      phone.style.opacity = '1';
      return;
    }

    // Prepare GPU acceleration and 3D rendering context
    phone.style.willChange = 'transform, opacity';
    phone.style.transformStyle = 'preserve-3d';

    if (stage) {
      stage.style.perspective = '1200px';
      stage.style.transformStyle = 'preserve-3d';
      stage.style.overflow = 'visible';
    }

    // Layout calibration variables
    let baseDeltaX = 0;
    let baseDeltaY = 0;
    let baseFocalScale = 1.46;
    let baseExitDist = 300;

    // Measure layout offsets accurately
    function measureLayout() {
      if (!phone || !stageContainer) return;

      const prevTransform = phone.style.transform;
      phone.style.transform = 'none';

      const w = window.innerWidth;
      const cRect = stageContainer.getBoundingClientRect();
      const pRect = phone.getBoundingClientRect();

      if (w >= 1024) {
        // Desktop: Phone starts on right column; calculate exact offset to visual stage center
        const containerCenterX = cRect.left + cRect.width / 2;
        const containerCenterY = cRect.top + cRect.height / 2;
        const phoneCenterX = pRect.left + pRect.width / 2;
        const phoneCenterY = pRect.top + pRect.height / 2;

        baseDeltaX = containerCenterX - phoneCenterX;
        baseDeltaY = (containerCenterY - phoneCenterY) - 20;
        baseFocalScale = 1.46;
        baseExitDist = 320;
      } else if (w >= 768) {
        // Tablet
        const containerCenterX = cRect.left + cRect.width / 2;
        const containerCenterY = cRect.top + cRect.height / 2;
        const phoneCenterX = pRect.left + pRect.width / 2;
        const phoneCenterY = pRect.top + pRect.height / 2;

        baseDeltaX = (containerCenterX - phoneCenterX) * 0.75;
        baseDeltaY = (containerCenterY - phoneCenterY) - 15;
        baseFocalScale = 1.30;
        baseExitDist = 260;
      } else {
        // Mobile: Phone is already horizontally centered; shift slightly upward toward optical center
        baseDeltaX = 0;
        baseDeltaY = -25;
        baseFocalScale = 1.22;
        baseExitDist = 210;
      }

      phone.style.transform = prevTransform;
    }

    measureLayout();
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

      // Transition completes over 85% of hero scroll travel before section exits
      const travelDistance = Math.max(400, heroHeight * 0.85);
      targetProgress = Math.max(0, Math.min(1.0, scrolled / travelDistance));
    }

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    updateScrollProgress();

    // Smoothstep Hermite curve for buttery easing between keyframes
    function smoothstep(edge0, edge1, x) {
      const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
      return t * t * (3 - 2 * t);
    }

    // 60 FPS Render Loop (100% Scroll-driven with Damped Lerp Easing)
    function renderLoop() {
      requestAnimationFrame(renderLoop);

      // Silky damped easing
      smoothProgress += (targetProgress - smoothProgress) * 0.095;
      const p = smoothProgress;

      let currentX = 0;
      let currentY = 0;
      let currentScale = 1.0;
      let currentZ = 0;
      let currentPitchX = 0;
      let currentOpacity = 1.0;

      // -----------------------------------------------------------------------
      // CINEMATIC SCROLL TIMELINE (5 PHASES)
      // -----------------------------------------------------------------------

      if (p <= 0.15) {
        // PHASE 1: INITIAL VIEW (0% - 15%)
        // Phone stays at normal size and initial starting position
        currentX = 0;
        currentY = 0;
        currentScale = 1.0;
        currentZ = 0;
        currentPitchX = 0;
        currentOpacity = 1.0;
      } else if (p <= 0.45) {
        // PHASE 2: COMING FORWARD INTO CENTER (15% - 45%)
        // Smoothly glides to visual center, scales larger, comes forward in 3D
        const t = smoothstep(0.15, 0.45, p);
        currentX = baseDeltaX * t;
        currentY = baseDeltaY * t;
        currentScale = 1.0 + (baseFocalScale - 1.0) * t;
        currentZ = 120 * t;
        // Subtle perspective angle straightens up as product faces viewer
        currentPitchX = -3.5 * (1 - t);
        currentOpacity = 1.0;
      } else if (p <= 0.70) {
        // PHASE 3: LARGE HERO PHONE MOMENT (45% - 70%)
        // Primary visual focus: centered, significantly enlarged, close to viewer
        const tMid = (p - 0.45) / 0.25;
        currentX = baseDeltaX;
        currentY = baseDeltaY - (tMid * 10);
        currentScale = baseFocalScale;
        currentZ = 120;
        currentPitchX = 0;
        currentOpacity = 1.0;
      } else {
        // PHASE 5: TRANSITION UPWARD & OUT (70% - 100%)
        // Smoothly glides upward and out of main focal position as next content arrives
        const tExit = smoothstep(0.70, 1.0, p);
        currentX = baseDeltaX;
        currentY = (baseDeltaY - 10) - (baseExitDist * tExit);
        currentScale = baseFocalScale * (1 - tExit * 0.16);
        currentZ = 120 * (1 - tExit);
        currentPitchX = 3.0 * tExit;
        // Stays solid until halfway through exit, then smoothly fades out
        currentOpacity = tExit < 0.45 ? 1.0 : Math.max(0, 1 - (tExit - 0.45) / 0.55);
      }

      // Apply GPU-accelerated transforms
      phone.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, ${currentZ.toFixed(1)}px) scale(${currentScale.toFixed(4)}) rotateX(${currentPitchX.toFixed(2)}deg)`;
      phone.style.opacity = currentOpacity.toFixed(3);

      // PHASE 4: Background Depth & Ambient Softness
      // During focal moment (0.25 -> 0.75), surrounding stage chips soften so phone commands focus
      const depthStrength = smoothstep(0.20, 0.45, p) * (1 - smoothstep(0.75, 0.95, p));

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
    document.addEventListener('DOMContentLoaded', initCinematicPhoneMotion);
  } else {
    initCinematicPhoneMotion();
  }
})();

/**
 * MOBILE STATION — 3D DUAL-FACE PHONE FLIP & CARD DOCKING ENGINE
 * 
 * Choreography:
 *   1. Initial View (Hero): Phone starts showing luxury TITANIUM REAR VIEW (cameras, Apple logo).
 *   2. Scroll Forward ("back se sidha honga"):
 *      Flips 180° in 3D around Y-axis from BACK to SIDHA (FRONT Super Retina Lock Screen with Dynamic Island).
 *   3. Focal Showcase Hold:
 *      Large, razor-sharp front display faces the user directly.
 *   4. Second Flip & Glide into Card ("n sidhe se back like fir card mai jayega like iphone banke"):
 *      Flips 180° from SIDHA back to BACK view while gliding down with 3D depth and aerodynamic tilt,
 *      docking with precision right into the featured iPhone card in the showroom below.
 *   5. Above All Layers ("arey vo iske ander chae jara h" fix):
 *      Elevated stacking context ensures the phone glides cleanly ON TOP of the white specs bar
 *      and ON TOP of the showroom section.
 *   6. Reverse on Scroll Up:
 *      Buttery-smooth reverse from card back to front, then back to initial hero position.
 */

(function () {
  'use strict';

  function initDualFaceHeroMotion() {
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
      phone.style.transform = 'none';
      if (phone3D) phone3D.style.transform = 'none';
      phone.style.opacity = '1';
      return;
    }

    // Force visible, elevated z-index, and GPU acceleration
    phone.style.display = 'block';
    phone.style.visibility = 'visible';
    phone.style.opacity = '1';
    phone.style.willChange = 'transform, opacity';
    phone.style.transformStyle = 'preserve-3d';
    phone.style.zIndex = '9999';

    if (phone3D) {
      phone3D.style.willChange = 'transform';
      phone3D.style.transformStyle = 'preserve-3d';
    }

    if (stage) {
      stage.style.perspective = '1400px';
      stage.style.transformStyle = 'preserve-3d';
      stage.style.overflow = 'visible';
    }

    // Trajectory coordinates
    let targetDeltaX = 0;
    let targetDeltaY = 680;
    let targetScale = 0.88;
    let dockScrollY = 580;

    function measureTrajectory() {
      if (!phone) return;

      const prevTransform = phone.style.transform;
      phone.style.transform = 'none';

      const w = window.innerWidth;
      const pRect = phone.getBoundingClientRect();
      const pCenterX = pRect.left + pRect.width / 2;
      const pCenterY = pRect.top + window.pageYOffset + pRect.height / 2;

      // Find the first card in the flagships showroom
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
        const cCenterX = cRect.left + cRect.width / 2;
        const cCenterY = cRect.top + window.pageYOffset + cRect.height / 2;

        targetDeltaX = cCenterX - pCenterX;
        targetDeltaY = cCenterY - pCenterY;
        targetScale = Math.min(1.0, Math.max(0.68, (cRect.width * 0.88) / pRect.width));
        dockScrollY = Math.max(260, cCenterY - window.innerHeight * 0.42);
      } else {
        // Fallback before catalog cards finish rendering
        if (w >= 1024) {
          targetDeltaX = -(pRect.left - (w * 0.28));
          targetDeltaY = 740;
          targetScale = 0.88;
          dockScrollY = 620;
        } else {
          targetDeltaX = 0;
          targetDeltaY = 660;
          targetScale = 0.85;
          dockScrollY = 560;
        }
      }

      phone.style.transform = prevTransform;
    }

    // Initial measurement
    measureTrajectory();

    // Recalibrate when images load
    const imgs = phone.querySelectorAll('img');
    imgs.forEach((img) => {
      if (!img.complete) {
        img.addEventListener('load', measureTrajectory, { once: true });
      }
    });

    window.addEventListener('resize', measureTrajectory, { passive: true });
    window.addEventListener('orientationchange', measureTrajectory, { passive: true });

    // Watch for card grid DOM injection
    const grid = document.getElementById('productsShowroomGrid');
    if (grid && window.MutationObserver) {
      const observer = new MutationObserver(() => {
        measureTrajectory();
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
      smoothProgress += (targetProgress - smoothProgress) * 0.105;
      const p = smoothProgress;

      let curX = 0;
      let curY = 0;
      let curZ = 0;
      let curRotX = 0;
      let curRotY = 0;
      let curScale = 1.0;

      // -----------------------------------------------------------------------
      // MULTI-PHASE 3D MOTION TIMELINE:
      // "back se sidha honga n sidhe se back like fir card mai jayega like iphone banke"
      // -----------------------------------------------------------------------

      if (p <= 0.08) {
        // --- PHASE 1: INITIAL VIEW (BACK VIEW) ---
        curX = 0;
        curY = 0;
        curZ = 0;
        curRotX = 0;
        curRotY = 0; // 0deg = Back View (Silver Titanium)
        curScale = 1.0;
      } else if (p <= 0.44) {
        // --- PHASE 2: FIRST FLIP (BACK -> SIDHA / FRONT) ---
        // "back se sidha honga"
        const t1 = smoothstep(0.08, 0.44, p);
        curX = targetDeltaX * 0.12 * t1;
        curY = targetDeltaY * 0.12 * t1;
        curZ = 85 * Math.sin(t1 * Math.PI); // forward 3D lift
        curRotX = -5.5 * Math.sin(t1 * Math.PI); // aerodynamic pitch
        curRotY = 180 * t1; // 0deg (Back) -> 180deg (Sidha / Front)
        curScale = 1.0 + 0.14 * t1; // expands into focal display
      } else if (p <= 0.58) {
        // --- PHASE 3: FRONT / SIDHA VIEW SHOWCASE HOLD ---
        // Large, centered display facing user directly
        const tMid = (p - 0.44) / 0.14;
        curX = targetDeltaX * 0.12;
        curY = targetDeltaY * 0.12 + (tMid * 15);
        curZ = 85;
        curRotX = 0;
        curRotY = 180; // 180deg = Front Face facing viewer
        curScale = 1.14;
      } else {
        // --- PHASE 4: SECOND FLIP & DOCK INTO CARD ---
        // "n sidhe se back like fir card mai jayega like iphone banke"
        const t2 = smoothstep(0.58, 0.96, p);
        const startX = targetDeltaX * 0.12;
        const startY = targetDeltaY * 0.12 + 15;

        curX = startX + (targetDeltaX - startX) * t2;
        curY = startY + (targetDeltaY - startY) * t2;
        curZ = 85 * (1 - t2); // descends smoothly into card surface
        curRotX = -4.0 * Math.sin(t2 * Math.PI);
        // Flips from 180deg (Sidha) to 360deg (Back view in card)
        curRotY = 180 + 180 * t2;
        // Scales down smoothly to merge into card dimensions
        curScale = 1.14 + (targetScale - 1.14) * t2;
      }

      // Opacity: Stays 100% visible at hero, during entire flight, and inside card.
      // Softly fades only if user scrolls far down past the flagships showroom.
      const scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
      const pastThreshold = dockScrollY + window.innerHeight * 0.75;
      let curOpacity = 1.0;

      if (scrollY > pastThreshold) {
        const overScroll = (scrollY - pastThreshold) / 250;
        curOpacity = Math.max(0, 1 - overScroll);
      }

      // Apply 3D transforms
      phone.style.transform = `translate3d(${curX.toFixed(2)}px, ${curY.toFixed(2)}px, ${curZ.toFixed(1)}px) scale(${curScale.toFixed(4)}) rotateX(${curRotX.toFixed(2)}deg)`;
      phone.style.opacity = curOpacity.toFixed(3);

      if (phone3D) {
        phone3D.style.transform = `rotateY(${curRotY.toFixed(2)}deg)`;
      }

      // Double-guarantee cross-face visibility for 100% crispness across all browser engines
      const normY = ((curRotY % 360) + 360) % 360;
      const isFrontFacing = normY > 90 && normY < 270;

      if (backFace && frontFace) {
        backFace.style.opacity = isFrontFacing ? '0' : '1';
        frontFace.style.opacity = isFrontFacing ? '1' : '0';
      }

      // Ambient softness on halo and chips as phone takes flight
      const ambientFade = Math.max(0, 1 - smoothstep(0.08, 0.35, p) * 1.5);

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
    document.addEventListener('DOMContentLoaded', initDualFaceHeroMotion);
  } else {
    initDualFaceHeroMotion();
  }
})();

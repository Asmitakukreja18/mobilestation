/**
 * MOBILE STATION — CINEMATIC 3D HERO PHONE SCROLL-TO-CARD ENGINE
 * 
 * Flow:
 *   1. Initial Hero State: Razor-sharp front view iPhone (Lock Screen with Dynamic Island)
 *      proudly standing in the spotlight stage. 100% visible on Desktop & Mobile.
 *   2. Scroll Down ("scroll krte card mai jaye n mast"):
 *      Phone takes flight with subtle 3D lift (Z-axis), dynamic aerodynamic pitch (X-axis),
 *      and smooth spatial glide directly towards the first featured card below.
 *   3. Docking:
 *      Seamlessly scales down and lands with millimeter precision directly into the card visual stage.
 *   4. Scroll Up:
 *      Lifts smoothly back out of the card and returns to its hero stage.
 *   5. Mobile Responsive:
 *      Single-column centered flight path with zero clipping or horizontal drift.
 */

(function () {
  'use strict';

  function initHeroPhoneMotion() {
    const phone = document.getElementById('heroPhoneArt') || document.querySelector('.phone-art');
    const stage = document.querySelector('.product-stage');
    const hero = document.getElementById('home') || document.querySelector('.hero');
    const halo = stage ? stage.querySelector('.image-halo') : null;
    const chips = stage ? stage.querySelectorAll('.spec-chip, .stage-caption, .stage-ring') : [];

    if (!phone) return;

    // Accessibility fallback
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      phone.style.transform = 'none';
      phone.style.opacity = '1';
      return;
    }

    // Force visible & GPU accelerated
    phone.style.display = 'block';
    phone.style.visibility = 'visible';
    phone.style.opacity = '1';
    phone.style.willChange = 'transform, opacity';
    phone.style.transformStyle = 'preserve-3d';

    if (stage) {
      stage.style.perspective = '1400px';
      stage.style.transformStyle = 'preserve-3d';
      stage.style.overflow = 'visible';
    }

    // Spatial trajectory calibration
    let targetDeltaX = 0;
    let targetDeltaY = 650;
    let targetScale = 0.88;
    let dockScrollY = 550;

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
        targetScale = Math.min(1.0, Math.max(0.70, (cRect.width * 0.88) / pRect.width));
        dockScrollY = Math.max(260, cCenterY - window.innerHeight * 0.42);
      } else {
        // Intelligent fallback before cards finish rendering
        if (w >= 1024) {
          targetDeltaX = -(pRect.left - (w * 0.28));
          targetDeltaY = 720;
          targetScale = 0.88;
          dockScrollY = 600;
        } else {
          targetDeltaX = 0;
          targetDeltaY = 640;
          targetScale = 0.85;
          dockScrollY = 540;
        }
      }

      phone.style.transform = prevTransform;
    }

    // Initial calibration
    measureTrajectory();

    // Recalibrate once images load
    const phoneImg = phone.querySelector('img');
    if (phoneImg) {
      if (!phoneImg.complete) {
        phoneImg.addEventListener('load', measureTrajectory, { once: true });
      }
    }

    // Recalibrate when cards are rendered or window is resized
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

    // Smoothstep interpolation
    function smoothstep(edge0, edge1, x) {
      const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
      return t * t * (3 - 2 * t);
    }

    // 60 FPS Render Loop
    function renderLoop() {
      requestAnimationFrame(renderLoop);

      // Eased lerp
      smoothProgress += (targetProgress - smoothProgress) * 0.11;
      const p = smoothProgress;

      // Smoothstep progress curve
      const t = p * p * (3 - 2 * p);

      // Trajectory values
      const curX = targetDeltaX * t;
      const curY = targetDeltaY * t;

      // 3D physics: subtle forward lift in Z space & aerodynamic tilt during flight
      const curZ = 65 * Math.sin(t * Math.PI);
      const curPitchX = -5.5 * Math.sin(t * Math.PI);
      const isMobile = window.innerWidth < 768;
      const curYawY = isMobile ? 0 : 5.0 * (1 - t);
      const curScale = 1.0 + (targetScale - 1.0) * t;

      // Opacity management: 100% visible at hero, during flight, and inside card.
      // Only fades out if user scrolls far down past the flagships section.
      const scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
      const pastThreshold = dockScrollY + window.innerHeight * 0.75;
      let curOpacity = 1.0;

      if (scrollY > pastThreshold) {
        const overScroll = (scrollY - pastThreshold) / 250;
        curOpacity = Math.max(0, 1 - overScroll);
      }

      // Apply 3D transform
      phone.style.transform = `translate3d(${curX.toFixed(2)}px, ${curY.toFixed(2)}px, ${curZ.toFixed(1)}px) scale(${curScale.toFixed(4)}) rotateX(${curPitchX.toFixed(2)}deg) rotateY(${curYawY.toFixed(2)}deg)`;
      phone.style.opacity = curOpacity.toFixed(3);

      // Ambient softness on hero halo and spec chips as phone leaves the nest
      const ambientFade = Math.max(0, 1 - t * 2.2);

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

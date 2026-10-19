/**
 * MOBILE STATION — CINEMATIC STEP-BY-STEP FLAGSHIP SCROLL STORY
 * 
 * Features & Sequence:
 *   - Step 1: Hero Flagship Spotlight (Right Side)
 *     Left Zone: "iPhone 18 Pro Max" headline, specs, CTAs, scroll hint.
 *     Right Side: 100% Real Titanium iPhone in Portrait Rear View (0° Back).
 * 
 *   - Step 2: Dynamic Travel to Left + Super Retina Display
 *     The phone glides across from Right side to Left side while flipping 180° to Front View!
 *     Left Side: 100% Real iPhone Super Retina OLED Display with Dynamic Island & Lock Screen.
 *     Right Zone: "Brilliance at 3000 Nits. Pure Clarity." (Dynamic Island, 120Hz LTPO).
 * 
 *   - Step 3: Smartphone Desktop Stand ("Vo Rakhne Vala")
 *     Aluminum desk phone holder rises behind and under the iPhone.
 *     The REAL iPhone rests gracefully in the stand's cradle hooks 100% HORIZONTAL (Landscape - "teda").
 *     Floating action pill appears below the stand.
 *     Right Zone: "Always-On StandBy. Studio Precision." specs & CTAs.
 * 
 *   - Fluid 60/120 FPS bidirectional lerp on scroll up & down.
 *   - Mobile touch responsiveness: immediate touch feedback, webkit-transform compatibility.
 */

(function () {
  'use strict';

  function initCinematicStoryMotion() {
    const story = document.querySelector('.hero-scroll-story');
    const container = document.querySelector('.story-layout-container');
    const phoneColumn = document.getElementById('storyPhoneColumn');
    const phone = document.getElementById('heroPhoneArt');
    const phone3D = document.getElementById('heroPhone3D');
    const backFace = document.getElementById('phoneBackFace');
    const frontFace = document.getElementById('phoneFrontFace');
    const deskStand = document.getElementById('magsafeDeskStand');
    const floatingPill = document.getElementById('standbyFloatingPill');

    const step1 = document.getElementById('storyStep1');
    const step2 = document.getElementById('storyStep2');
    const step3 = document.getElementById('storyStep3');

    if (!story || !phone || !phoneColumn) return;

    // Measure scroll progress within the story section directly from DOM bounds
    let targetProgress = 0;
    let smoothProgress = 0;

    function updateProgress() {
      const rect = story.getBoundingClientRect();
      const isMobile = window.innerWidth < 768;
      const stickyTop = isMobile ? 72 : 76;
      const viewportH = window.innerHeight || document.documentElement.clientHeight || 800;
      const storyScrollable = story.offsetHeight - viewportH;
      // Scrolled distance within the sticky boundary
      const scrolled = stickyTop - rect.top;
      const raw = scrolled / Math.max(1, storyScrollable);
      targetProgress = Math.max(0, Math.min(1.0, raw));
    }

    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('touchmove', updateProgress, { passive: true });
    window.addEventListener('touchend', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress, { passive: true });
    updateProgress();

    // Smoothstep easing helper
    function smoothstep(edge0, edge1, x) {
      const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
      return t * t * (3 - 2 * t);
    }

    // 60/120 FPS Fluid Render Loop
    function renderLoop() {
      requestAnimationFrame(renderLoop);

      updateProgress();

      const isMobile = window.innerWidth < 768;
      const diff = targetProgress - smoothProgress;

      // Controlled cinematic lerp speed:
      // Desktop: slow, buttery-smooth mouse wheel glide
      // Mobile: responsive and snappy touch feedback so swipes feel alive immediately
      const lerpSpeed = isMobile ? 0.16 : 0.075;
      const maxDelta = isMobile ? 0.05 : 0.020;
      const step = Math.sign(diff) * Math.min(Math.abs(diff * lerpSpeed), maxDelta);
      smoothProgress += step;
      const p = smoothProgress;

      // -----------------------------------------------------------------------
      // 1. STEP-BY-STEP TEXT SLIDE ACTIVATION
      // -----------------------------------------------------------------------
      const step1Cutoff = isMobile ? 0.22 : 0.28;
      const step2Cutoff = isMobile ? 0.65 : 0.72;

      if (p < step1Cutoff) {
        if (step1) step1.classList.add('active');
        if (step2) step2.classList.remove('active');
        if (step3) step3.classList.remove('active');
      } else if (p < step2Cutoff) {
        if (step1) step1.classList.remove('active');
        if (step2) step2.classList.add('active');
        if (step3) step3.classList.remove('active');
      } else {
        if (step1) step1.classList.remove('active');
        if (step2) step2.classList.remove('active');
        if (step3) step3.classList.add('active');
      }

      // -----------------------------------------------------------------------
      // 2. HORIZONTAL PHONE TRAVEL: RIGHT SIDE -> LEFT SIDE ("pehle right, fir left")
      // -----------------------------------------------------------------------
      let colShiftX = 0;
      if (!isMobile && container) {
        // Desktop: Travel distance from center of Right column to center of Left column
        const containerWidth = container.offsetWidth;
        const travelDistance = containerWidth * 0.5;

        if (p <= 0.24) {
          // Step 1: Phone starts on the Right side
          colShiftX = 0;
        } else if (p <= 0.48) {
          // Transition 1 -> 2: Phone smoothly glides from Right side to Left side while flipping 180°
          const tGlide = smoothstep(0.24, 0.48, p);
          colShiftX = -travelDistance * tGlide;
        } else {
          // Step 2 & 3: Phone rests on the Left side (docking onto the desk stand in Step 3)
          colShiftX = -travelDistance;
        }
      } else {
        // Mobile View: Starts on Right (+shift) -> Glides across to Left (-shift) -> Docks onto center stand
        const screenW = window.innerWidth || 390;
        const mobileShift = Math.min(75, Math.max(55, screenW * 0.17));

        if (p <= 0.08) {
          // Step 1: Starts visibly shifted to the Right side
          colShiftX = mobileShift;
        } else if (p <= 0.42) {
          // Transition 1 -> 2: Smooth glide across from Right to Left while flipping 180°
          const tGlide = smoothstep(0.08, 0.42, p);
          colShiftX = mobileShift - (2 * mobileShift) * tGlide;
        } else if (p <= 0.65) {
          // Step 2: Phone rests proudly on the Left side
          colShiftX = -mobileShift;
        } else if (p <= 0.88) {
          // Transition 2 -> 3: Glides to center directly over the rising desk stand
          const tDock = smoothstep(0.65, 0.88, p);
          colShiftX = -mobileShift * (1 - tDock);
        } else {
          // Step 3: Firmly centered and resting in the cradle hooks of the desk stand
          colShiftX = 0;
        }
      }

      const tCol = `translate3d(${colShiftX.toFixed(1)}px, 0, 0)`;
      phoneColumn.style.transform = tCol;
      phoneColumn.style.webkitTransform = tCol;

      // -----------------------------------------------------------------------
      // 3. 3D REAL IPHONE ROTATIONS, FLIPS & HORIZONTAL DOCK ON MOBILE STAND ("TEDA")
      // -----------------------------------------------------------------------
      let curRotY = 0;
      let curZ = 0;
      let curRotZ = 0;
      let curRotX = 0;
      let curScale = 1.0;
      let dockY = 0;

      if (!isMobile) {
        // DESKTOP TIMINGS (100% PRESERVED AS TESTED AND PRAISED)
        if (p <= 0.24) {
          curRotY = 0;
          curZ = 0;
          curRotZ = 0;
          curRotX = -2.0;
          curScale = 1.0;

          if (deskStand) deskStand.classList.remove('visible');
          if (floatingPill) floatingPill.classList.remove('visible');
        } else if (p <= 0.48) {
          const t1 = smoothstep(0.24, 0.48, p);
          curRotY = 180 * t1;
          curZ = 65 * Math.sin(t1 * Math.PI);
          curRotZ = 0;
          curRotX = -2.0 + Math.sin(t1 * Math.PI) * -3.0;
          curScale = 1.0 + 0.04 * Math.sin(t1 * Math.PI);

          if (deskStand) deskStand.classList.remove('visible');
          if (floatingPill) floatingPill.classList.remove('visible');
        } else if (p <= 0.72) {
          curRotY = 180;
          curZ = 0;
          curRotZ = 0;
          curRotX = 0;
          curScale = 1.0;

          if (deskStand) deskStand.classList.remove('visible');
          if (floatingPill) floatingPill.classList.remove('visible');
        } else if (p <= 0.88) {
          const t3 = smoothstep(0.72, 0.88, p);
          curRotY = 180 - 6 * t3;
          curRotZ = -90 * t3;
          curRotX = -12 * t3;
          curZ = 24 * Math.sin(t3 * Math.PI);
          dockY = 62 * t3;
          curScale = 1.0 - 0.26 * t3;

          if (t3 > 0.25) {
            if (deskStand) deskStand.classList.add('visible');
            if (floatingPill) floatingPill.classList.add('visible');
          } else {
            if (deskStand) deskStand.classList.remove('visible');
            if (floatingPill) floatingPill.classList.remove('visible');
          }
        } else {
          curRotY = 174;
          curRotZ = -90;
          curRotX = -12;
          curZ = 0;
          dockY = 62;
          curScale = 0.74;

          if (deskStand) deskStand.classList.add('visible');
          if (floatingPill) floatingPill.classList.add('visible');
        }
      } else {
        // MOBILE TIMINGS (RESPONSIVE & IMMEDIATE TOUCH INTERACTION)
        if (p <= 0.08) {
          curRotY = 0;
          curZ = 0;
          curRotZ = 0;
          curRotX = -2.0;
          curScale = 1.0;

          if (deskStand) deskStand.classList.remove('visible');
          if (floatingPill) floatingPill.classList.remove('visible');
        } else if (p <= 0.42) {
          const t1 = smoothstep(0.08, 0.42, p);
          curRotY = 180 * t1;
          curZ = 35 * Math.sin(t1 * Math.PI);
          curRotZ = 0;
          curRotX = -2.0 + Math.sin(t1 * Math.PI) * -3.0;
          curScale = 1.0 + 0.04 * Math.sin(t1 * Math.PI);

          if (deskStand) deskStand.classList.remove('visible');
          if (floatingPill) floatingPill.classList.remove('visible');
        } else if (p <= 0.65) {
          curRotY = 180;
          curZ = 0;
          curRotZ = 0;
          curRotX = 0;
          curScale = 1.0;

          if (deskStand) deskStand.classList.remove('visible');
          if (floatingPill) floatingPill.classList.remove('visible');
        } else if (p <= 0.88) {
          const t3 = smoothstep(0.65, 0.88, p);
          curRotY = 180 - 6 * t3;
          curRotZ = -90 * t3; // 100% HORIZONTAL (Landscape - "teda")
          curRotX = -12 * t3;
          curZ = 12 * Math.sin(t3 * Math.PI);
          dockY = 46 * t3;
          curScale = 1.0 - 0.24 * t3;

          if (t3 > 0.25) {
            if (deskStand) deskStand.classList.add('visible');
            if (floatingPill) floatingPill.classList.add('visible');
          } else {
            if (deskStand) deskStand.classList.remove('visible');
            if (floatingPill) floatingPill.classList.remove('visible');
          }
        } else {
          curRotY = 174;
          curRotZ = -90; // 100% HORIZONTAL
          curRotX = -12;
          curZ = 0;
          dockY = 46;
          curScale = 0.76;

          if (deskStand) deskStand.classList.add('visible');
          if (floatingPill) floatingPill.classList.add('visible');
        }
      }

      // Subtle aerodynamic breathing wave (dampens to 0 when docked on stand so phone doesn't detach)
      const wave = (isMobile ? p < 0.65 : p < 0.72) ? Math.sin(p * Math.PI * 3.5) * (isMobile ? 2.5 : 5) : 0;
      const floatY = wave + dockY;

      // Apply 3D Transforms to phone element with WebKit prefix support
      const tPhone = `translate3d(0, ${floatY.toFixed(1)}px, ${curZ.toFixed(1)}px) scale(${curScale.toFixed(4)}) rotateX(${curRotX.toFixed(2)}deg) rotateZ(${curRotZ.toFixed(2)}deg)`;
      phone.style.transform = tPhone;
      phone.style.webkitTransform = tPhone;

      if (phone3D) {
        const t3D = `rotateY(${curRotY.toFixed(2)}deg)`;
        phone3D.style.transform = t3D;
        phone3D.style.webkitTransform = t3D;
      }

      // Cross-face visibility: ensures crisp rendering without backface flicker
      const normY = ((curRotY % 360) + 360) % 360;
      const isFrontFacing = normY > 90 && normY < 270;

      if (backFace && frontFace) {
        backFace.style.opacity = isFrontFacing ? '0' : '1';
        frontFace.style.opacity = isFrontFacing ? '1' : '0';
      }
    }

    requestAnimationFrame(renderLoop);
  }

  // Safe startup on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCinematicStoryMotion);
  } else {
    initCinematicStoryMotion();
  }
})();


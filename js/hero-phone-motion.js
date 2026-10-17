/**
 * MOBILE STATION — CINEMATIC STEP-BY-STEP FLAGSHIP SCROLL STORY
 * 
 * Features & Sequence:
 *   - Step 1 (0.00 -> 0.32): Hero Flagship Spotlight (Right Side)
 *     Left Zone: "iPhone 18 Pro Max" headline, specs, CTAs, scroll hint.
 *     Right Side: 100% Real Titanium iPhone in Portrait Rear View (0° Back).
 * 
 *   - Step 2 (0.33 -> 0.67): Dynamic Travel to Left + Super Retina Display
 *     The phone glides across from Right side to Left side while flipping 180° to Front View!
 *     Left Side: 100% Real iPhone Super Retina OLED Display with Dynamic Island & Lock Screen.
 *     Right Zone: "Brilliance at 3000 Nits. Pure Clarity." (Dynamic Island, 120Hz LTPO).
 *     *Zero text behind the phone! Text is on the right, phone is on the left!*
 * 
 *   - Step 3 (0.68 -> 1.00): Smartphone Desktop Stand ("Vo Rakhne Vala")
 *     Left Side: Authentic aluminum desk phone holder rises behind and under the iPhone.
 *     The REAL iPhone rests gracefully in the stand's cradle hooks with an authentic 3D desk tilt angle.
 *     Floating action pill appears below the stand.
 *     Right Zone: "Always-On StandBy. Studio Precision." specs & CTAs.
 * 
 *   - Fluid 60/120 FPS bidirectional lerp on scroll up & down.
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

    // Accessibility check
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (step1) step1.classList.add('active');
      return;
    }

    function getScrollTop() {
      return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || window.scrollY || 0;
    }

    // Measure scroll progress within the story section
    let targetProgress = 0;
    let smoothProgress = 0;

    function updateProgress() {
      const rect = story.getBoundingClientRect();
      const scrollY = getScrollTop();
      const storyTop = scrollY + rect.top;
      const storyScrollable = story.offsetHeight - window.innerHeight;
      const raw = (scrollY - storyTop) / Math.max(1, storyScrollable);
      targetProgress = Math.max(0, Math.min(1.0, raw));
    }

    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('touchmove', updateProgress, { passive: true });
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
      // Controlled cinematic lerp speed
      const lerpSpeed = isMobile ? 0.085 : 0.075;
      // Maximum advance per frame so fast scrolling stays visibly smooth ("fast scroll kar rahe na to bhi slow hi ho")
      const maxDelta = isMobile ? 0.022 : 0.020;
      const step = Math.sign(diff) * Math.min(Math.abs(diff * lerpSpeed), maxDelta);
      smoothProgress += step;
      const p = smoothProgress;

      // -----------------------------------------------------------------------
      // 1. STEP-BY-STEP TEXT SLIDE ACTIVATION (GENEROUS VISIBLE DWELL TIME)
      // -----------------------------------------------------------------------
      if (p < 0.28) {
        // Step 1: Active in Left Zone (Titanium Rear View Spotlight on Right)
        if (step1) step1.classList.add('active');
        if (step2) step2.classList.remove('active');
        if (step3) step3.classList.remove('active');
      } else if (p < 0.72) {
        // Step 2: Active in Right Zone (Super Retina Display with Dynamic Island on Left)
        if (step1) step1.classList.remove('active');
        if (step2) step2.classList.add('active');
        if (step3) step3.classList.remove('active');
      } else {
        // Step 3: Active in Right Zone (StandBy Landscape on Desk Stand on Left)
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

        if (p <= 0.24) {
          // Step 1: Phone starts on the Right side
          colShiftX = mobileShift;
        } else if (p <= 0.48) {
          // Transition 1 -> 2: Smooth glide from Right side to Left side while flipping 180°
          const tGlide = smoothstep(0.24, 0.48, p);
          colShiftX = mobileShift - (2 * mobileShift) * tGlide;
        } else if (p <= 0.72) {
          // Step 2: Phone rests on the Left side
          colShiftX = -mobileShift;
        } else if (p <= 0.88) {
          // Transition 2 -> 3: Glides to center directly over the rising desk stand
          const tDock = smoothstep(0.72, 0.88, p);
          colShiftX = -mobileShift * (1 - tDock);
        } else {
          // Step 3: Firmly centered and resting in the cradle hooks of the desk stand
          colShiftX = 0;
        }
      }

      phoneColumn.style.transform = `translate3d(${colShiftX.toFixed(1)}px, 0, 0)`;

      // -----------------------------------------------------------------------
      // 3. 3D REAL IPHONE ROTATIONS, FLIPS & HORIZONTAL DOCK ON MOBILE STAND ("TEDA")
      // -----------------------------------------------------------------------
      let curRotY = 0;
      let curZ = 0;
      let curRotZ = 0;
      let curRotX = 0;
      let curScale = 1.0;
      let dockY = 0;

      if (p <= 0.24) {
        // Step 1: 100% Real Titanium iPhone Rear View (0° Back) on Right side (Portrait / Vertical)
        curRotY = 0;
        curZ = 0;
        curRotZ = 0;
        curRotX = -2.0;
        curScale = 1.0;

        if (deskStand) deskStand.classList.remove('visible');
        if (floatingPill) floatingPill.classList.remove('visible');
      } else if (p <= 0.48) {
        // Transition 1 -> 2: 180° Flip to Real Front Display + Glides Right to Left (Portrait / Vertical)
        const t1 = smoothstep(0.24, 0.48, p);
        curRotY = 180 * t1;
        curZ = (isMobile ? 35 : 65) * Math.sin(t1 * Math.PI);
        curRotZ = 0;
        curRotX = -2.0 + Math.sin(t1 * Math.PI) * -3.0;
        curScale = 1.0 + 0.04 * Math.sin(t1 * Math.PI);

        if (deskStand) deskStand.classList.remove('visible');
        if (floatingPill) floatingPill.classList.remove('visible');
      } else if (p <= 0.72) {
        // Step 2: Real iPhone Super Retina OLED Display with Dynamic Island on Left (Portrait / Vertical)
        curRotY = 180;
        curZ = 0;
        curRotZ = 0;
        curRotX = 0;
        curScale = 1.0;

        if (deskStand) deskStand.classList.remove('visible');
        if (floatingPill) floatingPill.classList.remove('visible');
      } else if (p <= 0.88) {
        // Transition 2 -> 3: Phone rotates from Vertical (0°) to HORIZONTAL (-90°) & docks onto Desk Stand!
        const t3 = smoothstep(0.72, 0.88, p);
        curRotY = 180 - 6 * t3; // Gentle 3D perspective angle
        curRotZ = -90 * t3; // Smooth 90° roll into pure HORIZONTAL / LANDSCAPE mode!
        curRotX = -12 * t3; // Authentic 3D desk stand tilt
        curZ = (isMobile ? 12 : 24) * Math.sin(t3 * Math.PI);
        dockY = (isMobile ? 46 : 62) * t3; // Lowers phone into the cradle hooks!
        curScale = 1.0 - (isMobile ? 0.24 : 0.26) * t3; // Compact scale so landscape fits beautifully

        if (t3 > 0.25) {
          if (deskStand) deskStand.classList.add('visible');
          if (floatingPill) floatingPill.classList.add('visible');
        } else {
          if (deskStand) deskStand.classList.remove('visible');
          if (floatingPill) floatingPill.classList.remove('visible');
        }
      } else {
        // Step 3: Real iPhone resting 100% HORIZONTALLY ("teda") in StandBy Mode on Desk Stand!
        curRotY = 174;
        curRotZ = -90; // 100% HORIZONTAL (Landscape) matching user instruction!
        curRotX = -12; // 3D Desk Tilt
        curZ = 0;
        dockY = isMobile ? 46 : 62; // Securely seated inside the cradle hooks!
        curScale = isMobile ? 0.76 : 0.74;

        if (deskStand) deskStand.classList.add('visible');
        if (floatingPill) floatingPill.classList.add('visible');
      }

      // Subtle aerodynamic breathing wave (dampens to 0 when docked on stand so phone doesn't detach)
      const wave = p < 0.72 ? Math.sin(p * Math.PI * 3.5) * (isMobile ? 2.5 : 5) : 0;
      const floatY = wave + dockY;

      // Apply 3D Transforms to phone element
      phone.style.transform = `translate3d(0, ${floatY.toFixed(1)}px, ${curZ.toFixed(1)}px) scale(${curScale.toFixed(4)}) rotateX(${curRotX.toFixed(2)}deg) rotateZ(${curRotZ.toFixed(2)}deg)`;

      if (phone3D) {
        phone3D.style.transform = `rotateY(${curRotY.toFixed(2)}deg)`;
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

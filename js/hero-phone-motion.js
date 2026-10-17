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
    const standbyScreen = document.getElementById('standbyLandscapeScreen');

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
      const lerpSpeed = isMobile ? 0.14 : 0.11;
      smoothProgress += (targetProgress - smoothProgress) * lerpSpeed;
      const p = smoothProgress;

      // -----------------------------------------------------------------------
      // 1. STEP-BY-STEP TEXT SLIDE ACTIVATION (NO OVERLAP)
      // -----------------------------------------------------------------------
      if (p < 0.32) {
        // Step 1: Active in Left Zone
        if (step1) step1.classList.add('active');
        if (step2) step2.classList.remove('active');
        if (step3) step3.classList.remove('active');
      } else if (p < 0.68) {
        // Step 2: Active in Right Zone
        if (step1) step1.classList.remove('active');
        if (step2) step2.classList.add('active');
        if (step3) step3.classList.remove('active');
      } else {
        // Step 3: Active in Right Zone
        if (step1) step1.classList.remove('active');
        if (step2) step2.classList.remove('active');
        if (step3) step3.classList.add('active');
      }

      // -----------------------------------------------------------------------
      // 2. HORIZONTAL PHONE TRAVEL: RIGHT SIDE -> LEFT SIDE ("phle right, fir left")
      // -----------------------------------------------------------------------
      let colShiftX = 0;
      if (!isMobile && container) {
        const containerWidth = container.offsetWidth;
        // Travel distance from center of Right column to center of Left column
        const travelDistance = containerWidth * 0.5;

        if (p <= 0.22) {
          // Step 1: Phone starts on the Right side
          colShiftX = 0;
        } else if (p <= 0.44) {
          // Transition 1 -> 2: Phone smoothly glides from Right side to Left side
          const tGlide = smoothstep(0.22, 0.44, p);
          colShiftX = -travelDistance * tGlide;
        } else {
          // Step 2 & 3: Phone rests on the Left side
          colShiftX = -travelDistance;
        }

        phoneColumn.style.transform = `translate3d(${colShiftX.toFixed(1)}px, 0, 0)`;
      } else {
        // Mobile View: Synchronized Right-to-Left motion & Center Stand Docking (scaled for compact phone)
        const screenW = window.innerWidth || 390;
        const mobileTravel = Math.min(24, Math.max(14, (screenW - 150) * 0.16));

        if (p <= 0.22) {
          // Step 1: Phone starts gracefully on the Right (+shift)
          colShiftX = mobileTravel;
        } else if (p <= 0.44) {
          // Transition 1 -> 2: Glides Right (+shift) to Left (-shift) while flipping 180°
          const tGlide = smoothstep(0.22, 0.44, p);
          colShiftX = mobileTravel - (2 * mobileTravel) * tGlide;
        } else if (p <= 0.68) {
          // Step 2: Phone rests on the Left (-shift)
          colShiftX = -mobileTravel;
        } else if (p <= 0.88) {
          // Transition 2 -> 3: Glides back to center as the mobile desk stand rises
          const tDock = smoothstep(0.68, 0.88, p);
          colShiftX = -mobileTravel * (1 - tDock);
        } else {
          // Step 3: Phone perfectly centered and resting on the mobile desk stand
          colShiftX = 0;
        }

        phoneColumn.style.transform = `translate3d(${colShiftX.toFixed(1)}px, 0, 0)`;
      }

      // -----------------------------------------------------------------------
      // 3. 3D REAL IPHONE ROTATIONS, FLIPS & TEDA STANDBY DOCK ON MOBILE STAND
      // -----------------------------------------------------------------------
      let curRotY = 0;
      let curZ = 0;
      let curRotZ = 0;
      let curRotX = 0;
      let curScale = 1.0;
      let dockY = 0;

      if (p <= 0.22) {
        // Step 1: 100% Real Titanium iPhone Rear View (0° Back) on Right side
        curRotY = 0;
        curZ = 0;
        curRotZ = 0;
        curRotX = -2.0;
        curScale = 1.0;

        if (standbyScreen) standbyScreen.style.opacity = '0';
        if (deskStand) deskStand.classList.remove('visible');
        if (floatingPill) floatingPill.classList.remove('visible');
      } else if (p <= 0.44) {
        // Transition 1 -> 2: 180° Flip to Real Front Display + Glides Right to Left
        const t1 = smoothstep(0.22, 0.44, p);
        curRotY = 180 * t1;
        curZ = (isMobile ? 45 : 75) * Math.sin(t1 * Math.PI);
        curRotZ = Math.sin(t1 * Math.PI) * (isMobile ? 4.0 : 6.0);
        curRotX = -2.0 + Math.sin(t1 * Math.PI) * -3.0;
        curScale = 1.0 + 0.05 * Math.sin(t1 * Math.PI);

        if (standbyScreen) standbyScreen.style.opacity = '0';
        if (deskStand) deskStand.classList.remove('visible');
        if (floatingPill) floatingPill.classList.remove('visible');
      } else if (p <= 0.68) {
        // Step 2: Real iPhone Super Retina OLED Display with Dynamic Island on Left (Portrait)
        curRotY = 180;
        curZ = 0;
        curRotZ = 0;
        curRotX = 0;
        curScale = 1.0;

        if (standbyScreen) standbyScreen.style.opacity = '0';
        if (deskStand) deskStand.classList.remove('visible');
        if (floatingPill) floatingPill.classList.remove('visible');
      } else if (p <= 0.88) {
        // Transition 2 -> 3: Phone rotates into Landscape ("teda") & docks onto Desk Stand!
        const t3 = smoothstep(0.68, 0.88, p);
        curRotY = 180 - 4 * t3;
        curRotZ = -90 * t3; // Rotates smoothly from 0° (portrait) to -90° (landscape / "teda")
        curRotX = -12 * t3; // Authentic 3D desk stand tilt
        curZ = (isMobile ? 10 : 25) * Math.sin(t3 * Math.PI);
        dockY = (isMobile ? 8 : 22) * t3;
        curScale = isMobile ? (1.0 - 0.08 * t3) : (1.0 - 0.05 * t3);

        // Fade in StandBy landscape OLED screen and show stand
        if (standbyScreen) {
          standbyScreen.style.opacity = t3 > 0.35 ? ((t3 - 0.35) / 0.65).toFixed(3) : '0';
        }
        if (t3 > 0.3) {
          if (deskStand) deskStand.classList.add('visible');
          if (floatingPill) floatingPill.classList.add('visible');
        } else {
          if (deskStand) deskStand.classList.remove('visible');
          if (floatingPill) floatingPill.classList.remove('visible');
        }
      } else {
        // Step 3: Real iPhone resting horizontally ("teda") in StandBy Mode on Desk Stand (Reference Match!)
        curRotY = 176;
        curRotZ = -90; // Landscape ("teda")!
        curRotX = -12; // 3D Desk Tilt
        curZ = 0;
        dockY = isMobile ? 8 : 22;
        curScale = isMobile ? 0.92 : 0.95;

        if (standbyScreen) standbyScreen.style.opacity = '1';
        if (deskStand) deskStand.classList.add('visible');
        if (floatingPill) floatingPill.classList.add('visible');
      }

      // Subtle aerodynamic breathing wave
      const floatY = Math.sin(p * Math.PI * 3.5) * (isMobile ? 2.5 : 6) + dockY;

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

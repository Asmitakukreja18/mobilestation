/**
 * MOBILE STATION — CINEMATIC STEP-BY-STEP FLAGSHIP SCROLL STORY
 * 
 * Inspired by Flowty / Apple product showcase references:
 *   - Step 1 (0.00 -> 0.32): Hero Flagship Intro
 *     Left: "iPhone 18 Pro Max" headline + CTAs.
 *     Right: 3D Phone in Titanium Rear View (0° Back).
 *   - Step 2 (0.33 -> 0.67): Super Retina XDR OLED & Dynamic Island
 *     Left: "Brilliance at 3000 Nits. Pure Clarity."
 *     Right: Phone flips 180° to Front View (Sidha) showing Dynamic Island & Lock Screen.
 *     *Text is on left, Phone is on right — ZERO text behind the phone!*
 *   - Step 3 (0.68 -> 1.00): Aerospace Titanium & 200MP Optics
 *     Left: "Forged in Titanium. Studio Precision."
 *     Right: Phone flips 180° -> 360° back to Titanium Rear View with 3D banking roll.
 *   - End of Story:
 *     Page flows directly into Showroom Flagship Catalog (#flagships).
 *     Phone does NOT wander into the footer or header.
 */

(function () {
  'use strict';

  function initCinematicStoryMotion() {
    const story = document.querySelector('.hero-scroll-story');
    const phone = document.getElementById('heroPhoneArt');
    const phone3D = document.getElementById('heroPhone3D');
    const backFace = document.getElementById('phoneBackFace');
    const frontFace = document.getElementById('phoneFrontFace');

    const step1 = document.getElementById('storyStep1');
    const step2 = document.getElementById('storyStep2');
    const step3 = document.getElementById('storyStep3');

    if (!story || !phone) return;

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
        // Step 1: Hero Flagship Intro
        if (step1) step1.classList.add('active');
        if (step2) step2.classList.remove('active');
        if (step3) step3.classList.remove('active');
      } else if (p < 0.68) {
        // Step 2: Super Retina & Dynamic Island
        if (step1) step1.classList.remove('active');
        if (step2) step2.classList.add('active');
        if (step3) step3.classList.remove('active');
      } else {
        // Step 3: Aerospace Titanium & Optics
        if (step1) step1.classList.remove('active');
        if (step2) step2.classList.remove('active');
        if (step3) step3.classList.add('active');
      }

      // -----------------------------------------------------------------------
      // 2. 3D PHONE DUAL-FACE ROTATIONS & FLIPS
      // -----------------------------------------------------------------------
      let curRotY = 0;
      let curZ = 0;
      let curRotZ = 0;
      let curRotX = 0;
      let curScale = 1.0;

      if (p <= 0.22) {
        // Step 1: Titanium Rear View (0° Back)
        curRotY = 0;
        curZ = 0;
        curRotZ = 0;
        curRotX = -2.0;
      } else if (p <= 0.44) {
        // Transition 1 -> 2: 180° Flip to Sidha / Front Super Retina Display
        const t1 = smoothstep(0.22, 0.44, p);
        curRotY = 180 * t1;
        curZ = (isMobile ? 45 : 70) * Math.sin(t1 * Math.PI);
        curRotZ = Math.sin(t1 * Math.PI) * (isMobile ? 5.5 : 8.0);
        curRotX = -2.0 + Math.sin(t1 * Math.PI) * -3.0;
        curScale = 1.0 + 0.06 * Math.sin(t1 * Math.PI);
      } else if (p <= 0.68) {
        // Step 2: Holds Front View (180° Sidha) with Dynamic Island & Screen
        curRotY = 180;
        curZ = 0;
        curRotZ = 0;
        curRotX = 0;
      } else if (p <= 0.88) {
        // Transition 2 -> 3: 180° Flip back to Titanium Rear View (360°)
        const t2 = smoothstep(0.68, 0.88, p);
        curRotY = 180 + 180 * t2;
        curZ = (isMobile ? 45 : 70) * Math.sin(t2 * Math.PI);
        curRotZ = Math.sin(t2 * Math.PI) * (isMobile ? -5.5 : -8.0);
        curRotX = Math.sin(t2 * Math.PI) * -3.0;
        curScale = 1.0 + 0.06 * Math.sin(t2 * Math.PI);
      } else {
        // Step 3: Holds Titanium Rear View (360°) into Showroom Transition
        curRotY = 360;
        curZ = 0;
        curRotZ = 0;
        curRotX = -2.0;
      }

      // Subtle aerodynamic breathing wave
      const floatY = Math.sin(p * Math.PI * 3.5) * (isMobile ? 6 : 10);

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

/**
 * MOBILE STATION — CINEMATIC STEP-BY-STEP FLAGSHIP SCROLL STORY
 * 
 * Features & Sequence:
 *   - Step 1: Hero Flagship Spotlight (Right Side)
 *     Left Zone: "iPhone 18 Pro Max" headline, specs, CTAs, scroll hint.
 *     Right Side: 100% Real Titanium iPhone in Portrait Rear View (0° Back).
 * 
 *   - Clean Gap 1 ("Bich m khali jagah taki animation dikhe"):
 *     Text fades out first. The screen is clean.
 *     Phone glides from Right to Left while flipping 180° in full 3D isolation!
 * 
 *   - Step 2: Super Retina Display (Left Side)
 *     Phone arrives on Left, THEN Step 2 text smoothly fades in:
 *     "Brilliance at 3000 Nits. Pure Clarity." (Dynamic Island, 120Hz LTPO).
 * 
 *   - Clean Gap 2 ("Phle mobile stand par aayegi"):
 *     Step 2 text fades out. The screen is clean.
 *     Aluminum desk stand rises, phone glides to center, rotates to 100% HORIZONTAL (Landscape - "teda"),
 *     and seats firmly inside the cradle hooks!
 * 
 *   - Step 3: StandBy Showcase (Docked on Stand)
 *     Phone is docked horizontal, THEN Step 3 text smoothly fades in:
 *     "Always-On StandBy. Studio Precision."
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

    function setMobileSlide(slide, opacity, translateY) {
      if (!slide) return;
      const isVis = opacity > 0.02;
      slide.style.setProperty('opacity', opacity.toFixed(3), 'important');
      slide.style.setProperty('transform', `translateY(${translateY.toFixed(1)}px)`, 'important');
      slide.style.setProperty('-webkit-transform', `translateY(${translateY.toFixed(1)}px)`, 'important');
      slide.style.setProperty('visibility', isVis ? 'visible' : 'hidden', 'important');
      slide.style.setProperty('pointer-events', isVis ? 'auto' : 'none', 'important');
      if (isVis) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    }

    function clearMobileSlideStyles(slide) {
      if (!slide) return;
      slide.style.removeProperty('opacity');
      slide.style.removeProperty('transform');
      slide.style.removeProperty('-webkit-transform');
      slide.style.removeProperty('visibility');
      slide.style.removeProperty('pointer-events');
    }

    // 60/120 FPS Fluid Render Loop
    function renderLoop() {
      requestAnimationFrame(renderLoop);

      updateProgress();

      const isMobile = window.innerWidth < 768;
      const diff = targetProgress - smoothProgress;

      // Controlled cinematic lerp speed:
      // Desktop: slow, buttery-smooth mouse wheel glide
      // Mobile: responsive touch tracking so swipes feel alive immediately
      const lerpSpeed = isMobile ? 0.15 : 0.075;
      const maxDelta = isMobile ? 0.045 : 0.020;
      const step = Math.sign(diff) * Math.min(Math.abs(diff * lerpSpeed), maxDelta);
      smoothProgress += step;
      const p = smoothProgress;

      // -----------------------------------------------------------------------
      // 1. STEP-BY-STEP TEXT CHOREOGRAPHY WITH EMPTY BREATHING GAPS
      // -----------------------------------------------------------------------
      if (isMobile) {
        // Mobile: Text fades out first -> Clean empty gap for phone motion -> New text fades in gently
        let s1Op = 0, s1Y = 0;
        let s2Op = 0, s2Y = 0;
        let s3Op = 0, s3Y = 0;

        // Step 1: Visible initially, smoothly dissolves before phone begins its 3D travel
        if (p <= 0.12) {
          s1Op = 1.0;
          s1Y = 0;
        } else if (p <= 0.20) {
          const t = smoothstep(0.12, 0.20, p);
          s1Op = 1.0 - t;
          s1Y = -12 * t;
        } else {
          s1Op = 0;
          s1Y = -12;
        }

        // Step 2: Remains 100% GONE during phone travel & flip (0.20 -> 0.50)!
        // Only fades in gently AFTER the phone settles on the Left side!
        if (p < 0.50) {
          s2Op = 0;
          s2Y = 12;
        } else if (p <= 0.58) {
          const t = smoothstep(0.50, 0.58, p);
          s2Op = t;
          s2Y = 12 * (1 - t);
        } else if (p <= 0.66) {
          s2Op = 1.0;
          s2Y = 0;
        } else if (p <= 0.74) {
          const t = smoothstep(0.66, 0.74, p);
          s2Op = 1.0 - t;
          s2Y = -12 * t;
        } else {
          s2Op = 0;
          s2Y = -12;
        }

        // Step 3: Remains 100% GONE during stand docking & horizontal turn (0.74 -> 0.86)!
        // Only fades in gently AFTER phone is firmly seated in the cradle hooks!
        if (p < 0.86) {
          s3Op = 0;
          s3Y = 12;
        } else if (p <= 0.94) {
          const t = smoothstep(0.86, 0.94, p);
          s3Op = t;
          s3Y = 12 * (1 - t);
        } else {
          s3Op = 1.0;
          s3Y = 0;
        }

        setMobileSlide(step1, s1Op, s1Y);
        setMobileSlide(step2, s2Op, s2Y);
        setMobileSlide(step3, s3Op, s3Y);
      } else {
        // Desktop: 100% Preserved original class-based presentation
        clearMobileSlideStyles(step1);
        clearMobileSlideStyles(step2);
        clearMobileSlideStyles(step3);

        if (p < 0.28) {
          if (step1) step1.classList.add('active');
          if (step2) step2.classList.remove('active');
          if (step3) step3.classList.remove('active');
        } else if (p < 0.72) {
          if (step1) step1.classList.remove('active');
          if (step2) step2.classList.add('active');
          if (step3) step3.classList.remove('active');
        } else {
          if (step1) step1.classList.remove('active');
          if (step2) step2.classList.remove('active');
          if (step3) step3.classList.add('active');
        }
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
          colShiftX = 0;
        } else if (p <= 0.48) {
          const tGlide = smoothstep(0.24, 0.48, p);
          colShiftX = -travelDistance * tGlide;
        } else {
          colShiftX = -travelDistance;
        }
      } else {
        // Mobile View: Starts on Right (+shift) -> Glides across to Left (-shift) -> Docks onto center stand
        const screenW = window.innerWidth || 390;
        const mobileShift = Math.min(75, Math.max(55, screenW * 0.17));

        if (p <= 0.18) {
          // Starts on the Right side
          colShiftX = mobileShift;
        } else if (p <= 0.48) {
          // Travel across from Right to Left during the clean empty gap
          const tGlide = smoothstep(0.18, 0.48, p);
          colShiftX = mobileShift - (2 * mobileShift) * tGlide;
        } else if (p <= 0.72) {
          // Rests proudly on the Left side
          colShiftX = -mobileShift;
        } else if (p <= 0.86) {
          // Glides to center onto the stand during clean empty gap 2
          const tDock = smoothstep(0.72, 0.86, p);
          colShiftX = -mobileShift * (1 - tDock);
        } else {
          // Centered directly over the desk stand
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
        // MOBILE TIMINGS WITH ISOLATED 3D ANIMATION GAPS
        if (p <= 0.18) {
          curRotY = 0;
          curZ = 0;
          curRotZ = 0;
          curRotX = -2.0;
          curScale = 1.0;
          dockY = 0;

          if (deskStand) deskStand.classList.remove('visible');
          if (floatingPill) floatingPill.classList.remove('visible');
        } else if (p <= 0.48) {
          // Full 180° flip & 3D glide in the isolated empty gap!
          const t1 = smoothstep(0.18, 0.48, p);
          curRotY = 180 * t1;
          curZ = 35 * Math.sin(t1 * Math.PI);
          curRotZ = 0;
          curRotX = -2.0 + Math.sin(t1 * Math.PI) * -3.0;
          curScale = 1.0 + 0.04 * Math.sin(t1 * Math.PI);
          dockY = 0;

          if (deskStand) deskStand.classList.remove('visible');
          if (floatingPill) floatingPill.classList.remove('visible');
        } else if (p <= 0.72) {
          // Resting on Left: Super Retina Front Display
          curRotY = 180;
          curZ = 0;
          curRotZ = 0;
          curRotX = 0;
          curScale = 1.0;
          dockY = 0;

          if (deskStand) deskStand.classList.remove('visible');
          if (floatingPill) floatingPill.classList.remove('visible');
        } else if (p <= 0.86) {
          // Horizontal docking onto Stand in the second isolated gap!
          const t3 = smoothstep(0.72, 0.86, p);
          curRotY = 180 - 6 * t3;
          curRotZ = -90 * t3; // 100% HORIZONTAL (Landscape - "teda")!
          curRotX = -12 * t3; // Authentic 3D desk tilt
          curZ = 12 * Math.sin(t3 * Math.PI);
          dockY = 88 * t3; // Lowers into cradle hooks
          curScale = 1.0 - 0.24 * t3;

          if (t3 > 0.15) {
            if (deskStand) deskStand.classList.add('visible');
          } else {
            if (deskStand) deskStand.classList.remove('visible');
          }
          if (t3 > 0.85) {
            if (floatingPill) floatingPill.classList.add('visible');
          } else {
            if (floatingPill) floatingPill.classList.remove('visible');
          }
        } else {
          // Docked firmly on the Stand in StandBy Mode!
          curRotY = 174;
          curRotZ = -90; // 100% HORIZONTAL
          curRotX = -12;
          curZ = 0;
          dockY = 88;
          curScale = 0.76;

          if (deskStand) deskStand.classList.add('visible');
          if (floatingPill) floatingPill.classList.add('visible');
        }
      }

      // Subtle aerodynamic breathing wave (dampens to 0 when docked on stand so phone doesn't detach)
      const wave = (isMobile ? p < 0.72 : p < 0.72) ? Math.sin(p * Math.PI * 3.5) * (isMobile ? 2.5 : 5) : 0;
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


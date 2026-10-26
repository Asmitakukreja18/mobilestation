/**
 * MOBILE STATION — LUXURY 3D PRODUCT STORY MOTION ENGINE
 * 
 * Sequence of the 5 Acts (Desktop + Mobile Adapted):
 *   Act 1: Titanium Hero Spotlight (Rear View)
 *     - Editorial: Step 1 ("iPhone 18 Pro Max Titanium")
 *     - Phone: Real Grade-5 Titanium Rear View in portrait spotlight.
 * 
 *   Act 2: 180° Flip to Super Retina Display (Front View)
 *     - Clean Gap 1: Text dissolves -> Phone flips 180° in 3D across to Left side.
 *     - Editorial: Step 2 ("Brilliance at 3000 Nits. Pure Clarity.")
 * 
 *   Act 3: StandBy Docking on Mobile Desk Stand ("Teda" / 100% Horizontal)
 *     - Clean Gap 2: Stand rises, phone rotates to landscape (-90°), seats firmly inside cradle hooks.
 *     - Editorial: Step 3 ("Always-On StandBy. Studio Precision.")
 * 
 *   Act 4: 3D Exploded / Deconstructed Architecture View
 *     - Phone lifts, explodes into 4 layers in 3D space:
 *       1. Front Ceramic Shield Glass Display
 *       2. 200MP Studio Periscope Optics with Sapphire Crystal
 *       3. 2nm Flagship Silicon Die (A19 Pro & Snapdragon 8 Elite)
 *       4. Grade-5 Aerospace Titanium Chassis
 *     - Component micro-pins float with glowing pulse dots.
 *     - Editorial: Step 4 ("2nm Silicon. Studio Optics.")
 * 
 *   Act 5: Magnetic Snap-Back & 3-Flagship Trio Fan-Out
 *     - Layers magnetically snap back with a radiant luminous flash!
 *     - 3 Ultra-Flagships fan out side-by-side:
 *       Left: Samsung Galaxy S26 Ultra (Cobalt Blue / Titanium Armor)
 *       Center: Apple iPhone 18 Pro Max (Titanium Silver)
 *       Right: OnePlus 15 (Emerald Forest / Hasselblad)
 *     - Editorial: Step 5 ("Apple. Samsung. OnePlus. The 2026 Flagship Trio")
 * 
 * Interactive Feature:
 *   - Real-time Metallic Light Streak reflecting across phone curves tracking cursor/touch.
 */

(function () {
  'use strict';

  function initLuxuryStoryMotion() {
    const story = document.querySelector('.hero-scroll-story');
    const container = document.querySelector('.story-layout-container');
    const phoneColumn = document.getElementById('storyPhoneColumn');
    const phone = document.getElementById('heroPhoneArt');
    const phone3D = document.getElementById('heroPhone3D');
    const backFace = document.getElementById('phoneBackFace');
    const frontFace = document.getElementById('phoneFrontFace');
    const deskStand = document.getElementById('magsafeDeskStand');
    const floatingPill = document.getElementById('standbyFloatingPill');
    const lightStreak = document.getElementById('metallicLightStreak');

    // Exploded Architecture elements
    const explodedAssembly = document.getElementById('phoneExplodedAssembly');
    const layerGlass = document.getElementById('layerFrontGlass');
    const layerCamera = document.getElementById('layerCameraModule');
    const layerChip = document.getElementById('layerChipSilicon');
    const layerChassis = document.getElementById('layerTitaniumChassis');
    const snapFlash = document.getElementById('magneticSnapFlash');

    // Trio Fan-out elements
    const trioStack = document.getElementById('trioCompanionStack');
    const companionSamsung = document.getElementById('companionSamsung');
    const companionOnePlus = document.getElementById('companionOnePlus');

    // 5 Story Editorial Steps
    const step1 = document.getElementById('storyStep1');
    const step2 = document.getElementById('storyStep2');
    const step3 = document.getElementById('storyStep3');
    const step4 = document.getElementById('storyStep4');
    const step5 = document.getElementById('storyStep5');
    const allSteps = [step1, step2, step3, step4, step5];

    // Micro Progress Chapter Indicator
    const indicatorBar = document.getElementById('indicatorBar');
    const chapterLabels = document.querySelectorAll('.chapter-label');

    if (!story || !phone || !phoneColumn) return;

    // Track scroll progress within sticky section bounds
    let targetProgress = 0;
    let smoothProgress = 0;

    function updateProgress() {
      const rect = story.getBoundingClientRect();
      const isMobile = window.innerWidth < 768;
      const stickyTop = isMobile ? 72 : 76;
      const viewportH = window.innerHeight || document.documentElement.clientHeight || 800;
      const storyScrollable = story.offsetHeight - viewportH;
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

    // Helper: Apply explicit styles to mobile editorial slides without overlap
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

    // Helper: Set desktop slide state with smooth transitions
    function setDesktopSlide(slide, opacity, translateY) {
      if (!slide) return;
      const isVis = opacity > 0.02;
      slide.style.opacity = opacity.toFixed(3);
      slide.style.transform = `translateY(-50%) translateY(${translateY.toFixed(1)}px)`;
      slide.style.webkitTransform = `translateY(-50%) translateY(${translateY.toFixed(1)}px)`;
      slide.style.visibility = isVis ? 'visible' : 'hidden';
      slide.style.pointerEvents = isVis ? 'auto' : 'none';
      if (isVis) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    }

    // Interactive Metallic Light Sweep Pointer Tracking
    let targetSweepX = 45;
    let targetSweepY = 35;
    let currentSweepX = 45;
    let currentSweepY = 35;
    let isPointerActive = false;
    let sweepIdleTime = 0;

    function handlePointerCoord(clientX, clientY) {
      if (!phone) return;
      const rect = phone.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        const relX = ((clientX - rect.left) / rect.width) * 100;
        const relY = ((clientY - rect.top) / rect.height) * 100;
        targetSweepX = Math.max(5, Math.min(95, relX));
        targetSweepY = Math.max(5, Math.min(95, relY));
        isPointerActive = true;
        sweepIdleTime = 0;
      }
    }

    window.addEventListener('pointermove', function (e) {
      handlePointerCoord(e.clientX, e.clientY);
    }, { passive: true });

    window.addEventListener('touchmove', function (e) {
      if (e.touches && e.touches[0]) {
        handlePointerCoord(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    // 60/120 FPS Fluid Motion Loop
    function renderLoop() {
      requestAnimationFrame(renderLoop);

      updateProgress();

      const isMobile = window.innerWidth < 768;
      const diff = targetProgress - smoothProgress;

      // Responsive cinematic lerp speed
      const lerpSpeed = isMobile ? 0.16 : 0.085;
      const maxDelta = isMobile ? 0.045 : 0.022;
      const step = Math.sign(diff) * Math.min(Math.abs(diff * lerpSpeed), maxDelta);
      smoothProgress += step;
      const p = smoothProgress;

      // Dynamic Metallic Light Streak update
      if (!isPointerActive || sweepIdleTime > 90) {
        // Subtle ambient drifting sheen when idle
        const drift = Math.sin(Date.now() * 0.0015);
        targetSweepX = 45 + drift * 25;
        targetSweepY = 35 + Math.cos(Date.now() * 0.0012) * 15;
      } else {
        sweepIdleTime++;
      }
      currentSweepX += (targetSweepX - currentSweepX) * 0.12;
      currentSweepY += (targetSweepY - currentSweepY) * 0.12;

      if (lightStreak) {
        lightStreak.style.setProperty('--sweep-x', `${currentSweepX.toFixed(1)}%`);
        lightStreak.style.setProperty('--sweep-y', `${currentSweepY.toFixed(1)}%`);
      }

      // -----------------------------------------------------------------------
      // 1. STEP-BY-STEP EDITORIAL CHOREOGRAPHY (5 DISTINCT ACTS WITH EMPTY GAPS)
      // -----------------------------------------------------------------------
      let s1Op = 0, s1Y = 0;
      let s2Op = 0, s2Y = 0;
      let s3Op = 0, s3Y = 0;
      let s4Op = 0, s4Y = 0;
      let s5Op = 0, s5Y = 0;

      // Step 1: Titanium Rear Spotlight (0.00 -> 0.16)
      if (p <= 0.10) {
        s1Op = 1.0;
        s1Y = 0;
      } else if (p <= 0.16) {
        const t = smoothstep(0.10, 0.16, p);
        s1Op = 1.0 - t;
        s1Y = -12 * t;
      } else {
        s1Op = 0;
        s1Y = -12;
      }

      // Clean Gap 1 (0.16 -> 0.26): ALL TEXT IS 100% GONE!
      // Step 2: Super Retina Display (0.26 -> 0.44)
      if (p < 0.26) {
        s2Op = 0;
        s2Y = 12;
      } else if (p <= 0.32) {
        const t = smoothstep(0.26, 0.32, p);
        s2Op = t;
        s2Y = 12 * (1 - t);
      } else if (p <= 0.38) {
        s2Op = 1.0;
        s2Y = 0;
      } else if (p <= 0.44) {
        const t = smoothstep(0.38, 0.44, p);
        s2Op = 1.0 - t;
        s2Y = -12 * t;
      } else {
        s2Op = 0;
        s2Y = -12;
      }

      // Clean Gap 2 (0.44 -> 0.52): ALL TEXT IS 100% GONE!
      // Step 3: Desk Stand Docking / StandBy Mode (0.52 -> 0.68)
      if (p < 0.52) {
        s3Op = 0;
        s3Y = 12;
      } else if (p <= 0.58) {
        const t = smoothstep(0.52, 0.58, p);
        s3Op = t;
        s3Y = 12 * (1 - t);
      } else if (p <= 0.64) {
        s3Op = 1.0;
        s3Y = 0;
      } else if (p <= 0.70) {
        const t = smoothstep(0.64, 0.70, p);
        s3Op = 1.0 - t;
        s3Y = -12 * t;
      } else {
        s3Op = 0;
        s3Y = -12;
      }

      // Step 4: 3D Exploded Silicon & Periscope Optics (0.70 -> 0.86)
      if (p < 0.70) {
        s4Op = 0;
        s4Y = 12;
      } else if (p <= 0.76) {
        const t = smoothstep(0.70, 0.76, p);
        s4Op = t;
        s4Y = 12 * (1 - t);
      } else if (p <= 0.82) {
        s4Op = 1.0;
        s4Y = 0;
      } else if (p <= 0.87) {
        const t = smoothstep(0.82, 0.87, p);
        s4Op = 1.0 - t;
        s4Y = -12 * t;
      } else {
        s4Op = 0;
        s4Y = -12;
      }

      // Step 5: 3-Flagship Trio Fan-Out (0.87 -> 1.00)
      if (p < 0.87) {
        s5Op = 0;
        s5Y = 12;
      } else if (p <= 0.93) {
        const t = smoothstep(0.87, 0.93, p);
        s5Op = t;
        s5Y = 12 * (1 - t);
      } else {
        s5Op = 1.0;
        s5Y = 0;
      }

      if (isMobile) {
        setMobileSlide(step1, s1Op, s1Y);
        setMobileSlide(step2, s2Op, s2Y);
        setMobileSlide(step3, s3Op, s3Y);
        setMobileSlide(step4, s4Op, s4Y);
        setMobileSlide(step5, s5Op, s5Y);
      } else {
        setDesktopSlide(step1, s1Op, s1Y);
        setDesktopSlide(step2, s2Op, s2Y);
        setDesktopSlide(step3, s3Op, s3Y);
        setDesktopSlide(step4, s4Op, s4Y);
        setDesktopSlide(step5, s5Op, s5Y);
      }

      // -----------------------------------------------------------------------
      // 2. HORIZONTAL PHONE TRAVEL: RIGHT -> LEFT -> CENTER
      // -----------------------------------------------------------------------
      let colShiftX = 0;
      if (!isMobile && container) {
        const containerWidth = container.offsetWidth;
        const travelDistance = containerWidth * 0.5;

        if (p <= 0.16) {
          // Act 1: Center of Right column
          colShiftX = 0;
        } else if (p <= 0.32) {
          // Act 2: Glides to Left column
          const tGlide = smoothstep(0.16, 0.32, p);
          colShiftX = -travelDistance * tGlide;
        } else if (p <= 0.44) {
          // Rests on Left
          colShiftX = -travelDistance;
        } else if (p <= 0.54) {
          // Act 3: Glides to center stage between columns (-50% of travelDistance)
          const tCenter = smoothstep(0.44, 0.54, p);
          colShiftX = -travelDistance + (travelDistance * 0.5) * tCenter;
        } else {
          // Centered for StandBy, Exploded Assembly, and Trio Fan-Out
          colShiftX = -travelDistance * 0.5;
        }
      } else {
        // Mobile: Starts on Right (+shift) -> Glides across to Left (-shift) -> Centers on stand
        const screenW = window.innerWidth || 390;
        const mobileShift = Math.min(75, Math.max(55, screenW * 0.17));

        if (p <= 0.14) {
          colShiftX = mobileShift;
        } else if (p <= 0.30) {
          const tGlide = smoothstep(0.14, 0.30, p);
          colShiftX = mobileShift - (2 * mobileShift) * tGlide;
        } else if (p <= 0.44) {
          colShiftX = -mobileShift;
        } else if (p <= 0.54) {
          const tDock = smoothstep(0.44, 0.54, p);
          colShiftX = -mobileShift * (1 - tDock);
        } else {
          colShiftX = 0;
        }
      }

      const tCol = `translate3d(${colShiftX.toFixed(1)}px, 0, 0)`;
      phoneColumn.style.transform = tCol;
      phoneColumn.style.webkitTransform = tCol;

      // -----------------------------------------------------------------------
      // 3. 3D REAL IPHONE ROTATIONS, STAND DOCK, EXPLODED VIEW & TRIO FAN-OUT
      // -----------------------------------------------------------------------
      let curRotY = 0;
      let curZ = 0;
      let curRotZ = 0;
      let curRotX = 0;
      let curScale = 1.0;
      let dockY = 0;

      // Act 1: Hero Spotlight (0.00 -> 0.16)
      if (p <= 0.16) {
        curRotY = 0;
        curZ = 0;
        curRotZ = 0;
        curRotX = -2.0;
        curScale = 1.0;
        dockY = 0;

        if (deskStand) deskStand.classList.remove('visible');
        if (floatingPill) floatingPill.classList.remove('visible');
      }
      // Act 2: 180° Flip to Display (0.16 -> 0.44)
      else if (p <= 0.44) {
        const tFlip = smoothstep(0.16, 0.32, p);
        curRotY = 180 * tFlip;
        curZ = (isMobile ? 35 : 65) * Math.sin(tFlip * Math.PI);
        curRotZ = 0;
        curRotX = -2.0 + Math.sin(tFlip * Math.PI) * -3.0;
        curScale = 1.0 + 0.04 * Math.sin(tFlip * Math.PI);
        dockY = 0;

        if (deskStand) deskStand.classList.remove('visible');
        if (floatingPill) floatingPill.classList.remove('visible');
      }
      // Act 3: Stand Docking 100% Horizontal (0.44 -> 0.64)
      else if (p <= 0.64) {
        const tDock = smoothstep(0.44, 0.54, p);
        curRotY = 180 - 6 * tDock;
        curRotZ = -90 * tDock; // 100% HORIZONTAL (Landscape)
        curRotX = -12 * tDock; // Desk tilt
        curZ = (isMobile ? 12 : 24) * Math.sin(tDock * Math.PI);
        dockY = (isMobile ? 88 : 62) * tDock; // Seats directly inside cradle hooks
        curScale = 1.0 - (isMobile ? 0.24 : 0.26) * tDock;

        if (tDock > 0.15) {
          if (deskStand) deskStand.classList.add('visible');
        } else {
          if (deskStand) deskStand.classList.remove('visible');
        }

        if (tDock > 0.85) {
          if (floatingPill) floatingPill.classList.add('visible');
        } else {
          if (floatingPill) floatingPill.classList.remove('visible');
        }
      }
      // Act 4: Lift & 3D Exploded / Deconstructed View (0.64 -> 0.84)
      else if (p <= 0.84) {
        // Stand and pill smoothly retreat
        if (deskStand) deskStand.classList.remove('visible');
        if (floatingPill) floatingPill.classList.remove('visible');

        // Phone lifts off stand, turns upright with a subtle dramatic 3D angle
        const tLift = smoothstep(0.64, 0.72, p);
        curRotZ = -90 * (1 - tLift);
        curRotY = 174 + 18 * tLift; // 192° oblique 3D angle
        curRotX = -12 + 6 * tLift;  // -6°
        dockY = (isMobile ? 88 : 62) * (1 - tLift);
        curScale = isMobile ? (0.76 + 0.14 * tLift) : (0.74 + 0.24 * tLift);
        curZ = 0;
      }
      // Act 5: Magnetic Snap-Back & 3-Flagship Trio (0.84 -> 1.00)
      else {
        if (deskStand) deskStand.classList.remove('visible');
        if (floatingPill) floatingPill.classList.remove('visible');

        curRotY = 180;
        curRotZ = 0;
        curRotX = 0;
        dockY = 0;
        curScale = isMobile ? 0.88 : 0.94;
        curZ = 0;
      }

      // -----------------------------------------------------------------------
      // 4. EXPLODED ASSEMBLY 3D LAYER SPREAD & MAGNETIC SNAP FLASH
      // -----------------------------------------------------------------------
      const isExplodedPhase = p >= 0.68 && p <= 0.86;

      if (explodedAssembly) {
        if (isExplodedPhase) {
          explodedAssembly.classList.add('visible');
          // Hide single phone card during exploded view to prevent double-phone rendering
          if (phone3D) phone3D.style.opacity = '0';

          // Layer separation calculation
          let tSep = smoothstep(0.68, 0.75, p);
          if (p > 0.80) {
            // Rapid magnetic snap-back collapsing the layers
            tSep = 1.0 - smoothstep(0.80, 0.84, p);
          }

          const zDepth = isMobile ? 32 : 75;
          const xOffset = isMobile ? 14 : 32;

          if (layerGlass) {
            const t = `translate3d(0, 0, ${(tSep * zDepth).toFixed(1)}px)`;
            layerGlass.style.transform = t;
            layerGlass.style.webkitTransform = t;
          }
          if (layerCamera) {
            const t = `translate3d(${(tSep * xOffset).toFixed(1)}px, ${(-tSep * 8).toFixed(1)}px, ${(tSep * zDepth * 0.35).toFixed(1)}px)`;
            layerCamera.style.transform = t;
            layerCamera.style.webkitTransform = t;
          }
          if (layerChip) {
            const t = `translate3d(${(-tSep * xOffset).toFixed(1)}px, ${(tSep * 12).toFixed(1)}px, ${(-tSep * zDepth * 0.35).toFixed(1)}px)`;
            layerChip.style.transform = t;
            layerChip.style.webkitTransform = t;
          }
          if (layerChassis) {
            const t = `translate3d(0, 0, ${(-tSep * zDepth).toFixed(1)}px)`;
            layerChassis.style.transform = t;
            layerChassis.style.webkitTransform = t;
          }
        } else {
          explodedAssembly.classList.remove('visible');
          if (phone3D) phone3D.style.opacity = '1';
        }
      }

      // Magnetic Snap Flash Trigger (at the instant of snapping back)
      if (snapFlash) {
        if (p >= 0.83 && p <= 0.87) {
          snapFlash.classList.add('trigger');
        } else {
          snapFlash.classList.remove('trigger');
        }
      }

      // -----------------------------------------------------------------------
      // 5. 3-FLAGSHIP TRIO FAN-OUT ANIMATION (APPLE + SAMSUNG + ONEPLUS)
      // -----------------------------------------------------------------------
      const isTrioPhase = p >= 0.87;

      if (trioStack) {
        if (isTrioPhase) {
          trioStack.classList.add('visible');

          const tFan = smoothstep(0.87, 0.96, p);
          const fanDist = isMobile ? 68 : 170;
          const fanScale = isMobile ? 0.82 : 0.88;
          const fanRotY = isMobile ? 12 : 16;
          const fanRotZ = isMobile ? 2.5 : 3.5;

          // Companion Left: Samsung Galaxy S26 Ultra
          if (companionSamsung) {
            const sX = -fanDist * tFan;
            const sRotY = fanRotY * tFan;
            const sRotZ = -fanRotZ * tFan;
            const t = `translate3d(${sX.toFixed(1)}px, 0, -25px) rotateY(${sRotY.toFixed(1)}deg) rotateZ(${sRotZ.toFixed(1)}deg) scale(${fanScale})`;
            companionSamsung.style.transform = t;
            companionSamsung.style.webkitTransform = t;
          }

          // Companion Right: OnePlus 15 Flagship
          if (companionOnePlus) {
            const oX = fanDist * tFan;
            const oRotY = -fanRotY * tFan;
            const oRotZ = fanRotZ * tFan;
            const t = `translate3d(${oX.toFixed(1)}px, 0, -25px) rotateY(${oRotY.toFixed(1)}deg) rotateZ(${oRotZ.toFixed(1)}deg) scale(${fanScale})`;
            companionOnePlus.style.transform = t;
            companionOnePlus.style.webkitTransform = t;
          }
        } else {
          trioStack.classList.remove('visible');
          if (companionSamsung) companionSamsung.style.transform = 'translate3d(0, 0, 0)';
          if (companionOnePlus) companionOnePlus.style.transform = 'translate3d(0, 0, 0)';
        }
      }

      // Subtle aerodynamic breathing wave (dampens to 0 when docked on stand)
      const isDocked = p >= 0.52 && p <= 0.64;
      const wave = !isDocked ? Math.sin(p * Math.PI * 3.5) * (isMobile ? 2.5 : 5) : 0;
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

      // -----------------------------------------------------------------------
      // 6. MICRO CHAPTER PROGRESS BAR & LABELS
      // -----------------------------------------------------------------------
      if (indicatorBar) {
        const barHeight = Math.max(16, p * 100);
        indicatorBar.style.height = `${barHeight.toFixed(1)}%`;
      }

      if (chapterLabels && chapterLabels.length > 0) {
        let activeIdx = 0;
        if (p < 0.20) activeIdx = 0;
        else if (p < 0.46) activeIdx = 1;
        else if (p < 0.68) activeIdx = 2;
        else if (p < 0.86) activeIdx = 3;
        else activeIdx = 4;

        chapterLabels.forEach((label, idx) => {
          if (idx === activeIdx) {
            label.classList.add('active');
          } else {
            label.classList.remove('active');
          }
        });
      }
    }

    requestAnimationFrame(renderLoop);
  }

  // Safe startup on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLuxuryStoryMotion);
  } else {
    initLuxuryStoryMotion();
  }
})();

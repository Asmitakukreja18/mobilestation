/**
 * MOBILE STATION — VIEWPORT 3D DUAL-FACE PHONE FLIP & CONTINUOUS ZIG-ZAG ENGINE
 * 
 * Features:
 *   1. Full Page Journey ("ye uoper se hero se footer tak"):
 *      Phone accompanies user from the top hero showcase all the way down to the footer.
 *   2. Viewport-Pinned Smooth Gliding ("scroll ke sath smooth ho"):
 *      Direct body mount (position: fixed, z-index: 99999). Smoothly glides from hero stage
 *      into the viewport line of sight and stays centered as page scrolls.
 *   3. Dynamic 3D Zig-Zag Weaving ("zig zag m ghumega jese jese scroll krr hu"):
 *      Sinusoidal lateral weaving, banking roll (rotateZ), and harmonic pitch (rotateX).
 *   4. Dual-Face 3D Flips ("back se sidha honga n sidhe se back"):
 *      Starts at Titanium Rear (0°), flips to Super Retina Front (180°), flips back to
 *      Titanium Rear (360°), and flips forward again into footer finale with 3D Z-depth pop.
 *   5. Mobile-First Optimization:
 *      Fluid touch tracking, safe horizontal margins, and 60/120 FPS damped lerp.
 */

(function () {
  'use strict';

  function initHeroPhoneMotion() {
    const phone = document.getElementById('heroPhoneArt') || document.querySelector('.phone-art');
    const phone3D = document.getElementById('heroPhone3D') || (phone ? phone.querySelector('.phone-3d-card') : null);
    const backFace = document.getElementById('phoneBackFace') || (phone ? phone.querySelector('.phone-face-back') : null);
    const frontFace = document.getElementById('phoneFrontFace') || (phone ? phone.querySelector('.phone-face-front') : null);

    const stage = document.querySelector('.product-stage');
    const halo = stage ? stage.querySelector('.image-halo') : null;
    const chips = stage ? stage.querySelectorAll('.spec-chip, .stage-caption, .stage-ring') : [];

    if (!phone) return;

    // Direct body mount to escape all ancestor transforms, perspective, and overflow clipping
    if (phone.parentElement !== document.body) {
      document.body.appendChild(phone);
    }

    // Fixed viewport styling
    phone.style.position = 'fixed';
    phone.style.left = '0';
    phone.style.top = '0';
    phone.style.margin = '0';
    phone.style.zIndex = '99999';
    phone.style.display = 'block';
    phone.style.visibility = 'visible';
    phone.style.opacity = '1';
    phone.style.pointerEvents = 'none';
    phone.style.willChange = 'transform';
    phone.style.transformStyle = 'preserve-3d';

    if (phone3D) {
      phone3D.style.willChange = 'transform';
      phone3D.style.transformStyle = 'preserve-3d';
    }

    // Scroll helper supporting all mobile & desktop browsers
    function getScrollTop() {
      return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || window.scrollY || 0;
    }

    // Trajectory coordinates in document space
    let heroDocX = window.innerWidth * 0.5;
    let heroDocY = 480;
    let maxScroll = 4000;

    function measureLayout() {
      if (!phone) return;

      const w = window.innerWidth;
      const curScrollY = getScrollTop();

      if (stage) {
        const sRect = stage.getBoundingClientRect();
        heroDocX = sRect.left + sRect.width / 2;
        heroDocY = sRect.top + curScrollY + sRect.height / 2;
      } else {
        heroDocX = w * 0.5;
        heroDocY = 480;
      }

      const docHeight = Math.max(
        document.body.scrollHeight || 0,
        document.documentElement.scrollHeight || 0,
        document.body.offsetHeight || 0,
        document.documentElement.offsetHeight || 0
      );
      maxScroll = Math.max(600, docHeight - window.innerHeight);
    }

    measureLayout();

    // Recalibrate on image load, resize, orientation change, or DOM shifts
    const imgs = phone.querySelectorAll('img');
    imgs.forEach((img) => {
      if (!img.complete) {
        img.addEventListener('load', measureLayout, { once: true });
      }
    });

    window.addEventListener('resize', measureLayout, { passive: true });
    window.addEventListener('orientationchange', measureLayout, { passive: true });

    // Smoothstep easing helper
    function smoothstep(edge0, edge1, x) {
      const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
      return t * t * (3 - 2 * t);
    }

    // Scroll progress state
    let targetProgress = 0;
    let smoothProgress = 0;

    function updateScrollProgress() {
      const scrollY = getScrollTop();
      const raw = scrollY / Math.max(1, maxScroll);
      targetProgress = Math.max(0, Math.min(1.0, raw));
    }

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    window.addEventListener('touchmove', updateScrollProgress, { passive: true });
    updateScrollProgress();

    // 60/120 FPS Fluid Render Loop
    function renderLoop() {
      requestAnimationFrame(renderLoop);

      // Continuous real-time scroll tracking (ensures 100% responsiveness on mobile touch flings)
      updateScrollProgress();

      const isMobile = window.innerWidth < 768;
      const lerpSpeed = isMobile ? 0.12 : 0.09;
      smoothProgress += (targetProgress - smoothProgress) * lerpSpeed;
      const p = smoothProgress;

      const scrollY = getScrollTop();

      // -----------------------------------------------------------------------
      // 1. VIEWPORT ANCHOR POSITIONING ("scroll ke sath smooth ho")
      // -----------------------------------------------------------------------
      const viewportCenterY = window.innerHeight * (isMobile ? 0.46 : 0.48);
      const viewportCenterX = window.innerWidth * 0.50;

      // Hero stage screen Y position
      const curHeroScreenY = heroDocY - scrollY;

      let baseScreenX = viewportCenterX;
      let baseScreenY = viewportCenterY;

      if (p <= 0.10) {
        // Phase 1: Smooth lift-off from hero stage into viewport center
        const tHero = smoothstep(0, 0.10, p);
        baseScreenX = heroDocX + (viewportCenterX - heroDocX) * tHero;
        baseScreenY = curHeroScreenY + (viewportCenterY - curHeroScreenY) * tHero;
      } else if (p <= 0.90) {
        // Phase 2: Stays locked in viewport center through the full journey
        baseScreenX = viewportCenterX;
        baseScreenY = viewportCenterY;
      } else {
        // Phase 3: Footer gentle landing
        const tFoot = smoothstep(0.90, 1.0, p);
        baseScreenX = viewportCenterX;
        baseScreenY = viewportCenterY + tFoot * (isMobile ? 22 : 36);
      }

      // -----------------------------------------------------------------------
      // 2. DYNAMIC 3D ZIG-ZAG ENGINE ("zig zag m ghumega jese jese scroll krr hu")
      // -----------------------------------------------------------------------
      // 5.5 complete weaves from hero to footer
      const waveCycles = 5.5;
      const wavePhase = p * Math.PI * 2 * waveCycles;

      // Sway factor: builds up smoothly right as you scroll away from hero stage
      const swayFactor = smoothstep(0.015, 0.08, p) * (1 - smoothstep(0.94, 1.0, p) * 0.65);

      // Horizontal Sway (safe bounds so mobile screen edges never clip)
      const maxSwayX = isMobile
        ? Math.min(36, window.innerWidth * 0.09)
        : Math.min(85, window.innerWidth * 0.075);
      const zigZagSwayX = Math.sin(wavePhase) * maxSwayX * swayFactor;

      // 3D Banking Roll (rotateZ banks into the weave)
      const maxRoll = isMobile ? 8.5 : 12.0;
      const zigZagRollZ = Math.sin(wavePhase) * maxRoll * swayFactor;

      // Harmonic Floating Breath (subtle vertical oscillation)
      const floatY = Math.cos(wavePhase * 1.3) * (isMobile ? 10 : 16) * swayFactor;

      // Aerodynamic Pitch (rotateX)
      const maxPitch = isMobile ? 3.5 : 5.0;
      const zigZagPitch = Math.sin(wavePhase * 0.9) * maxPitch * swayFactor;

      // -----------------------------------------------------------------------
      // 3. 3D FLIP TIMELINE ("back se sidha honga n sidhe se back")
      // -----------------------------------------------------------------------
      let baseRotY = 0;
      let curZ = 0;
      let flipScaleBonus = 0;

      if (p <= 0.06) {
        // 0.00 - 0.06: Titanium Rear View (0° Y)
        baseRotY = 0;
        curZ = 0;
      } else if (p <= 0.22) {
        // 0.06 - 0.22: First 3D Flip (0° -> 180° Sidha / Super Retina Display)
        const t1 = smoothstep(0.06, 0.22, p);
        baseRotY = 180 * t1;
        curZ = 75 * Math.sin(t1 * Math.PI);
        flipScaleBonus = 0.08 * Math.sin(t1 * Math.PI);
      } else if (p <= 0.44) {
        // 0.22 - 0.44: Holds Sidha / Front View through Flagships
        baseRotY = 180;
        curZ = 0;
      } else if (p <= 0.60) {
        // 0.44 - 0.60: Second 3D Flip (180° -> 360° Titanium Rear View)
        const t2 = smoothstep(0.44, 0.60, p);
        baseRotY = 180 + 180 * t2;
        curZ = 75 * Math.sin(t2 * Math.PI);
        flipScaleBonus = 0.08 * Math.sin(t2 * Math.PI);
      } else if (p <= 0.78) {
        // 0.60 - 0.78: Holds Titanium Rear View through Schemes & Services
        baseRotY = 360;
        curZ = 0;
      } else if (p <= 0.92) {
        // 0.78 - 0.92: Third 3D Flip (360° -> 540° Sidha / Front View)
        const t3 = smoothstep(0.78, 0.92, p);
        baseRotY = 360 + 180 * t3;
        curZ = 75 * Math.sin(t3 * Math.PI);
        flipScaleBonus = 0.08 * Math.sin(t3 * Math.PI);
      } else {
        // 0.92 - 1.00: Holds Front View into Footer Finale
        baseRotY = 540;
        curZ = 0;
      }

      // Gyroscopic Yaw wobble in sync with zig-zag
      const maxYawWobble = isMobile ? 10.0 : 16.0;
      const zigZagYaw = Math.cos(wavePhase * 0.95) * maxYawWobble * swayFactor;

      // Combine Rotations & Coordinates
      const finalScreenX = baseScreenX + zigZagSwayX;
      const finalScreenY = baseScreenY + floatY;
      const finalRotX = zigZagPitch;
      const finalRotY = baseRotY + zigZagYaw;
      const finalRotZ = zigZagRollZ;

      // Base scale
      const baseScale = isMobile ? 0.92 : 1.0;
      const curScale = baseScale + flipScaleBonus;

      // Center offset calculation for fixed viewport element
      const pWidth = phone.offsetWidth || (isMobile ? 220 : 280);
      const pHeight = phone.offsetHeight || (isMobile ? 440 : 560);

      const tx = finalScreenX - pWidth / 2;
      const ty = finalScreenY - pHeight / 2;

      // Apply 3D transforms
      phone.style.transform = `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, ${curZ.toFixed(1)}px) scale(${curScale.toFixed(4)}) rotateX(${finalRotX.toFixed(2)}deg) rotateZ(${finalRotZ.toFixed(2)}deg)`;
      phone.style.opacity = '1';

      if (phone3D) {
        phone3D.style.transform = `rotateY(${finalRotY.toFixed(2)}deg)`;
      }

      // Cross-face visibility: ensures crisp rendering without backface flicker
      const normY = ((finalRotY % 360) + 360) % 360;
      const isFrontFacing = normY > 90 && normY < 270;

      if (backFace && frontFace) {
        backFace.style.opacity = isFrontFacing ? '0' : '1';
        frontFace.style.opacity = isFrontFacing ? '1' : '0';
      }

      // Ambient hero stage halo & spec chips fade softly as phone lifts off
      const ambientFade = Math.max(0, 1 - smoothstep(0.02, 0.12, p) * 1.5);
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

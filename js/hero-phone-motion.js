/**
 * MOBILE STATION — FLAGSHIP PHONE 3D FLOATING & TOP-TO-BOTTOM TRAVEL ENGINE
 * Recreates the iconic Flowty.co / Flagship showcase motion:
 *  1. Top-to-Bottom Travel ("uper se neeche tak jaa rahi"):
 *     As the user scrolls through the hero section, the phone glides smoothly
 *     downwards from its elevated top starting position (+165px desktop, +95px mobile)
 *  2. Continuous 3D Levitation ("float karke"):
 *     Fluid, prominent organic floating wave (±22px vertical float + 3D yaw/pitch breathing)
 *  3. Flowty Dynamic Scale Expansion:
 *     Scales organically from 1.0 -> 1.16 as it glides downwards
 *  4. 3D Parallax Pitch & Interactive Tilt:
 *     Perspective pitch on scroll (-7deg) plus responsive mouse/touch/gyro tracking
 *  5. 100% GPU Accelerated & Damped Lerp Easing:
 *     Silky smooth at 60 FPS with zero layout shifts, preserving all website content
 */

(function () {
  'use strict';

  function initPhoneAnimation() {
    const phone = document.getElementById('heroPhoneArt') || document.querySelector('.phone-art');
    const stage = document.querySelector('.product-stage');
    const hero = document.getElementById('home') || document.querySelector('.hero');
    const shine = phone ? phone.querySelector('.shine') : null;
    const halo = stage ? stage.querySelector('.image-halo') : null;

    if (!phone) return;

    // Accessibility: Return to stable static state if user prefers reduced motion
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      phone.style.transform = 'none';
      return;
    }

    // Prepare GPU acceleration and 3D rendering context
    phone.style.willChange = 'transform';
    phone.style.transformStyle = 'preserve-3d';

    if (stage) {
      stage.style.perspective = '1200px';
      stage.style.transformStyle = 'preserve-3d';
      stage.style.overflow = 'visible';
    }

    // Motion State Variables
    let time = 0;
    let targetScroll = 0;
    let smoothScroll = 0;

    let targetPointerX = 0;
    let targetPointerY = 0;
    let smoothPointerX = 0;
    let smoothPointerY = 0;

    let gyroX = 0;
    let gyroY = 0;
    let smoothGyroX = 0;
    let smoothGyroY = 0;

    // Responsive Motion Profile Configuration
    function getMotionConfig() {
      const w = window.innerWidth;
      if (w >= 1024) {
        // Desktop: Expansive 3D stage with pronounced top-to-bottom glide
        return {
          startOffsetY: -24,    // Start elevated at the top
          travelY: 165,         // Glides downwards from top to bottom on scroll
          floatAmp: 22,         // Prominent organic floating amplitude
          scaleExpand: 0.16,    // Expands smoothly as it travels downwards
          pitchOnScroll: -7.0,  // Dynamic 3D perspective pitch tilt
          tiltX: 12,            // Interactive pointer tilt
          tiltY: 14,
          shiftX: 18,
          shiftY: 12
        };
      }
      if (w >= 768) {
        // Tablet: Balanced travel and floating
        return {
          startOffsetY: -18,
          travelY: 130,
          floatAmp: 19,
          scaleExpand: 0.14,
          pitchOnScroll: -6.0,
          tiltX: 10,
          tiltY: 12,
          shiftX: 14,
          shiftY: 10
        };
      }
      // Mobile: Clearly noticeable top-to-bottom floating glide contained within mobile view
      return {
        startOffsetY: -14,
        travelY: 95,
        floatAmp: 16,
        scaleExpand: 0.12,
        pitchOnScroll: -5.0,
        tiltX: 9,
        tiltY: 11,
        shiftX: 12,
        shiftY: 8
      };
    }

    // 1. Precise Scroll Progression Tracking (Top to Bottom Journey)
    function updateScroll() {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop || window.scrollY || 0;
      if (!hero) {
        targetScroll = Math.max(0, Math.min(1.0, scrollY / 550));
        return;
      }
      const rect = hero.getBoundingClientRect();
      const heroHeight = hero.offsetHeight || window.innerHeight || 650;
      const scrolled = Math.max(0, -rect.top);
      // Normalized progress: 0.0 at very top -> 1.0 as user scrolls through hero
      targetScroll = Math.max(0, Math.min(1.0, scrolled / (heroHeight * 0.70)));
    }

    window.addEventListener('scroll', updateScroll, { passive: true });
    window.addEventListener('resize', updateScroll, { passive: true });
    updateScroll();

    // 2. Interactive Pointer / Mouse Tracking (Desktop & Laptop)
    function onPointerMove(e) {
      const container = stage || hero;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

      targetPointerX = Math.max(-1, Math.min(1, nx));
      targetPointerY = Math.max(-1, Math.min(1, ny));
    }

    function onPointerLeave() {
      targetPointerX = 0;
      targetPointerY = 0;
    }

    const interactiveArea = stage || hero;
    if (interactiveArea) {
      interactiveArea.addEventListener('pointermove', onPointerMove, { passive: true });
      interactiveArea.addEventListener('pointerleave', onPointerLeave, { passive: true });
      interactiveArea.addEventListener('pointercancel', onPointerLeave, { passive: true });
    }

    // 3. Mobile Touch Drag / Tilt
    window.addEventListener('touchmove', (e) => {
      if (!stage || !e.touches || !e.touches[0]) return;
      const rect = stage.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const touch = e.touches[0];
        const nx = ((touch.clientX - rect.left) / rect.width - 0.5) * 2;
        const ny = ((touch.clientY - rect.top) / rect.height - 0.5) * 2;
        targetPointerX = Math.max(-1, Math.min(1, nx));
        targetPointerY = Math.max(-1, Math.min(1, ny));
      }
    }, { passive: true });

    window.addEventListener('touchend', () => {
      targetPointerX = 0;
      targetPointerY = 0;
    }, { passive: true });

    // 4. Mobile Device Gyroscope (Physical Tilt Interaction)
    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', (e) => {
        if (e.gamma !== null && e.beta !== null) {
          const clampedGamma = Math.max(-28, Math.min(28, e.gamma));
          const clampedBeta = Math.max(10, Math.min(70, e.beta)) - 40;
          gyroX = clampedGamma / 28;
          gyroY = clampedBeta / 28;
        }
      }, { passive: true });
    }

    // 5. 60 FPS Physics & Render Loop
    let lastTime = performance.now();

    function renderLoop(now) {
      requestAnimationFrame(renderLoop);

      const dt = Math.min(50, now - lastTime) / 1000;
      lastTime = now;

      // Natural harmonic time advance (smooth floating period ~3.1s)
      time += dt * 2.05;

      const config = getMotionConfig();

      // Damped interpolation (lerp) for silky easing
      smoothScroll += (targetScroll - smoothScroll) * 0.085;
      smoothPointerX += (targetPointerX - smoothPointerX) * 0.08;
      smoothPointerY += (targetPointerY - smoothPointerY) * 0.08;

      smoothGyroX += (gyroX - smoothGyroX) * 0.06;
      smoothGyroY += (gyroY - smoothGyroY) * 0.06;

      const combinedX = smoothPointerX + smoothGyroX * 0.75;
      const combinedY = smoothPointerY + smoothGyroY * 0.75;

      // --- A. Continuous 3D Levitation ("float karke") ---
      // Smooth sinusoidal vertical float + coordinated 3D breathing rotation
      const floatY = Math.sin(time) * config.floatAmp;
      const floatRotY = Math.cos(time * 0.85) * 3.6;
      const floatRotX = Math.sin(time * 0.65) * 2.4;
      const floatRotZ = Math.sin(time * 0.45) * 1.2;

      // --- B. Top-to-Bottom Scroll Travel ("uper se neeche tak jaa rahi") ---
      // Phone starts at startOffsetY and travels downwards (+travelY) as scroll progresses
      const scrollTravelY = smoothScroll * config.travelY;
      // Dynamic scale expansion (Flowty style 1.0 -> 1.16)
      const scrollScale = 1 + (smoothScroll * config.scaleExpand);
      // Perspective pitch tilt on scroll
      const scrollPitchX = smoothScroll * config.pitchOnScroll;

      // --- C. Interactive Parallax Tilt (Mouse, Touch, and Gyro) ---
      const tiltX = -combinedY * config.tiltX;
      const tiltY = combinedX * config.tiltY;
      const shiftX = combinedX * config.shiftX;
      const shiftY = combinedY * config.shiftY;

      // --- D. Combine All Motion Layers ---
      const finalX = (shiftX).toFixed(2);
      const finalY = (config.startOffsetY + scrollTravelY + floatY + shiftY).toFixed(2);
      const finalRotX = (floatRotX + scrollPitchX + tiltX).toFixed(2);
      const finalRotY = (floatRotY + tiltY).toFixed(2);
      const finalRotZ = (floatRotZ).toFixed(2);
      const finalScale = scrollScale.toFixed(4);

      // Apply GPU-accelerated transform to the phone element
      phone.style.transform = `translate3d(${finalX}px, ${finalY}px, 0px) rotateX(${finalRotX}deg) rotateY(${finalRotY}deg) rotateZ(${finalRotZ}deg) scale(${finalScale})`;

      // Dynamic specular highlight reflection shift across phone glass
      if (shine) {
        const shineShift = (combinedX * 32 + Math.sin(time) * 15).toFixed(1);
        shine.style.transform = `translateX(${shineShift}px)`;
      }

      // Synchronize background halo scale and breathing intensity
      if (halo) {
        const haloScale = (1 + Math.sin(time) * 0.12 + smoothScroll * 0.14).toFixed(3);
        const haloShiftY = (config.startOffsetY * 0.4 + scrollTravelY * 0.6).toFixed(1);
        halo.style.transform = `translateY(${haloShiftY}px) scale(${haloScale})`;
      }
    }

    requestAnimationFrame(renderLoop);
  }

  // Safe startup on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPhoneAnimation);
  } else {
    initPhoneAnimation();
  }
})();

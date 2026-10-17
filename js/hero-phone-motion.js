/**
 * MOBILE STATION — PROMINENT 3D FLAGSHIP PHONE MOTION ENGINE
 * Recreates the iconic Flowty.co ("Flowty On Your Wrist") motion on Desktop & Mobile:
 *  - Prominent, elegant floating levitation (fluid ±15px breathing + organic 3D tilt)
 *  - Eye-catching Flowty-style scroll expansion (scales smoothly from 1.0 -> 1.22)
 *  - Deep 3D parallax glide (-50px lift + -8deg perspective pitch on scroll)
 *  - Interactive mouse & touch 3D tilt tracking with buttery damped lerp easing
 *  - Mobile physical gyroscope orientation tracking
 *  - Synchronized specular glass shine reflection & pulsing background halo
 *  - 100% GPU-accelerated: zero layout shifts, zero text alterations
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

    // Prepare GPU acceleration
    phone.style.willChange = 'transform';
    phone.style.transformStyle = 'preserve-3d';

    if (stage) {
      stage.style.perspective = '1200px';
      stage.style.transformStyle = 'preserve-3d';
    }

    // Motion State
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

    // Responsive intensity scale
    function getMotionConfig() {
      const w = window.innerWidth;
      if (w >= 1024) {
        // Desktop: Full expansive 3D stage
        return {
          floatY: 15,
          tiltX: 12,
          tiltY: 14,
          shiftX: 18,
          shiftY: 12,
          scaleExpand: 0.20,
          parallaxY: -55,
          pitchOnScroll: -7.5
        };
      }
      if (w >= 768) {
        // Tablet
        return {
          floatY: 14,
          tiltX: 11,
          tiltY: 13,
          shiftX: 15,
          shiftY: 10,
          scaleExpand: 0.18,
          parallaxY: -48,
          pitchOnScroll: -7.0
        };
      }
      // Mobile: Prominent, clearly noticeable, contained within hero stage
      return {
        floatY: 13,
        tiltX: 10,
        tiltY: 12,
        shiftX: 14,
        shiftY: 9,
        scaleExpand: 0.18,
        parallaxY: -42,
        pitchOnScroll: -6.5
      };
    }

    // 1. Scroll progression tracking
    function updateScroll() {
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      const heroHeight = hero.offsetHeight || 650;
      const scrolled = Math.max(0, -rect.top);
      // Normalized progress through hero section (0 to 1)
      targetScroll = Math.min(1.2, scrolled / (heroHeight * 0.75));
    }

    window.addEventListener('scroll', updateScroll, { passive: true });
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
          const clampedGamma = Math.max(-30, Math.min(30, e.gamma));
          const clampedBeta = Math.max(10, Math.min(70, e.beta)) - 40;
          gyroX = clampedGamma / 30;
          gyroY = clampedBeta / 30;
        }
      }, { passive: true });
    }

    // 5. 60 FPS Physics & Render Loop
    let lastTime = performance.now();

    function renderLoop(now) {
      requestAnimationFrame(renderLoop);

      const dt = Math.min(50, now - lastTime) / 1000;
      lastTime = now;

      // Natural rhythmic breathing (period ~2.9s)
      time += dt * 2.15;

      const config = getMotionConfig();

      // Damped interpolation (lerp) for silky easing
      smoothScroll += (targetScroll - smoothScroll) * 0.085;
      smoothPointerX += (targetPointerX - smoothPointerX) * 0.08;
      smoothPointerY += (targetPointerY - smoothPointerY) * 0.08;

      smoothGyroX += (gyroX - smoothGyroX) * 0.06;
      smoothGyroY += (gyroY - smoothGyroY) * 0.06;

      const combinedX = smoothPointerX + smoothGyroX * 0.75;
      const combinedY = smoothPointerY + smoothGyroY * 0.75;

      // --- A. Prominent 3D Levitation (Visible in Real Time) ---
      const idleY = Math.sin(time) * config.floatY;
      const idleRotY = Math.cos(time * 0.85) * 3.2;
      const idleRotX = Math.sin(time * 0.7) * 2.2;
      const idleRotZ = Math.sin(time * 0.5) * 1.2;

      // --- B. Flowty Scroll Dynamics (Noticeable Scale Expansion) ---
      // Phone expands from 1.0 up to ~1.20 as you scroll through hero
      const scrollScale = 1 + (smoothScroll * config.scaleExpand);
      // Upward parallax glide
      const scrollY = smoothScroll * config.parallaxY;
      // 3D perspective pitch tilt on scroll
      const scrollRotX = smoothScroll * config.pitchOnScroll;

      // --- C. Interactive Tilt (Mouse, Touch, and Gyro) ---
      const tiltX = -combinedY * config.tiltX;
      const tiltY = combinedX * config.tiltY;
      const shiftX = combinedX * config.shiftX;
      const shiftY = combinedY * config.shiftY;

      // --- D. Combine Transforms ---
      const finalX = (shiftX).toFixed(2);
      const finalY = (idleY + scrollY + shiftY).toFixed(2);
      const finalRotX = (idleRotX + scrollRotX + tiltX).toFixed(2);
      const finalRotY = (idleRotY + tiltY).toFixed(2);
      const finalRotZ = (idleRotZ).toFixed(2);
      const finalScale = scrollScale.toFixed(4);

      // Apply GPU-accelerated transform to the phone element
      phone.style.transform = `translate3d(${finalX}px, ${finalY}px, 0px) rotateX(${finalRotX}deg) rotateY(${finalRotY}deg) rotateZ(${finalRotZ}deg) scale(${finalScale})`;

      // Dynamic specular highlight reflection shift
      if (shine) {
        const shineShift = (combinedX * 30 + Math.sin(time) * 12).toFixed(1);
        shine.style.transform = `translateX(${shineShift}px)`;
      }

      // Sync background halo scale and intensity
      if (halo) {
        const haloScale = (1 + Math.sin(time) * 0.10 + smoothScroll * 0.15).toFixed(3);
        halo.style.transform = `scale(${haloScale})`;
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

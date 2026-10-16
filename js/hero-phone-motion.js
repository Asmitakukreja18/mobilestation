/**
 * MOBILE STATION — HERO PHONE MOTION ENGINE
 * Recreates the premium floating 3D product motion from reference video:
 *  - Continuous harmonic levitation (gentle vertical up/down + subtle left/right sway)
 *  - 3D perspective rotation (subtle pitch, yaw & roll)
 *  - Scroll-driven parallax & smooth scale expansion matching reference video
 *  - Smooth pointer/touch parallax reaction with damped lerp easing
 *  - Strictly zero layout shift & zero modification to any text or existing layout
 *  - 60 FPS GPU-accelerated via transform: translate3d() rotate() scale()
 */

(function () {
  'use strict';

  function initPhoneMotion() {
    const phone = document.getElementById('heroPhoneArt') || document.querySelector('.phone-art');
    const stage = document.querySelector('.product-stage');
    const hero = document.getElementById('home') || document.querySelector('.hero');

    if (!phone) return;

    // Disable competing static CSS keyframe animation so our 60 FPS physics loop runs cleanly
    phone.style.animation = 'none';
    phone.style.willChange = 'transform';
    phone.style.transformStyle = 'preserve-3d';

    if (stage) {
      stage.style.perspective = '1200px';
      stage.style.transformStyle = 'preserve-3d';
    }

    // Motion State
    let time = 0;
    let targetScrollProgress = 0;
    let currentScrollProgress = 0;

    // Pointer / Tilt State
    let targetPointerX = 0;
    let targetPointerY = 0;
    let currentPointerX = 0;
    let currentPointerY = 0;

    // Device responsive factor
    function getDeviceFactor() {
      const w = window.innerWidth;
      if (w >= 1024) return 1.0;     // Desktop: full premium motion
      if (w >= 768) return 0.75;     // Tablet: slightly reduced intensity
      return 0.55;                   // Mobile: subtle, contained within viewport
    }

    // 1. Scroll tracking with clamped progress
    function updateScroll() {
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      const heroHeight = hero.offsetHeight || 650;
      const scrolled = Math.max(0, -rect.top);
      targetScrollProgress = Math.min(1.2, scrolled / (heroHeight * 0.85));
    }

    window.addEventListener('scroll', updateScroll, { passive: true });
    updateScroll();

    // 2. Interactive Pointer / Touch Parallax
    function onPointerMove(e) {
      const container = stage || hero;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      // Normalized coordinates (-1 to 1)
      const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

      targetPointerX = Math.max(-1, Math.min(1, nx));
      targetPointerY = Math.max(-1, Math.min(1, ny));
    }

    function onPointerLeave() {
      targetPointerX = 0;
      targetPointerY = 0;
    }

    if (stage) {
      stage.addEventListener('pointermove', onPointerMove, { passive: true });
      stage.addEventListener('pointerleave', onPointerLeave, { passive: true });
      stage.addEventListener('pointercancel', onPointerLeave, { passive: true });
    } else if (hero) {
      hero.addEventListener('pointermove', onPointerMove, { passive: true });
      hero.addEventListener('pointerleave', onPointerLeave, { passive: true });
    }

    // Optional subtle touch listener for mobile
    window.addEventListener('touchmove', (e) => {
      if (e.touches && e.touches[0] && stage) {
        const rect = stage.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          const touch = e.touches[0];
          const nx = ((touch.clientX - rect.left) / rect.width - 0.5) * 2;
          const ny = ((touch.clientY - rect.top) / rect.height - 0.5) * 2;
          targetPointerX = Math.max(-1, Math.min(1, nx)) * 0.6;
          targetPointerY = Math.max(-1, Math.min(1, ny)) * 0.6;
        }
      }
    }, { passive: true });

    window.addEventListener('touchend', () => {
      targetPointerX = 0;
      targetPointerY = 0;
    }, { passive: true });

    // 3. Main 60 FPS Physics & Animation Loop
    let lastTimestamp = performance.now();

    function renderMotionLoop(timestamp) {
      requestAnimationFrame(renderMotionLoop);

      const delta = Math.min(50, timestamp - lastTimestamp) / 1000;
      lastTimestamp = timestamp;

      // Increment harmonic time
      time += delta * 1.6;

      const deviceFactor = getDeviceFactor();

      // Damped interpolation (lerp) for buttery smooth easing
      // Avoids sudden jumps when scrolling or mouse stops
      currentScrollProgress += (targetScrollProgress - currentScrollProgress) * 0.085;
      currentPointerX += (targetPointerX - currentPointerX) * 0.075;
      currentPointerY += (targetPointerY - currentPointerY) * 0.075;

      // --- A. Continuous Floating Harmonic Motion ---
      // Gentle vertical up/down oscillation (sine wave)
      const idleY = Math.sin(time) * 11 * deviceFactor;
      // Slight left/right swaying (phase-shifted cosine wave)
      const idleX = Math.cos(time * 0.72) * 5 * deviceFactor;
      // Subtle 3D rotation & tilt
      const idleRotX = Math.sin(time * 0.85) * 2.2 * deviceFactor;
      const idleRotY = Math.cos(time * 0.65) * 3.4 * deviceFactor;
      const idleRotZ = Math.sin(time * 0.55) * 0.8 * deviceFactor;

      // --- B. Scroll-Driven Dynamics (Matching Reference Video) ---
      // Scale expansion on scroll (as seen in reference 0s-3s expanding element)
      const scrollScale = 1 + (Math.sin(Math.min(1, currentScrollProgress) * Math.PI) * 0.065 * deviceFactor);
      // Gentle parallax vertical glide
      const scrollY = currentScrollProgress * -22 * deviceFactor;
      // Scroll-induced 3D perspective pitch & yaw
      const scrollRotX = currentScrollProgress * -4.5 * deviceFactor;
      const scrollRotY = Math.sin(currentScrollProgress * Math.PI) * 3.5 * deviceFactor;

      // --- C. Interactive Pointer Parallax ---
      const pointerTiltX = -currentPointerY * 12 * deviceFactor;
      const pointerTiltY = currentPointerX * 16 * deviceFactor;
      const pointerShiftX = currentPointerX * 8 * deviceFactor;
      const pointerShiftY = currentPointerY * 6 * deviceFactor;

      // --- D. Combine All Transforms ---
      const totalX = (idleX + pointerShiftX).toFixed(2);
      const totalY = (idleY + scrollY + pointerShiftY).toFixed(2);
      const totalRotX = (idleRotX + scrollRotX + pointerTiltX).toFixed(2);
      const totalRotY = (idleRotY + scrollRotY + pointerTiltY).toFixed(2);
      const totalRotZ = (idleRotZ).toFixed(2);
      const totalScale = scrollScale.toFixed(4);

      // Apply GPU-accelerated transform to the phone element only
      phone.style.transform = `translate3d(${totalX}px, ${totalY}px, 0px) rotateX(${totalRotX}deg) rotateY(${totalRotY}deg) rotateZ(${totalRotZ}deg) scale(${totalScale})`;
    }

    requestAnimationFrame(renderMotionLoop);
  }

  // Safe initialization
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPhoneMotion);
  } else {
    initPhoneMotion();
  }
})();

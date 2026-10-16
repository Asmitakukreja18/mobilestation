/**
 * MOBILE STATION — PRECISE PHONE ANIMATION ENGINE
 * Recreates the exact restrained, high-end motion style from the reference video:
 *  - Scroll-driven subtle scale expansion (1.0 -> 1.05) & parallax lift
 *  - Controlled 3D perspective tilt (pitch & yaw under 4 degrees)
 *  - Smooth pointer/touch parallax reaction with damped lerp easing
 *  - Restrained, calm idle levitation (3.5px gentle breathing)
 *  - Strictly zero layout shift, zero modification to any text or existing layout
 *  - 60 FPS GPU-accelerated via transform: translate3d() rotateX() rotateY() scale()
 *  - Full prefers-reduced-motion support
 */

(function () {
  'use strict';

  function initPhoneAnimation() {
    const phone = document.getElementById('heroPhoneArt') || document.querySelector('.phone-art');
    const stage = document.querySelector('.product-stage');
    const hero = document.getElementById('home') || document.querySelector('.hero');

    if (!phone) return;

    // Respect user's accessibility preferences
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      phone.style.transform = 'none';
      return;
    }

    // Prepare GPU acceleration on the phone element only
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

    // Responsive intensity factor
    function getResponsiveFactor() {
      const w = window.innerWidth;
      if (w >= 1024) return 1.0;  // Desktop: full premium motion
      if (w >= 768) return 0.75;  // Tablet: balanced
      return 0.5;                 // Mobile: subtle, strictly contained, no overlap
    }

    // 1. Scroll-linked tracking
    function updateScrollProgress() {
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      const heroHeight = hero.offsetHeight || 600;
      const scrolled = Math.max(0, -rect.top);
      // Normalized progress through hero section (0 to 1)
      targetScroll = Math.min(1.0, scrolled / (heroHeight * 0.9));
    }

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    updateScrollProgress();

    // 2. Interactive Pointer Parallax (matching reference video 4s-8s)
    function onPointerMove(e) {
      const container = stage || hero;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

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

    // Touch support for mobile devices
    window.addEventListener('touchmove', (e) => {
      if (e.touches && e.touches[0] && stage) {
        const rect = stage.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          const touch = e.touches[0];
          const nx = ((touch.clientX - rect.left) / rect.width - 0.5) * 2;
          const ny = ((touch.clientY - rect.top) / rect.height - 0.5) * 2;
          targetPointerX = Math.max(-1, Math.min(1, nx)) * 0.5;
          targetPointerY = Math.max(-1, Math.min(1, ny)) * 0.5;
        }
      }
    }, { passive: true });

    window.addEventListener('touchend', () => {
      targetPointerX = 0;
      targetPointerY = 0;
    }, { passive: true });

    // 3. 60 FPS Physics Loop with Damped Easing (Lerp)
    let lastTime = performance.now();

    function renderLoop(now) {
      requestAnimationFrame(renderLoop);

      const dt = Math.min(50, now - lastTime) / 1000;
      lastTime = now;

      // Advance calm breathing time
      time += dt * 1.4;

      const factor = getResponsiveFactor();

      // Damped interpolation (lerp) prevents sudden jumps when scrolling/moving stops
      smoothScroll += (targetScroll - smoothScroll) * 0.09;
      smoothPointerX += (targetPointerX - smoothPointerX) * 0.08;
      smoothPointerY += (targetPointerY - smoothPointerY) * 0.08;

      // --- A. Restrained, Calm Idle Levitation ---
      const idleY = Math.sin(time) * 3.5 * factor;
      const idleRotY = Math.cos(time * 0.8) * 0.9 * factor;

      // --- B. Scroll-Driven Dynamics (Reference 0s–3s) ---
      // Subtle scale expansion from 1.0 to 1.05 as user scrolls
      const scrollScale = 1 + (smoothScroll * 0.05 * factor);
      // Subtle parallax lift
      const scrollY = smoothScroll * -18 * factor;
      // Controlled 3D pitch and yaw tilt
      const scrollRotX = smoothScroll * -3.2 * factor;
      const scrollRotY = Math.sin(smoothScroll * Math.PI) * 2.0 * factor;

      // --- C. Controlled Pointer Parallax (Reference 4s–8s) ---
      const pointerTiltX = -smoothPointerY * 3.8 * factor;
      const pointerTiltY = smoothPointerX * 4.2 * factor;
      const pointerShiftX = smoothPointerX * 10 * factor;
      const pointerShiftY = smoothPointerY * 6 * factor;

      // --- D. Combine Transforms ---
      const totalX = (pointerShiftX).toFixed(2);
      const totalY = (idleY + scrollY + pointerShiftY).toFixed(2);
      const totalRotX = (scrollRotX + pointerTiltX).toFixed(2);
      const totalRotY = (idleRotY + scrollRotY + pointerTiltY).toFixed(2);
      const totalScale = scrollScale.toFixed(4);

      phone.style.transform = `translate3d(${totalX}px, ${totalY}px, 0px) rotateX(${totalRotX}deg) rotateY(${totalRotY}deg) scale(${totalScale})`;
    }

    requestAnimationFrame(renderLoop);
  }

  // Safe startup
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPhoneAnimation);
  } else {
    initPhoneAnimation();
  }
})();

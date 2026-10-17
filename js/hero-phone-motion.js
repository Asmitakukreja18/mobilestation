/**
 * MOBILE STATION — PROMINENT & HIGH-END PHONE MOTION ENGINE
 * Inspired by Flowty.co ("Flowty On Your Wrist") and Apple keynote product animations:
 *  - Noticeable, elegant floating levitation (fluid ±10px breathing + subtle 3D sway)
 *  - Dynamic scroll-driven scale expansion (1.0 -> 1.12) & upward parallax lift
 *  - Responsive touch & pointer 3D tilt tracking with smooth damped lerp easing
 *  - Native mobile gyroscope (device orientation) tilt support for real-time reactivity
 *  - Dynamic shine/halo sync for photorealistic depth
 *  - Strictly GPU-accelerated: zero layout shifts, zero text/UI alterations
 *  - Full prefers-reduced-motion accessibility support
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

    // Accessibility: Return to stable static state if reduced motion is requested
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

    // Motion State variables
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

    // Intensity factors
    function getMotionScale() {
      const w = window.innerWidth;
      if (w >= 1024) return { floatY: 7, tilt: 7, scaleExpand: 0.08, parallaxY: -28 };
      if (w >= 768)  return { floatY: 9, tilt: 8, scaleExpand: 0.10, parallaxY: -32 };
      // Mobile: Prominent, clearly noticeable, yet clean and contained
      return { floatY: 11, tilt: 9, scaleExpand: 0.12, parallaxY: -36 };
    }

    // 1. Scroll tracking with responsive progression
    function updateScroll() {
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      const heroHeight = hero.offsetHeight || 650;
      const scrolled = Math.max(0, -rect.top);
      // Normalized scroll progress across hero (0 to 1)
      targetScroll = Math.min(1.2, scrolled / (heroHeight * 0.8));
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
        // gamma: left-to-right tilt in degrees [-90, 90]
        // beta: front-to-back tilt in degrees [-180, 180]
        if (e.gamma !== null && e.beta !== null) {
          const clampedGamma = Math.max(-30, Math.min(30, e.gamma));
          const clampedBeta = Math.max(10, Math.min(70, e.beta)) - 40; // centered around ~40 deg holding angle

          gyroX = clampedGamma / 30; // normalized [-1, 1]
          gyroY = clampedBeta / 30;  // normalized [-1, 1]
        }
      }, { passive: true });
    }

    // 5. High-Performance 60 FPS Physics & Render Loop
    let lastTime = performance.now();

    function renderLoop(now) {
      requestAnimationFrame(renderLoop);

      const dt = Math.min(50, now - lastTime) / 1000;
      lastTime = now;

      // Harmonic time for natural, breathing levitation
      time += dt * 1.5;

      const motion = getMotionScale();

      // Damped interpolation (lerp) for smooth easing without jerky motion
      smoothScroll += (targetScroll - smoothScroll) * 0.085;
      smoothPointerX += (targetPointerX - smoothPointerX) * 0.08;
      smoothPointerY += (targetPointerY - smoothPointerY) * 0.08;

      smoothGyroX += (gyroX - smoothGyroX) * 0.06;
      smoothGyroY += (gyroY - smoothGyroY) * 0.06;

      // Combine pointer and gyro inputs
      const combinedInputX = smoothPointerX + smoothGyroX * 0.7;
      const combinedInputY = smoothPointerY + smoothGyroY * 0.7;

      // --- A. Organic 3D Levitation (Noticeable Breathing Motion) ---
      const idleY = Math.sin(time) * motion.floatY;
      const idleRotY = Math.cos(time * 0.8) * 2.2;
      const idleRotX = Math.sin(time * 0.65) * 1.4;
      const idleRotZ = Math.sin(time * 0.5) * 0.8;

      // --- B. Scroll-Linked Dynamics (Flowty Style Expansion) ---
      // Phone expands as user scrolls down, reaching prominent focus
      const scrollScale = 1 + (smoothScroll * motion.scaleExpand);
      // Upward parallax glide
      const scrollY = smoothScroll * motion.parallaxY;
      // Scroll-driven 3D pitch (phone leans back slightly as it travels)
      const scrollRotX = smoothScroll * -5.5;

      // --- C. Interactive Tilt (Touch & Pointer Reactions) ---
      const tiltX = -combinedInputY * motion.tilt;
      const tiltY = combinedInputX * motion.tilt;
      const shiftX = combinedInputX * 12;
      const shiftY = combinedInputY * 8;

      // --- D. Combine All Transforms ---
      const finalX = (shiftX).toFixed(2);
      const finalY = (idleY + scrollY + shiftY).toFixed(2);
      const finalRotX = (idleRotX + scrollRotX + tiltX).toFixed(2);
      const finalRotY = (idleRotY + tiltY).toFixed(2);
      const finalRotZ = (idleRotZ).toFixed(2);
      const finalScale = scrollScale.toFixed(4);

      // Apply transform directly to the phone
      phone.style.transform = `translate3d(${finalX}px, ${finalY}px, 0px) rotateX(${finalRotX}deg) rotateY(${finalRotY}deg) rotateZ(${finalRotZ}deg) scale(${finalScale})`;

      // Dynamic specular highlight sync (shifts shine slightly with tilt for glass realism)
      if (shine) {
        const shineShift = (combinedInputX * 25 + Math.sin(time) * 10).toFixed(1);
        shine.style.transform = `translateX(${shineShift}px)`;
      }

      // Sync background halo scale with phone breathing
      if (halo) {
        const haloScale = (1 + Math.sin(time) * 0.08 + smoothScroll * 0.1).toFixed(3);
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

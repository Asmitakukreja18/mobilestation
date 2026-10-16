/**
 * Flowty-Inspired 3D Interactive Phone Animation Engine
 * Features:
 *  - Idle Floating/Levitation Physics (Sine wave bob + breathing tilt)
 *  - Interactive 3D Cursor & Touch Gyro Tilt (Damped easing)
 *  - Scroll-Driven 3D Axis Rotation (Cinematic showcase on scroll)
 *  - Interactive 360° Drag Inspection
 *  - Dual-Mode: Native Spline WebGL + Instant CSS 3D Fallback
 */

(function () {
  'use strict';

  // Titanium finish configurations
  const FINISHES = {
    desert: {
      name: 'Desert Titanium',
      glow: 'radial-gradient(circle at 50% 52%, rgba(224, 185, 150, 0.42) 0%, rgba(235, 215, 195, 0.22) 42%, rgba(245, 244, 239, 0) 72%)',
      img: 'assets/iphone-18-pro-desert.png'
    },
    natural: {
      name: 'Natural Titanium',
      glow: 'radial-gradient(circle at 50% 52%, rgba(195, 190, 180, 0.42) 0%, rgba(220, 215, 208, 0.2) 42%, rgba(245, 244, 239, 0) 72%)',
      img: 'assets/iphone-18-pro-max.png'
    },
    black: {
      name: 'Black Titanium',
      glow: 'radial-gradient(circle at 50% 52%, rgba(55, 45, 50, 0.32) 0%, rgba(100, 85, 90, 0.15) 42%, rgba(245, 244, 239, 0) 72%)',
      img: 'assets/iphone-18-pro-max.png'
    }
  };

  let currentFinish = 'desert';

  function init3DPhone() {
    const stage = document.getElementById('heroPhone3dStage');
    if (!stage) return;

    const canvas = document.getElementById('heroPhoneCanvas');
    const fallback = document.getElementById('heroPhoneFallback');
    const fallbackInner = document.getElementById('heroPhoneFallbackInner');
    const fallbackImg = document.getElementById('heroPhoneFallbackImg');
    const glowBackdrop = document.getElementById('heroPhoneGlow');
    const hintPill = document.getElementById('heroPhoneHint');
    const colorChips = document.querySelectorAll('.color-chip-btn');

    // Motion State
    let isSplineReady = false;
    let splineApp = null;
    let splineIdle = null;
    let splineIphoneGroup = null;
    let splineIphoneContainer = null;

    let time = 0;
    const baseRotX = -5 * Math.PI / 180;
    const baseRotY = -24 * Math.PI / 180;

    let targetTiltX = 0;
    let targetTiltY = 0;
    let curTiltX = 0;
    let curTiltY = 0;

    let dragRotX = 0;
    let dragRotY = 0;
    let isDragging = false;
    let startPointerX = 0;
    let startPointerY = 0;

    let scrollProgress = 0;

    // 1. Color finish chip events
    colorChips.forEach(chip => {
      chip.addEventListener('click', (e) => {
        e.preventDefault();
        const finishKey = chip.getAttribute('data-finish');
        if (!finishKey || !FINISHES[finishKey]) return;

        colorChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        currentFinish = finishKey;

        const config = FINISHES[finishKey];
        if (glowBackdrop) {
          glowBackdrop.style.background = config.glow;
        }
        if (fallbackImg) {
          fallbackImg.src = config.img;
        }

        // Haptic feedback if available
        if (navigator.vibrate) {
          navigator.vibrate(15);
        }
      });
    });

    // 2. Interactive Pointer (Hover & Drag) Handling
    function handlePointerMove(e) {
      const rect = stage.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      if (isDragging) {
        const dx = e.clientX - startPointerX;
        const dy = e.clientY - startPointerY;
        dragRotY = (dx / rect.width) * Math.PI * 2.2;
        dragRotX = (dy / rect.height) * Math.PI * 0.8;
        return;
      }

      // Normalized coordinates (-1 to 1)
      const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

      // Subtle tilt targets
      targetTiltY = nx * 0.35; // ~20 degrees
      targetTiltX = -ny * 0.25; // ~15 degrees
    }

    function handlePointerDown(e) {
      isDragging = true;
      startPointerX = e.clientX - (dragRotY / (Math.PI * 2.2)) * stage.clientWidth;
      startPointerY = e.clientY - (dragRotX / (Math.PI * 0.8)) * stage.clientHeight;
      if (hintPill) hintPill.style.display = 'none';
      try {
        stage.setPointerCapture(e.pointerId);
      } catch (err) {}
    }

    function handlePointerUp(e) {
      isDragging = false;
      try {
        stage.releasePointerCapture(e.pointerId);
      } catch (err) {}
    }

    function handlePointerLeave() {
      if (!isDragging) {
        targetTiltX = 0;
        targetTiltY = 0;
      }
    }

    stage.addEventListener('pointermove', handlePointerMove);
    stage.addEventListener('pointerdown', handlePointerDown);
    stage.addEventListener('pointerup', handlePointerUp);
    stage.addEventListener('pointercancel', handlePointerUp);
    stage.addEventListener('pointerleave', handlePointerLeave);

    // 3. Scroll Tracking for 3D Spin Animation (Flowty style)
    window.addEventListener('scroll', () => {
      const hero = document.getElementById('home') || stage;
      const heroRect = hero.getBoundingClientRect();
      const heroHeight = hero.offsetHeight || 600;
      
      // Calculate scroll through hero into flagships
      const scrolled = Math.max(0, -heroRect.top);
      scrollProgress = Math.min(1.2, scrolled / (heroHeight * 0.85));
    }, { passive: true });

    // 4. Main Animation Frame Loop (Runs at 60fps)
    function renderLoop() {
      requestAnimationFrame(renderLoop);
      time += 0.028;

      // Levitation floating oscillation
      const floatY = Math.sin(time) * 12; // 12px smooth bobbing
      const floatRotY = Math.sin(time * 0.75) * 0.05;
      const floatRotX = Math.cos(time * 0.75) * 0.03;

      // Damped tilt interpolation
      curTiltX += (targetTiltX - curTiltX) * 0.12;
      curTiltY += (targetTiltY - curTiltY) * 0.12;

      // Scroll spin (spins 3D phone as user scrolls down)
      const scrollSpinY = scrollProgress * Math.PI * 1.5;
      const scrollPitchX = Math.sin(scrollProgress * Math.PI) * 0.2;

      // Total rotational values
      const totalRotY = baseRotY + curTiltY + dragRotY + floatRotY + scrollSpinY;
      const totalRotX = baseRotX + curTiltX + dragRotX + floatRotX + scrollPitchX;

      // Update Spline WebGL 3D Model if ready
      if (isSplineReady && splineIphoneGroup) {
        splineIphoneGroup.rotation.y = totalRotY;
        splineIphoneGroup.rotation.x = totalRotX;

        if (splineIdle) {
          splineIdle.position.y = floatY;
        }
      }

      // Update CSS 3D Fallback in real-time
      if (fallbackInner) {
        const degX = (totalRotX * 180 / Math.PI).toFixed(2);
        const degY = (totalRotY * 180 / Math.PI).toFixed(2);
        fallbackInner.style.transform = `translateY(${floatY.toFixed(1)}px) rotateX(${degX}deg) rotateY(${degY}deg)`;
      }
    }
    requestAnimationFrame(renderLoop);

    // 5. Try Loading Spline WebGL Model
    async function loadSplineScene() {
      if (!canvas) return;

      // Check WebGL availability
      try {
        const testGl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (!testGl) {
          console.info('WebGL not supported; keeping CSS 3D high-performance fallback.');
          return;
        }
      } catch (e) {
        return;
      }

      try {
        // Dynamically import Spline Application
        const { Application } = await import('./spline-runtime.js');
        splineApp = new Application(canvas);

        if (typeof splineApp.setUIWasmUrl === 'function') {
          splineApp.setUIWasmUrl('./js/ui.wasm');
        }

        await splineApp.load('./assets/phone.splinecode');

        splineIdle = splineApp.findObjectByName('Idle');
        splineIphoneGroup = splineApp.findObjectByName('iPhoneGroup');
        splineIphoneContainer = splineApp.findObjectByName('iPhoneContainer');

        if (splineIphoneGroup) {
          splineIphoneGroup.rotation.x = baseRotX;
          splineIphoneGroup.rotation.y = baseRotY;
          splineIphoneGroup.rotation.z = -17 * Math.PI / 180;
        }

        isSplineReady = true;
        canvas.classList.add('is-ready');

        // Smoothly hide CSS fallback once WebGL is painted
        setTimeout(() => {
          if (fallback) fallback.classList.add('canvas-active');
        }, 300);

        console.info('Flowty-style 3D Spline phone initialized successfully.');
      } catch (err) {
        console.warn('Spline WebGL load fallback used:', err.message);
        // Fallback remains active with CSS 3D physics
      }
    }

    loadSplineScene();
  }

  // Auto-init on DOMContentLoaded or immediate if ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init3DPhone);
  } else {
    init3DPhone();
  }
})();

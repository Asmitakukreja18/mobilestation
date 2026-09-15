// Mobile Station — Flagship Smartphone Showroom
// Warm Champagne Studio Theme & 3D Interactive Engine

// Initialize Lenis Smooth Scroll
let lenis;
if (typeof Lenis !== 'undefined') {
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}

document.addEventListener("DOMContentLoaded", () => {
  initSimplePreloader();
  initHeroMouseParallax();
  initStory3D();
  initScrollHeader();
  initScrollRevealObserver();
  triggerScannerSequence();
});

// =========================================================================
// 0. SIMPLE CLEAN PRELOADER & HERO ENTRANCE
// =========================================================================
function initSimplePreloader() {
  const preloader = document.getElementById("sitePreloader");
  if (!preloader) return;

  // Fade out smoothly after brief moment
  setTimeout(() => {
    preloader.classList.add("fade-out");
    triggerHeroEntrance();
    setTimeout(() => {
      preloader.style.display = "none";
    }, 450);
  }, 450);
}

// Mobile Menu Navigation Toggle
function toggleMobileMenu() {
  const drawer = document.getElementById("mobileNavDrawer");
  const btn = document.getElementById("mobileMenuBtn");
  if (drawer && btn) {
    drawer.classList.toggle("open");
    btn.classList.toggle("active");
  }
}

function closeMobileMenu() {
  const drawer = document.getElementById("mobileNavDrawer");
  const btn = document.getElementById("mobileMenuBtn");
  if (drawer && btn) {
    drawer.classList.remove("open");
    btn.classList.remove("active");
  }
}

function triggerHeroEntrance() {
  if (typeof gsap !== 'undefined') {
    const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.9 } });
    tl.fromTo(".site-header-clean", { y: -25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0.05)
      .fromTo(".cinematic-intro-overlay .hero-kicker-tag", { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 0.15)
      .fromTo(".cinematic-hero-title", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 0.25)
      .fromTo(".cinematic-hero-subtext", { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65 }, 0.38)
      .fromTo(".hero-cta-buttons-row", { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65 }, 0.48)
      .fromTo("#cinematicPhoneWrapper", { scale: 0.88, opacity: 0, x: 60 }, { scale: 1, opacity: 1, x: 0, duration: 1.1, ease: "expo.out" }, 0.25)
      .fromTo(".cinematic-bottom-bar", { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6 }, 0.6);
  }
}

// =========================================================================
// 1. APPLE-GRADE CINEMATIC SCROLL-LINKED 3D SMARTPHONE TIMELINE
// =========================================================================
function initHeroMouseParallax() {
  const phoneWrapper = document.getElementById("cinematicPhoneWrapper");
  const phone3D = document.getElementById("cinematicPhone3D");
  const introOverlay = document.getElementById("heroIntroOverlay");
  const callout1 = document.getElementById("calloutTitanium");
  const callout2 = document.getElementById("calloutCamera");
  const callout3 = document.getElementById("calloutDisplay");
  const shimmer = document.querySelector(".cinematic-glass-shimmer");

  if (!phoneWrapper || !phone3D) return;

  // 1. MASTER PINNED SCROLL TIMELINE (Scroll directly drives 360° phone transformations)
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    const masterTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#heroTrack",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.0,
        pin: "#heroStickyStage",
        anticipatePin: 1,
        invalidateOnRefresh: true
      }
    });

    // SCROLL PHASE 1 (0% -> 22%): Intro Fades, Phone Moves Center & Zooms In
    masterTimeline
      .to(introOverlay, {
        opacity: 0,
        y: -50,
        scale: 0.94,
        ease: "power2.inOut",
        duration: 0.2
      }, 0)
      .to(phoneWrapper, {
        xPercent: -22, // Center alignment
        yPercent: -2,
        scale: 1.2,
        ease: "power1.inOut",
        duration: 0.25
      }, 0)
      .to(phone3D, {
        rotationY: 75,
        rotationX: -6,
        ease: "power1.inOut",
        duration: 0.25
      }, 0);

    // SCROLL PHASE 2 (22% -> 50%): 180° Spin to Back, Titanium Architecture Callout
    masterTimeline
      .to(phone3D, {
        rotationY: 180,
        rotationX: 10,
        scale: 1.28,
        ease: "power1.inOut",
        duration: 0.28
      }, 0.22)
      .to(callout1, {
        opacity: 1,
        y: 0,
        scale: 1,
        ease: "back.out(1.4)",
        duration: 0.12
      }, 0.25)
      .to(callout1, {
        opacity: 0,
        y: -25,
        scale: 0.95,
        ease: "power2.in",
        duration: 0.1
      }, 0.45);

    // SCROLL PHASE 3 (50% -> 75%): Zoom into Quad-Optics Visor, Camera Callout
    masterTimeline
      .to(phone3D, {
        rotationY: 235,
        rotationX: 15,
        scale: 1.42,
        y: -20,
        ease: "power1.inOut",
        duration: 0.25
      }, 0.50)
      .to(callout2, {
        opacity: 1,
        y: 0,
        scale: 1,
        ease: "back.out(1.4)",
        duration: 0.12
      }, 0.52)
      .to(callout2, {
        opacity: 0,
        y: -25,
        scale: 0.95,
        ease: "power2.in",
        duration: 0.1
      }, 0.70);

    // SCROLL PHASE 4 (75% -> 92%): Front Face Rotation, ProMotion Display Callout
    masterTimeline
      .to(phone3D, {
        rotationY: 360,
        rotationX: 0,
        scale: 1.26,
        y: 0,
        ease: "power1.inOut",
        duration: 0.22
      }, 0.72)
      .to(callout3, {
        opacity: 1,
        y: 0,
        scale: 1,
        ease: "back.out(1.4)",
        duration: 0.12
      }, 0.75)
      .to(callout3, {
        opacity: 0,
        y: 30,
        scale: 0.95,
        ease: "power2.in",
        duration: 0.08
      }, 0.90);

    // SCROLL PHASE 5 (92% -> 100%): Majestic Out-Transition into Showroom Hub
    masterTimeline
      .to(phoneWrapper, {
        scale: 0.86,
        yPercent: -50,
        opacity: 0,
        ease: "power2.in",
        duration: 0.1
      }, 0.90);
  }

  // 2. INTERACTIVE 360° DRAG / SWIPE PHYSICS
  let isDragging = false;
  let previousX = 0;
  let manualSpinY = 0;
  let velocityY = 0;
  let ambientTiltX = 0, ambientTiltY = 0;
  let curTiltX = 0, curTiltY = 0;
  let loopId = null;

  window.addEventListener("mousemove", (e) => {
    if (isDragging || window.scrollY > 1200) return;
    ambientTiltX = (e.clientX / window.innerWidth - 0.5) * 16;
    ambientTiltY = (e.clientY / window.innerHeight - 0.5) * 12;
    startPhysicsLoop();
  });

  phone3D.addEventListener("mousedown", (e) => {
    isDragging = true;
    previousX = e.clientX;
    startPhysicsLoop();
  });

  window.addEventListener("mouseup", () => {
    isDragging = false;
  });

  window.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - previousX;
    previousX = e.clientX;
    velocityY = deltaX * 0.75;
    manualSpinY += velocityY;
    startPhysicsLoop();
  });

  phone3D.addEventListener("touchstart", (e) => {
    if (e.touches.length === 1) {
      isDragging = true;
      previousX = e.touches[0].clientX;
    }
  }, { passive: true });

  window.addEventListener("touchend", () => {
    isDragging = false;
  });

  window.addEventListener("touchmove", (e) => {
    if (!isDragging || e.touches.length !== 1) return;
    const deltaX = e.touches[0].clientX - previousX;
    previousX = e.touches[0].clientX;
    velocityY = deltaX * 0.85;
    manualSpinY += velocityY;
    startPhysicsLoop();
  }, { passive: true });

  function startPhysicsLoop() {
    if (!loopId) {
      loopId = requestAnimationFrame(updateDragPhysics);
    }
  }

  function updateDragPhysics() {
    if (!isDragging && Math.abs(velocityY) > 0.05) {
      velocityY *= 0.92;
      manualSpinY += velocityY;
    }

    curTiltX += (ambientTiltX - curTiltX) * 0.08;
    curTiltY += (ambientTiltY - curTiltY) * 0.08;

    if (Math.abs(manualSpinY) > 0.01) {
      phone3D.style.transform = `rotateY(${manualSpinY + curTiltX * 0.3}deg) rotateX(${-curTiltY * 0.3}deg)`;
    }

    if (isDragging || Math.abs(velocityY) > 0.05 || Math.abs(ambientTiltX - curTiltX) > 0.01) {
      loopId = requestAnimationFrame(updateDragPhysics);
    } else {
      loopId = null;
    }
  }
}

// Universal Scroll Reveal Observer
function initScrollRevealObserver() {
  const revealElements = document.querySelectorAll(".story-split-grid, .section-editorial-header, .quad-phone-card, .repair-split-box, .scanner-monolith-box, .showroom-single-pavilion, .footer-main-grid");
  
  if (!('IntersectionObserver' in window)) {
    revealElements.forEach(el => el.classList.add("is-revealed"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: "0px 0px -40px 0px"
  });

  revealElements.forEach(el => {
    el.classList.add("reveal-on-scroll");
    observer.observe(el);
  });
}

// Finish Switcher on Hero Spec Card Widget
function setSpecFinish(finishName, dotElement) {
  const nameLabel = document.getElementById("specFinishName");
  if (nameLabel) {
    nameLabel.innerText = finishName;
  }

  const dots = document.querySelectorAll(".finish-circle, .color-dot");
  dots.forEach(d => d.classList.remove("active"));
  if (dotElement) {
    dotElement.classList.add("active");
  }
}

// =========================================================================
// 2. 360° HARDWARE STORY STAGE (PROCEDURAL THREE.JS MODEL)
// =========================================================================
let storyScene, storyCamera, storyRenderer, storyPhoneGroup;
let storyChassisMesh, storyBackMesh;

const FINISH_COLORS = {
  burgundy: { chassis: 0x5a202d, back: 0x471520, rim: 0x8a2d42 },
  desert: { chassis: 0xcbb799, back: 0xdecbb4, rim: 0xf5dfc6 },
  natural: { chassis: 0xa8a6a0, back: 0xc4c2bb, rim: 0xe8e6df },
  black: { chassis: 0x242528, back: 0x1a1b1d, rim: 0x5a5d66 }
};

function initStory3D() {
  const canvas = document.getElementById("storyWebGLCanvas");
  if (!canvas || typeof THREE === 'undefined') return;

  const container = canvas.parentElement;
  const width = container.clientWidth || 560;
  const height = container.clientHeight || 520;

  storyScene = new THREE.Scene();

  storyCamera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
  storyCamera.position.set(0, 0, 8.0);

  storyRenderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
    powerPreference: "high-performance"
  });
  storyRenderer.setSize(width, height);
  storyRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  storyRenderer.toneMapping = THREE.ACESFilmicToneMapping;
  storyRenderer.toneMappingExposure = 1.35;

  // Studio Lighting
  const keyLight = new THREE.DirectionalLight(0xffffff, 2.6);
  keyLight.position.set(5, 5, 5);
  storyScene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0xfff7ed, 1.4);
  fillLight.position.set(-5, -2, 4);
  storyScene.add(fillLight);

  const rimLight = new THREE.PointLight(0xdf1349, 3.0, 12);
  rimLight.position.set(0, 3, -3);
  storyScene.add(rimLight);

  const ambient = new THREE.AmbientLight(0xffffff, 0.85);
  storyScene.add(ambient);

  // Build Procedural 3D Phone
  storyPhoneGroup = buildProceduralPhone(FINISH_COLORS.desert);
  storyScene.add(storyPhoneGroup);

  storyChassisMesh = storyPhoneGroup.userData.chassis;
  storyBackMesh = storyPhoneGroup.userData.back;

  // Scroll-Driven Continuous 360° Spin for 3D Studio Stage
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.to(storyPhoneGroup.rotation, {
      scrollTrigger: {
        trigger: "#story",
        start: "top bottom",
        end: "bottom top",
        scrub: 1.4
      },
      y: Math.PI * 2,
      ease: "none"
    });
  }

  // Interactive Drag-to-Rotate on 3D Canvas
  let isDragging3D = false;
  let previousMouseX = 0;
  let storyVelY = 0;

  canvas.style.cursor = "grab";
  canvas.addEventListener("mousedown", (e) => {
    isDragging3D = true;
    previousMouseX = e.clientX;
    canvas.style.cursor = "grabbing";
  });

  window.addEventListener("mouseup", () => {
    if (isDragging3D) {
      isDragging3D = false;
      canvas.style.cursor = "grab";
    }
  });

  window.addEventListener("mousemove", (e) => {
    if (!isDragging3D) return;
    const deltaX = e.clientX - previousMouseX;
    previousMouseX = e.clientX;
    storyVelY = deltaX * 0.012;
    storyPhoneGroup.rotation.y += storyVelY;
  });

  // Touch Drag for Mobile
  canvas.addEventListener("touchstart", (e) => {
    if (e.touches.length === 1) {
      isDragging3D = true;
      previousMouseX = e.touches[0].clientX;
    }
  }, { passive: true });

  window.addEventListener("touchend", () => {
    isDragging3D = false;
  });

  window.addEventListener("touchmove", (e) => {
    if (!isDragging3D || e.touches.length !== 1) return;
    const deltaX = e.touches[0].clientX - previousMouseX;
    previousMouseX = e.touches[0].clientX;
    storyVelY = deltaX * 0.014;
    storyPhoneGroup.rotation.y += storyVelY;
  }, { passive: true });

  window.addEventListener("resize", () => {
    if (!storyCamera || !storyRenderer) return;
    const newW = container.clientWidth || 560;
    const newH = container.clientHeight || 520;
    storyCamera.aspect = newW / newH;
    storyCamera.updateProjectionMatrix();
    storyRenderer.setSize(newW, newH);
  });

  function animateStory() {
    requestAnimationFrame(animateStory);
    if (storyPhoneGroup && !isDragging3D && Math.abs(storyVelY) > 0.0001) {
      storyVelY *= 0.94;
      storyPhoneGroup.rotation.y += storyVelY;
    }
    if (storyRenderer && storyScene && storyCamera) {
      storyRenderer.render(storyScene, storyCamera);
    }
  }
  animateStory();
}

function buildProceduralPhone(finish) {
  const group = new THREE.Group();

  const width = 2.45;
  const height = 5.05;
  const depth = 0.27;
  const radius = 0.36;

  // 1. Titanium Chassis Frame
  const chassisGeom = createRoundedBoxGeometry(width, height, depth, radius, 16);
  const chassisMat = new THREE.MeshPhysicalMaterial({
    color: finish.chassis,
    metalness: 0.96,
    roughness: 0.22,
    clearcoat: 0.9,
    clearcoatRoughness: 0.12,
    reflectivity: 0.95
  });
  const chassis = new THREE.Mesh(chassisGeom, chassisMat);
  group.add(chassis);

  // 2. Front Super Retina Display Screen
  const screenTexture = createScreenTexture();
  const screenGeom = new THREE.PlaneGeometry(width * 0.925, height * 0.94);
  const screenMat = new THREE.MeshBasicMaterial({ map: screenTexture });
  const screen = new THREE.Mesh(screenGeom, screenMat);
  screen.position.z = depth / 2 + 0.006;
  group.add(screen);

  // 3. Back Matte Frosted Glass Panel
  const backGeom = new THREE.PlaneGeometry(width * 0.93, height * 0.94);
  const backMat = new THREE.MeshPhysicalMaterial({
    color: finish.back,
    metalness: 0.12,
    roughness: 0.35,
    transmission: 0.18,
    thickness: 0.5
  });
  const back = new THREE.Mesh(backGeom, backMat);
  back.rotation.y = Math.PI;
  back.position.z = -(depth / 2 + 0.006);
  group.add(back);

  // 4. Rear Triple Camera Plateau
  const cameraModule = new THREE.Group();
  const plateauGeom = createRoundedBoxGeometry(1.15, 1.15, 0.14, 0.22, 8);
  const plateauMat = new THREE.MeshPhysicalMaterial({
    color: finish.chassis,
    metalness: 0.92,
    roughness: 0.25,
    clearcoat: 0.8
  });
  const plateau = new THREE.Mesh(plateauGeom, plateauMat);
  plateau.position.set(0.46, 1.58, -(depth / 2 + 0.07));
  cameraModule.add(plateau);

  // Triple Sapphire Lenses
  const lensRingGeom = new THREE.CylinderGeometry(0.22, 0.22, 0.18, 32);
  const lensRingMat = new THREE.MeshPhysicalMaterial({
    color: finish.chassis,
    metalness: 0.98,
    roughness: 0.15
  });

  const opticGeom = new THREE.CylinderGeometry(0.17, 0.17, 0.19, 32);
  const opticMat = new THREE.MeshPhysicalMaterial({
    color: 0x05070a,
    metalness: 0.9,
    roughness: 0.05,
    clearcoat: 1.0,
    reflectivity: 1.0
  });

  const opt1 = new THREE.Mesh(opticGeom, opticMat);
  opt1.rotation.x = Math.PI / 2;
  opt1.position.set(0.28, 1.82, -(depth / 2 + 0.14));
  cameraModule.add(opt1);

  const opt2 = new THREE.Mesh(opticGeom, opticMat);
  opt2.rotation.x = Math.PI / 2;
  opt2.position.set(0.68, 1.82, -(depth / 2 + 0.14));
  cameraModule.add(opt2);

  const opt3 = new THREE.Mesh(opticGeom, opticMat);
  opt3.rotation.x = Math.PI / 2;
  opt3.position.set(0.48, 1.38, -(depth / 2 + 0.14));
  cameraModule.add(opt3);

  group.add(cameraModule);

  group.userData = { chassis, back, screen };
  return group;
}

function createScreenTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 2048;
  const ctx = canvas.getContext("2d");

  const grad = ctx.createLinearGradient(0, 0, 1024, 2048);
  grad.addColorStop(0, "#080a10");
  grad.addColorStop(0.4, "#131622");
  grad.addColorStop(0.75, "#2a0d17");
  grad.addColorStop(1, "#08090d");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 2048);

  // Dynamic Island Notch Pill
  ctx.fillStyle = "#000000";
  ctx.beginPath();
  ctx.roundRect(392, 64, 240, 72, 36);
  ctx.fill();

  // Clock
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 168px 'Outfit', sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("09:41", 512, 440);

  // Date
  ctx.font = "600 56px 'Plus Jakarta Sans', sans-serif";
  ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
  ctx.fillText("Sunday, September 13", 512, 540);

  // Mobile Station Monogram Watermark
  ctx.font = "800 52px 'Outfit', sans-serif";
  ctx.fillStyle = "#df1349";
  ctx.fillText("MOBILE STATION", 512, 1840);

  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

function createRoundedBoxGeometry(w, h, d, r, s) {
  const shape = new THREE.Shape();
  const x = -w / 2;
  const y = -h / 2;

  shape.moveTo(x + r, y);
  shape.lineTo(x + w - r, y);
  shape.quadraticCurveTo(x + w, y, x + w, y + r);
  shape.lineTo(x + w, y + h - r);
  shape.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  shape.lineTo(x + r, y + h);
  shape.quadraticCurveTo(x, y + h, x, y + h - r);
  shape.lineTo(x, y + r);
  shape.quadraticCurveTo(x, y, x + r, y);

  const extrudeSettings = {
    depth: d,
    bevelEnabled: true,
    bevelSegments: s,
    steps: 1,
    bevelSize: r * 0.4,
    bevelThickness: r * 0.4
  };

  const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  geom.center();
  return geom;
}

const STORY_STAGES = [
  {
    badge: "01",
    title: "Super Retina XDR Display",
    desc: "6.9-inch OLED display with ProMotion 120Hz adaptive refresh rate and 2,000 nits peak outdoor brightness. Scratchless ceramic shield glass engineered for pure visual fidelity.",
    rot: { x: 0.05, y: 0.15, z: 0 },
    pos: { x: 0, y: 0, z: 0 }
  },
  {
    badge: "02",
    title: "Grade 5 Titanium Profile",
    desc: "Micro-blasted aerospace titanium chassis with precision chamfered contours. Ultra-light, ultra-strong thermal dispersion frame with zero bulk.",
    rot: { x: 0.0, y: Math.PI / 2, z: 0.08 },
    pos: { x: 0.2, y: 0, z: 0.4 }
  },
  {
    badge: "03",
    title: "48MP Fusion Triple Camera",
    desc: "Next-gen quad-pixel sensor with 5x optical telephoto prism, anti-reflective nano coating, and 4K 120fps Dolby Vision master studio recording.",
    rot: { x: 0.18, y: Math.PI - 0.25, z: 0 },
    pos: { x: -0.3, y: -0.4, z: 1.6 }
  },
  {
    badge: "04",
    title: "All-Day Power & Silicon",
    desc: "Up to 33 hours continuous high-drain battery life backed by cutting-edge 3nm Silicon architecture and MagSafe ultra-fast wireless charging.",
    rot: { x: 0.0, y: 0.0, z: 0 },
    pos: { x: 0, y: 0, z: 0.2 }
  }
];

function switchStoryStage(index, btnElement) {
  const stage = STORY_STAGES[index];
  if (!stage || !storyPhoneGroup) return;

  const badge = document.getElementById("storyBadge");
  const title = document.getElementById("storyTitle");
  const desc = document.getElementById("storyDesc");

  if (badge) badge.innerText = stage.badge;
  if (title) title.innerText = stage.title;
  if (desc) desc.innerText = stage.desc;

  const tabs = document.querySelectorAll(".story-tab-btn");
  tabs.forEach(t => t.classList.remove("active"));
  if (btnElement) {
    btnElement.classList.add("active");
  } else if (tabs[index]) {
    tabs[index].classList.add("active");
  }

  if (typeof gsap !== 'undefined') {
    gsap.to(storyPhoneGroup.rotation, {
      x: stage.rot.x,
      y: stage.rot.y,
      z: stage.rot.z,
      duration: 1.2,
      ease: "power3.inOut"
    });

    gsap.to(storyPhoneGroup.position, {
      x: stage.pos.x,
      y: stage.pos.y,
      z: stage.pos.z,
      duration: 1.2,
      ease: "power3.inOut"
    });
  }
}

// =========================================================================
// 3. INTERACTIVE REPAIR LAB SIMULATION
// =========================================================================
function simulateRepairAnimation(type) {
  const overlay = document.getElementById("crackOverlay");
  const counterVal = document.getElementById("batteryCounterVal");
  const btnScreen = document.getElementById("btnSimScreen");
  const btnBatt = document.getElementById("btnSimBatt");

  if (type === "screen") {
    btnScreen?.classList.add("active");
    btnBatt?.classList.remove("active");
    if (overlay) {
      overlay.classList.add("active");
      setTimeout(() => {
        overlay.classList.remove("active");
      }, 900);
    }
  } else if (type === "battery") {
    btnBatt?.classList.add("active");
    btnScreen?.classList.remove("active");

    let count = 12;
    const interval = setInterval(() => {
      count += 4;
      if (counterVal) counterVal.innerText = `${count}%`;
      if (count >= 100) {
        clearInterval(interval);
        if (counterVal) counterVal.innerText = "100%";
      }
    }, 45);
  }
}

// =========================================================================
// 4. FLAGSHIP CARDS FILTER SYSTEM
// =========================================================================
function filterFlagshipCards(category, btnElement) {
  const pills = document.querySelectorAll(".filter-pill-btn");
  pills.forEach(p => p.classList.remove("active"));
  if (btnElement) btnElement.classList.add("active");

  const cards = document.querySelectorAll(".quad-phone-card");
  cards.forEach(card => {
    const cardCat = card.getAttribute("data-cat") || "";
    if (category === "all" || cardCat.includes(category)) {
      card.style.display = "flex";
      card.style.opacity = "0";
      setTimeout(() => {
        card.style.opacity = "1";
      }, 50);
    } else {
      card.style.display = "none";
    }
  });
}

// =========================================================================
// 5. ADVANCED TRADE-IN SCANNER & DYNAMIC EVALUATION
// =========================================================================
const TRADE_MODELS = {
  "Apple": [
    { id: "15-promax", name: "iPhone 15 Pro Max", base: 68000 },
    { id: "15-pro", name: "iPhone 15 Pro", base: 58000 },
    { id: "15", name: "iPhone 15 / 15 Plus", base: 45000 },
    { id: "14-promax", name: "iPhone 14 Pro Max", base: 52000 },
    { id: "14-pro", name: "iPhone 14 Pro", base: 46000 },
    { id: "14", name: "iPhone 14 / 14 Plus", base: 36000 },
    { id: "13", name: "iPhone 13 / 13 Pro", base: 31000 },
    { id: "12", name: "iPhone 12 / 12 Pro", base: 22000 },
    { id: "11", name: "iPhone 11 Series", base: 16000 }
  ],
  "Samsung": [
    { id: "s24-ultra", name: "Galaxy S24 Ultra 5G", base: 72000 },
    { id: "s23-ultra", name: "Galaxy S23 Ultra 5G", base: 48000 },
    { id: "z-fold5", name: "Galaxy Z Fold 5", base: 56000 },
    { id: "s23", name: "Galaxy S23 / S23 Plus", base: 34000 },
    { id: "s22-ultra", name: "Galaxy S22 Ultra", base: 32000 },
    { id: "s21-series", name: "Galaxy S21 Series / FE", base: 18000 }
  ],
  "OnePlus": [
    { id: "op-12", name: "OnePlus 12 5G", base: 44000 },
    { id: "op-open", name: "OnePlus Open Foldable", base: 62000 },
    { id: "op-11", name: "OnePlus 11 5G", base: 28000 },
    { id: "op-10pro", name: "OnePlus 10 Pro / 10T", base: 19000 },
    { id: "op-9pro", name: "OnePlus 9 Pro / 9 Series", base: 14000 }
  ],
  "Vivo": [
    { id: "vivo-x100", name: "Vivo X100 / X100 Pro", base: 42000 },
    { id: "vivo-x90", name: "Vivo X90 Pro / Series", base: 27000 },
    { id: "vivo-v30", name: "Vivo V30 Pro / V29 Pro", base: 21000 }
  ],
  "Xiaomi": [
    { id: "mi-14", name: "Xiaomi 14 / 14 Ultra", base: 46000 },
    { id: "mi-13pro", name: "Xiaomi 13 Pro (Leica)", base: 29000 },
    { id: "redmi-note", name: "Redmi Note 13 / 12 Pro+", base: 13000 }
  ],
  "Google": [
    { id: "pixel-8pro", name: "Google Pixel 8 Pro", base: 45000 },
    { id: "pixel-7pro", name: "Google Pixel 7 Pro", base: 26000 },
    { id: "pixel-7a", name: "Google Pixel 7a / 6a", base: 16000 }
  ]
};

function onTradeBrandChange() {
  const brand = document.getElementById("tradeScanBrand")?.value || "Apple";
  const modelSelect = document.getElementById("tradeScanModel");
  if (!modelSelect) return;

  const models = TRADE_MODELS[brand] || TRADE_MODELS["Apple"];
  modelSelect.innerHTML = models.map(m => `<option value="${m.id}">${m.name}</option>`).join("");
  triggerScannerSequence();
}

function triggerScannerSequence() {
  const brand = document.getElementById("tradeScanBrand")?.value || "Apple";
  const modelId = document.getElementById("tradeScanModel")?.value;
  const storage = parseInt(document.getElementById("tradeScanStorage")?.value || "256", 10);
  const condition = document.getElementById("tradeScanCondition")?.value || "good";
  const func = document.getElementById("tradeScanFunction")?.value || "perfect";
  const box = document.getElementById("tradeScanBox")?.value || "box-bill";
  const ticker = document.getElementById("scannerValTicker");

  const models = TRADE_MODELS[brand] || TRADE_MODELS["Apple"];
  const matched = models.find(m => m.id === modelId) || models[0];
  let basePrice = matched ? matched.base : 35000;

  // Storage multiplier
  if (storage === 128) basePrice *= 0.92;
  else if (storage === 512) basePrice *= 1.10;
  else if (storage === 1024) basePrice *= 1.20;

  // Condition Multiplier
  const conditionMult = {
    "flawless": 1.05,
    "good": 0.95,
    "cracked-glass": 0.72,
    "heavy-dent": 0.78,
    "display-line": 0.55
  };
  basePrice *= (conditionMult[condition] || 0.95);

  // Functional Multiplier
  const funcMult = {
    "perfect": 1.0,
    "batt-service": 0.88,
    "camera-issue": 0.82,
    "minor-fault": 0.85
  };
  basePrice *= (funcMult[func] || 1.0);

  // Box & Bill Bonus
  if (box === "box-bill") basePrice += 1500;
  else if (box === "handset-only") basePrice -= 800;

  const minVal = Math.round((basePrice * 0.96) / 500) * 500;
  const maxVal = Math.round((basePrice * 1.05) / 500) * 500;

  if (ticker) {
    ticker.innerText = `₹${minVal.toLocaleString('en-IN')} – ₹${maxVal.toLocaleString('en-IN')}`;
  }
}

function sendTradeInWhatsApp() {
  const brand = document.getElementById("tradeScanBrand")?.value || "Apple";
  const modelText = document.getElementById("tradeScanModel")?.selectedOptions[0]?.text || "Smartphone";
  const storageText = document.getElementById("tradeScanStorage")?.selectedOptions[0]?.text || "256 GB";
  const conditionText = document.getElementById("tradeScanCondition")?.selectedOptions[0]?.text || "Good";
  const funcText = document.getElementById("tradeScanFunction")?.selectedOptions[0]?.text || "All Working";
  const boxText = document.getElementById("tradeScanBox")?.selectedOptions[0]?.text || "Box Available";
  const tickerText = document.getElementById("scannerValTicker")?.innerText || "Indicative Estimate";

  const message = `Hello Mobile Station (Garud Complex)! I evaluated my phone for Exchange/Trade-In:
• Brand & Model: ${brand} ${modelText} (${storageText})
• Physical Condition: ${conditionText}
• Functional Status: ${funcText}
• Box/Invoice: ${boxText}
• Indicative Online Estimate: ${tickerText}

Please confirm the spot valuation and best exchange upgrade offer at Garud Complex showroom.`;

  const url = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

// =========================================================================
// 6. DIRECT WHATSAPP ORDERING (MOBILE STATION ONLY)
// =========================================================================
function orderWhatsAppDirect(productId) {
  const productMap = {
    "prod-001": { title: "iPhone 16 Pro Max", price: "₹1,44,900" },
    "prod-002": { title: "Samsung Galaxy S24 Ultra 5G", price: "₹1,19,999" },
    "prod-003": { title: "OnePlus 12 5G", price: "₹64,999" },
    "prod-004": { title: "Vivo X100 / X200 Pro 5G", price: "₹89,999" },
    "prod-005": { title: "Samsung Galaxy Z Fold 6 5G", price: "₹1,64,999" },
    "prod-006": { title: "Apple iPhone 16", price: "₹79,900" }
  };

  const item = productMap[productId] || { title: "Smartphone Flagship", price: "Best Price" };
  const message = `Hello Mobile Station (Garud Complex)! I want to purchase the sealed ${item.title} (${item.price}). Please confirm available colors, 0% EMI scheme, and billing offer.`;
  const url = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

function initScrollHeader() {
  const header = document.getElementById("siteHeader");
  if (!header) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}


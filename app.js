// Mobile Station & Siddhi Marketing — Ultra-Clean Luxury Light Theme 3D Engine
// Procedural WebGL Models • GSAP 360° Choreography • WhatsApp Concierge

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

// Global 3D State for Hero
let heroScene, heroCamera, heroRenderer, heroPhoneGroup;
let heroChassisMesh, heroBackMesh;
let heroTargetRotX = 0, heroTargetRotY = 0;

// Global 3D State for Story Stage
let storyScene, storyCamera, storyRenderer, storyPhoneGroup;
let storyChassisMesh, storyBackMesh, storyBatteryMesh;

const FINISH_COLORS = {
  desert: { chassis: 0xcbb799, back: 0xdecbb4, rim: 0xf5dfc6 },
  natural: { chassis: 0xa8a6a0, back: 0xc4c2bb, rim: 0xe8e6df },
  black: { chassis: 0x242528, back: 0x1a1b1d, rim: 0x4a4d55 }
};

document.addEventListener("DOMContentLoaded", () => {
  initHero3D();
  initStory3D();
  initScrollHeader();
  triggerScannerSequence();
  initB2BCounters();
});

// =========================================================================
// 1. HERO 3D SMARTPHONE (STUDIO LIGHTING & PARALLAX)
// =========================================================================
function initHero3D() {
  const canvas = document.getElementById("heroWebGLCanvas");
  if (!canvas || typeof THREE === 'undefined') return;

  const container = canvas.parentElement;
  const width = container.clientWidth || 440;
  const height = container.clientHeight || 480;

  heroScene = new THREE.Scene();

  heroCamera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
  heroCamera.position.set(0, 0, 8.2);

  heroRenderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
    powerPreference: "high-performance"
  });
  heroRenderer.setSize(width, height);
  heroRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  heroRenderer.toneMapping = THREE.ACESFilmicToneMapping;
  heroRenderer.toneMappingExposure = 1.35;

  // Studio Lighting (Clean Light Theme)
  const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
  keyLight.position.set(4, 5, 5);
  heroScene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0xffeedd, 1.4);
  fillLight.position.set(-4, -2, 3);
  heroScene.add(fillLight);

  const rimLight = new THREE.PointLight(0xe11d48, 2.2, 12);
  rimLight.position.set(2, 2, -3);
  heroScene.add(rimLight);

  const ambient = new THREE.AmbientLight(0xffffff, 0.85);
  heroScene.add(ambient);

  // Build Hero Phone
  heroPhoneGroup = createSmartphoneModel(FINISH_COLORS.desert, false);
  heroPhoneGroup.rotation.y = -0.25;
  heroPhoneGroup.rotation.x = 0.12;
  heroScene.add(heroPhoneGroup);

  heroChassisMesh = heroPhoneGroup.userData.chassis;
  heroBackMesh = heroPhoneGroup.userData.back;

  // Mouse Parallax on Hero Box
  window.addEventListener("mousemove", (e) => {
    if (window.scrollY > 800) return;
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    heroTargetRotY = -0.25 + x * 0.45;
    heroTargetRotX = 0.12 + y * 0.35;
  });

  window.addEventListener("resize", () => {
    if (!heroCamera || !heroRenderer) return;
    const newW = container.clientWidth || 440;
    const newH = container.clientHeight || 480;
    heroCamera.aspect = newW / newH;
    heroCamera.updateProjectionMatrix();
    heroRenderer.setSize(newW, newH);
  });

  // Render Loop
  function animateHero() {
    requestAnimationFrame(animateHero);
    if (heroPhoneGroup) {
      heroPhoneGroup.rotation.y += (heroTargetRotY - heroPhoneGroup.rotation.y) * 0.08;
      heroPhoneGroup.rotation.x += (heroTargetRotX - heroPhoneGroup.rotation.x) * 0.08;
      // Gentle floating oscillation
      heroPhoneGroup.position.y = Math.sin(Date.now() * 0.0018) * 0.08;
    }
    if (heroRenderer && heroScene && heroCamera) {
      heroRenderer.render(heroScene, heroCamera);
    }
  }
  animateHero();
}

// Finish Switcher for Hero Phone
function setHeroPhoneFinish(finishKey, btnElement) {
  const finish = FINISH_COLORS[finishKey];
  if (!finish || !heroChassisMesh || !heroBackMesh) return;

  if (typeof gsap !== 'undefined') {
    gsap.to(heroChassisMesh.material.color, {
      r: ((finish.chassis >> 16) & 255) / 255,
      g: ((finish.chassis >> 8) & 255) / 255,
      b: (finish.chassis & 255) / 255,
      duration: 0.5
    });

    gsap.to(heroBackMesh.material.color, {
      r: ((finish.back >> 16) & 255) / 255,
      g: ((finish.back >> 8) & 255) / 255,
      b: (finish.back & 255) / 255,
      duration: 0.5
    });
  }

  const buttons = document.querySelectorAll(".hero-finish-selector .finish-btn");
  buttons.forEach(b => b.classList.remove("active"));
  if (btnElement) btnElement.classList.add("active");
}

// =========================================================================
// 2. 360° HARDWARE STORY STAGE 3D SMARTPHONE
// =========================================================================
function initStory3D() {
  const canvas = document.getElementById("storyWebGLCanvas");
  if (!canvas || typeof THREE === 'undefined') return;

  const container = canvas.parentElement;
  const width = container.clientWidth || 560;
  const height = container.clientHeight || 520;

  storyScene = new THREE.Scene();

  storyCamera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
  storyCamera.position.set(0, 0, 7.8);

  storyRenderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
    powerPreference: "high-performance"
  });
  storyRenderer.setSize(width, height);
  storyRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  storyRenderer.toneMapping = THREE.ACESFilmicToneMapping;
  storyRenderer.toneMappingExposure = 1.3;

  // Studio Lighting
  const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
  keyLight.position.set(4, 5, 5);
  storyScene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0xffeedd, 1.2);
  fillLight.position.set(-4, -2, 4);
  storyScene.add(fillLight);

  const rimLight = new THREE.PointLight(0xe11d48, 2.5, 10);
  rimLight.position.set(0, 3, -3);
  storyScene.add(rimLight);

  const ambient = new THREE.AmbientLight(0xffffff, 0.8);
  storyScene.add(ambient);

  // Build Story Phone with Internal Battery Component
  storyPhoneGroup = createSmartphoneModel(FINISH_COLORS.desert, true);
  storyScene.add(storyPhoneGroup);

  storyChassisMesh = storyPhoneGroup.userData.chassis;
  storyBackMesh = storyPhoneGroup.userData.back;
  storyBatteryMesh = storyPhoneGroup.userData.battery;

  window.addEventListener("resize", () => {
    if (!storyCamera || !storyRenderer) return;
    const newW = container.clientWidth || 560;
    const newH = container.clientHeight || 520;
    storyCamera.aspect = newW / newH;
    storyCamera.updateProjectionMatrix();
    storyRenderer.setSize(newW, newH);
  });

  // Render Loop
  function animateStory() {
    requestAnimationFrame(animateStory);
    if (storyRenderer && storyScene && storyCamera) {
      storyRenderer.render(storyScene, storyCamera);
    }
  }
  animateStory();
}

// Switch Story 360° Stage with Buttery Smooth GSAP Animation
const STORY_STAGES = [
  {
    badge: "01",
    title: "Super Retina XDR Display",
    desc: "6.9-inch OLED display with ProMotion 120Hz adaptive refresh rate and 2,000 nits peak outdoor brightness. Scratchless ceramic shield glass engineered for pure visual fidelity.",
    rot: { x: 0.05, y: 0.15, z: 0 },
    pos: { x: 0, y: 0, z: 0 },
    batteryAlpha: 0,
    bodyAlpha: 1.0
  },
  {
    badge: "02",
    title: "Grade 5 Titanium Profile",
    desc: "Micro-blasted aerospace titanium chassis with precision chamfered contours. Ultra-light, ultra-strong thermal dispersion frame with zero bulk.",
    rot: { x: 0.0, y: Math.PI / 2, z: 0.08 },
    pos: { x: 0.2, y: 0, z: 0.4 },
    batteryAlpha: 0,
    bodyAlpha: 1.0
  },
  {
    badge: "03",
    title: "48MP Fusion Triple Camera",
    desc: "Next-gen quad-pixel sensor with 5x optical telephoto prism, anti-reflective nano coating, and 4K 120fps Dolby Vision master studio recording.",
    rot: { x: 0.18, y: Math.PI - 0.25, z: 0 },
    pos: { x: -0.3, y: -0.4, z: 1.6 },
    batteryAlpha: 0,
    bodyAlpha: 1.0
  },
  {
    badge: "04",
    title: "All-Day Power & Silicon",
    desc: "Up to 33 hours continuous high-drain battery life backed by cutting-edge 3nm Silicon architecture and MagSafe ultra-fast wireless charging.",
    rot: { x: 0.0, y: 0.0, z: 0 },
    pos: { x: 0, y: 0, z: 0.2 },
    batteryAlpha: 0.95,
    bodyAlpha: 0.35
  }
];

function switchStoryStage(index, btnElement) {
  const stage = STORY_STAGES[index];
  if (!stage || !storyPhoneGroup) return;

  // Update DOM Text
  const badge = document.getElementById("storyBadge");
  const title = document.getElementById("storyTitle");
  const desc = document.getElementById("storyDesc");

  if (badge) badge.innerText = stage.badge;
  if (title) title.innerText = stage.title;
  if (desc) desc.innerText = stage.desc;

  // Update Active Button
  const tabs = document.querySelectorAll(".story-tab-btn");
  tabs.forEach(t => t.classList.remove("active"));
  if (btnElement) {
    btnElement.classList.add("active");
  } else if (tabs[index]) {
    tabs[index].classList.add("active");
  }

  // Animate 3D Phone with GSAP
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

    if (storyBatteryMesh) {
      gsap.to(storyBatteryMesh.material, {
        opacity: stage.batteryAlpha,
        duration: 0.8
      });
    }

    if (storyChassisMesh && storyBackMesh) {
      gsap.to([storyChassisMesh.material, storyBackMesh.material], {
        opacity: stage.bodyAlpha,
        transparent: stage.bodyAlpha < 1.0,
        duration: 0.8
      });
    }
  }
}

// =========================================================================
// 3. REUSABLE THREE.JS SMARTPHONE BUILDER
// =========================================================================
function createSmartphoneModel(finish, includeBattery) {
  const group = new THREE.Group();

  const width = 2.4;
  const height = 4.9;
  const depth = 0.26;
  const radius = 0.35;

  // 1. Titanium Chassis
  const chassisGeom = createRoundedBoxGeometry(width, height, depth, radius, 16);
  const chassisMat = new THREE.MeshPhysicalMaterial({
    color: finish.chassis,
    metalness: 0.95,
    roughness: 0.22,
    clearcoat: 0.9,
    clearcoatRoughness: 0.1,
    reflectivity: 0.95
  });
  const chassis = new THREE.Mesh(chassisGeom, chassisMat);
  group.add(chassis);

  // 2. Front OLED Display Screen
  const screenTexture = createScreenTexture();
  const screenGeom = new THREE.PlaneGeometry(width * 0.92, height * 0.94);
  const screenMat = new THREE.MeshBasicMaterial({ map: screenTexture });
  const screen = new THREE.Mesh(screenGeom, screenMat);
  screen.position.z = depth / 2 + 0.005;
  group.add(screen);

  // 3. Back Matte Frosted Glass Panel
  const backGeom = new THREE.PlaneGeometry(width * 0.93, height * 0.94);
  const backMat = new THREE.MeshPhysicalMaterial({
    color: finish.back,
    metalness: 0.15,
    roughness: 0.35,
    transmission: 0.15,
    thickness: 0.4
  });
  const back = new THREE.Mesh(backGeom, backMat);
  back.rotation.y = Math.PI;
  back.position.z = -(depth / 2 + 0.005);
  group.add(back);

  // 4. Triple Camera Island
  const cameraModule = new THREE.Group();
  const islandPlateGeom = createRoundedBoxGeometry(1.1, 1.1, 0.12, 0.2, 8);
  const islandPlateMat = new THREE.MeshPhysicalMaterial({
    color: finish.chassis,
    metalness: 0.9,
    roughness: 0.25
  });
  const islandPlate = new THREE.Mesh(islandPlateGeom, islandPlateMat);
  islandPlate.position.set(0.45, 1.55, -(depth / 2 + 0.06));
  cameraModule.add(islandPlate);

  // Lenses
  const lensGeom = new THREE.CylinderGeometry(0.18, 0.18, 0.14, 24);
  const lensMat = new THREE.MeshPhysicalMaterial({
    color: 0x08090d,
    metalness: 0.95,
    roughness: 0.08,
    clearcoat: 1.0,
    reflectivity: 1.0
  });

  const lens1 = new THREE.Mesh(lensGeom, lensMat);
  lens1.rotation.x = Math.PI / 2;
  lens1.position.set(0.28, 1.75, -(depth / 2 + 0.12));
  cameraModule.add(lens1);

  const lens2 = new THREE.Mesh(lensGeom, lensMat);
  lens2.rotation.x = Math.PI / 2;
  lens2.position.set(0.65, 1.75, -(depth / 2 + 0.12));
  cameraModule.add(lens2);

  const lens3 = new THREE.Mesh(lensGeom, lensMat);
  lens3.rotation.x = Math.PI / 2;
  lens3.position.set(0.45, 1.35, -(depth / 2 + 0.12));
  cameraModule.add(lens3);

  group.add(cameraModule);

  let battery = null;
  if (includeBattery) {
    const battGeom = new THREE.BoxGeometry(1.6, 2.8, 0.08);
    const battMat = new THREE.MeshBasicMaterial({
      color: 0x22c55e,
      wireframe: true,
      transparent: true,
      opacity: 0
    });
    battery = new THREE.Mesh(battGeom, battMat);
    battery.position.set(0, -0.2, 0);
    group.add(battery);
  }

  group.userData = { chassis, back, battery };
  return group;
}

// Procedural Screen Texture
function createScreenTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");

  // Crisp Editorial Gradient Wallpaper
  const grad = ctx.createLinearGradient(0, 0, 512, 1024);
  grad.addColorStop(0, "#ffffff");
  grad.addColorStop(0.3, "#f8fafc");
  grad.addColorStop(0.7, "#fce7ec");
  grad.addColorStop(1, "#ffe4e6");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 1024);

  // Dynamic Island Notch
  ctx.fillStyle = "#0b0d12";
  ctx.beginPath();
  ctx.roundRect(196, 32, 120, 36, 18);
  ctx.fill();

  // Clock
  ctx.fillStyle = "#0b0d12";
  ctx.font = "bold 84px 'Outfit', sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("09:41", 256, 220);

  // Date
  ctx.font = "600 28px 'Plus Jakarta Sans', sans-serif";
  ctx.fillStyle = "rgba(11, 13, 18, 0.65)";
  ctx.fillText("Sunday, September 13", 256, 270);

  // Brand Watermark
  ctx.font = "800 24px 'Outfit', sans-serif";
  ctx.fillStyle = "#e11d48";
  ctx.fillText("MOBILE STATION", 256, 920);

  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

// Rounded Box Geometry Helper
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

// =========================================================================
// 4. INTERACTIVE REPAIR LAB SIMULATION (CRACK TO OLED & BATTERY SURGE)
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
// 5. HARDWARE TRADE-IN SCANNER SIMULATION
// =========================================================================
function triggerScannerSequence() {
  const brand = document.getElementById("tradeScanBrand")?.value || "Apple";
  const condition = document.getElementById("tradeScanCondition")?.value || "flawless";
  const ticker = document.getElementById("scannerValTicker");

  const baseValues = {
    "Apple": 48000,
    "Samsung": 38000,
    "OnePlus": 26000,
    "Vivo": 18000,
    "Xiaomi": 14000
  };

  const conditionMultiplier = {
    "flawless": 1.0,
    "good": 0.82,
    "cracked": 0.65
  };

  const targetVal = Math.round((baseValues[brand] || 35000) * (conditionMultiplier[condition] || 1.0));

  let current = Math.round(targetVal * 0.4);
  const step = Math.round((targetVal - current) / 15);

  const interval = setInterval(() => {
    current += step;
    if (current >= targetVal) {
      current = targetVal;
      clearInterval(interval);
    }
    if (ticker) {
      ticker.innerText = "₹" + current.toLocaleString('en-IN');
    }
  }, 40);
}

// =========================================================================
// 6. DIRECT WHATSAPP ORDERING CONCIERGE
// =========================================================================
function orderWhatsAppDirect(productId) {
  const productMap = {
    "prod-001": { title: "iPhone 16 Pro Max", price: "₹1,44,900" },
    "prod-002": { title: "Samsung Galaxy S24 Ultra 5G", price: "₹1,19,999" },
    "prod-003": { title: "OnePlus 12 5G", price: "₹64,999" },
    "prod-004": { title: "Vivo V40 Pro 5G", price: "₹49,999" }
  };

  const item = productMap[productId] || { title: "Smartphone Flagship", price: "Best Price" };
  const message = `Hello Mobile Station (Garud Complex)! I want to purchase the ${item.title} (${item.price}). Please confirm instant availability, color options, and billing offer.`;
  const url = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

// =========================================================================
// 7. HEADER BLUR ON SCROLL & B2B COUNTERS
// =========================================================================
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

function initB2BCounters() {
  const partnerEl = document.getElementById("b2bPartnersCount");
  const unitsEl = document.getElementById("b2bUnitsCount");

  if (typeof ScrollTrigger !== 'undefined' && partnerEl && unitsEl) {
    ScrollTrigger.create({
      trigger: "#showrooms",
      start: "top 80%",
      once: true,
      onEnter: () => {
        let partners = 0;
        let units = 0;
        const pInt = setInterval(() => {
          partners += 25;
          if (partners >= 500) {
            partners = 500;
            clearInterval(pInt);
          }
          partnerEl.innerText = `${partners}+`;
        }, 50);

        const uInt = setInterval(() => {
          units += 2;
          if (units >= 50) {
            units = 50;
            clearInterval(uInt);
          }
          unitsEl.innerText = `${units}K+`;
        }, 40);
      }
    });
  }
}

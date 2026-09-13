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
  initHeroMouseParallax();
  initStory3D();
  initScrollHeader();
  triggerScannerSequence();
});

// =========================================================================
// 1. HERO STUDIO CENTER PIECE MOUSE PARALLAX
// =========================================================================
function initHeroMouseParallax() {
  const visual = document.getElementById("heroStudioCenter");
  if (!visual) return;

  window.addEventListener("mousemove", (e) => {
    if (window.scrollY > 600) return;
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 15;
    visual.style.transform = `perspective(1000px) rotateY(${x * 0.4}deg) rotateX(${-y * 0.4}deg) translateY(${y * 0.3}px)`;
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
// 4. HARDWARE TRADE-IN SCANNER SIMULATION
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
// 5. DIRECT WHATSAPP ORDERING (MOBILE STATION ONLY)
// =========================================================================
function orderWhatsAppDirect(productId) {
  const productMap = {
    "prod-001": { title: "iPhone 16 Pro Max", price: "₹1,44,900" },
    "prod-002": { title: "Samsung Galaxy S24 Ultra 5G", price: "₹1,19,999" },
    "prod-003": { title: "OnePlus 12 5G", price: "₹64,999" },
    "prod-004": { title: "Vivo V40 Pro 5G", price: "₹49,999" }
  };

  const item = productMap[productId] || { title: "Smartphone Flagship", price: "Best Price" };
  const message = `Hello Mobile Station (Garud Complex)! I want to purchase the ${item.title} (${item.price}). Please confirm availability, color options, and billing offer.`;
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

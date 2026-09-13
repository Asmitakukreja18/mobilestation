// Mobile Station — Next-Level 3D WebGL & GSAP Scroll-Driven Engine

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

// Global 3D State
let scene, camera, renderer, phoneGroup;
let chassisMesh, screenMesh, backMesh, cameraModule, batteryMesh;
let keyLight, fillLight, rimLight;

const FINISH_COLORS = {
  desert: { chassis: 0xcbb799, back: 0xdecbb4, rim: 0xf5dfc6 },
  natural: { chassis: 0x9e9b94, back: 0xb5b2ab, rim: 0xd8d6d0 },
  black: { chassis: 0x222326, back: 0x18191c, rim: 0x4a4d55 }
};

document.addEventListener("DOMContentLoaded", () => {
  init3DScene();
  initOpeningReveal();
  initGSAPScrollStory();
  initScrollHeader();
  triggerScannerSequence();
});

// =========================================================================
// 1. THREE.JS PROCEDURAL 3D SMARTPHONE ENGINE
// =========================================================================
function init3DScene() {
  const canvas = document.getElementById("phoneWebGLCanvas");
  if (!canvas || typeof THREE === 'undefined') return;

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(38, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 0, 8.5);

  renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
    powerPreference: "high-performance"
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.3;

  // Studio Lighting
  keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
  keyLight.position.set(5, 5, 6);
  scene.add(keyLight);

  fillLight = new THREE.DirectionalLight(0xffffff, 1.2);
  fillLight.position.set(-5, -3, 4);
  scene.add(fillLight);

  rimLight = new THREE.PointLight(0xe51d48, 4.0, 15);
  rimLight.position.set(2, 3, -4);
  scene.add(rimLight);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  // Construct 3D Phone Model
  buildPhoneModel();

  // Mouse Parallax on Hero
  window.addEventListener("mousemove", onMouseMoveParallax);
  window.addEventListener("resize", onWindowResize);

  // Render Loop
  animate3D();
}

function buildPhoneModel() {
  phoneGroup = new THREE.Group();

  const width = 2.4;
  const height = 4.9;
  const depth = 0.28;
  const radius = 0.35;

  // 1. Titanium Chassis Frame
  const chassisGeom = createRoundedBoxGeometry(width, height, depth, radius, 16);
  const chassisMat = new THREE.MeshPhysicalMaterial({
    color: FINISH_COLORS.desert.chassis,
    metalness: 0.95,
    roughness: 0.22,
    clearcoat: 0.8,
    clearcoatRoughness: 0.15,
    reflectivity: 0.9
  });
  chassisMesh = new THREE.Mesh(chassisGeom, chassisMat);
  phoneGroup.add(chassisMesh);

  // 2. Front OLED Display with Custom Canvas Wallpaper
  const screenTexture = createScreenTexture();
  const screenGeom = new THREE.PlaneGeometry(width * 0.92, height * 0.94);
  const screenMat = new THREE.MeshBasicMaterial({
    map: screenTexture
  });
  screenMesh = new THREE.Mesh(screenGeom, screenMat);
  screenMesh.position.z = depth / 2 + 0.005;
  phoneGroup.add(screenMesh);

  // 3. Back Matte Frosted Glass Panel
  const backGeom = new THREE.PlaneGeometry(width * 0.94, height * 0.94);
  const backMat = new THREE.MeshPhysicalMaterial({
    color: FINISH_COLORS.desert.back,
    metalness: 0.1,
    roughness: 0.35,
    transmission: 0.2,
    thickness: 0.5
  });
  backMesh = new THREE.Mesh(backGeom, backMat);
  backMesh.rotation.y = Math.PI;
  backMesh.position.z = -(depth / 2 + 0.005);
  phoneGroup.add(backMesh);

  // 4. Triple Camera Island on Rear
  cameraModule = new THREE.Group();
  const islandPlateGeom = createRoundedBoxGeometry(1.1, 1.1, 0.12, 0.2, 8);
  const islandPlateMat = new THREE.MeshPhysicalMaterial({
    color: FINISH_COLORS.desert.chassis,
    metalness: 0.9,
    roughness: 0.25
  });
  const islandPlate = new THREE.Mesh(islandPlateGeom, islandPlateMat);
  islandPlate.position.set(0.45, 1.55, -(depth / 2 + 0.06));
  cameraModule.add(islandPlate);

  // Three Sapphire Lenses
  const lensGeom = new THREE.CylinderGeometry(0.18, 0.18, 0.14, 24);
  const lensMat = new THREE.MeshPhysicalMaterial({
    color: 0x0a0c10,
    metalness: 0.95,
    roughness: 0.1,
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

  phoneGroup.add(cameraModule);

  // 5. Internal Glowing Battery Component (Revealed during Battery Step)
  const battGeom = new THREE.BoxGeometry(1.6, 2.8, 0.08);
  const battMat = new THREE.MeshBasicMaterial({
    color: 0x22c55e,
    wireframe: true,
    transparent: true,
    opacity: 0
  });
  batteryMesh = new THREE.Mesh(battGeom, battMat);
  batteryMesh.position.set(0, -0.2, 0);
  phoneGroup.add(batteryMesh);

  // Initial Placement
  phoneGroup.position.set(2.0, 0, 0);
  scene.add(phoneGroup);
}

// Procedural Screen Texture
function createScreenTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");

  // Gradient Wallpaper
  const grad = ctx.createLinearGradient(0, 0, 512, 1024);
  grad.addColorStop(0, "#080a12");
  grad.addColorStop(0.5, "#e51d48");
  grad.addColorStop(1, "#12050b");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 1024);

  // Dynamic Island Notch
  ctx.fillStyle = "#000000";
  ctx.beginPath();
  ctx.roundRect(196, 30, 120, 36, 18);
  ctx.fill();

  // Clock
  ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
  ctx.font = "bold 84px 'Outfit', sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("09:41", 256, 220);

  // Date
  ctx.font = "600 28px 'Plus Jakarta Sans', sans-serif";
  ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
  ctx.fillText("Sunday, September 13", 256, 270);

  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

// Helper: Rounded Box Geometry
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

// Mouse Parallax in Hero
let targetRotX = 0;
let targetRotY = 0;

function onMouseMoveParallax(e) {
  if (window.scrollY > window.innerHeight) return;
  const x = (e.clientX / window.innerWidth - 0.5) * 2;
  const y = (e.clientY / window.innerHeight - 0.5) * 2;

  targetRotY = x * 0.45;
  targetRotX = y * 0.35;
}

function onWindowResize() {
  if (!camera || !renderer) return;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate3D() {
  requestAnimationFrame(animate3D);

  if (phoneGroup && window.scrollY < window.innerHeight * 0.8) {
    phoneGroup.rotation.y += (targetRotY - phoneGroup.rotation.y) * 0.05;
    phoneGroup.rotation.x += (targetRotX - phoneGroup.rotation.x) * 0.05;
  }

  if (renderer && scene && camera) {
    renderer.render(scene, camera);
  }
}

// =========================================================================
// 2. OPENING 3-5 SECOND CINEMATIC REVEAL
// =========================================================================
function initOpeningReveal() {
  const curtain = document.getElementById("openingCurtain");
  if (!phoneGroup) return;

  // Set initial dramatic darkness position
  phoneGroup.rotation.set(0, Math.PI, 0);
  phoneGroup.position.set(0, 0, 3.5);

  setTimeout(() => {
    if (typeof gsap !== 'undefined') {
      const tl = gsap.timeline();

      // Sweep light & rotate phone from rear -> side -> front
      tl.to(phoneGroup.rotation, { y: 0, duration: 2.2, ease: "power3.inOut" })
        .to(phoneGroup.position, { x: 2.0, y: 0, z: 0, duration: 2.0, ease: "power3.inOut" }, "-=1.5")
        .to(rimLight, { intensity: 5.0, duration: 1.5, yoyo: true, repeat: 1 }, "-=2.0");

      setTimeout(() => {
        curtain?.classList.add("hide");
      }, 1200);
    } else {
      curtain?.classList.add("hide");
    }
  }, 800);
}

// =========================================================================
// 3. GSAP PINNED SCROLL STORY ENGINE (01 DISPLAY -> 02 TITANIUM -> 03 CAMERA -> 04 BATTERY)
// =========================================================================
function initGSAPScrollStory() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  const storySection = document.getElementById("story");
  if (!storySection || !phoneGroup) return;

  const storyTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: storySection,
      start: "top top",
      end: "bottom bottom",
      scrub: 1.2,
      onUpdate: (self) => {
        const progress = self.progress;
        updateStoryText(progress);
      }
    }
  });

  // Scroll Choreography:
  // 0% - 25%: Front Display Zoom
  storyTimeline
    .to(phoneGroup.position, { x: 1.2, y: 0, z: 2.2, ease: "none" }, 0)
    .to(phoneGroup.rotation, { x: 0.1, y: 0.2, z: 0, ease: "none" }, 0);

  // 25% - 50%: 90° Side Profile (Titanium Rim Light)
  storyTimeline
    .to(phoneGroup.position, { x: 0.8, y: 0, z: 1.8, ease: "none" }, 0.25)
    .to(phoneGroup.rotation, { x: 0, y: Math.PI / 2, z: 0.1, ease: "none" }, 0.25);

  // 50% - 75%: Macro Camera Module Zoom
  storyTimeline
    .to(phoneGroup.position, { x: -0.5, y: -0.8, z: 3.8, ease: "none" }, 0.5)
    .to(phoneGroup.rotation, { x: 0.2, y: Math.PI - 0.2, z: 0, ease: "none" }, 0.5);

  // 75% - 100%: Internal Battery Glow & Transparency
  storyTimeline
    .to(phoneGroup.position, { x: 0, y: 0, z: 1.2, ease: "none" }, 0.75)
    .to(phoneGroup.rotation, { x: 0, y: 0, z: 0, ease: "none" }, 0.75)
    .to(chassisMesh.material, { opacity: 0.35, transparent: true, ease: "none" }, 0.75)
    .to(backMesh.material, { opacity: 0.2, transparent: true, ease: "none" }, 0.75)
    .to(batteryMesh.material, { opacity: 0.95, ease: "none" }, 0.75)
    .to(phoneGroup.position, { y: -8, opacity: 0, ease: "none" }, 0.95);
}

function updateStoryText(progress) {
  const badge = document.getElementById("storyBadge");
  const title = document.getElementById("storyTitle");
  const desc = document.getElementById("storyDesc");

  if (!badge || !title || !desc) return;

  if (progress < 0.25) {
    badge.innerText = "01";
    title.innerText = "Super Retina XDR Display";
    desc.innerText = "6.9-inch OLED with ProMotion 120Hz adaptive refresh rate and 2,000 nits peak outdoor brightness. Scratchless ceramic shield glass.";
  } else if (progress < 0.5) {
    badge.innerText = "02";
    title.innerText = "Grade 5 Titanium Profile";
    desc.innerText = "Micro-blasted aerospace titanium frame with precision chamfered edges. The lightest, strongest flagship chassis ever engineered.";
  } else if (progress < 0.75) {
    badge.innerText = "03";
    title.innerText = "48MP Fusion Triple Camera";
    desc.innerText = "Next-gen quad-pixel sensor with 5x optical telephoto, anti-reflective coating, and 4K 120fps Dolby Vision master recording.";
  } else {
    badge.innerText = "04";
    title.innerText = "All-Day Power & A18 Pro";
    desc.innerText = "Up to 33 hours continuous battery life backed by 3nm Apple Silicon architecture and MagSafe ultra-fast wireless charging.";
  }
}

// 3D Phone Finish Switcher
function set3DPhoneFinish(finishKey) {
  const finish = FINISH_COLORS[finishKey];
  if (!finish || !chassisMesh) return;

  gsap.to(chassisMesh.material.color, {
    r: ((finish.chassis >> 16) & 255) / 255,
    g: ((finish.chassis >> 8) & 255) / 255,
    b: (finish.chassis & 255) / 255,
    duration: 0.6
  });

  gsap.to(backMesh.material.color, {
    r: ((finish.back >> 16) & 255) / 255,
    g: ((finish.back >> 8) & 255) / 255,
    b: (finish.back & 255) / 255,
    duration: 0.6
  });

  const buttons = document.querySelectorAll(".finish-btn");
  buttons.forEach(b => b.classList.remove("active"));
  event?.target?.classList.add("active");
}

// Header Frosted Scroll
function initScrollHeader() {
  const header = document.getElementById("filmHeader");
  if (!header) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}

// =========================================================================
// 4. INTERACTIVE REPAIR LAB SIMULATION (CRACK TO OLED & BATTERY SURGE)
// =========================================================================
function simulateRepairAnimation(type) {
  const overlay = document.getElementById("crackOverlay");
  const counterVal = document.getElementById("batteryCounterVal");

  if (type === "screen") {
    if (overlay) {
      overlay.classList.add("cracked");
      setTimeout(() => {
        overlay.classList.remove("cracked");
      }, 700);
    }
  } else if (type === "battery") {
    let count = 12;
    const interval = setInterval(() => {
      count += 4;
      if (counterVal) counterVal.innerText = `${count}%`;
      if (count >= 100) {
        clearInterval(interval);
        if (counterVal) counterVal.innerText = "100%";
      }
    }, 40);
  }
}

// =========================================================================
// 5. HARDWARE TRADE-IN SCANNER SIMULATION (RAPID VALUE COUNTER)
// =========================================================================
function triggerScannerSequence() {
  const brand = document.getElementById("tradeScanBrand")?.value || "Apple";
  const cond = document.getElementById("tradeScanCondition")?.value || "flawless";
  const ticker = document.getElementById("scannerValTicker");

  const targetValues = {
    Apple: { flawless: 42500, good: 34000, cracked: 21000 },
    Samsung: { flawless: 36000, good: 27500, cracked: 16000 },
    OnePlus: { flawless: 28000, good: 21000, cracked: 12500 },
    Vivo: { flawless: 22000, good: 16000, cracked: 9500 },
    Xiaomi: { flawless: 18000, good: 13500, cracked: 7500 }
  };

  const finalVal = targetValues[brand]?.[cond] || 32000;
  let current = Math.floor(finalVal * 0.4);

  const step = Math.floor((finalVal - current) / 20);
  const counterInterval = setInterval(() => {
    current += step;
    if (current >= finalVal) {
      current = finalVal;
      clearInterval(counterInterval);
    }
    if (ticker) ticker.innerText = `₹${current.toLocaleString("en-IN")}`;
  }, 35);
}

// =========================================================================
// 6. WHATSAPP DIRECT ORDER ACTION
// =========================================================================
function orderWhatsAppDirect(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const phone = STORE_CONFIG.primaryPhone;
  const msg = `Hello Mobile Station (Garud Complex)! 👋

I am viewing this flagship model on your showroom website:
📱 *Model:* ${product.name}
🏷️ *Brand:* ${product.brand}
💰 *Showroom Price:* ₹${product.price.toLocaleString("en-IN")}
🛡️ *Condition:* ${product.condition}
✨ *Warranty:* ${product.warranty}

Please share payment options and store pickup details today.`;

  const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
  window.open(url, "_blank");
}

// Mobile Station & Siddhi Marketing — Flagship 3D Commercial Engine
// Procedural Three.js WebGL • GSAP ScrollTrigger Pinned Timeline • Studio Physics

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

// -------------------------------------------------------------------------
// Global Three.js State for Pinned Hero Commercial
// -------------------------------------------------------------------------
let heroScene, heroCamera, heroRenderer, heroPhoneGroup;
let heroChassisMesh, heroBackMesh, heroScreenMesh, heroCameraModule, heroRimLight, heroKeyLight;
let heroMouseX = 0, heroMouseY = 0;
let heroScrollTimeline;

// Color Palette for Flagship Titanium Finishes
const FINISH_COLORS = {
  desert: { chassis: 0xcbb799, back: 0xdecbb4, rim: 0xf5dfc6, name: "Desert Titanium" },
  natural: { chassis: 0xa8a6a0, back: 0xc4c2bb, rim: 0xe8e6df, name: "Natural Titanium" },
  black: { chassis: 0x242528, back: 0x1a1b1d, rim: 0x5a5d66, name: "Black Titanium" }
};

document.addEventListener("DOMContentLoaded", () => {
  initHero3DCommercial();
  initStory3D();
  initScrollHeader();
  triggerScannerSequence();
  initB2BCounters();
});

// =========================================================================
// 1. HERO 3D SMARTPHONE PROCEDURAL MODEL & PINNED COMMERCIAL TIMELINE
// =========================================================================
function initHero3DCommercial() {
  const canvas = document.getElementById("heroWebGLCanvas");
  if (!canvas || typeof THREE === 'undefined') return;

  const container = canvas.parentElement;
  let width = container.clientWidth || 550;
  let height = container.clientHeight || 650;

  // Scene Setup
  heroScene = new THREE.Scene();

  // Camera
  heroCamera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
  heroCamera.position.set(0, 0, 8.6);

  // High-DPI Renderer
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
  heroRenderer.shadowMap.enabled = true;
  heroRenderer.shadowMap.type = THREE.PCFSoftShadowMap;

  // -----------------------------------------------------------------------
  // Studio Lighting (Crisp White Luxury Setup)
  // -----------------------------------------------------------------------
  // 1. Main Studio Key Light
  heroKeyLight = new THREE.DirectionalLight(0xffffff, 2.8);
  heroKeyLight.position.set(5, 6, 6);
  heroScene.add(heroKeyLight);

  // 2. Soft Fill Light (Warm white tone)
  const fillLight = new THREE.DirectionalLight(0xfff7ed, 1.4);
  fillLight.position.set(-6, -3, 4);
  heroScene.add(fillLight);

  // 3. Dynamic Titanium Rim/Edge Light
  heroRimLight = new THREE.PointLight(0xe11d48, 3.5, 14);
  heroRimLight.position.set(3, 2, -4);
  heroScene.add(heroRimLight);

  // 4. Subtle Top Light
  const topLight = new THREE.DirectionalLight(0xffffff, 1.2);
  topLight.position.set(0, 8, 2);
  heroScene.add(topLight);

  // 5. Crisp Ambient Base
  const ambient = new THREE.AmbientLight(0xffffff, 0.85);
  heroScene.add(ambient);

  // -----------------------------------------------------------------------
  // Build Photorealistic Smartphone
  // -----------------------------------------------------------------------
  heroPhoneGroup = buildRealisticPhone(FINISH_COLORS.desert);
  
  // Initial 3/4 Premium Showcase Angle (Clearly Visible at 0% Scroll)
  heroPhoneGroup.rotation.set(0.12, -0.38, 0.04);
  heroPhoneGroup.position.set(0.2, 0, 0);
  heroPhoneGroup.scale.set(1.15, 1.15, 1.15);
  heroScene.add(heroPhoneGroup);

  heroChassisMesh = heroPhoneGroup.userData.chassis;
  heroBackMesh = heroPhoneGroup.userData.back;
  heroScreenMesh = heroPhoneGroup.userData.screen;
  heroCameraModule = heroPhoneGroup.userData.cameraModule;

  // -----------------------------------------------------------------------
  // Mouse Parallax (Interactive Tilt)
  // -----------------------------------------------------------------------
  window.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    heroMouseX = x * 0.25;
    heroMouseY = y * 0.2;
  });

  // Resize Handler
  window.addEventListener("resize", () => {
    if (!heroCamera || !heroRenderer) return;
    width = container.clientWidth || 550;
    height = container.clientHeight || 650;
    heroCamera.aspect = width / height;
    heroCamera.updateProjectionMatrix();
    heroRenderer.setSize(width, height);
  });

  // -----------------------------------------------------------------------
  // GSAP ScrollTrigger Pinned Timeline
  // 0% -> 15% -> 30% -> 45% -> 60% -> 75% -> 90% -> 100%
  // -----------------------------------------------------------------------
  setupHeroScrollCommercial();

  // Animation Loop
  function animateHero() {
    requestAnimationFrame(animateHero);

    if (heroPhoneGroup) {
      // Subtle float when idle
      heroPhoneGroup.position.y += (Math.sin(Date.now() * 0.0018) * 0.04 - heroPhoneGroup.position.y) * 0.02;
    }

    if (heroRenderer && heroScene && heroCamera) {
      heroRenderer.render(heroScene, heroCamera);
    }
  }
  animateHero();
}

// -------------------------------------------------------------------------
// GSAP Pinned Scroll Commercial Choreography
// -------------------------------------------------------------------------
function setupHeroScrollCommercial() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  const heroTrack = document.getElementById("heroTrack");
  const heroStage = document.getElementById("heroStage");
  if (!heroTrack || !heroStage || !heroPhoneGroup) return;

  const progressFill = document.getElementById("commercialProgressFill");
  const progressVal = document.getElementById("commercialProgressVal");
  const hudTag = document.getElementById("heroHudTag");
  const hudTitle = document.getElementById("heroHudTitle");
  const hudDesc = document.getElementById("heroHudDesc");

  heroScrollTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: heroTrack,
      start: "top top",
      end: "bottom bottom",
      pin: heroStage,
      scrub: 1.2,
      onUpdate: (self) => {
        const p = self.progress;
        const pct = Math.round(p * 100);

        if (progressFill) progressFill.style.width = `${pct}%`;
        if (progressVal) progressVal.innerText = `${pct}%`;

        // Update Dynamic Story HUD Text along the timeline
        if (p < 0.28) {
          if (hudTag) hudTag.innerText = "01 / DISPLAY ARCHITECTURE";
          if (hudTitle) hudTitle.innerText = "Super Retina XDR OLED";
          if (hudDesc) hudDesc.innerText = "6.9-inch 120Hz ProMotion display with 2,000 nits peak outdoor brightness. Scratchless Ceramic Shield glass.";
        } else if (p < 0.62) {
          if (hudTag) hudTag.innerText = "02 / AEROSPACE CHASSIS";
          if (hudTitle) hudTitle.innerText = "Grade 5 Titanium Profile";
          if (hudDesc) hudDesc.innerText = "Micro-blasted aerospace titanium frame with precision chamfered contours. Featherlight rigidity with high thermal dissipation.";
        } else if (p < 0.90) {
          if (hudTag) hudTag.innerText = "03 / PRO CAMERA SYSTEM";
          if (hudTitle) hudTitle.innerText = "48MP Fusion Triple Optics";
          if (hudDesc) hudDesc.innerText = "Quad-pixel main sensor with 5x optical telephoto prism and anti-reflective sapphire crystal lenses for cinematic 4K recording.";
        } else {
          if (hudTag) hudTag.innerText = "04 / READY FOR SHOWROOM";
          if (hudTitle) hudTitle.innerText = "Explore Full Collection";
          if (hudDesc) hudDesc.innerText = "Explore flagships below or order instantly on WhatsApp with verified IMEI and invoice warranty.";
        }
      }
    }
  });

  // Keyframe 1: 0% -> 15% (Initial 3/4 view slowly rotates into view)
  heroScrollTimeline
    .to(heroPhoneGroup.rotation, { x: 0.08, y: -0.15, z: 0.02, ease: "none" }, 0)
    .to(heroPhoneGroup.position, { x: 0.1, y: 0, z: 0.3, ease: "none" }, 0);

  // Keyframe 2: 15% -> 30% (Phone moves closer and scales up)
  heroScrollTimeline
    .to(heroPhoneGroup.rotation, { x: 0.02, y: 0.1, z: 0.0, ease: "none" }, 0.15)
    .to(heroPhoneGroup.position, { x: 0, y: 0, z: 1.2, ease: "none" }, 0.15)
    .to(heroPhoneGroup.scale, { x: 1.28, y: 1.28, z: 1.28, ease: "none" }, 0.15);

  // Keyframe 3: 30% -> 48% (Rotates to 90° Titanium Side Profile)
  heroScrollTimeline
    .to(heroPhoneGroup.rotation, { x: 0.0, y: Math.PI / 2, z: 0.06, ease: "none" }, 0.30)
    .to(heroPhoneGroup.position, { x: 0.3, y: 0, z: 1.5, ease: "none" }, 0.30)
    .to(heroRimLight, { intensity: 6.0, ease: "none" }, 0.30);

  // Keyframe 4: 48% -> 68% (Light sweep across titanium edge, rotates to rear)
  heroScrollTimeline
    .to(heroPhoneGroup.rotation, { x: 0.12, y: Math.PI - 0.25, z: -0.04, ease: "none" }, 0.48)
    .to(heroPhoneGroup.position, { x: -0.2, y: -0.4, z: 2.2, ease: "none" }, 0.48)
    .to(heroKeyLight.position, { x: -4, y: 6, z: 6, ease: "none" }, 0.48);

  // Keyframe 5: 68% -> 90% (Macro Zoom into Triple Sapphire Camera Module)
  heroScrollTimeline
    .to(heroPhoneGroup.rotation, { x: 0.18, y: Math.PI - 0.15, z: 0.0, ease: "none" }, 0.68)
    .to(heroPhoneGroup.position, { x: -0.45, y: -1.0, z: 3.8, ease: "none" }, 0.68)
    .to(heroRimLight.position, { x: -2, y: 4, z: -2, ease: "none" }, 0.68);

  // Keyframe 6: 90% -> 100% (Realigns and glides towards next section)
  heroScrollTimeline
    .to(heroPhoneGroup.rotation, { x: 0.0, y: 0.0, z: 0.0, ease: "none" }, 0.90)
    .to(heroPhoneGroup.position, { x: 0, y: -2.5, z: 0.5, ease: "none" }, 0.90)
    .to(heroPhoneGroup.scale, { x: 0.9, y: 0.9, z: 0.9, ease: "none" }, 0.90);
}

// -------------------------------------------------------------------------
// Build Photorealistic Smartphone (Titanium, Glass, Camera Module, Display)
// -------------------------------------------------------------------------
function buildRealisticPhone(finish) {
  const group = new THREE.Group();

  const width = 2.45;
  const height = 5.05;
  const depth = 0.27;
  const radius = 0.36;

  // 1. Brushed Titanium Chassis Frame
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

  // Side Hardware Buttons
  const buttonMat = new THREE.MeshPhysicalMaterial({
    color: finish.chassis,
    metalness: 0.95,
    roughness: 0.2
  });

  // Power Button (Right side)
  const pwrGeom = createRoundedBoxGeometry(0.06, 0.7, 0.12, 0.02, 4);
  const pwrMesh = new THREE.Mesh(pwrGeom, buttonMat);
  pwrMesh.position.set(width / 2 + 0.02, 0.5, 0);
  group.add(pwrMesh);

  // Volume Up & Down Buttons (Left side)
  const volUpGeom = createRoundedBoxGeometry(0.06, 0.45, 0.12, 0.02, 4);
  const volUpMesh = new THREE.Mesh(volUpGeom, buttonMat);
  volUpMesh.position.set(-(width / 2 + 0.02), 0.7, 0);
  group.add(volUpMesh);

  const volDownMesh = new THREE.Mesh(volUpGeom, buttonMat);
  volDownMesh.position.set(-(width / 2 + 0.02), 0.1, 0);
  group.add(volDownMesh);

  // Action Button
  const actGeom = createRoundedBoxGeometry(0.06, 0.25, 0.12, 0.02, 4);
  const actMesh = new THREE.Mesh(actGeom, buttonMat);
  actMesh.position.set(-(width / 2 + 0.02), 1.25, 0);
  group.add(actMesh);

  // USB-C Port Cutout (Bottom)
  const usbcGeom = createRoundedBoxGeometry(0.45, 0.06, 0.12, 0.03, 4);
  const usbcMat = new THREE.MeshBasicMaterial({ color: 0x050508 });
  const usbcMesh = new THREE.Mesh(usbcGeom, usbcMat);
  usbcMesh.position.set(0, -(height / 2 + 0.01), 0);
  group.add(usbcMesh);

  // 2. Front Super Retina XDR OLED Display Screen
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

  // 4. Rear Triple Camera Module Plateau
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

  // Triple Sapphire Lenses with Optical Metal Rings
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

  // Lens 1: Top Left Main
  const ring1 = new THREE.Mesh(lensRingGeom, lensRingMat);
  ring1.rotation.x = Math.PI / 2;
  ring1.position.set(0.28, 1.82, -(depth / 2 + 0.14));
  cameraModule.add(ring1);
  const opt1 = new THREE.Mesh(opticGeom, opticMat);
  opt1.rotation.x = Math.PI / 2;
  opt1.position.copy(ring1.position);
  cameraModule.add(opt1);

  // Lens 2: Top Right Ultra-Wide
  const ring2 = new THREE.Mesh(lensRingGeom, lensRingMat);
  ring2.rotation.x = Math.PI / 2;
  ring2.position.set(0.68, 1.82, -(depth / 2 + 0.14));
  cameraModule.add(ring2);
  const opt2 = new THREE.Mesh(opticGeom, opticMat);
  opt2.rotation.x = Math.PI / 2;
  opt2.position.copy(ring2.position);
  cameraModule.add(opt2);

  // Lens 3: Bottom Telephoto 5x
  const ring3 = new THREE.Mesh(lensRingGeom, lensRingMat);
  ring3.rotation.x = Math.PI / 2;
  ring3.position.set(0.48, 1.38, -(depth / 2 + 0.14));
  cameraModule.add(ring3);
  const opt3 = new THREE.Mesh(opticGeom, opticMat);
  opt3.rotation.x = Math.PI / 2;
  opt3.position.copy(ring3.position);
  cameraModule.add(opt3);

  // True Tone Flash
  const flashGeom = new THREE.CylinderGeometry(0.09, 0.09, 0.15, 16);
  const flashMat = new THREE.MeshBasicMaterial({ color: 0xfffae0 });
  const flashMesh = new THREE.Mesh(flashGeom, flashMat);
  flashMesh.rotation.x = Math.PI / 2;
  flashMesh.position.set(0.82, 1.48, -(depth / 2 + 0.13));
  cameraModule.add(flashMesh);

  // LiDAR Scanner Sensor
  const lidarGeom = new THREE.CylinderGeometry(0.07, 0.07, 0.15, 16);
  const lidarMat = new THREE.MeshBasicMaterial({ color: 0x111318 });
  const lidarMesh = new THREE.Mesh(lidarGeom, lidarMat);
  lidarMesh.rotation.x = Math.PI / 2;
  lidarMesh.position.set(0.24, 1.42, -(depth / 2 + 0.13));
  cameraModule.add(lidarMesh);

  group.add(cameraModule);

  group.userData = { chassis, back, screen, cameraModule };
  return group;
}

// -------------------------------------------------------------------------
// Procedural OLED Screen Texture (High-DPI 1024x2048 Canvas)
// -------------------------------------------------------------------------
function createScreenTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 2048;
  const ctx = canvas.getContext("2d");

  // Premium Deep Space Obsidian Wallpaper
  const grad = ctx.createLinearGradient(0, 0, 1024, 2048);
  grad.addColorStop(0, "#080a10");
  grad.addColorStop(0.4, "#131622");
  grad.addColorStop(0.75, "#2a0d17");
  grad.addColorStop(1, "#08090d");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 2048);

  // Subtle glowing ambient mesh
  const glow = ctx.createRadialGradient(512, 1024, 50, 512, 1024, 600);
  glow.addColorStop(0, "rgba(225, 29, 72, 0.25)");
  glow.addColorStop(1, "transparent");
  ctx.fillStyle = glow;
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
  ctx.fillStyle = "#e11d48";
  ctx.fillText("MOBILE STATION", 512, 1840);

  ctx.font = "600 36px 'Plus Jakarta Sans', sans-serif";
  ctx.fillStyle = "rgba(255, 255, 255, 0.45)";
  ctx.fillText("Garud Complex • Balaji Mandir Road", 512, 1910);

  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

// -------------------------------------------------------------------------
// Helper: Rounded Box Geometry
// -------------------------------------------------------------------------
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

// -------------------------------------------------------------------------
// Live Titanium Finish Switcher
// -------------------------------------------------------------------------
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

    if (heroRimLight) {
      gsap.to(heroRimLight.color, {
        r: ((finish.rim >> 16) & 255) / 255,
        g: ((finish.rim >> 8) & 255) / 255,
        b: (finish.rim & 255) / 255,
        duration: 0.5
      });
    }
  }

  const buttons = document.querySelectorAll(".hero-finish-selector .finish-btn");
  buttons.forEach(b => b.classList.remove("active"));
  if (btnElement) btnElement.classList.add("active");
}

// =========================================================================
// 2. 360° HARDWARE STORY STAGE (SECONDARY INTERACTIVE STAGE)
// =========================================================================
let storyScene, storyCamera, storyRenderer, storyPhoneGroup;
let storyChassisMesh, storyBackMesh;

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

  const ambient = new THREE.AmbientLight(0xffffff, 0.85);
  storyScene.add(ambient);

  storyPhoneGroup = buildRealisticPhone(FINISH_COLORS.desert);
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
// 3. INTERACTIVE REPAIR LAB SIMULATION (CRACK TO OLED & BATTERY SURGE)
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
// 5. DIRECT WHATSAPP ORDERING CONCIERGE
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
// 6. HEADER BLUR ON SCROLL & B2B COUNTERS
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

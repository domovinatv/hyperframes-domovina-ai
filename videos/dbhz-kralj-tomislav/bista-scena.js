// Bista kralja Tomislava kao HyperFrames Three.js sloj.
//
// Port dbhz-3d-modeli/docs/VIEWER-SPEC.md, ali za video: nema OrbitControls ni
// rAF petlje. Svaki kadar je čista funkcija vremena t (hf-seek), pa render
// daje isti piksel za isti t. Kamera je fiksna na 8° iznad horizonta, rotira
// se MODEL oko Y (kao na nativnim platformama u spec-u).
//
// Sve brojke filma (vremena, materijali, kamera) su u film.js i dolaze kao
// parametar FILM; ovdje su samo spec konstante viewera.

import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

// Spec viewera (VIEWER-SPEC.md) — iste vrijednosti kao web-vanilla SPEC.
export const SPEC = {
  fovY: 40,
  elevationDeg: 8,
  materialLerpRate: 4.5, // k = 1 − e^(−4.5·dt)
  variants: {
    bronca: { color: "#b07d44", metalness: 0.78, roughness: 0.42 },
    kamen: { color: "#e9e4d3", metalness: 0.02, roughness: 0.93 },
    patina: { color: "#5b9b82", metalness: 0.28, roughness: 0.74 },
  },
  lights: {
    ambient: 0.55,
    key: { position: [4, 6, 5], intensity: 1.6 },
    fill: { position: [-5, 2, -3], intensity: 0.5, color: "#ffe6b0" },
  },
  contactShadow: { y: -1.05, opacity: 0.5 },
  fit: { widthMargin: 1.2, heightMargin: 1.15, depthComp: 0.35 },
  ring: "#D99E12",
};

const clamp01 = (x) => Math.min(1, Math.max(0, x));
const smooth = (x) => {
  const t = clamp01(x);
  return t * t * (3 - 2 * t);
};
// Linearna interpolacija po listi ključeva [{t, v}] s smoothstep prijelazom.
function track(keys, t) {
  if (t <= keys[0].t) return keys[0].v;
  for (let i = 1; i < keys.length; i++) {
    if (t < keys[i].t) {
      const a = keys[i - 1];
      const b = keys[i];
      return a.v + (b.v - a.v) * smooth((t - a.t) / (b.t - a.t));
    }
  }
  return keys[keys.length - 1].v;
}

// Materijal u trenutku t: spec lerp k = 1 − e^(−4.5·dt) u zatvorenoj formi.
// Od svake promjene varijante vrijednost eksponencijalno ide prema cilju, a
// početna vrijednost je ono što je prethodni prijelaz stigao do te točke —
// isti rezultat kao frame-by-frame lerp, ali bez ovisnosti o povijesti kadrova.
function materialAt(FILM, t) {
  const steps = FILM.materials;
  const toVec = (name) => {
    const v = SPEC.variants[name];
    const c = new THREE.Color(v.color);
    return [c.r, c.g, c.b, v.metalness, v.roughness];
  };
  let cur = toVec(steps[0].variant);
  for (let i = 1; i < steps.length && steps[i].t <= t; i++) {
    const target = toVec(steps[i].variant);
    const end = i + 1 < steps.length && steps[i + 1].t <= t ? steps[i + 1].t : t;
    const f = Math.exp(-SPEC.materialLerpRate * (end - steps[i].t));
    cur = cur.map((c, j) => target[j] + (c - target[j]) * f);
  }
  return cur;
}

export function mountBista(canvas, { width, height, layout, film: FILM, base = "" }) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(1);
  renderer.setSize(width, height, false);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(SPEC.fovY, width / height, 0.1, 100);
  const polar = THREE.MathUtils.degToRad(90 - SPEC.elevationDeg);
  // Pomak biste u kadru po formatu (16:9 desno od natpisa, 9:16 malo gore):
  // view offset pomiče sliku bez promjene smjera pogleda ni FitCamera udaljenosti.
  camera.setViewOffset(width, height, -layout.shiftX * width, -layout.shiftY * height, width, height);

  const ambient = new THREE.AmbientLight(0xffffff, SPEC.lights.ambient);
  scene.add(ambient);
  const key = new THREE.DirectionalLight(0xffffff, SPEC.lights.key.intensity);
  key.position.set(...SPEC.lights.key.position);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.camera.left = key.shadow.camera.bottom = -2.5;
  key.shadow.camera.right = key.shadow.camera.top = 2.5;
  key.shadow.radius = 6;
  scene.add(key);
  const fill = new THREE.DirectionalLight(new THREE.Color(SPEC.lights.fill.color), SPEC.lights.fill.intensity);
  fill.position.set(...SPEC.lights.fill.position);
  scene.add(fill);
  // Zlatni kontra-svjetlo za refren („zlato i kruna"): obrub iza biste.
  const rim = new THREE.DirectionalLight(new THREE.Color(SPEC.ring), 0);
  rim.position.set(-2, 3, -6);
  scene.add(rim);

  const shadowPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(7, 7),
    new THREE.ShadowMaterial({ opacity: SPEC.contactShadow.opacity }),
  );
  shadowPlane.rotation.x = -Math.PI / 2;
  shadowPlane.position.y = SPEC.contactShadow.y;
  shadowPlane.receiveShadow = true;
  scene.add(shadowPlane);

  // Zlatni prsten na podu — isti #D99E12 kao aktivni swatch u vieweru.
  const ringMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(SPEC.ring),
    transparent: true,
    opacity: 0,
    depthWrite: false,
  });
  const ring = new THREE.Mesh(new THREE.RingGeometry(0.82, 0.85, 160), ringMat);
  ring.rotation.x = -Math.PI / 2;
  ring.position.y = SPEC.contactShadow.y + 0.002;
  scene.add(ring);

  const material = new THREE.MeshStandardMaterial();
  const pivot = new THREE.Group(); // rotira se oko Y
  scene.add(pivot);
  let baseDistance = 3.6;

  // FitCamera iz spec-a (poglavlje 3); mijenja samo udaljenost.
  function fitDistance(subject) {
    const box = new THREE.Box3().setFromObject(subject);
    const dims = box.getSize(new THREE.Vector3());
    const halfH = dims.y / 2;
    const rXZ = Math.hypot(dims.x, dims.z) / 2;
    const vTan = Math.tan(THREE.MathUtils.degToRad(SPEC.fovY) / 2);
    const hTan = vTan * (width / height);
    const distW = rXZ * (SPEC.fit.widthMargin / hTan + 1);
    const distV = (SPEC.fit.heightMargin * halfH) / vTan + SPEC.fit.depthComp * rXZ;
    return Math.max(distV, distW);
  }

  const ready = new GLTFLoader().loadAsync(`${base}assets/tomislav-bista.glb`).then((gltf) => {
    const model = gltf.scene;
    model.traverse((o) => {
      if (o.isMesh) {
        o.material = material;
        o.castShadow = true;
        o.geometry.computeVertexNormals();
      }
    });
    const center = new THREE.Box3().setFromObject(model).getCenter(new THREE.Vector3());
    model.position.sub(center);
    pivot.add(model);
    baseDistance = fitDistance(pivot);
    renderer.compile(scene, camera);
  });

  function renderAt(t) {
    const cam = FILM.camera;
    // Kamera: fiksni polarni kut, udaljenost = FitCamera × faktor iz FILM.
    const dist = baseDistance * layout.zoom * track(cam.distance, t);
    camera.position.setFromSphericalCoords(dist, polar, 0);
    camera.lookAt(0, track(cam.lookY, t), 0);

    // Rotacija modela: kut je integral brzine iz FILM.rotation (u okretajima).
    // Kut je takav da je lice (frontDeg) prema kameri točno u frontAt.
    const turns = rotationAt(FILM, t) - rotationAt(FILM, FILM.rotation.frontAt);
    pivot.rotation.y = THREE.MathUtils.degToRad(FILM.rotation.frontDeg) + turns * Math.PI * 2;

    const light = track(FILM.light, t); // 0 = mrak, 1 = spec intenziteti
    const pulse = beatPulse(FILM, t);
    ambient.intensity = SPEC.lights.ambient * light;
    key.intensity = SPEC.lights.key.intensity * light * (1 + 0.18 * pulse);
    fill.intensity = SPEC.lights.fill.intensity * light;
    const gold = track(FILM.gold, t);
    rim.intensity = 2.2 * gold * (1 + 0.35 * pulse);
    ringMat.opacity = 0.85 * gold;
    ring.scale.setScalar(1 + 0.04 * pulse);

    const [r, g, b, metalness, roughness] = materialAt(FILM, t);
    material.color.setRGB(r, g, b);
    material.metalness = metalness;
    material.roughness = roughness;

    renderer.render(scene, camera);
  }

  return { ready, renderAt };
}

// Okretaji do trenutka t: brzina (okretaja/s) je po dijelovima linearna, pa je
// kut zbroj trapeza — deterministički, bez akumulacije po kadrovima.
function rotationAt(FILM, t) {
  const k = FILM.rotation.speed;
  let turns = 0;
  for (let i = 1; i < k.length; i++) {
    const a = k[i - 1];
    const b = k[i];
    if (t <= a.t) break;
    const end = Math.min(t, b.t);
    const vEnd = a.v + ((b.v - a.v) * (end - a.t)) / (b.t - a.t);
    turns += ((a.v + vEnd) / 2) * (end - a.t);
  }
  const last = k[k.length - 1];
  if (t > last.t) turns += last.v * (t - last.t);
  // prije prve točke (intro kartica): ista brzina unatrag
  if (t < k[0].t) turns -= k[0].v * (k[0].t - t);
  return turns;
}

// Kratki puls na jakim dobama (beatovi iz audiomap.json), samo unutar
// prozora FILM.pulseWindows. Brzi napad, eksponencijalno gašenje.
function beatPulse(FILM, t) {
  const inWindow = FILM.pulseWindows.some(([a, b]) => t >= a && t < b);
  if (!inWindow) return 0;
  let last = -Infinity;
  for (const bt of FILM.beats) {
    if (bt > t) break;
    last = bt;
  }
  const dt = t - last;
  return dt < 0 ? 0 : Math.exp(-dt * 7);
}

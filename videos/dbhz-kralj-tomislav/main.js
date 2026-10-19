// Zajednički ulaz za oba formata (index.html 16:9, vertical.html 9:16).
// Čita veličinu platna s root elementa, montira 3D bistu i gradi jedan
// pauzirani GSAP timeline za natpise. 3D sloj prati hf-seek (three adapter),
// natpisi prate GSAP timeline — oba iz istog vremena kompozicije.

import { FILM } from "./film.js";
import { mountBista } from "./bista-scena.js";

const root = document.querySelector("[data-composition-id]");
const id = root.dataset.compositionId;
const width = Number(root.dataset.width);
const height = Number(root.dataset.height);
const layout = width >= height ? FILM.layout.landscape : FILM.layout.portrait;

// --- 3D sloj -----------------------------------------------------------------
const bista = mountBista(document.getElementById("bista"), { width, height, layout });
window.__hf = window.__hf || {};
window.__hf.buildReady = window.__hf.buildReady || {};
window.__hf.buildReady["bista-3d"] = bista.ready.then(() => bista.renderAt(window.__hfThreeTime || 0));
window.addEventListener("hf-seek", (e) => bista.renderAt(e.detail.time));

// --- Natpisi stihova -----------------------------------------------------------
const lyricsEl = document.getElementById("stihovi");
FILM.lyrics.forEach((line, i) => {
  const el = document.createElement("p");
  el.className = "stih";
  el.id = `stih-${i}`;
  line.words.forEach((w) => {
    const span = document.createElement("span");
    span.className = "rijec";
    span.textContent = w.text;
    el.appendChild(span);
    el.appendChild(document.createTextNode(" "));
  });
  lyricsEl.appendChild(el);
});

// --- Timeline ------------------------------------------------------------------
const tl = gsap.timeline({ paused: true });
const { intro, outro } = FILM.copy;

tl.fromTo("#uvod .eyebrow", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" }, intro.in);
tl.fromTo("#uvod h1", { opacity: 0, y: 28, letterSpacing: "0.32em" }, { opacity: 1, y: 0, letterSpacing: "0.14em", duration: 1.6, ease: "power3.out" }, intro.in + 0.3);
tl.fromTo("#uvod .crta", { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: "power2.inOut" }, intro.in + 0.9);
tl.fromTo("#uvod .podnaslov", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 1.0, ease: "power2.out" }, intro.in + 1.3);
tl.to("#uvod .uvod-in", { opacity: 0, y: -16, duration: 0.9, ease: "power2.in" }, intro.out - 0.9);

// Stihovi: riječ po riječ na vremenu iz transkripta, red nestaje na kraju.
FILM.lyrics.forEach((line, i) => {
  const words = document.querySelectorAll(`#stih-${i} .rijec`);
  line.words.forEach((w, j) => {
    tl.fromTo(words[j], { opacity: 0, y: 18, filter: "blur(6px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.45, ease: "power2.out" }, w.t);
  });
  tl.to(`#stih-${i}`, { opacity: 0, duration: 0.5, ease: "power1.in" }, line.out - 0.5);
});

tl.fromTo("#odjava .odjava-in > *", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.35, ease: "power2.out" }, outro.in);
tl.fromTo("#zatamnjenje", { opacity: 0 }, { opacity: 1, duration: FILM.fadeOut, ease: "none" }, FILM.duration - FILM.fadeOut);

window.__timelines[id] = tl;

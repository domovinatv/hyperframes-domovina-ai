// Zajednički ulaz za sve kompozicije (index.html = A 16:9, formati/*.html).
// Čita veličinu platna s root elementa, montira 3D bistu i gradi jedan
// pauzirani GSAP timeline za natpise. 3D sloj prati hf-seek (three adapter),
// natpisi prate GSAP timeline — oba iz istog vremena kompozicije.

import { FILMOVI } from "./film.js";
import { mountBista } from "./bista-scena.js";

// base = putanja do korijena projekta ("./" za index.html, "../" za formati/).
// Vraća pauzirani timeline; registracija je inline u HTML-u (lint je traži ondje).
export function buildFilm(base = "") {
  const root = document.querySelector("[data-composition-id]");
  const width = Number(root.dataset.width);
  const height = Number(root.dataset.height);
  const FILM = FILMOVI[root.dataset.film];
  // Vremena u FILM su vremena pjesme; film počinje intro karticom od FILM.pomak s.
  const P = FILM.pomak;
  const layout = width >= height ? FILM.layout.landscape : FILM.layout.portrait;

  // --- 3D sloj -----------------------------------------------------------------
  const bista = mountBista(document.getElementById("bista"), { width, height, layout, film: FILM, base });
  window.__hf = window.__hf || {};
  window.__hf.buildReady = window.__hf.buildReady || {};
  window.__hf.buildReady["bista-3d"] = bista.ready.then(() => bista.renderAt((window.__hfThreeTime || 0) - P));
  window.addEventListener("hf-seek", (e) => bista.renderAt(e.detail.time - P));

  // --- Tekstovi iz FILM.copy ---------------------------------------------------
  document.querySelectorAll("[data-copy]").forEach((el) => {
    el.textContent = FILM.copy[el.dataset.copy];
  });
  // Povijesni kontekst i citat (izvori: analiza/povijesni-kontekst.md).
  for (const id of ["fakt", "citat"]) {
    const k = FILM.kontekst[id];
    const el = document.getElementById(id);
    if (k.oznaka) el.querySelector(".oznaka").textContent = k.oznaka;
    el.querySelector(".tekst").textContent = k.tekst;
    el.querySelector(".izvor").textContent = k.izvor;
  }

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
  const at = (t) => t + P;

  // tempo < 1 sažima uvod (B ima samo ~1,9 s do prvog stiha).
  const k = intro.tempo ?? 1;
  tl.fromTo("#uvod .eyebrow", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.9 * k, ease: "power2.out" }, at(intro.in));
  tl.fromTo("#uvod h1", { opacity: 0, y: 28, letterSpacing: "0.32em" }, { opacity: 1, y: 0, letterSpacing: "0.14em", duration: 1.6 * k, ease: "power3.out" }, at(intro.in + 0.3 * k));
  tl.fromTo("#uvod .crta", { scaleX: 0 }, { scaleX: 1, duration: 1.2 * k, ease: "power2.inOut" }, at(intro.in + 0.9 * k));
  tl.fromTo("#uvod .podnaslov", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 1.0 * k, ease: "power2.out" }, at(intro.in + 1.3 * k));
  tl.to("#uvod .uvod-in", { opacity: 0, y: -16, duration: 0.9 * k, ease: "power2.in" }, at(intro.out - 0.9 * k));

  // Stihovi: riječ po riječ na vremenu iz transkripta, red nestaje na kraju.
  FILM.lyrics.forEach((line, i) => {
    const words = document.querySelectorAll(`#stih-${i} .rijec`);
    line.words.forEach((w, j) => {
      tl.fromTo(words[j], { opacity: 0, y: 18, filter: "blur(6px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.45, ease: "power2.out" }, at(w.t));
    });
    tl.to(`#stih-${i}`, { opacity: 0, duration: 0.5, ease: "power1.in" }, at(line.out - 0.5));
  });

  for (const id of ["fakt", "citat"]) {
    const k = FILM.kontekst[id];
    tl.fromTo(`#${id}`, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, at(k.in));
    tl.to(`#${id}`, { opacity: 0, duration: 0.5, ease: "power1.in" }, at(k.out - 0.5));
  }

  // Outro kartica: nakon pjesme, do kraja filma.
  tl.fromTo("#odjava .odjava-in > *", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: "power2.out" }, at(outro.in));
  tl.fromTo("#zatamnjenje", { opacity: 0 }, { opacity: 1, duration: FILM.fadeOut, ease: "none" }, FILM.duration - FILM.fadeOut);

  return tl;
}

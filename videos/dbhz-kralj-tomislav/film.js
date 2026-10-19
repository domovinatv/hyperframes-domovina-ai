// Sve brojke filma na jednom mjestu, po isječku pjesme. Vremena su lokalna
// za pjesmu (0 = početak isječka); film počinje PRED s ranije (intro kartica)
// i traje POSLIJE s dulje (outro kartica) — taj pomak dodaju main.js i bista.
// Izvori: Speechmatics (riječi, točno 89–145 i 257–310 s), Demucs vokal (rubovi,
// pauze, završna strofa C), analiza/audiomap-full.json (beatovi) — sve u
// vremenu punog spota; lokalno = spot − isjecak.od.
// Kontekst i citati: analiza/povijesni-kontekst.md (izvori).

import { BEATOVI } from "./beatovi.js";

const PRED = 2;
const POSLIJE = 3;

const ZAJEDNICKO = {
  copy: {
    eyebrow: "DBHZ · DIGITALNI MUZEJ",
    naslov: "Kralj Tomislav",
    podnaslov: "prvi hrvatski kralj · 925.",
    dbhz: "DBHZ · DIGITALNI MUZEJ",
    poruka: "Pogledaj bistu kralja Tomislava u 3D",
    adresa: "dbhz-3d-modeli.domovina.ai",
    zasluge: "Glazba: Marko Perković Thompson — „Kralj Tomislav”",
    napomena: "Ilustrativna 3D digitalizacija — atribucija nepotvrđena.",
  },
  layout: {
    landscape: { shiftX: 0.17, shiftY: 0, zoom: 1 },
    // outroLookY: na outru bista ide gore jer je kartica ispod nje (bista-scena.js)
    portrait: { shiftX: 0, shiftY: -0.025, zoom: 0.8, outroLookY: -0.36 },
  },
  fadeOut: 0.6,
  pomak: PRED,
};

// Pretvorba iz vremena spota u lokalno vrijeme isječka koji počinje na `od`.
const vrijeme = (od) => {
  const lok = (t) => Math.round((t - od) * 1000) / 1000;
  return {
    lok,
    rijeci: (parovi) => parovi.map(([text, t]) => ({ text, t: lok(t) })),
    beatovi: (doT) => BEATOVI.filter((b) => b >= od && b < doT).map(lok),
  };
};

// Zajedničko svakom isječku: trajanja, intro/outro kartice, beatovi.
// `rep` = koliko glazbe ide u outro karticu (A/B: instrumental; C/D: vokal se
// vraća odmah nakon pauze, pa kartica ide bez glazbe).
function isjecak(od, doT, rep, film) {
  const { lok, beatovi } = vrijeme(od);
  const pjesma = lok(doT);
  return {
    ...ZAJEDNICKO,
    ...film,
    isjecak: { od, do: doT },
    pjesma,
    audioTrajanje: pjesma + rep,
    duration: Math.round((PRED + pjesma + POSLIJE) * 1000) / 1000,
    copy: { ...ZAJEDNICKO.copy, ...film.copy, outro: { in: pjesma - 0.2 } },
    beats: beatovi(doT + POSLIJE),
  };
}

const CITAT_LAV = {
  tekst: "„Prirodni zakon nalaže nam da odano ljubimo i branimo zemlju u kojoj smo rođeni i odgojeni.”",
  izvor: "Lav XIII., Sapientiae Christianae, 5 (1890.)",
};
const IZVORI_LAV = "Kontekst: Hrvatska enciklopedija · Citat (prijevod): Sapientiae Christianae, magisterium.com";

// Refren „Žezlo i kruna" zajednički je za A i B (vremena spota, Speechmatics;
// „povijesti puna" kreće 117,4 — vokal na Demucs stemu 117,5). Zadnji ton
// „vremena" drži se do 145,4.
const REFREN = [
  { words: [["Žezlo", 111.91], ["i", 112.95], ["kruna,", 113.43]], out: 116.9 },
  { words: [["povijesti", 117.38], ["puna", 119.36]], out: 121.9 },
  { words: [["Kralju", 122.13], ["Tomislave,", 123.45]], out: 124.65 },
  { words: [["sve", 124.77], ["je", 125.22], ["zemlja", 125.49], ["tvoje", 126.15], ["slave", 126.81]], out: 127.55 },
  { words: [["od", 127.65], ["Jadranskog", 127.92], ["mora", 128.94], ["pa", 129.57], ["do", 129.84], ["rijeke", 130.2], ["Drave", 131.67]], out: 133.25 },
  { words: [["još", 133.38], ["u", 133.65], ["nama", 133.74], ["vatre", 134.37], ["ima,", 134.9]], out: 136.0 },
  { words: [["još", 136.11], ["je", 136.35], ["živa", 136.44], ["domovina", 137.16]], out: 138.35 },
  { words: [["branili", 138.45], ["je", 139.5], ["vitezovi", 139.83]], out: 141.15 },
  { words: [["iz", 141.27], ["novih", 141.6], ["vremena", 142.26]], out: 145.6 },
];

// Kamen (davnina) → bronca na „Žezlo i kruna" → patina uz more → bronca na „još je živa".
const REFREN_MATERIJALI = (lok) => [
  { t: lok(111.91), variant: "bronca" },
  { t: lok(127.65), variant: "patina" },
  { t: lok(136.11), variant: "bronca" },
];
const REFREN_ZLATO = (lok) => [
  { t: lok(111.6), v: 0 },
  { t: lok(112.6), v: 1 },
  { t: lok(127.0), v: 1 },
  { t: lok(128.2), v: 0.45 },
  { t: lok(135.6), v: 0.45 },
  { t: lok(136.7), v: 1 },
];

export const FILMOVI = {
  // A: uvod → krunidba na Duvanjskom polju → cijeli 1. refren. Kraj na beatu
  // 147,54 u instrumentalu (vokal do 145,4), instrumental ide u outro.
  a: (() => {
    const OD = 84.13;
    const { lok, rijeci } = vrijeme(OD);
    return isjecak(OD, 147.54, POSLIJE, {
      audio: "assets/pjesma-a.m4a",
      copy: { intro: { in: -PRED + 0.15, out: 5.3 }, izvori: IZVORI_LAV },
      lyrics: [
        { words: rijeci([["Na", 89.74], ["Duvanjskom", 89.86], ["polju", 90.72], ["ravnom", 91.24]]), out: lok(92.0) },
        { words: rijeci([["okruniše", 92.04], ["kralja", 93.06]]), out: lok(94.0) },
        { words: rijeci([["Tomislava,", 94.1], ["hrabrog", 95.88], ["kneza,", 96.72], ["ratnika", 97.56], ["vladara", 98.4]]), out: lok(100.4) },
        { words: rijeci([["o", 102.86], ["prvoj", 103.32], ["kruni", 103.72], ["u", 104.04], ["Hrvata", 104.42]]), out: lok(109.0) },
        ...REFREN.map((r) => ({ words: rijeci(r.words), out: lok(r.out) })),
      ],
      kontekst: {
        fakt: { in: lok(100.6), out: lok(109.6), oznaka: "914.", tekst: "Toma Arhiđakon bilježi Tomislava kao kneza (dux) — najstariji pouzdan podatak o njemu.", izvor: "Hrvatska enciklopedija" },
        citat: { in: lok(138.6), out: lok(145.8), ...CITAT_LAV },
      },
      materials: [{ t: -PRED, variant: "kamen" }, ...REFREN_MATERIJALI(lok)],
      rotation: {
        // brzina u okretajima/s; spec auto-rotate je ~1/66 ≈ 0,015
        speed: [
          { t: 0, v: 0.012 },
          { t: 26, v: 0.012 },
          { t: 29, v: 0.03 },
          { t: lok(142.3), v: 0.03 },
          { t: lok(145.4), v: 0.015 },
        ],
        frontAt: lok(111.91), // lice prema kameri točno na „Žezlo"
        frontDeg: 0,
      },
      camera: {
        distance: [
          { t: -PRED, v: 1.16 },
          { t: 20, v: 1.0 },
          { t: lok(112.4), v: 0.95 },
          { t: 45, v: 0.96 },
          { t: lok(147.54) + POSLIJE, v: 1.08 },
        ],
        lookY: [{ t: 0, v: 0 }],
      },
      light: [
        { t: -PRED, v: 0 },
        { t: 3.0, v: 1 },
      ],
      gold: [{ t: 0, v: 0 }, ...REFREN_ZLATO(lok)],
      pulseWindows: [[lok(111.6), lok(145.4)]],
    });
  })(),

  // B: samo 1. refren (Reels/Shorts). Počinje na beatu odmah nakon „…narod
  // svoj" (vokal do 109,8), pa je do „Žezlo" samo ~1,9 s: naslov je u intro kartici.
  b: (() => {
    const OD = 110.04;
    const { lok, rijeci } = vrijeme(OD);
    return isjecak(OD, 147.54, POSLIJE, {
      audio: "assets/pjesma-b.m4a",
      copy: { intro: { in: -PRED + 0.15, out: lok(111.8), tempo: 0.7 }, izvori: IZVORI_LAV },
      lyrics: REFREN.map((r) => ({ words: rijeci(r.words), out: lok(r.out) })),
      kontekst: {
        fakt: { in: lok(117.4), out: lok(125.6), oznaka: "pribl. 910.–928.", tekst: "Prema većinski prihvaćenom mišljenju — prvi hrvatski kralj.", izvor: "Hrvatska enciklopedija" },
        citat: { in: lok(138.6), out: lok(145.8), ...CITAT_LAV },
      },
      materials: [{ t: -PRED, variant: "kamen" }, ...REFREN_MATERIJALI(lok)],
      rotation: {
        speed: [
          { t: 0, v: 0.02 },
          { t: lok(113.1), v: 0.03 },
          { t: lok(142.3), v: 0.03 },
          { t: lok(145.4), v: 0.015 },
        ],
        frontAt: lok(111.91),
        frontDeg: 0,
      },
      camera: {
        distance: [
          { t: -PRED, v: 1.14 },
          { t: lok(112.4), v: 0.95 },
          { t: lok(129.13), v: 0.96 },
          { t: lok(147.54) + POSLIJE, v: 1.08 },
        ],
        // Bista niže dok traje naslov (u 9:16 kruna bi inače ušla u podnaslov).
        lookY: [
          { t: -PRED, v: 0.2 },
          { t: 1.0, v: 0.2 },
          { t: lok(112.4), v: 0 },
        ],
      },
      light: [
        { t: -PRED, v: 0 },
        { t: 1.2, v: 1 },
      ],
      gold: [{ t: 0, v: 0 }, ...REFREN_ZLATO(lok)],
      pulseWindows: [[lok(111.6), lok(145.4)]],
    });
  })(),

  // D: „Kad s perona siđeš…" — najgledaniji dio spota (heatmap vrh 259 s).
  // Instrumental 222,9–257,1 nosi naslov; kraj 297,1 u pauzi vokala
  // (297,0–298,3), točno na početku C.
  d: (() => {
    const OD = 252.308;
    const { lok, rijeci } = vrijeme(OD);
    const red = (parovi, out) => ({ words: rijeci(parovi), out: lok(out) });
    return isjecak(OD, 297.1, 0, {
      audio: "assets/pjesma-d.m4a",
      copy: {
        intro: { in: -PRED + 0.15, out: lok(256.7) },
        izvori: "Kontekst: HAZU, kraljtomislav.hazu.hr · Citat (prijevod): Ivan Pavao II., UN 1995., magisterium.com",
      },
      lyrics: [
        red([["Kad", 257.01], ["s", 257.34], ["perona", 257.46], ["siđeš,", 258.12]], 259.1),
        red([["vidiš", 259.23], ["bijeli", 259.65], ["Zagreb", 260.1], ["grad", 261.72]], 263.7),
        red([["Tomislav", 263.94], ["na", 264.72], ["konju", 264.9]], 266.7),
        red([["ko", 266.85], ["da", 267.2], ["zbori", 267.57], ["sad", 268.23]], 270.6),
        red([["Hrvatska", 270.81], ["je", 271.62], ["tvoja,", 271.83]], 272.65),
        red([["zato", 272.76], ["nikom", 273.39], ["ne", 273.84], ["daj", 274.95], ["nju", 275.4]], 277.45),
        red([["na", 277.59], ["tebe", 277.8], ["računa,", 278.46]], 280.45),
        red([["krene", 280.59], ["li", 281.34], ["po", 281.7], ["zlu", 282.0]], 284.4),
        red([["Od", 284.58], ["Osijeka", 284.82], ["mati", 285.63]], 286.45),
        red([["pjevala", 286.53], ["je", 287.34], ["sinu", 287.55], ["svom", 289.02]], 291.2),
        red([["čuvaru", 291.33], ["na", 292.23], ["Dravi,", 292.44]], 294.25),
        red([["o", 294.39], ["junaštvu", 294.81], ["tvom", 295.8]], 297.05),
      ],
      kontekst: {
        fakt: { in: lok(264.0), out: lok(270.6), oznaka: "Zagreb · 1947.", tekst: "Konjanički kip Roberta Frangeša Mihanovića postavljen je pred Glavni kolodvor u listopadu 1947.", izvor: "HAZU" },
        citat: {
          in: lok(272.7),
          out: lok(282.4),
          tekst: "„Pravo domoljublje nikada ne promiče dobro vlastitog naroda na štetu drugih.”",
          izvor: "sv. Ivan Pavao II., govor u UN-u, 1995.",
        },
      },
      // Kamen → bronca na „Tomislav na konju" (kip) → patina uz Dravu.
      materials: [
        { t: -PRED, variant: "kamen" },
        { t: lok(263.94), variant: "bronca" },
        { t: lok(291.33), variant: "patina" },
      ],
      rotation: {
        speed: [
          { t: 0, v: 0.015 },
          { t: lok(269.5), v: 0.015 },
          { t: lok(271.5), v: 0.03 },
          { t: lok(282.0), v: 0.03 },
          { t: lok(284.5), v: 0.015 },
        ],
        frontAt: lok(264.4), // lice prema kameri na „Tomislav na konju"
        frontDeg: 0,
      },
      camera: {
        distance: [
          { t: -PRED, v: 1.14 },
          { t: lok(257.0), v: 1.0 },
          { t: lok(264.5), v: 0.95 },
          { t: lok(284.0), v: 1.0 },
          { t: lok(297.1) + POSLIJE, v: 1.08 },
        ],
        lookY: [
          { t: -PRED, v: 0.2 },
          { t: lok(256.0), v: 0.2 },
          { t: lok(257.6), v: 0 },
        ],
      },
      light: [
        { t: -PRED, v: 0 },
        { t: 3.0, v: 1 },
      ],
      gold: [
        { t: 0, v: 0 },
        { t: lok(263.6), v: 0 },
        { t: lok(264.6), v: 1 },
        { t: lok(284.2), v: 1 },
        { t: lok(285.2), v: 0.45 },
      ],
      pulseWindows: [[lok(257.0), lok(296.9)]],
    });
  })(),

  // C: „…u našem Splitu" → „blagoslov od Pape – Tomislav je kralj" → pauza u
  // vokalu 311–322,8 (kontekst + citat) → „Još zemlja se mrvi…" → „Kroz Bosnu…
  // Kraljevstvo tvoje". Kraj na beatu 367,247 u pauzi 366,1–367,75.
  // Tekst od korisnika; vremena do 344 iz transkripta, od 344 Speechmatics
  // granice riječi (tekst ondje smeće) provjerene na Demucs vokalu.
  c: (() => {
    const OD = 297.1;
    const { lok, rijeci } = vrijeme(OD);
    const red = (parovi, out) => ({ words: rijeci(parovi), out: lok(out) });
    return isjecak(OD, 367.247, 0, {
      audio: "assets/pjesma-c.m4a",
      copy: {
        intro: { in: -PRED + 0.15, out: lok(297.95), tempo: 0.5 },
        izvori: "Kontekst: Hrvatska enciklopedija · Citat (prijevod): Gaudium et spes, 75, vatican.va",
      },
      lyrics: [
        red([["a", 298.1], ["u", 298.27], ["našem", 298.57], ["Splitu", 299.25]], 299.85),
        red([["još", 299.87], ["o", 300.59], ["tebi", 300.79], ["šumi", 301.13], ["val", 301.45]], 303.75),
        red([["blagoslov", 303.85], ["od", 305.79], ["Pape", 306.03], ["–", 306.4]], 306.95),
        red([["Tomislav", 306.99], ["je", 309.23], ["kralj", 309.41]], 311.1),
        red([["Još", 322.8], ["zemlja", 323.06], ["se", 323.74], ["mrvi", 324.16]], 324.95),
        red([["i", 325.0], ["novo", 325.64], ["sjeme", 326.0], ["niče", 327.02]], 327.7),
        red([["još", 327.74], ["mokra", 328.5], ["od", 329.08], ["krvi", 329.66]], 330.2),
        red([["sloboda", 330.24], ["kliče", 332.0]], 333.15),
        red([["još", 333.18], ["Hrvat", 333.92], ["tvoj", 334.42], ["pravi", 335.18]], 335.9),
        red([["kad", 335.92], ["čuje", 336.42], ["himnu", 336.94], ["slavi", 337.94]], 338.6),
        red([["ko", 338.64], ["ratnik", 339.1], ["na", 339.84], ["grudi", 340.54]], 341.27),
        red([["desnicu", 341.3], ["stavi", 343.14]], 344.5),
        red([["Kroz", 344.58], ["Bosnu", 344.91], ["još", 345.9], ["tutnji,", 346.3]], 347.15),
        red([["tako", 347.25], ["je", 347.94], ["od", 348.33], ["davnina", 349.08]], 349.9),
        red([["drži", 350.01], ["se", 350.6], ["ponosno", 351.36]], 352.25),
        red([["Hercegovina", 352.35]], 355.35),
        red([["još", 355.5], ["crven,", 355.71], ["još", 356.82], ["bijeli,", 357.18]], 358.05),
        red([["još", 358.17], ["plavi", 358.41], ["svud", 359.1], ["se", 359.85], ["vije", 360.21]], 360.85),
        red([["uz", 360.96], ["Boga,", 361.26], ["tri", 362.28], ["boje", 362.61]], 363.15),
        red([["Kraljevstvo", 363.25], ["tvoje", 364.57]], 366.6),
      ],
      kontekst: {
        fakt: {
          in: lok(304.0),
          out: lok(315.6),
          oznaka: "Split · 925.",
          tekst: "Uz splitski crkveni sabor papa piše »dragom sinu Tomislavu, kralju Hrvata«.",
          izvor: "Hrvatska enciklopedija",
        },
        citat: {
          in: lok(316.1),
          out: lok(322.6),
          tekst: "„Građani neka velikodušno i vjerno njeguju ljubav prema domovini, ali bez uskogrudnosti.”",
          izvor: "II. vatikanski sabor, Gaudium et spes, 75",
        },
      },
      // Patina (more, Split) → kamen („blagoslov") → bronca na „Tomislav je kralj"
      // → kamen kroz Bosnu → bronca na „uz Boga, tri boje".
      materials: [
        { t: -PRED, variant: "patina" },
        { t: lok(303.85), variant: "kamen" },
        { t: lok(306.99), variant: "bronca" },
        { t: lok(344.58), variant: "kamen" },
        { t: lok(360.96), variant: "bronca" },
      ],
      rotation: {
        speed: [
          { t: 0, v: 0.015 },
          { t: lok(306.0), v: 0.015 },
          { t: lok(307.5), v: 0.007 },
          { t: lok(311.0), v: 0.007 },
          { t: lok(313.0), v: 0.012 },
          { t: lok(322.0), v: 0.012 },
          { t: lok(324.0), v: 0.042 },
          { t: lok(344.0), v: 0.042 },
          { t: lok(346.5), v: 0.02 },
        ],
        frontAt: lok(307.6), // lice prema kameri na „Tomislav"
        frontDeg: 0,
      },
      camera: {
        distance: [
          { t: -PRED, v: 1.12 },
          { t: 0.5, v: 1.06 },
          { t: lok(306.99), v: 0.97 },
          { t: lok(309.6), v: 0.93 },
          { t: lok(312.5), v: 1.1 },
          { t: lok(322.0), v: 1.1 },
          { t: lok(323.5), v: 0.96 },
          { t: lok(344.5), v: 1.0 },
          { t: lok(362.0), v: 0.94 },
          { t: lok(367.247) + POSLIJE, v: 1.08 },
        ],
        // Bista niže dok traje naslov (9:16: naslov je iznad nje).
        lookY: [
          { t: -PRED, v: 0.2 },
          { t: 0.4, v: 0.2 },
          { t: 1.6, v: 0 },
        ],
      },
      light: [
        { t: -PRED, v: 0 },
        { t: 1.0, v: 1 },
      ],
      gold: [
        { t: 0, v: 0 },
        { t: lok(306.5), v: 0 },
        { t: lok(307.5), v: 1 },
        { t: lok(311.0), v: 1 },
        { t: lok(312.5), v: 0.45 },
        { t: lok(322.3), v: 0.45 },
        { t: lok(323.2), v: 1 },
        { t: lok(344.5), v: 1 },
        { t: lok(345.5), v: 0.55 },
        { t: lok(360.5), v: 0.55 },
        { t: lok(361.3), v: 1 },
      ],
      pulseWindows: [[lok(306.9), lok(311.0)], [lok(322.7), lok(366.1)]],
    });
  })(),
};

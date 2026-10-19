// Sve brojke filma na jednom mjestu, po isječku pjesme. Vremena su lokalna
// (0 = početak isječka). Izvor: analiza/stihovi-faster-whisper.json (riječi)
// i analiza/audiomap-full.json (beatovi), oboje u vremenu punog spota;
// lokalno = spot − isjecak.od.

const ZAJEDNICKO = {
  copy: {
    eyebrow: "DBHZ · DIGITALNI MUZEJ",
    naslov: "Kralj Tomislav",
    podnaslov: "prvi hrvatski kralj · 925.",
    dbhz: "DBHZ · DIGITALNI MUZEJ",
    poruka: "Bista kralja Tomislava u 3D",
    adresa: "dbhz-3d-modeli.domovina.ai",
    zasluge: "Glazba: Marko Perković Thompson — „Kralj Tomislav”",
    napomena: "Ilustrativna 3D digitalizacija — atribucija nepotvrđena.",
  },
  layout: {
    landscape: { shiftX: 0.17, shiftY: 0, zoom: 1 },
    portrait: { shiftX: 0, shiftY: -0.025, zoom: 0.8 },
  },
  fadeOut: 1.2,
};

// Pretvorba iz vremena spota u lokalno vrijeme isječka koji počinje na `od`.
const vrijeme = (od) => {
  const lok = (t) => Math.round((t - od) * 1000) / 1000;
  return { lok, rijeci: (parovi) => parovi.map(([text, t]) => ({ text, t: lok(t) })) };
};

// Refren „Žezlo i kruna" zajednički je za A i B (vremena spota).
const REFREN = [
  { words: [["Žezlo", 111.91], ["i", 112.95], ["kruna", 113.43]], out: 125.8 },
  { words: [["od", 126.22], ["Jadranskog", 127.64], ["mora", 128.88], ["pa", 129.54], ["do", 129.76], ["rijeke", 130.0], ["Drave", 131.18]], out: 135.4 },
  { words: [["još", 135.82], ["je", 136.3], ["živa", 136.55], ["domovina", 137.06]], out: 138.4 },
];

const OD_A = 84.13;
const { lok, rijeci } = vrijeme(OD_A);

export const FILMOVI = {
  // A: 2 takta uvoda → krunidba na Duvanjskom polju → 1. refren „Žezlo i kruna".
  a: {
    ...ZAJEDNICKO,
    isjecak: { od: OD_A, do: 144.13 },
    audio: "assets/pjesma-a.m4a",
    duration: 60,
    copy: { ...ZAJEDNICKO.copy, intro: { in: 0.4, out: 5.3 }, outro: { in: lok(138.5) } },
    lyrics: [
      { words: rijeci([["Na", 89.74], ["Duvanjskom", 89.86], ["polju", 90.72], ["ravnom", 91.24]]), out: lok(92.0) },
      { words: rijeci([["okruniše", 92.04], ["kralja", 93.06]]), out: lok(94.0) },
      { words: rijeci([["Tomislava,", 94.1], ["hrabrog", 95.88], ["kneza,", 96.72], ["ratnika", 97.56], ["vladara", 98.4]]), out: lok(100.4) },
      { words: rijeci([["o", 102.86], ["prvoj", 103.32], ["kruni", 103.72], ["u", 104.04], ["Hrvata", 104.42]]), out: lok(109.0) },
      ...REFREN.map((r) => ({ words: rijeci(r.words), out: lok(r.out) })),
    ],
    // Kamen (davnina) → bronca na „Žezlo i kruna" → patina uz more → bronca na kraju.
    materials: [
      { t: 0, variant: "kamen" },
      { t: lok(111.91), variant: "bronca" },
      { t: lok(126.22), variant: "patina" },
      { t: lok(135.82), variant: "bronca" },
    ],
    rotation: {
      // brzina u okretajima/s; spec auto-rotate je ~1/66 ≈ 0,015
      speed: [
        { t: 0, v: 0.012 },
        { t: 26, v: 0.012 },
        { t: 29, v: 0.03 },
        { t: 52, v: 0.03 },
        { t: 55, v: 0.015 },
        { t: 60, v: 0.015 },
      ],
      frontAt: lok(111.91), // lice prema kameri točno na „Žezlo"
      frontDeg: 0,
    },
    camera: {
      distance: [
        { t: 0, v: 1.14 },
        { t: 20, v: 1.0 },
        { t: lok(112.4), v: 0.95 },
        { t: 45, v: 0.96 },
        { t: 60, v: 1.06 },
      ],
      lookY: [{ t: 0, v: 0 }],
    },
    light: [
      { t: 0, v: 0 },
      { t: 4.5, v: 1 },
    ],
    gold: [
      { t: 0, v: 0 },
      { t: lok(111.6), v: 0 },
      { t: lok(112.6), v: 1 },
      { t: lok(125.8), v: 1 },
      { t: lok(127.0), v: 0.45 },
      { t: lok(135.5), v: 0.45 },
      { t: lok(136.6), v: 1 },
    ],
    pulseWindows: [[lok(111.6), lok(138.5)]],
    beats: [0.692, 1.366, 2.062, 2.759, 3.409, 4.059, 4.756, 5.453, 6.149, 6.823, 7.496, 8.193, 8.866, 9.539, 10.236, 10.909, 11.583, 12.279, 12.976, 13.649, 14.323, 14.996, 15.693, 16.366, 17.063, 17.736, 18.433, 19.106, 19.779, 20.453, 21.126, 21.823, 22.496, 23.169, 23.843, 24.586, 25.236, 25.909, 26.606, 27.256, 27.953, 28.626, 29.299, 29.95, 30.693, 31.366, 32.039, 32.736, 33.409, 34.083, 34.779, 35.453, 36.149, 36.823, 37.496, 38.17, 38.866, 39.539, 40.236, 40.909, 41.583, 42.279, 42.953, 43.626, 44.323, 44.996, 45.67, 46.343, 47.04, 47.713, 48.41, 49.106, 49.779, 50.43, 51.126, 51.8, 52.496, 53.17, 53.843, 54.493, 55.213, 55.886, 56.583, 57.256, 57.953, 58.626, 59.3, 59.996],
  },

  // B: samo 1. refren (Reels/Shorts). Počinje na beatu odmah nakon „…narod
  // svoj" (vokal do 109,8), pa je do „Žezlo" samo ~1,9 s: uvod je ubrzan.
  b: (() => {
    const { lok, rijeci } = vrijeme(110.04);
    return {
      ...ZAJEDNICKO,
      isjecak: { od: 110.04, do: 144.13 },
      audio: "assets/pjesma-b.m4a",
      duration: 34.09,
      copy: { ...ZAJEDNICKO.copy, intro: { in: 0, out: lok(112.1), tempo: 0.5 }, outro: { in: lok(138.5) } },
      lyrics: REFREN.map((r) => ({ words: rijeci(r.words), out: lok(r.out) })),
      materials: [
        { t: 0, variant: "kamen" },
        { t: lok(111.91), variant: "bronca" },
        { t: lok(126.22), variant: "patina" },
        { t: lok(135.82), variant: "bronca" },
      ],
      rotation: {
        speed: [
          { t: 0, v: 0.02 },
          { t: lok(113.1), v: 0.03 },
          { t: lok(136.1), v: 0.03 },
          { t: lok(139.1), v: 0.015 },
          { t: 34.09, v: 0.015 },
        ],
        frontAt: lok(111.91),
        frontDeg: 0,
      },
      camera: {
        distance: [
          { t: 0, v: 1.12 },
          { t: lok(112.4), v: 0.95 },
          { t: lok(129.13), v: 0.96 },
          { t: 34.09, v: 1.06 },
        ],
        // Bista niže dok traje naslov (u 9:16 kruna bi inače ušla u podnaslov).
        lookY: [
          { t: 0, v: 0.2 },
          { t: 1.3, v: 0.2 },
          { t: lok(112.4), v: 0 },
        ],
      },
      light: [
        { t: 0, v: 0.25 },
        { t: 1.6, v: 1 },
      ],
      gold: [
        { t: 0, v: 0 },
        { t: lok(111.6), v: 0 },
        { t: lok(112.6), v: 1 },
        { t: lok(125.8), v: 1 },
        { t: lok(127.0), v: 0.45 },
        { t: lok(135.5), v: 0.45 },
        { t: lok(136.6), v: 1 },
      ],
      pulseWindows: [[lok(111.6), lok(138.5)]],
      beats: [0.696, 1.346, 2.043, 2.716, 3.389, 4.04, 4.783, 5.456, 6.129, 6.826, 7.499, 8.173, 8.869, 9.543, 10.239, 10.913, 11.586, 12.26, 12.956, 13.629, 14.326, 14.999, 15.673, 16.369, 17.043, 17.716, 18.413, 19.086, 19.76, 20.433, 21.13, 21.803, 22.5, 23.196, 23.869, 24.52, 25.216, 25.89, 26.586, 27.26, 27.933, 28.583, 29.303, 29.976, 30.673, 31.346, 32.043, 32.716, 33.39, 34.086],
    };
  })(),

  // C: „…u našem Splitu" → „blagoslov od Pape – Tomislav je kralj" → pauza u
  // vokalu (311–322,8: naslov pa odjava, jer se do kraja pjeva) → završna
  // strofa „Još zemlja se mrvi…". Rubovi izmjereni na vokalu: „…tvom" do 296,9;
  // strofa završava ~344,2. Tekst od korisnika, vremena riječi iz transkripta.
  c: (() => {
    const { lok, rijeci } = vrijeme(297.1);
    const KRAJ = 47.97;
    const red = (parovi, out) => ({ words: rijeci(parovi), out: out === undefined ? KRAJ : lok(out) });
    return {
      ...ZAJEDNICKO,
      isjecak: { od: 297.1, do: 345.07 },
      audio: "assets/pjesma-c.m4a",
      duration: KRAJ,
      copy: {
        ...ZAJEDNICKO.copy,
        intro: { in: lok(311.3), out: lok(316.6) },
        outro: { in: lok(316.9), out: lok(322.5) },
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
        red([["desnicu", 341.3], ["stavi", 343.14]]),
      ],
      // Patina (more, Split) → kamen („blagoslov") → bronca na „Tomislav je kralj".
      materials: [
        { t: 0, variant: "patina" },
        { t: lok(303.85), variant: "kamen" },
        { t: lok(306.99), variant: "bronca" },
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
          { t: lok(342.0), v: 0.042 },
          { t: KRAJ, v: 0.02 },
        ],
        // lice prema kameri na „Tomislav" i opet (puni krug) na „stavi"
        frontAt: lok(307.6),
        frontDeg: 0,
      },
      camera: {
        distance: [
          { t: 0, v: 1.06 },
          { t: lok(306.99), v: 0.97 },
          { t: lok(309.6), v: 0.93 },
          { t: lok(312.5), v: 1.1 },
          { t: lok(322.0), v: 1.1 },
          { t: lok(323.5), v: 0.96 },
          { t: KRAJ, v: 1.04 },
        ],
        // Bista niže dok traju naslov i odjava (u 9:16 su iznad i ispod nje).
        lookY: [
          { t: 0, v: 0 },
          { t: lok(311.0), v: 0 },
          { t: lok(312.5), v: 0.2 },
          { t: lok(316.6), v: 0.2 },
          { t: lok(317.4), v: -0.12 },
          { t: lok(322.0), v: -0.12 },
          { t: lok(323.5), v: 0 },
        ],
      },
      light: [
        { t: 0, v: 0.3 },
        { t: 1.5, v: 1 },
      ],
      gold: [
        { t: 0, v: 0 },
        { t: lok(306.5), v: 0 },
        { t: lok(307.5), v: 1 },
        { t: lok(311.0), v: 1 },
        { t: lok(312.5), v: 0.45 },
        { t: lok(322.3), v: 0.45 },
        { t: lok(323.2), v: 1 },
      ],
      pulseWindows: [[lok(306.9), lok(311.0)], [lok(322.7), KRAJ]],
      beats: [0.649, 1.3, 1.95, 2.577, 3.227, 3.877, 4.574, 5.27, 5.99, 6.663, 7.314, 8.126, 8.916, 9.636, 10.286, 10.959, 11.586, 12.329, 13.049, 13.699, 14.349, 15.092, 15.812, 16.532, 17.275, 17.972, 18.645, 19.318, 20.015, 20.688, 21.385, 22.058, 22.732, 23.428, 24.078, 24.682, 25.263, 25.866, 26.493, 27.19, 27.863, 28.56, 29.21, 29.883, 30.58, 31.23, 31.95, 32.6, 33.297, 33.993, 34.667, 35.34, 36.013, 36.687, 37.383, 38.057, 38.753, 39.427, 40.123, 40.797, 41.493, 42.167, 42.863, 43.537, 44.21, 44.791, 45.348, 45.928, 46.602, 47.275],
    };
  })(),
};

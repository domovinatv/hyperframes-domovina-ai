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

const OD_A = 84.13;
const lok = (t) => Math.round((t - OD_A) * 1000) / 1000;
const rijeci = (parovi) => parovi.map(([text, t]) => ({ text, t: lok(t) }));

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
      { words: rijeci([["Žezlo", 111.91], ["i", 112.95], ["kruna", 113.43]]), out: lok(125.8) },
      { words: rijeci([["od", 126.22], ["Jadranskog", 127.64], ["mora", 128.88], ["pa", 129.54], ["do", 129.76], ["rijeke", 130.0], ["Drave", 131.18]]), out: lok(135.4) },
      { words: rijeci([["još", 135.82], ["je", 136.3], ["živa", 136.55], ["domovina", 137.06]]), out: lok(138.4) },
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
};

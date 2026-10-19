# Stanje (2026-10-19)

Gotovo:
- `bista-scena.js` — Three.js port SPEC-a, sve funkcija vremena (hf-seek):
  rotacija modela (integral brzine), materijali (zatvorena forma lerpa
  k = 1 − e^(−4.5·dt)), FitCamera, svjetlo, zlatni rim + prsten, puls na beatu.
- `main.js` — zajednički ulaz za oba formata, natpisi + jedan GSAP timeline.
- `film.css` — tokeni, landscape (bista desno, tekst lijevo) / portrait.
- `analiza/audiomap-full.json` — beat grid cijele pjesme (89,1 BPM, 424 s).

Tekst pjesme: GOTOVO — Demucs vokal → faster-whisper large-v3 + VAD,
`analiza/stihovi-faster-whisper.json` (riječi s vremenima; neke riječi krivo
prepoznate, vremena su dobra). Struktura pjesme (s, puni spot):

| od–do | dio |
|---|---|
| 0–89 | instrumentalni uvod spota |
| 89,7–109,5 | 1. strofa: „Na Duvanjskom polju ravnom okruniše kralja, Tomislava…", „…o prvoj kruni u Hrvata" |
| 111,9–143,8 | 1. refren: „Žezlo i kruna" @111,9 · „od Jadranskog mora pa do rijeke Drave" @126,2–131,2 |
| 144–185 | 2. strofa |
| 187,6–219,9 | 2. refren („Žezlo i kruna" @187,6) |
| 220–310 | most: „Kad s perona siđeš…" → „Blagoslov od pape, Tomislav je kralj" @303,9 |
| 323–404 | završni refreni |

Kandidati za isječak (rubovi na fraze iz audiomapa):
- **A (preporuka)** 84,13–144,13 = 60 s: 2 takta uvoda (naslov) → krunidba na
  Duvanjskom polju → cijeli 1. refren „Žezlo i kruna". Priča ide redom.
- B 108,3–144,13 ≈ 36 s: samo 1. refren — za Reels/Shorts.
- C 296,6–335,6 ≈ 39 s: „…Blagoslov od pape, Tomislav je kralj" + završni refren.

Fali:
1. (venv za analize: librosa + numpy<2.5 — sistemski numba ne radi s NumPy 2.5;
   faster-whisper dobiva numpy niz jer mu PyAV u venvu ne prima `metadata_errors`.)
2. Odabrati isječak (~45–60 s) oko „zlato i kruna" / refrena → `film.js` (FILM:
   duration, materials, rotation, camera, light, gold, beats, pulseWindows,
   lyrics, copy, layout, fadeOut) + ffmpeg rez s fadeom → `assets/pjesma.m4a`.
3. `index.html` (1920×1080) i `vertical.html` (1080×1920): importmap three@0.169.0,
   gsap, `<canvas id="bista">`, `#uvod`, `#stihovi`, `#odjava`, `#zatamnjenje`,
   `<audio id="pjesma">`; root `data-duration`.
4. `npx hyperframes check`, snapshotovi, preview, render oba formata.
5. Novi repo `dbhzhr/dbhz-thompson` (private) + landing na dbhz-thompson.domovina.ai
   po uzoru na odds.domovina.ai (Worker + R2 zbog Range/206), `noindex`.

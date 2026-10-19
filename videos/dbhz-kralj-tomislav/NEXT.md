# Stanje (2026-10-19)

Gotovo:
- `bista-scena.js` — Three.js port SPEC-a, sve funkcija vremena (hf-seek):
  rotacija modela (integral brzine), materijali (zatvorena forma lerpa
  k = 1 − e^(−4.5·dt)), FitCamera, svjetlo, zlatni rim + prsten, puls na beatu.
- `main.js` — zajednički ulaz za oba formata, natpisi + jedan GSAP timeline.
- `film.css` — tokeni, landscape (bista desno, tekst lijevo) / portrait.
- `analiza/audiomap-full.json` — beat grid cijele pjesme (89,1 BPM, 424 s).

Fali:
1. Tekst pjesme s vremenima. whisper.cpp halucinira i na miksu i na vokalu.
   Radi: Demucs (`--two-stems=vocals`) → faster-whisper large-v3 + VAD
   (`analiza/transkripcija-faster-whisper.py`). Izlaz iz prve sesije:
   `/private/tmp/claude-501/-Volumes-DOMOVINA2TB-git-dbhz-dbhz-3d-modeli/a53cd2e0-21d3-4352-8e5f-5153edc89bd4/scratchpad/tomislav/lyrics-fw.json`
   (venv s numpy<2.5 u istom folderu; sistemski numba ne radi s NumPy 2.5).
   Grubo: vokal kreće ~89 s; refren „…blagoslov od pape, Tomislav je kralj" ~300 s.
2. Odabrati isječak (~45–60 s) oko „zlato i kruna" / refrena → `film.js` (FILM:
   duration, materials, rotation, camera, light, gold, beats, pulseWindows,
   lyrics, copy, layout, fadeOut) + ffmpeg rez s fadeom → `assets/pjesma.m4a`.
3. `index.html` (1920×1080) i `vertical.html` (1080×1920): importmap three@0.169.0,
   gsap, `<canvas id="bista">`, `#uvod`, `#stihovi`, `#odjava`, `#zatamnjenje`,
   `<audio id="pjesma">`; root `data-duration`.
4. `npx hyperframes check`, snapshotovi, preview, render oba formata.
5. Novi repo `dbhzhr/dbhz-thompson` (private) + landing na dbhz-thompson.domovina.ai
   po uzoru na odds.domovina.ai (Worker + R2 zbog Range/206), `noindex`.

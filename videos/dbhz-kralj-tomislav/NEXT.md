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

Isječak A: GOTOV (2026-10-19) — `index.html` (16:9) i `formati/a-9x16.html`,
render 60,0 s oba, objavljeno na https://dbhz-thompson.domovina.ai
(repo dbhzhr/dbhz-thompson). HTML se generira: `python3 generiraj-kompozicije.py`.
9:16 snapshot: `snapshot` ne prima `-c`, pa privremena kopija projekta gdje je
vertikalna datoteka `index.html` (sed `"../` → `"./`).

Fali:
1. Korisnik pregledava A; zatim B (108,3–144,13) pa C (296,6–335,6):
   ffmpeg rez → `assets/pjesma-<x>.m4a`, `FILMOVI.<x>` u film.js (vremena
   riječi iz analiza/stihovi-faster-whisper.json, beatovi iz audiomapa),
   dodati u KOMPOZICIJE u generatoru, snapshot, render, upload u R2,
   landing: makni „u izradi" i dodaj izbor isječka.

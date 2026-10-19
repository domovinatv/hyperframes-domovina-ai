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
- B 110,04–144,13 = 34,09 s: samo 1. refren — za Reels/Shorts. (Plan je bio
  108,3, ali vokal „…narod svoj" traje 108,4–109,8 pa bi rez upao u riječ;
  110,04 je prvi beat nakon, do „Žezlo" ~1,9 s tišine u vokalu.)
- C 296,6–335,6 ≈ 39 s: „…Blagoslov od pape, Tomislav je kralj" + završni refren.

Isječak A: GOTOV (2026-10-19) — `index.html` (16:9) i `formati/a-9x16.html`,
render 60,0 s oba, objavljeno na https://dbhz-thompson.domovina.ai
(repo dbhzhr/dbhz-thompson). HTML se generira: `python3 generiraj-kompozicije.py`.
9:16 snapshot: `snapshot` ne prima `-c`, pa privremena kopija projekta gdje je
vertikalna datoteka `index.html` (sed `"../` → `"./`).

Isječak B: GOTOV (2026-10-19) — `formati/b-16x9.html`, `formati/b-9x16.html`,
34,1 s, objavljen (landing: izbor isječka, `#b` otvara B). Uvod ubrzan
(`copy.intro.tempo: 0.5`); `camera.lookY` 0,2 → 0 do „Žezlo" spušta bistu
dok traje naslov (u 9:16 kruna bi inače ušla u podnaslov). Refren je
zajednički (`REFREN` u film.js, vremena spota).

Isječak C: GOTOV (2026-10-19) — `formati/c-*.html`, 297,1–345,07 = 48 s
(plan 335,6 bi presjekao strofu). Naslov + odjava su u pauzi vokala 311–322,8
(`outro.out`), jer se do kraja pjeva. Brzina refrena 0,042 da je lice prema
kameri i na „Tomislav" i na „stavi" (točno 1 okretaj). Tekst C dao korisnik.

Fali (korisnik odobrio 2026-10-19, ovim redom):
1. **Pun refren u A i B.** Tekst (od korisnika): „Žezlo i kruna, povijesti puna" /
   Ref: „Kralju Tomislave, sve je zemlja tvoje slave / od Jadranskog mora pa do
   rijeke Drave / još u nama vatre ima, još je živa domovina / branili je
   vitezovi iz novih vremena". Sada fale „povijesti puna" (~113,4–115,5),
   „Kralju Tomislave…" (117,5–125,8), „još u nama vatre ima" (133,4–135,2),
   „branili je…" (138,4–143,8). Vremena riječi izmjeriti na Demucs vokalu
   (RMS po 100 ms; stem u scratchpadu sesije a53cd2e0…/tomislav/sep, ili ponovo
   Demucs). REFREN u film.js je zajednički za A i B. NE whisper za tekst.
   Odjava u A (138,5) se preklapa s „branili je…" → premjestiti u outro karticu (t. 2).
2. **Intro + outro kartica na SVIM isječcima (A, B, C), za dijeljenje na WhatsAppu:**
   - intro 2 s PRIJE pjesme: tamna DBHZ kartica („DBHZ · Digitalni muzej" +
     „Kralj Tomislav"), bista se pojavi iz mraka; pjesma kreće nakon kartice
     (audio `data-start` = 2, sva vremena filma + 2 — najčišće kao `pomak` u
     `vrijeme(od)` ili globalni offset u main.js/bista-scena.js).
   - outro 3 s POSLIJE pjesme: bista se okreće, „Pogledaj u 3D:
     dbhz-3d-modeli.domovina.ai", zasluga za glazbu + napomena o atribuciji;
     glazba se stiša u kartici (fade pjesme ostaje, kartica bez glazbe ili s repom).
   - postojeće odjave u pauzi (C) i na kraju (A, B) zamijeniti outro karticom.
3. Re-render svih 6, faststart, R2 (isti ključevi), deploy, provjera 206;
   ažurirati trajanja na landingu (kartice i gumbi) i README u dbhz-thompson.
4. Pitati prije slanja novih videa u WhatsApp grupu „DBHZ 3D scan"
   (JID 120363421678500642@g.us; MCP list_chats ne vraća ništa, send radi).

Tekst pjesme NE preuzimati s lyrics stranica (autorska prava) — samo od korisnika.

# Nastavak — odds-blueprint video (stanje 2026-10-18)

Workflow: `/faceless-explainer`, mode **collaborative** (automation + storyboard yes).

## Gotovo
- Step 0: `hyperframes init` (pin 0.8.171), `BRIEF.md`, preferencije zapisane,
  HeyGen prijavljen (oauth, vrijedi do 2026-10-28).
- Step 1: `capture/extracted/visible-text.txt` (README + docs 01–03 iz
  odds.domovina.ai, commit 58c7a1c) i `tokens.json`.

## Gotovo (2026-10-18, nastavak)
- tokens.json: domovina.ai boje + system-ui. Step 2: preset `blue-professional`,
  `frame.md` ručno ispravljen (primary = navy #002F6C; crvena samo `negative`;
  text-muted vraćen na #6b6b6b), preferencija zapisana.
- Step 3: `STORYBOARD.md` napisan (8 okvira, 92 s, bez naracije, music mood) —
  čeka odobrenje i odluku o skicama.

## Sljedeće (staro)
1. U `tokens.json` dodati domovina.ai boje iz `../../index.html`:
   `#002F6C` (navy, primarna), `#FF0000` (crvena, akcent), `#FFFFFF`,
   `#04101f` (tamna podloga), `#7fb2ff`/`#8fc0ff` (svijetloplava); font system-ui.
2. Step 2: preset — kandidat `blue-professional` (ili `cobalt-grid`), pa
   `node ~/.claude/skills/faceless-explainer/scripts/build-frame.mjs --preset <ime> --hyperframes .`
3. Step 3: `STORYBOARD.md` iz 8 scena u `BRIEF.md` (bez `SCRIPT.md`, bez
   naracije; `music:` mood za HeyGen BGM) → plan na odobrenje + pitanje o skicama.
4. Step 5 troši kvotu: 8 frame-worker subagenata. Prije pokretanja dati
   procjenu, model Sonnet, najviše 3 paralelno.

## Napomena
`hyperframes-domovina-ai` nije vlastiti git repo: nalazi se kao netrackani
direktorij unutar `/Users/ms/git/domovinatv` (koji nema remote). Prije
commita odlučiti: `git init` + novi GitHub repo, ili ostaviti lokalno.

## Stanje 2026-10-18 (autonomni nastavak)
- Mode autonomous (korisnik), skice preskočene. BGM iz HeyGena (free plan), 5 SFX (1 je CC BY → atribucija u opisu).
- Step 4 napisan u STORYBOARD.md; Step 5: svih 8 okvira izgradili Sonnet workeri, GSAP ujednačen na 3.14.2, index.html sastavljen (92 s).
- Sljedeće: transitions inject/verify → lint → check → snapshot → render renders/video.mp4 → WhatsApp „Matija Only".

## Gotovo 2026-10-18 12:51
- lint 0 grešaka, check prošao; okvir 03 ručno popravljen (žig ODBIJENO u jednom redu, mreža proširena za pull-back).
- renders/video.mp4: 92 s, 1920x1080, 14,8 MB; poslano na WhatsApp „Matija Only".
- SFX licenca riješena: svi bundled SFX su Pixabay Content License (media-use/audio/assets/sfx/CREDITS.md), atribucija nije potrebna; oznaka "by" u audio_meta.json je pogrešna.
- Otvoreno: git init za hyperframes-domovina-ai; objava (destination: youtube) nije napravljena.

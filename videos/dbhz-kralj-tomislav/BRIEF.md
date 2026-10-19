---
workflow: general-video
flow: companion
storyboard: no
message: "DBHZ digitalni muzej × Thompson: 3D bista kralja Tomislava rotira uz pjesmu „Kralj Tomislav""
destination: social + landing dbhz-thompson.domovina.ai
aspect: 1920x1080 (index.html) i 1080x1920 (vertical.html), isti FILM tajming
language: hr
length: ~45–60 s (isječak pjesme, odabrati po stihovima „zlato i kruna", „povijesti puno")
---

## Intent

Rotacija 3D biste kralja Tomislava (GLB iz dbhz-3d-modeli, viewer SPEC 1:1)
uz isječak Thompsonove pjesme „Kralj Tomislav". Glazba vodi tajming: mrak →
svjetlo na uvodu, prijelazi materijala (kamen → bronca → patina) i zlatni
obrub + prsten na refrenu, puls svjetla na jakim dobama.

Razvojna verzija (korisnik, 2026-10-19): audio skinut yt-dlp-om sa službenog
videa (yD9r0grKCkA) samo za development; prava rješava netko drugi.

## Notes

- Workflow: music-to-video analiza (analyze-beatgrid.py → analiza/audiomap-full.json),
  a izvedba je jedna kontinuirana Three.js scena (companion / general-video),
  ne frame-worker predlošci — bista mora biti isti 3D objekt kroz cijeli film.
- Atribucijski caveat biste mora biti na odjavnoj kartici.

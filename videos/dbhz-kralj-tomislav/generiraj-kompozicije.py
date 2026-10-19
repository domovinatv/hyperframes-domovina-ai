#!/usr/bin/env python3
"""Generira HTML kompozicije iz jednog predloška: index.html (A 16:9) i
formati/<isjecak>-<format>.html. Brojke filma su u film.js; ovdje su samo
isječak, format i trajanje. Pokreni nakon dodavanja isječka u KOMPOZICIJE."""
from pathlib import Path

ROOT = Path(__file__).parent
FORMATI = {"16x9": (1920, 1080, "landscape", "16:9"), "9x16": (1080, 1920, "portrait", "9:16")}
# (isječak, format, trajanje u s, datoteka)
KOMPOZICIJE = [
    ("a", "16x9", 60, "index.html"),
    ("a", "9x16", 60, "formati/a-9x16.html"),
    ("b", "16x9", 34.09, "formati/b-16x9.html"),
    ("b", "9x16", 34.09, "formati/b-9x16.html"),
]

TPL = """<!doctype html>
<html lang="hr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width={W}, height={H}" />
    <title>Kralj Tomislav — isječak {FILM_UP} ({FORMAT})</title>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
    <script type="importmap">
      {{
        "imports": {{
          "three": "https://cdn.jsdelivr.net/npm/three@0.169.0/build/three.module.js",
          "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.169.0/examples/jsm/"
        }}
      }}
    </script>
    <link rel="stylesheet" href="{BASE}film.css" />
  </head>
  <body>
    <!-- Generirano: generiraj-kompozicije.py. Brojke filma: film.js → FILMOVI.{FILM}. -->
    <div
      id="root"
      class="{CLS}"
      data-composition-id="{ID}"
      data-film="{FILM}"
      data-start="0"
      data-duration="{DUR}"
      data-width="{W}"
      data-height="{H}"
    >
      <canvas id="bista" width="{W}" height="{H}"></canvas>

      <div id="uvod" class="sloj">
        <div class="uvod-in">
          <p class="eyebrow" data-copy="eyebrow">DBHZ · DIGITALNI MUZEJ</p>
          <h1 data-copy="naslov">Kralj Tomislav</h1>
          <div class="crta"></div>
          <p class="podnaslov" data-copy="podnaslov">prvi hrvatski kralj · 925.</p>
        </div>
      </div>

      <div class="sloj"><div id="stihovi"></div></div>

      <div id="odjava" class="sloj">
        <div class="odjava-in">
          <p class="dbhz" data-copy="dbhz">DBHZ · DIGITALNI MUZEJ</p>
          <p class="poruka" data-copy="poruka">Bista kralja Tomislava u 3D</p>
          <p class="adresa" data-copy="adresa">dbhz-3d-modeli.domovina.ai</p>
          <p class="zasluge" data-copy="zasluge">Glazba: Marko Perković Thompson</p>
          <p class="napomena" data-copy="napomena">Ilustrativna 3D digitalizacija.</p>
        </div>
      </div>

      <div id="zatamnjenje"></div>

      <audio id="pjesma" src="{BASE}assets/pjesma-{FILM}.m4a" data-start="0" data-duration="{DUR}" data-track-index="10" data-volume="1"></audio>
    </div>
    <script type="module">
      import {{ buildFilm }} from "{BASE}main.js";
      window.__timelines["{ID}"] = buildFilm("{BASE}");
    </script>
  </body>
</html>
"""

for film, fmt, dur, out in KOMPOZICIJE:
    w, h, cls, label = FORMATI[fmt]
    base = "../" * out.count("/") or "./"
    html = TPL.format(W=w, H=h, CLS=cls, FORMAT=label, FILM=film, FILM_UP=film.upper(),
                      ID=f"kralj-tomislav-{film}-{fmt}", DUR=dur, BASE=base)
    (ROOT / out).parent.mkdir(parents=True, exist_ok=True)
    (ROOT / out).write_text(html)
    print(out)

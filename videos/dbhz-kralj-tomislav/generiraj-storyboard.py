#!/usr/bin/env python3
"""boards/storyboard.html iz boards/stills/<isječak>-<format>/ (snapshot-storyboard.sh)."""
from pathlib import Path
import re

ROOT = Path(__file__).parent
OPIS = {
    "a": ["Intro kartica", "Krunidba — 1. strofa", "Kontekst: 914.", "„Žezlo i kruna”", "Jadran → Drava (patina)", "Citat: Sapientiae Christianae", "Outro kartica"],
    "b": ["Intro kartica", "„Žezlo i kruna”", "Kontekst: 910.–928.", "Jadran → Drava", "Citat: Sapientiae Christianae", "Outro kartica"],
    "d": ["Intro kartica", "Naslov u instrumentalu", "„Kad s perona siđeš”", "Kontekst: kip u Zagrebu 1947.", "Citat: Ivan Pavao II.", "„Od Osijeka mati…”", "Outro kartica"],
    "c": ["Intro kartica", "Kontekst: Split 925.", "Citat: Gaudium et spes (pauza vokala)", "„Još zemlja se mrvi”", "„Kroz Bosnu…”", "„uz Boga, tri boje”", "Outro kartica"],
}
NASLOV = {"a": "A · krunidba + 1. refren", "b": "B · samo refren", "d": "D · Kad s perona siđeš", "c": "C · Split → Kraljevstvo tvoje"}
dijelovi = []
for film in "abdc":
    for fmt in ("16x9", "9x16"):
        d = ROOT / "boards" / "stills" / f"{film}-{fmt}"
        stills = sorted(d.glob("frame-*.png"))
        dijelovi.append(f'<section class="act">{NASLOV[film]} — {fmt.replace("x", ":")}</section><div class="red {fmt}">')
        for i, s in enumerate(stills):
            t = re.search(r"at-([\d.]+)s", s.name).group(1)
            dijelovi.append(f'<div class="frame"><img src="stills/{film}-{fmt}/{s.name}" alt="" loading="lazy" />'
                            f'<div class="title">{i + 1:02d}: {OPIS[film][i]}</div><div class="time">{t} s</div></div>')
        dijelovi.append("</div>")
html = f"""<!doctype html><html lang="hr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Kralj Tomislav — storyboard</title><style>
body{{margin:0;padding:32px 16px;background:#f4f2ec;color:#1d1d1b;font:15px/1.4 Inter,system-ui,sans-serif}}
h1{{font-size:24px;margin:0 0 4px}} .act{{font-weight:700;font-size:18px;margin:36px 0 12px}}
.red{{display:grid;gap:14px}} .red.16x9{{grid-template-columns:repeat(auto-fill,minmax(300px,1fr))}} .red.9x16{{grid-template-columns:repeat(auto-fill,minmax(170px,1fr))}}
.frame{{background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.08)}} .frame img{{width:100%;display:block}}
.title{{font-weight:600;padding:8px 10px 0}} .time{{color:#777;padding:0 10px 10px;font-size:13px}}
</style></head><body><h1>Kralj Tomislav — storyboard druge iteracije</h1>
<p>Vrijeme je vrijeme filma (intro kartica 0–2 s, pjesma od 2 s, outro 3 s na kraju). Izvori konteksta i citata: analiza/povijesni-kontekst.md.</p>
{''.join(dijelovi)}</body></html>"""
(ROOT / "boards" / "storyboard.html").write_text(html)
print("boards/storyboard.html")

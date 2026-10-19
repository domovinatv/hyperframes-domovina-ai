// Usporedi trajanja iz film.js s onima u generiraj-kompozicije.py (ISJECCI).
import { readFileSync } from "node:fs";
import { FILMOVI } from "./film.js";
const py = readFileSync(new URL("./generiraj-kompozicije.py", import.meta.url), "utf8");
let ok = true;
for (const [id, f] of Object.entries(FILMOVI)) {
  const m = py.match(new RegExp(`"${id}": \\(([\\d.]+), ([\\d.]+)\\)`));
  const [dur, adur] = [Number(m[1]), Number(m[2])];
  const good = Math.abs(dur - f.duration) < 0.002 && Math.abs(adur - f.audioTrajanje) < 0.002;
  ok &&= good;
  console.log(id, good ? "✓" : "✗", { film: [f.duration, f.audioTrajanje], py: [dur, adur], isjecak: f.isjecak, pjesma: f.pjesma, beats: f.beats.length });
}
process.exit(ok ? 0 : 1);

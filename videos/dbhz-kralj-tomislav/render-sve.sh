#!/usr/bin/env bash
# Render svih 8 videa u renders/kralj-tomislav-<isjecak>-<format>.mp4.
set -euo pipefail
cd "$(dirname "$0")"
for k in a-16x9 a-9x16 b-16x9 b-9x16 c-16x9 c-9x16 d-16x9 d-9x16; do
  src=$([ "$k" = a-16x9 ] && echo index.html || echo "formati/$k.html")
  args=(); [ "$src" != index.html ] && args=(-c "$src")
  npx -y hyperframes@0.8.174 render . "${args[@]}" -o "renders/kralj-tomislav-$k.mp4" > "renders/log-$k.txt" 2>&1 || { echo "GREŠKA $k"; tail -5 "renders/log-$k.txt"; exit 1; }
  echo "gotovo $k"
done
echo "SVE GOTOVO"

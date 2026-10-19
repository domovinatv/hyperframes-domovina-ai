#!/usr/bin/env bash
# Stillovi za boards/storyboard.html: svaka kompozicija u privremenoj kopiji
# projekta kao index.html (snapshot nema -c). Vremena = vrijeme filma.
# Upotreba: ./snapshot-storyboard.sh [isjecak-format ...]   (bez argumenata: sve)
set -euo pipefail
cd "$(dirname "$0")"
declare -A AT=(
  [a]="1.2,8.6,22.9,31.5,48.4,59.9,67.6"
  [b]="1.2,5.6,13.0,22.5,34.0,41.7"
  [d]="1.2,4.7,7.7,16.7,26.7,38.7,49.0"
  [c]="1.2,13.4,24.4,29.4,50.9,67.4,74.4"
)
SVE=(a-16x9 a-9x16 b-16x9 b-9x16 d-16x9 d-9x16 c-16x9 c-9x16)
TMP=$(mktemp -d)
for k in "${@:-${SVE[@]}}"; do
  film=${k%%-*}
  src=$([ "$k" = a-16x9 ] && echo index.html || echo "formati/$k.html")
  rsync -a --exclude renders --exclude .hyperframes --exclude .thumbnails --exclude boards --exclude 'assets/izvor' ./ "$TMP/$k/"
  rm -f "$TMP/$k/formati/"*.html
  sed 's|"\.\./|"./|g' "$src" > "$TMP/$k/index.html"
  npx -y hyperframes@0.8.174 snapshot "$TMP/$k" --at "${AT[$film]}" --no-end --describe false -o "boards/stills/$k" >/dev/null
  echo "$k: $(ls boards/stills/$k | grep -c png) stillova"
done
rm -rf "$TMP"

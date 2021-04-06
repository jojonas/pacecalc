#!/bin/bash
set -euo pipefail
IFS=$'\n\t'

svg="icon.svg"

sizes=(
    72
    96
    128
    144
    152
    192
    384
    512
    120
    180
)

for size in ${sizes[@]}; do
    echo "$size"
    filename="../public/icons/icon-${size}.png"
    inkscape --export-width "${size}" --export-height "${size}" --export-filename "${filename}" "${svg}"
done

cp "../public/icons/icon-128.png" "../public/favicon.png"
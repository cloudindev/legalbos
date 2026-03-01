#!/bin/bash
PROJECT="8151387560676308887"
SCREEN="b6fefe4c445d4d03aa85da10f118b2e7"

BUCKETS=(
  "marmoset-public/stitch"
  "stitch-public"
  "stitch-stubs"
  "stitch-evals"
  "stitch-artifacts"
  "stitch-exports"
  "hubble-public/stitch"
  "hubble-exports"
  "makani-public/stitch"
  "deepmind-public/stitch"
  "gemini-public/stitch"
  "gcp-public/stitch"
)

for b in "${BUCKETS[@]}"; do
  url="https://storage.googleapis.com/${b}/${PROJECT}/${SCREEN}/index.html"
  echo "Trying $url"
  code=$(curl -s -o /dev/null -w "%{http_code}" "$url")
  if [ "$code" = "200" ]; then
    echo "SUCCESS: Found bucket: $b"
    exit 0
  fi
done
echo "FAILED"

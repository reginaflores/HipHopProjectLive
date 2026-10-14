#!/bin/sh
# Fetch Met API object records one at a time (the API throttles bursts).
cd "$(dirname "$0")"
mkdir -p api
for i in $(cat ids.txt); do
  f=api/$i.json
  head -c 1 $f 2>/dev/null | grep -q '{' && continue
  for t in 1 2 3 4; do
    curl -s -m 20 -A "Mozilla/5.0" -o $f "https://collectionapi.metmuseum.org/public/collection/v1/objects/$i"
    head -c 1 $f | grep -q '{' && break
    sleep $((t*10))
  done
  sleep 0.2
done
echo "done: $(grep -l '^{' api/*.json | wc -l) ok, $(grep -L '^{' api/*.json | wc -l) failed"

# The Hip Hop Project — RappersDelight.nyc

Translating rap lyrics into art encounters at The Metropolitan Museum of Art.

Live at **https://rappersdelight.nyc** (hosted on GitHub Pages).

## How it works

This is a fully static site — no server needed.

- `index.html` — splash / landing page
- `gallery.html` — Gallery Mode: pick a rapper, see Met artworks for each lyric word
- `live.html` — Live Mode
- `about.html`, `press.html`
- `data/<rapper>.json` — lyric words and matched Met artworks, one file per rapper
- `source-data/` — the original combined data files the per-rapper JSON was generated from

## Running locally

```sh
python3 -m http.server 8000
```

Then open http://localhost:8000.

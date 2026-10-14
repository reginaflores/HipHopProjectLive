# Data changes log

A record of every change made to the project's artwork data, why it was made,
and where the evidence lives. Most recent changes at the bottom.

**The original data is untouched.** `source-data/data-live.json` is the data
exactly as it was when the site was built (2015, Genius lyrics matched against
the Met's collection via scrAPI). Everything the site now shows lives in
`data/<rapper>.json`, derived from that file through the steps below.

## Summary (as of 2026-10-14)

| | Count |
|---|---|
| Rappers | 13 |
| Lyric words | 674 (none removed) |
| Artwork image slots in the original data | 10,030 (5,883 unique artworks, 5,839 unique image files) |
| Image slots the site shows now | 9,903 |
| Lyric words left with no images | 0 |

## Files in this folder

| File | What it is |
|---|---|
| `data-live.json` | Original 2015 data used by the site. Never modified. |
| `data.json` | Older 2015 variant of the data. Not used by the site. Never modified. |
| `broken-images.csv` | Every image slot whose 2015 image link was dead, what was done about it (`replaced`, `restricted` or `removed`), the old and new image links, and why. |
| `restricted-images.csv` | The subset now shown from the Met's restricted-image service (rights-restricted works). |
| `removed-images.csv` | Every artwork removed from the site, one row per artwork, with the rapper/word pairs it was used for and why. |
| `added-images.csv` | Met artworks that were *added* to a word that had lost all its images. |
| `external-images.csv` | Images we had to find **outside the Met**, with the source and why. |
| `check-results/` | Raw results of the link checks (HTTP status of every image link, dated). |
| `scripts/` | The scripts used to fetch Met records and rewrite the data (see "How to reproduce"). |

## Step 1: Split the data per rapper (no content changes)

The site used to run on a Node/Express server (hosted on Render) that loaded
`data-live.json` and served one rapper at a time. To host the site as plain
static files on GitHub Pages, each rapper's entry was written to
`data/<rapper>.json` in the same `{ "sendData": ... }` shape the server returned.
The content was not changed in this step.

## Step 2: Check every image link

All 5,839 unique thumbnail links were requested from `images.metmuseum.org`
(over https). Results are in `check-results/thumbnail-status-2026-10-14.txt`.

- 4,873 still load (200).
- 922 are gone (404).
- 43 timed out. Re-checked with the filename URL-encoded (some contain spaces):
  32 load, 11 are gone (`check-results/thumbnail-recheck-2026-10-14.txt`).

**Why so many broke:** between 2015 and now the Met renamed and reorganized its
image files, so the 2015 links point at files that no longer exist. Separately,
the Met's public API stopped listing images for works it cannot share freely
(not public domain).

## Step 3: Fix or remove each broken image

For each artwork with a broken image, its record was fetched from the Met
Collection API (`collectionapi.metmuseum.org/public/collection/v1/objects/<id>`)
and handled in this order:

1. **Replaced (1,479 slots):** the API lists a current image, so the work stays
   with its new image link. The file was simply renamed or moved.
2. **Restricted (309 slots, 169 unique artworks):** the API lists no image
   because the work is rights-restricted, but the Met website still shows one
   from `collectionapi.metmuseum.org/api/collection/v1/iiif/<id>/restricted`.
   The site now uses that image. (Example: Walker Evans, *[Graffiti: "Fuck Mai"]*.)
   Status of every restricted-image check:
   `check-results/restricted-image-status-2026-10-14.txt`.
3. **Removed (137 slots, 104 unique artworks):** no image exists at all.
   - 54 artworks: the Met still lists the work but has no image of it online.
   - 50 artworks: the work is no longer in the Met's online collection
     (API returns "ObjectID not found").

Every lyric word was kept, even if it lost images. Live Mode advances through
words on a timer synced to each song, so removing words would break the sync.

All 830 new image links were re-checked after the change: 827 loaded, 3 timed
out on the first try (slow responses, not dead links).

## Step 4: Refresh artwork details

From each artwork's Met API record:

- **Updated:** title and artist name, where the Met's current record differs.
- **Added:** `type` (what it is, e.g. "Hanging scroll"), `date` (e.g. "1578") and
  `location` (city/state/country, else region, else culture).
- **Removed:** the 2015 `gallery` field (a bare gallery-room number like `370`,
  or "Not on view"), which was out of date and confusing in the popup.
- **Changed:** the `href` link now points at the Met's current object page
  (`https://www.metmuseum.org/art/collection/search/<id>`). The old
  `/collection/the-collection-online/...` links are dead.
- **Changed:** image links now use https, and filenames are URL-encoded.

All 5,883 Met records were fetched on 2026-10-14 (one, object 276726, failed
to download). After `enrich.py`, 9,707 of the 9,903 image slots have these
details. The rest are the 10 hand-added slots from step 5 (details entered by
hand) and works whose 2015 image still loads but whose Met record no longer
exists; those keep their 2015 title and artist.

## Step 5: Words that lost every image

After step 3, two words had no images left. Both were filled by hand:

**Biggie, "bambu":** both original artworks (Enzo Mari, *"Bambu" Vase*, Met
484984 and 484985) are still listed by the Met but have no image. The Met
website's search for "bambu" also returns bamboo works (its search is fuzzy;
the API search is exact). Eight of those with Met images were added; see
`added-images.csv`.

**Jay-Z, "cheddar":** the original artwork (*Plate*, James and Ralph Clews, Met
192999) is gone from the Met's collection. The Met search for "cheddar" finds
two relevant works, but the Met shows no image for either, so images were
found elsewhere (`external-images.csv`). The popup credits the image source.
- Andy Warhol, *Cheddar Cheese*, from *Campbell's Soup II* (1969), Met 394982.
  Image from a Masterworks Fine Art dealer listing.
- Roger Fenton, *Wall of Rocks, Cheddar* (1858, printed 1864), Met 267102.
  Image of the same photograph from the J. Paul Getty Museum's own print
  (Getty object 104GX6, open content).

The Met's "cheddar" search also returns two shawls, *Shawl (Chaddar)* (Met
446807, 451195), which have Met images. They were not added because "chaddar"
is a different word that only matches the spelling.

## How to reproduce

The scripts in `scripts/` were run from a working folder holding the fetched
Met API records (`api/<id>.json`) and the check results:

1. `fetch.sh` fetches Met API records one at a time. The API blocks bursts of
   requests, so it pauses between calls.
2. `merge.py <site folder>` applies step 3 and writes `broken-images.csv`.
3. `enrich.py <site folder>` applies step 4. It is safe to re-run.

"""Add what-it-is / year / location from Met API records to every artwork. Safe to re-run."""
import json, glob, os, sys

SCRATCH = os.path.dirname(os.path.abspath(__file__))
SITE = sys.argv[1]

def api(object_id):
    try:
        return json.load(open(os.path.join(SCRATCH, 'api', object_id + '.json')))
    except Exception:
        return None

def location(rec):
    place = ', '.join(p for p in (rec.get('city'), rec.get('state'), rec.get('country')) if p)
    return place or rec.get('region') or rec.get('culture') or ''

done = total = 0
for path in sorted(glob.glob(os.path.join(SITE, 'data', '*.json'))):
    doc = json.load(open(path))
    for w in doc['sendData']['words']:
        for im in w['images']:
            total += 1
            for stale in ('gallery', 'medium', 'culture'):
                im.pop(stale, None)
            rec = api(im['href'].rstrip('/').split('/')[-1])
            if not (rec and rec.get('objectID')):
                continue
            done += 1
            im['title'] = rec.get('title') or im.get('title')
            if rec.get('artistDisplayName'):
                im['primaryArtistNameOnly'] = rec['artistDisplayName']
            for key, value in (('type', rec.get('objectName')), ('date', rec.get('objectDate')), ('location', location(rec))):
                if value:
                    im[key] = value
                else:
                    im.pop(key, None)
    json.dump(doc, open(path, 'w'), separators=(',', ':'))
print(f'{done}/{total} artworks have Met details')

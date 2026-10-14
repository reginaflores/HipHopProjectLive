"""Merge Met API records into the per-rapper data files.

- Broken thumbnails get the Met's current image URL, or are dropped if the Met
  no longer publishes an image for that work.
- Every artwork gets refreshed title/artist plus date, medium, culture and
  current gallery location.
"""
import csv, json, glob, os, sys
from urllib.parse import quote

SCRATCH = os.path.dirname(os.path.abspath(__file__))
SITE = sys.argv[1]

bad = set()
for line in open(os.path.join(SCRATCH, 'status.txt')).read().splitlines():
    code, url = line.split(' ', 1)
    if code == '404':
        bad.add(url.replace('https://', 'http://'))
recheck = {l.split(' ', 1)[1] for l in open(os.path.join(SCRATCH, 'recheck.txt')).read().splitlines()
           if not l.startswith('200')} if os.path.exists(os.path.join(SCRATCH, 'recheck.txt')) else set()
bad |= {u.replace('https://', 'http://') for u in recheck}

def api(object_id):
    path = os.path.join(SCRATCH, 'api', object_id + '.json')
    try:
        return json.load(open(path))
    except Exception:
        return None

def https(url):
    url = url.replace('http://', 'https://')
    head, _, name = url.rpartition('/')
    return head + '/' + quote(name)

def missing_api(object_id):
    path = os.path.join(SCRATCH, 'api', object_id + '.json')
    try:
        return '"message":"Not a valid object"' in open(path).read() or '"message":"ObjectID not found"' in open(path).read()
    except Exception:
        return False

def reason_for(rec, object_id):
    if rec and rec.get('primaryImageSmall'):
        return 'replaced', 'The Met renamed/moved the image file; swapped in the current image URL from the Met API'
    code, body = iiif.get(object_id, ('', ''))
    if code == '200':
        return 'restricted', 'Image is rights-restricted, so the Met API no longer lists it; swapped in the restricted image the Met website still shows'
    if 'object not found' in body:
        return 'removed', 'This work is no longer in the Met online collection (object not found)'
    if 'image not found' in body or 'non-OK' in body:
        return 'removed', 'The Met still lists this work but no longer has any image of it online'
    if rec and rec.get('objectID'):
        if not rec.get('isPublicDomain'):
            return 'removed', 'The Met no longer publishes an image of this work online (not public domain / image rights restricted)'
        return 'removed', 'The Met API record for this work has no image'
    if missing_api(object_id):
        return 'removed', 'This work is no longer in the Met online collection (object ID not found)'
    return 'removed', 'Image file no longer exists at the Met and the work could not be looked up in the Met API'

RESTRICTED = 'https://collectionapi.metmuseum.org/api/collection/v1/iiif/{}/restricted'
iiif = {}
if os.path.exists(os.path.join(SCRATCH, 'iiif_status.txt')):
    for line in open(os.path.join(SCRATCH, 'iiif_status.txt')).read().splitlines():
        object_id, code, body = (line.split(' ', 2) + [''])[:3]
        iiif[object_id] = (code, body)

log = []
stats = dict(kept=0, replaced=0, restricted=0, dropped=0, enriched=0, words_without_images=0)
for path in sorted(glob.glob(os.path.join(SITE, 'data', '*.json'))):
    doc = json.load(open(path))
    words = []
    for w in doc['sendData']['words']:
        images = []
        for im in w['images']:
            object_id = im['href'].rstrip('/').split('/')[-1]
            rec = api(object_id)
            if im['thumb'] in bad:
                action, why = reason_for(rec, object_id)
                log.append({'rapper': os.path.basename(path)[:-5], 'word': w['word'], 'object_id': object_id,
                            'title': (rec or {}).get('title') or im.get('title', ''),
                            'artist': (rec or {}).get('artistDisplayName') or im.get('primaryArtistNameOnly', ''),
                            'old_image_url': im['thumb'], 'met_page': 'https://www.metmuseum.org/art/collection/search/' + object_id,
                            'action': action, 'new_image_url': '', 'reason': why})
                if action == 'replaced':
                    im['thumb'] = rec['primaryImageSmall']
                    im['large'] = rec['primaryImageSmall']
                    stats['replaced'] += 1
                elif action == 'restricted':
                    im['thumb'] = im['large'] = RESTRICTED.format(object_id)
                    stats['restricted'] += 1
                else:
                    stats['dropped'] += 1
                    continue
                log[-1]['new_image_url'] = im['thumb']
            else:
                im['thumb'] = https(im['thumb'])
                im['large'] = im['thumb'].replace('/web-thumb/', '/web-large/')
                stats['kept'] += 1
            im['href'] = 'https://www.metmuseum.org/art/collection/search/' + object_id
            if rec and rec.get('objectID'):
                stats['enriched'] += 1
                im['title'] = rec.get('title') or im.get('title')
                artist = rec.get('artistDisplayName')
                if artist:
                    im['primaryArtistNameOnly'] = artist
                for key, field in (('date', 'objectDate'), ('medium', 'medium'), ('culture', 'culture')):
                    if rec.get(field):
                        im[key] = rec[field]
                im['gallery'] = 'On view at The Met in Gallery ' + rec['GalleryNumber'] if rec.get('GalleryNumber') else ''
            images.append(im)
        if not images:
            stats['words_without_images'] += 1
        w['images'] = images
        words.append(w)
    doc['sendData']['words'] = words
    json.dump(doc, open(path, 'w'), separators=(',', ':'))
with open(os.path.join(SITE, 'source-data', 'broken-images.csv'), 'w', newline='') as f:
    out = csv.DictWriter(f, fieldnames=list(log[0].keys()))
    out.writeheader()
    out.writerows(log)
print(stats)

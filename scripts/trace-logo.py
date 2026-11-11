"""Trace the handwritten logo into ordered centerline strokes for the
"writes itself" animation. Re-run if the logo image changes:

    pip install numpy scipy scikit-image pillow
    python scripts/trace-logo.py legacy/assets/logo.png src/logo-strokes.json
"""
import sys, json
import numpy as np
from PIL import Image
from skimage.morphology import skeletonize
from skimage.measure import label

src, dst = sys.argv[1], sys.argv[2]
a = np.array(Image.open(src).convert('RGBA'))
H, W = a.shape[:2]
ink = (a[..., 3] > 100) & (a[..., :3].mean(-1) < 128)
pts = set(zip(*np.nonzero(skeletonize(ink))))

def nbrs(p):
    y, x = p
    return [(y + dy, x + dx) for dy in (-1, 0, 1) for dx in (-1, 0, 1)
            if (dy or dx) and (y + dy, x + dx) in pts]

deg = {p: len(nbrs(p)) for p in pts}
seen = set()

def walk(start, nxt):
    path, prev, cur = [start, nxt], start, nxt
    seen.add(frozenset((start, nxt)))
    while deg[cur] == 2:
        cand = [n for n in nbrs(cur) if n != prev and frozenset((cur, n)) not in seen]
        if not cand:
            break
        seen.add(frozenset((cur, cand[0])))
        prev, cur = cur, cand[0]
        path.append(cur)
    return path

paths = []
# Walk from endpoints/junctions first, then any remaining closed loops.
for group in ([p for p in pts if deg[p] != 2], list(pts)):
    for s in sorted(group, key=lambda p: p[1]):
        for n in nbrs(s):
            if frozenset((s, n)) not in seen:
                paths.append(walk(s, n))

def rdp(pl, eps=1.2):
    if len(pl) < 3:
        return pl
    a, b = np.array(pl[0], float), np.array(pl[-1], float)
    d = b - a
    L = np.hypot(*d) or 1
    dist = [abs(d[0] * (a[1] - p[1]) - d[1] * (a[0] - p[0])) / L for p in pl[1:-1]]
    i = int(np.argmax(dist))
    if dist[i] > eps:
        return rdp(pl[:i + 2], eps)[:-1] + rdp(pl[i + 1:], eps)
    return [pl[0], pl[-1]]

paths = [[(int(x), int(y)) for y, x in rdp(p)] for p in paths if len(p) >= 4]

# Order like handwriting: letter by letter (connected components, left to
# right), and within a letter roughly top-left first, each stroke oriented
# to start at its top/left end.
lab = label(ink, connectivity=2)
letters = {}
for p in paths:
    c = next((lab[y, x] for x, y in p if lab[y, x]), 0)
    letters.setdefault(c, []).append(p)
ordered = []
for _, ps in sorted(letters.items(), key=lambda kv: min(x for p in kv[1] for x, _ in p)):
    for p in ps:
        if p[0][1] + p[0][0] * 0.5 > p[-1][1] + p[-1][0] * 0.5:
            p.reverse()
    ps.sort(key=lambda p: (min(x for x, _ in p) // 25, min(y for _, y in p)))
    ordered += ps

def length(p):
    return sum(np.hypot(p[i + 1][0] - p[i][0], p[i + 1][1] - p[i][1]) for i in range(len(p) - 1))

out = {'w': W, 'h': H, 'strokes': [
    {'d': 'M' + ' '.join(f'{x} {y}' for x, y in p), 'len': round(length(p))} for p in ordered]}
json.dump(out, open(dst, 'w'), separators=(',', ':'))
print(f'{len(ordered)} strokes -> {dst}')

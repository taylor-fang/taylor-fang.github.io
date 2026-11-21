"""Generate the hand-drawn hover marks for links and write src/flourishes.css.

Each mark is a broad nib swept along a path, split into up to three parts so
it fits any word: a head (left, keeps its aspect ratio), a tail (stretched to
the word) and an optional end (right, keeps its aspect ratio). All parts use
a viewBox 20 units tall, drawn into a box 0.6em tall, so they join at the
same height.

    python3 scripts/flourish.py
"""
import math
import pathlib
from urllib.parse import quote

EM_PER_UNIT = 0.03  # one viewBox unit; the default box is 20 units (0.6em) tall
LINE = 14.6  # the resting line height in a 20-unit box
L28 = LINE + 8  # the same line in a 28-unit box (marks with tall loops)


def catmull(pts, n=10):
    out, P = [], [pts[0]] + pts + [pts[-1]]
    for i in range(1, len(P) - 2):
        p0, p1, p2, p3 = P[i - 1], P[i], P[i + 1], P[i + 2]
        for k in range(n):
            t = k / n
            out.append(tuple(0.5 * (2 * p1[j] + (-p0[j] + p2[j]) * t + (2 * p0[j] - 5 * p1[j] + 4 * p2[j] - p3[j]) * t * t
                                    + (-p0[j] + 3 * p1[j] - 3 * p2[j] + p3[j]) * t ** 3) for j in (0, 1)))
    return out + [pts[-1]]


def sweep(polys, nib=5.2, angle=0.35, sx=1.0, taper=None):
    """Flat nib swept along each polyline. sx pre-squashes x so the nib looks
    right after a tail is stretched. Quads share one winding so overlaps never
    cancel out."""
    nx, ny = math.cos(angle) * nib / 2 * sx, math.sin(angle) * nib / 2
    d = []
    for poly in polys:
        n = len(poly)
        for i in range(n - 1):
            (ax, ay), (bx, by) = poly[i], poly[i + 1]
            fa = fb = 1.0
            if taper:
                fa, fb = taper(i, n), taper(i + 1, n)
            q = [(ax + nx * fa, ay + ny * fa), (bx + nx * fb, by + ny * fb), (bx - nx * fb, by - ny * fb), (ax - nx * fa, ay - ny * fa)]
            if sum(q[k][0] * q[(k + 1) % 4][1] - q[(k + 1) % 4][0] * q[k][1] for k in range(4)) < 0:
                q.reverse()
            d.append('M' + 'L'.join(f'{x:.1f} {y:.1f}' for x, y in q) + 'Z')
    return ''.join(d)


def fade_end(k, n, over=8, floor=0.4):
    return max(floor, min(1, (n - 1 - k) / over))


def fade_start(k, n, over=4, floor=0.5):
    return max(floor, min(1, k / over))


def uri(d, w, h, fit):
    svg = (f"<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 {w} {h}' preserveAspectRatio='{fit}'>"
           f"<path d='{d}'/></svg>")
    return 'url("data:image/svg+xml,' + quote(svg, safe=" /:=',.-") + '")'


TAIL_SX = 0.3  # tails end up roughly 3x wider than their viewBox


def stub(nib=5.2, line=LINE):
    """A short entry stroke for marks whose character is in the tail or end."""
    return 8, sweep([catmull([(2, line + 0.9), (5, line + 0.2), (8, line)])], nib=nib, taper=fade_start)


def tail(pts, taper=fade_end, n=16, **kw):
    return sweep([catmull(pts, n)], sx=TAIL_SX, taper=taper, **kw)


V = {}

# Flick: a quick upward hook, back down into a long sweep that thins out.
V['flick'] = dict(
    head=(30, sweep([catmull([(2, 14), (8, 9), (14, 3.5)]), catmull([(14, 3.5), (17, 9), (22, 13.6), (30, LINE)])])),
    tail=tail([(0, LINE), (30, LINE), (65, 13.4), (99, 11.6)]),
)

# Loop: one tall cursive loop at the start, then the sweep.
V['loop'] = dict(
    h=28,
    head=(44, sweep([catmull([(2, L28 + 0.8), (9, L28 - 0.2), (16, L28 - 3.6), (22, L28 - 9.6), (23.6, L28 - 16.4),
                              (21, L28 - 20.2), (16, L28 - 19.6), (13.6, L28 - 14.4), (15.6, L28 - 7.6), (21, L28 - 2.8),
                              (28, L28 - 0.4), (36, L28 + 0.2), (44, L28)], 8)], nib=3.0)),
    tail=tail([(0, L28), (35, L28 - 0.2), (70, L28 - 1.4), (99, L28 - 2.8)], nib=3.0),
)

# Curl: a plain sweep that hooks up and back at the end.
V['curl'] = dict(
    head=stub(3.6),
    tail=tail([(0, LINE), (40, 14.4), (80, 13.9), (100, 13.6)], taper=None, nib=3.6),
    end=(30, sweep([catmull([(0, 13.6), (9, 13.2), (17, 11.4), (22.5, 7.6), (24, 3.8), (21.6, 1.6), (18.2, 2.6), (17.6, 5.6),
                             (19.4, 7.4)], 8)], nib=3.6, taper=lambda k, n: fade_end(k, n, over=10, floor=0.3))),
)

# Wave: two slow swells.
V['wave'] = dict(
    head=stub(),
    tail=tail([(x, LINE - 0.4 - 2.4 * math.sin(x / 100 * 4 * math.pi)) for x in range(0, 101, 5)], n=8),
)

# Double: a sweep with a shorter second stroke tucked under it.
V['double'] = dict(
    head=stub(4.2),
    tail=sweep([catmull([(0, 13.2), (40, 13.0), (99, 11.4)], 16), catmull([(8, 17.6), (45, 17.1), (82, 16.6)], 16)],
               sx=TAIL_SX, nib=4.2, taper=fade_end),
)

# Loop end: a sweep that ties off in a tall loop and flicks out.
V['loopend'] = dict(
    h=28,
    head=stub(3.0, L28),
    tail=tail([(0, L28), (40, L28 - 0.2), (80, L28 - 0.6), (100, L28 - 0.8)], taper=None, nib=3.0),
    end=(46, sweep([catmull([(0, L28 - 0.8), (9, L28 - 1.2), (17, L28 - 3.2), (23.6, L28 - 8.6), (25.2, L28 - 15.4), (22, L28 - 19.4),
                             (17, L28 - 18), (16, L28 - 11.6), (21, L28 - 5.2), (27, L28 - 2.2), (34, L28 - 2.6),
                             (40, L28 - 6), (46, L28 - 10.5)], 8)],
                   nib=3.0, taper=lambda k, n: fade_end(k, n, over=10, floor=0.3))),
)


# Loop under: the sweep drops into a loop below the line at the end, then
# flicks up and out. The box reaches 10 units below the usual bottom.
V['loopunder'] = dict(
    h=30, drop=10,
    head=stub(3.0),
    tail=tail([(0, LINE), (40, 14.4), (80, 14.2), (100, 14.2)], taper=None, nib=3.0),
    end=(40, sweep([catmull([(0, 14.2), (9, 14.6), (16.5, 17), (21.5, 21.6), (21.6, 26.4), (18, 28), (14.6, 25.6),
                             (16, 20.2), (21.5, 15.8), (29, 12.8), (35, 10.4), (40, 7.6)], 8)],
                   nib=3.0, taper=lambda k, n: fade_end(k, n, over=10, floor=0.3))),
)


def css():
    out = [
        '/* Generated by scripts/flourish.py. Hand-drawn hover marks for links;',
        '   .f-<name> picks one. See .flourish::after in styles.css. */',
    ]
    for name, v in V.items():
        h = v.get('h', 20)
        hw, hd = v['head']
        ew, ed = v.get('end', (0, None))
        props = [
            f'--f-head: {uri(hd, hw, h, "xMinYMid meet")};',
            f'--f-tail: {uri(v["tail"], 100, h, "none")};',
            f'--f-end: {uri(ed, ew, h, "xMaxYMid meet") if ed else "none"};',
            f'--f-h: {h * EM_PER_UNIT:.3f}em;',
            f'--f-drop: {v.get("drop", 0) * EM_PER_UNIT:.3f}em;',
            f'--f-hw: {hw * EM_PER_UNIT:.3f}em;',
            f'--f-ew: {ew * EM_PER_UNIT:.3f}em;',
        ]
        out.append(f'.f-{name} {{\n  ' + '\n  '.join(props) + '\n}')
    return '\n'.join(out) + '\n'


path = pathlib.Path(__file__).resolve().parent.parent / 'src' / 'flourishes.css'
path.write_text(css())
print(f'wrote {path} ({path.stat().st_size // 1024} KB, {len(V)} marks: {", ".join(V)})')

"""Generate the hover flourish used on links: a broad-nib flick (head, kept at
its own aspect ratio) plus a long sweep (tail, stretched to the link width).
The output paths are pasted into the mask data URIs in src/styles.css.

    python3 scripts/flourish.py
"""
import math

NIB, ANGLE = 5.2, 0.35  # nib width in viewBox units, held at about 20 deg


def catmull(pts, n=10):
    out, P = [], [pts[0]] + pts + [pts[-1]]
    for i in range(1, len(P) - 2):
        p0, p1, p2, p3 = P[i - 1], P[i], P[i + 1], P[i + 2]
        for k in range(n):
            t = k / n
            out.append(tuple(0.5 * (2 * p1[j] + (-p0[j] + p2[j]) * t + (2 * p0[j] - 5 * p1[j] + 4 * p2[j] - p3[j]) * t * t
                                    + (-p0[j] + 3 * p1[j] - 3 * p2[j] + p3[j]) * t ** 3) for j in (0, 1)))
    return out + [pts[-1]]


def sweep(polys, sx=1.0, taper=None):
    """Flat nib swept along each polyline. sx pre-squashes x so the nib looks
    right after the tail is stretched. Quads share one winding so overlaps
    never cancel out."""
    nx, ny = math.cos(ANGLE) * NIB / 2 * sx, math.sin(ANGLE) * NIB / 2
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


# Head, viewBox 0 0 30 20: flick up to a sharp peak, back down into the line.
head = sweep([catmull([(2, 14), (8, 9), (14, 3.5)]),
              catmull([(14, 3.5), (17, 9), (22, 13.6), (30, 14.6)])])
# Tail, viewBox 0 0 100 20, stretched: picks up at y 14.6, rises gently, thins out.
tail = sweep([catmull([(0, 14.6), (30, 14.6), (65, 13.4), (99, 11.6)], 16)], sx=0.3,
             taper=lambda k, n: max(0.4, min(1, (n - 1 - k) / 8)))
print('HEAD', head)
print('TAIL', tail)

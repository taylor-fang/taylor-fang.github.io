// Click and drag anywhere on the page to leave an ink mark. Mouse and stylus
// only: touch keeps scrolling. Plain JS (no React) so it can ship on its own;
// scripts/prerender.js inlines a minified copy into the built page.
//
// The style comes from <html data-ink="...">; the default is "nib".

const GREEN = '#2f521e'
const STYLES = {
  // Broad-nib calligraphy: a flat nib held at a fixed angle, so the width
  // depends on stroke direction.
  nib: { color: GREEN, kind: 'nib', size: 8, angle: -0.6 },
  // Felt marker like the handwritten logo: near-constant width.
  marker: { color: '#141414', kind: 'speed', min: 2.8, max: 3.6, speed: 4 },
  // Brush: slow is fat and wet, fast is thin.
  brush: { color: GREEN, kind: 'speed', min: 1.2, max: 11, speed: 1.4 },
  // Fine fountain pen line with a little swell.
  fine: { color: GREEN, kind: 'speed', min: 1, max: 2.8, speed: 1.2 },
}

if (typeof window !== 'undefined' && !window.__ink) {
  window.__ink = true

  const root = document.documentElement
  const strokes = []
  let canvas, ctx, current, last
  let dpr = 1

  const styleFor = () => STYLES[root.dataset.ink] || STYLES.nib

  function setup() {
    canvas = document.createElement('canvas')
    canvas.className = 'ink'
    canvas.setAttribute('aria-hidden', 'true')
    document.body.appendChild(canvas)
    ctx = canvas.getContext('2d')
    resize()
    new ResizeObserver(resize).observe(document.body)
  }

  function resize() {
    // Measure the page without the canvas, so it never props the page open.
    const { width: cw, height: ch } = canvas.style
    canvas.style.width = canvas.style.height = '0'
    const w = document.documentElement.scrollWidth
    const h = Math.max(document.documentElement.scrollHeight, window.innerHeight)
    dpr = Math.min(window.devicePixelRatio || 1, 2)
    if (canvas.width === Math.round(w * dpr) && canvas.height === Math.round(h * dpr)) {
      canvas.style.width = cw
      canvas.style.height = ch
      return
    }
    canvas.width = Math.round(w * dpr)
    canvas.height = Math.round(h * dpr)
    canvas.style.width = w + 'px'
    canvas.style.height = h + 'px'
    for (const s of strokes) for (let i = 1; i < s.pts.length; i++) segment(s.style, s.pts[i - 1], s.pts[i])
  }

  function segment(st, a, b) {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.fillStyle = ctx.strokeStyle = st.color
    ctx.lineWidth = 0.8 // closes anti-aliasing seams between segments
    ctx.lineJoin = 'round'
    ctx.beginPath()
    if (st.kind === 'nib') {
      const nx = (Math.cos(st.angle) * st.size) / 2
      const ny = (Math.sin(st.angle) * st.size) / 2
      ctx.moveTo(a.x + nx, a.y + ny)
      ctx.lineTo(b.x + nx, b.y + ny)
      ctx.lineTo(b.x - nx, b.y - ny)
      ctx.lineTo(a.x - nx, a.y - ny)
      ctx.closePath()
    } else {
      const dx = b.x - a.x
      const dy = b.y - a.y
      const len = Math.hypot(dx, dy) || 1
      const px = -dy / len
      const py = dx / len
      ctx.moveTo(a.x + (px * a.w) / 2, a.y + (py * a.w) / 2)
      ctx.lineTo(b.x + (px * b.w) / 2, b.y + (py * b.w) / 2)
      ctx.lineTo(b.x - (px * b.w) / 2, b.y - (py * b.w) / 2)
      ctx.lineTo(a.x - (px * a.w) / 2, a.y - (py * a.w) / 2)
      ctx.closePath()
    }
    ctx.fill()
    ctx.stroke()
    if (st.kind !== 'nib') {
      // Round joint, as its own path so its winding can't cancel the quad's.
      ctx.beginPath()
      ctx.arc(b.x, b.y, b.w / 2, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  function point(e, st) {
    // Light smoothing so mouse jitter doesn't show.
    const x = last ? last.x + (e.pageX - last.x) * 0.6 : e.pageX
    const y = last ? last.y + (e.pageY - last.y) * 0.6 : e.pageY
    let w = st.min || 0
    if (st.kind === 'speed' && last) {
      const v = Math.hypot(x - last.x, y - last.y) / Math.max(1, e.timeStamp - last.t)
      const target = st.max - (st.max - st.min) * Math.min(1, v / st.speed)
      w = last.w + (target - last.w) * 0.25
    }
    return { x, y, w, t: e.timeStamp }
  }

  function add(e) {
    const st = current.style
    const p = point(e, st)
    if (Math.hypot(p.x - last.x, p.y - last.y) < 0.5) return
    segment(st, last, p)
    current.pts.push(p)
    last = p
  }

  document.addEventListener('pointerdown', (e) => {
    if (e.button !== 0 || e.pointerType === 'touch') return
    if (e.target.closest('a, button, input, select, textarea, [data-no-ink]')) return
    if (!canvas) setup()
    e.preventDefault() // no text selection while drawing
    const st = styleFor()
    last = null
    const p = point(e, st)
    if (st.kind === 'speed') p.w = st.min + (st.max - st.min) * 0.35
    current = { style: st, pts: [p] }
    strokes.push(current)
    last = p
    segment(st, p, { ...p, x: p.x + 0.01 })
  })

  window.addEventListener('pointermove', (e) => {
    if (!current) return
    const events = e.getCoalescedEvents ? e.getCoalescedEvents() : [e]
    for (const ce of events.length ? events : [e]) add(ce)
  })

  const end = () => {
    current = null
    last = null
  }
  window.addEventListener('pointerup', end)
  window.addEventListener('pointercancel', end)
}

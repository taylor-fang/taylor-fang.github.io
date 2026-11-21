import '@fontsource-variable/inter/wght.css'
import '@fontsource-variable/manrope/wght.css'
import './styles.css'
import './flourishes.css'
import logo from './logo-strokes.json'

// Strawberry Hill, Golden Gate Park
const COORDS = { lat: 37.7686, lng: -122.4754 }

const LINKS = [
  { label: 'Twitter', href: 'https://x.com/teafang', v: 'flick' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/tfang15/', v: 'double' },
  { label: 'GitHub', href: 'https://github.com/taylor-fang', v: 'curl' },
]

function toDMS(value, pos, neg) {
  const abs = Math.abs(value)
  let deg = Math.floor(abs)
  let min = Math.floor((abs - deg) * 60)
  let sec = Math.round(((abs - deg) * 60 - min) * 60)
  if (sec === 60) [sec, min] = [0, min + 1]
  if (min === 60) [min, deg] = [0, deg + 1]
  const pad = (n) => String(n).padStart(2, '0')
  return `${deg}°${pad(min)}′${pad(sec)}″ ${value >= 0 ? pos : neg}`
}

function formatCoords({ lat, lng }) {
  return `${toDMS(lat, 'N', 'S')}, ${toDMS(lng, 'E', 'W')}`
}

// The handwritten logo "writes itself": the raster logo is revealed through a
// mask of strokes traced along its centerlines (scripts/trace-logo.py), each
// drawn in sequence at a constant pen speed. Pure CSS, runs once on load.
const PEN_SPEED = 3200 // px per second, in logo coordinates
const PEN_LIFT = 0.02 // seconds between strokes
const START = 0.15

function Signature() {
  let t = START
  const strokes = logo.strokes.map((s) => {
    const dur = s.len / PEN_SPEED
    const style = { '--len': s.len, '--dur': `${dur.toFixed(3)}s`, '--delay': `${t.toFixed(3)}s` }
    t += dur + PEN_LIFT
    return <path key={s.d} d={s.d} style={style} />
  })
  return (
    <svg className="signature" viewBox={`0 0 ${logo.w} ${logo.h}`} role="img" aria-label="Taylor Fang">
      <mask id="signature-ink" maskUnits="userSpaceOnUse" x="0" y="0" width={logo.w} height={logo.h}>
        <g fill="none" stroke="#fff" strokeWidth="24" strokeLinecap="round" strokeLinejoin="round">
          {strokes}
        </g>
      </mask>
      <image href="/logo.webp" width={logo.w} height={logo.h} mask="url(#signature-ink)" />
    </svg>
  )
}

function Header() {
  return (
    <header className="site-header">
      <a href="/" className="logo" aria-label="Taylor Fang, home">
        <Signature />
      </a>
      <div className="nav-group">
        <div className="nav-col nav-col-right">
          <span>San Francisco, CA</span>
          <span className="coords">{formatCoords(COORDS)}</span>
        </div>
      </div>
    </header>
  )
}

// External link with a hand-drawn hover mark; v picks the mark (src/flourishes.css).
function Ink({ href, v = 'flick', children }) {
  return (
    <a className={`flourish f-${v}`} href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  )
}

export default function App() {
  return (
    <>
      <Header />
      <main className="intro">
        <p>
          I’m Taylor, a writer based in San Francisco. I work at General Translation on our{' '}
          <Ink href="https://generaltranslation.com/en-US/blog" v="flick">
            blog
          </Ink>{' '}
          and{' '}
          <Ink href="https://generaltranslation.com/atlas" v="double">
            magazine
          </Ink>
          .
        </p>
        <p>
          I’m originally from a{' '}
          <Ink href="https://www.google.com/search?q=logan+canyon&udm=2" v="loop">
            small mountain-town
          </Ink>{' '}
          in Utah. I{' '}
          <Ink href="https://ofa.fas.harvard.edu/sites/g/files/omnuum13031/files/makeart/files/adf24_pressrelease_final_4-5-24_da.pdf" v="curl">
            studied
          </Ink>{' '}
          English &amp; CS at Harvard.
        </p>
        <p>
          I made a writing surface called{' '}
          <Ink href="https://paperwrite.space" v="wave">
            Paper
          </Ink>
          . I also make{' '}
          <Ink href="https://poets.org/2023-lieu-watching-news" v="loopend">
            poems
          </Ink>
          .
        </p>
      </main>
      <footer className="contact" aria-label="Contact">
        <span data-no-ink>taylor.fang15[at]gmail.com</span>
        {LINKS.map(({ label, href, v }) => (
          <Ink key={label} href={href} v={v}>
            {label}
          </Ink>
        ))}
      </footer>
    </>
  )
}

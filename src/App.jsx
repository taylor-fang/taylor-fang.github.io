import '@fontsource-variable/inter/wght.css'
import '@fontsource-variable/manrope/wght.css'
import './styles.css'
import logo from './logo-strokes.json'

// Strawberry Hill, Golden Gate Park
const COORDS = { lat: 37.7686, lng: -122.4754 }

const LINKS = [
  { label: 'Twitter', href: 'https://x.com/teafang' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/tfang15/' },
  { label: 'GitHub', href: 'https://github.com/taylor-fang' },
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

export default function App() {
  return (
    <>
      <Header />
      <main className="intro">
        <p>
          I’m Taylor, a writer based in San Francisco. I work at General Translation on our{' '}
          <a className="flourish" href="https://generaltranslation.com/en-US/blog" target="_blank" rel="noopener noreferrer">
            blog
          </a>{' '}
          and{' '}
          <a className="flourish" href="https://generaltranslation.com/atlas" target="_blank" rel="noopener noreferrer">
            magazine
          </a>
          .
        </p>
        <p>
          My writing has been published in the New York Times, MIT Tech Review, and Pulitzer Center, and exhibited at
          the United Nations and Smithsonian Museum.
        </p>
        <p>
          I studied English with a CS secondary at Harvard, where I graduated summa cum laude and received the Academy
          of American Poets prize.
        </p>
      </main>
      <footer className="contact" aria-label="Contact">
        <span data-no-ink>taylor.fang15[at]gmail.com</span>
        {LINKS.map(({ label, href }) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="flourish">
            {label}
          </a>
        ))}
      </footer>
    </>
  )
}

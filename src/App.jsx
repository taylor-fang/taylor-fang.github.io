import '@fontsource-variable/inter/wght.css'
import '@fontsource-variable/manrope/wght.css'
import './styles.css'
import logo from './logo-strokes.json'

// Strawberry Hill, Golden Gate Park
const COORDS = { lat: 37.7686, lng: -122.4754 }

const LINKS = [
  { label: 'Twitter', href: 'https://x.com/teafang' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/tfang15/' },
]

const RECENT = [
  'Worked in BizOps @ Cartesia, where I ran product marketing',
  'Co-founded a startup that signed 7 Olympic athletes',
]

const PREVIOUS = [
  'Studied English and CS at Harvard (summa cum laude)',
  'Worked as a designer at the MIT Media Lab',
  'Spent summers at the UN, World Data Lab, and Impactive (acquired). Gap year at Foothill Ventures',
]

function formatCoords({ lat, lng }) {
  const ns = lat >= 0 ? 'N' : 'S'
  const ew = lng >= 0 ? 'E' : 'W'
  return `${Math.abs(lat).toFixed(4)}° ${ns}, ${Math.abs(lng).toFixed(4)}° ${ew}`
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
        <nav className="nav-col" aria-label="Contact">
          <span>taylor.fang15[at]gmail.com</span>
          {LINKS.map(({ label, href }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="squiggle">
              {label}
            </a>
          ))}
        </nav>
        <div className="nav-col nav-col-right">
          <span>San Francisco, CA</span>
          <span className="coords">{formatCoords(COORDS)}</span>
        </div>
      </div>
    </header>
  )
}

function List({ title, items }) {
  return (
    <div className="bullet-col">
      <h2>{title}</h2>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

export default function App() {
  return (
    <>
      <Header />
      <main className="intro">
        <p className="lede">
          <span>Hey, I’m Taylor — a writer &amp; startup operator based in San Francisco.</span>{' '}
          <span className="muted">I build technology and tell stories about how tech shapes the way we create and interact.</span>
        </p>

        <div className="bullets">
          <List title="Most Recently" items={RECENT} />
          <List title="Previously" items={PREVIOUS} />
        </div>

        <div className="bullet-col plain">
          <h2>Selected Writing</h2>
          <ul>
            <li>
              Published in <i>MIT Technology Review</i>, <i>New York Times</i>, and <i>Pulitzer Center</i>
            </li>
            <li>Exhibited at United Nations Headquarters, Smithsonian Museum, and Nora Eccles Harrison Museum</li>
            <li>
              Recognized by Academy of American Poets Prize, Lloyd McKim Garrison Prize, and as a former National
              Student Poet
            </li>
          </ul>
        </div>
      </main>
    </>
  )
}

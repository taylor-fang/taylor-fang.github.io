import '@fontsource-variable/inter/wght.css'
import '@fontsource-variable/manrope/wght.css'
import './styles.css'

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

function Header() {
  return (
    <header className="site-header">
      <a href="/" className="logo" aria-label="Taylor Fang, home">
        <img src="/logo.webp" alt="Taylor Fang" width="820" height="195" fetchPriority="high" />
      </a>
      <div className="nav-group">
        <nav className="nav-col" aria-label="Contact">
          <span>taylor.fang15[at]gmail.com</span>
          {LINKS.map(({ label, href }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer">
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

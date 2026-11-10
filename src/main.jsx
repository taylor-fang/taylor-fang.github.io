// Dev-only entry. Production ships the prerendered HTML with no JS bundle
// (see scripts/prerender.js), since the page has no interactive state.
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(<App />)

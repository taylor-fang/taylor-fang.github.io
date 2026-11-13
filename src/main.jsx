// Dev-only entry. Production ships the prerendered HTML plus the inlined ink
// script, with no React bundle (see scripts/prerender.js).
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './ink.js'

createRoot(document.getElementById('root')).render(<App />)

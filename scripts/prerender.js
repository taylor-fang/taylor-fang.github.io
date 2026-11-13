// Renders App to static HTML, inlines the CSS and the ink script, preloads
// the latin fonts, and drops the React client bundle (nothing needs hydrating).
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { transform } from 'esbuild'

const dist = path.resolve('dist')
const ssrDir = path.resolve('dist-ssr')
const { render } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href)

let html = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')
html = html.replace('<!--app-->', render())

// Inline stylesheets and resolve their font URLs relative to site root.
html = html.replace(/<link rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/g, (_, href) => {
  const css = fs.readFileSync(path.join(dist, href), 'utf8')
  fs.rmSync(path.join(dist, href))
  return `<style>${css}</style>`
})

// Remove the client bundle and its preloads.
html = html.replace(/<script type="module"[^>]*><\/script>\s*/g, '')
html = html.replace(/<link rel="modulepreload"[^>]*>\s*/g, '')
for (const f of fs.readdirSync(path.join(dist, 'assets'))) {
  if (f.endsWith('.js')) fs.rmSync(path.join(dist, 'assets', f))
}

// Inline the small, dependency-free ink script (module scripts run after parse).
const ink = await transform(fs.readFileSync('src/ink.js', 'utf8'), { minify: true, format: 'esm' })
html = html.replace('</body>', `<script type="module">${ink.code.trim()}</script>\n  </body>`)

// Preload the latin font files so text paints without waiting on CSS parse.
const fonts = fs
  .readdirSync(path.join(dist, 'assets'))
  .filter((f) => /^(inter|manrope)-latin-wght-normal-.*\.woff2$/.test(f))
  .map((f) => `<link rel="preload" as="font" type="font/woff2" href="/assets/${f}" crossorigin>`)
html = html.replace('<!--preload-fonts-->', fonts.join('\n    '))

fs.writeFileSync(path.join(dist, 'index.html'), html)
fs.rmSync(ssrDir, { recursive: true, force: true })
console.log(`prerendered dist/index.html (${(Buffer.byteLength(html) / 1024).toFixed(1)} KB), ${fonts.length} fonts preloaded`)

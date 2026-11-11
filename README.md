# taylor-fang.github.io

Personal site. React + Vite, prerendered to static HTML at build time (no JS shipped to the browser).

```bash
npm install
npm run dev      # local dev server
npm run build    # outputs dist/
```

- Content lives in `src/App.jsx`, styles in `src/styles.css`.
- Deploys via `.github/workflows/deploy.yml` on push to `main`. In repo Settings → Pages, set Source to **GitHub Actions**.
- The previous site (projects gallery, about, contact, all images) is archived untouched in `legacy/`. It is not part of the build.
- The logo "writes itself" using strokes in `src/logo-strokes.json`, traced from the logo image by `scripts/trace-logo.py`. Re-run that script if the logo changes.

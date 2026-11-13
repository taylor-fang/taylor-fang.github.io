import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Keep the archived old site out of dep scanning and the dev server watcher.
  optimizeDeps: { entries: ['index.html'] },
  server: { watch: { ignored: ['**/legacy/**'] } },
})

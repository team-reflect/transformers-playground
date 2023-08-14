import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    headers: {
      'X-MY-TESTING-HEADER': 'v1',
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin',
    },
  },
})

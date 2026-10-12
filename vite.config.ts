import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { devDatabasePlugin } from './vite-plugin-dev-db'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), devDatabasePlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})

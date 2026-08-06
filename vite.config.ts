import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages: se il repo NON è <username>.github.io, il sito vive sotto /<repo-name>/
// Cambia BASE_PATH qui sotto con il nome del tuo repository GitHub prima del deploy.
const BASE_PATH = '/starbooks-mug-collection/'

// https://vite.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? BASE_PATH : '/',
  plugins: [react(), tailwindcss()],
})

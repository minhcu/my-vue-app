import path from "path"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      react: path.resolve("./node_modules/react"),
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: "/my-vue-app/"
})

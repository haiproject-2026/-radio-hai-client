import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev
export default defineConfig(({ command }) => ({
  plugins: [
    react(),
  ],

  // Local : /
  // Production : /-radio-hai-client/
  base: command === "build" ? "/-radio-hai-client/" : "/",

  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },

  css: {
    postcss: "./postcss.config.cjs",
  },

  // Serveur de développement
  server: {
    host: "127.0.0.1",
    port: 5173,
    strictPort: true,
  },
}));
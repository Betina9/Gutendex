import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  // base: "/gutendex/", // Fjernet base-path for lokal utvikling
  plugins: [react()],
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/Gutendex/",
  build: { outDir: "docs" },
  plugins: [react()],
});

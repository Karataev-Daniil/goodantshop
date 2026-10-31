import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import responsiveImages from "./scripts/responsive-images.mjs";

export default defineConfig({
  plugins: [react(), responsiveImages()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "")
      }
    }
  }
});

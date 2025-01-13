import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@routes": path.resolve(__dirname, "./src/routes.ts"),
      "@utils": path.resolve(__dirname, "./utils"),
      "@assets": path.resolve(__dirname, "./assets"),
      "@styles": path.resolve(__dirname, "./src/styles"),
      "@contexts": path.resolve(__dirname, "./src/contexts"),
      "@services": path.resolve(__dirname, "./backend/services"),
    },
  },
});

import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@models": path.resolve(__dirname, "./src/models"),
      "@types": path.resolve(__dirname, "./src/types"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@server": path.resolve(__dirname, "./src/server"),
      "@store": path.resolve(__dirname, "./src/store"),
      "@icons": path.resolve(__dirname, "./src/assets/icons"),
      "@common": path.resolve(__dirname, "./src/components/common"),
      "@edit": path.resolve(__dirname, "./src/components/edit"),
      "@form": path.resolve(__dirname, "./src/components/form"),
      "@statistics": path.resolve(__dirname, "./src/components/statistics"),
    },
  },
});

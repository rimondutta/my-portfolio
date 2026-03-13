import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "three-vendor": ["three", "three-stdlib", "three-mesh-bvh"],
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "gsap-vendor": ["gsap", "@gsap/react"],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});

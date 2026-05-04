import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          motion: ["framer-motion"],
          chart: ["recharts"],
          share: ["html-to-image", "qrcode"],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
});

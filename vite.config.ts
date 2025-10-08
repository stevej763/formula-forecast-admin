import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: "0.0.0.0", // listen on all interfaces
    port: 5174,
    strictPort: true,
    allowedHosts: ["steve-think", "localhost"],
    // proxy: {
    //   '/api': {
    //     target: 'https://3.8.137.201:443',
    //     changeOrigin: true,
    //     secure: false,
    //   },
    // },
  },
});

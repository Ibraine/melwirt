import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // ya jo bhi frontend port hai
    proxy: {
      "/api": {
        target: "http://localhost:8000", // tumhara Django backend ka URL
        changeOrigin: true,
        secure: false,
      },
    },
  },
});

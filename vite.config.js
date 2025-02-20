import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: "/norskfan77.github.io/",  // Set this to match your repo name
  plugins: [react()],
  server: {
    proxy: {
      "/api": "https://norsk-be-ny-production.up.railway.app"
    }
  }
});

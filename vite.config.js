import { defineConfig } from 'vite';
import plugin from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    base: "/", // Adjust this based on your repo
    server: {
        proxy: {
            "/api": "https://norsk-be-ny-production.up.railway.app"
        }
    }
});

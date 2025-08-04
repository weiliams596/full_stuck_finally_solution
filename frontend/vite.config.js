import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [react(), tailwindcss()],
    server: {
      host: '0.0.0.0',
      port: 5173,// default port
      open: true,
      allowedHosts: true,
      proxy: {
        '/api/v1': {
          target: `http://localhost:5000`,
          changeOrigin: true,
        }
      }
    }
  }
  // return {
  //   plugins: [react(), tailwindcss()],
  //   server: {
  //     host: '0.0.0.0',
  //     port: 5173,// default port
  //     open: true,
  //     allowedHosts: true,
  //     proxy: {
  //       '/api/v1': {
  //         target: `${env.VITE_BASE_URL}`,
  //         changeOrigin: true,
  //         secure: true,
  //       }
  //     }
  //   }
  // }
});

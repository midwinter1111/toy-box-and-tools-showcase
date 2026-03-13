import { fileURLToPath, URL } from 'node:url'

import tailwindcss from '@tailwindcss/vite'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig(({mode}) =>{
  const env = loadEnv(mode, '${process.cwd()}/environments');
  const enableStrip = env.VITE_CONSOLE_LOG_LEVEL === 'OFF';

  return {
    base: '/',
    evnDir: './environments/',
    plugins: [
    vue(),
    vueDevTools(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    port: 3000,
    strictPort: true
  },
  esbuild: {
    supported: {
      'top-level-await': true
    }
  },
  define: {
    __VUE_PROD_DEVTOOLS__: env.VITE_ENABLE_DEVTOOLS === 'true'
  }
  };
})



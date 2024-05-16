import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import monkey, { cdn } from 'vite-plugin-monkey';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 24252,
  },
  plugins: [
    react(),
    monkey({
      entry: 'src/main.tsx',
      userscript: {
        icon: 'https://static-beta.curseforge.com/images/favicon.ico',
        name: 'CurseForge Enhancer',
        namespace: 'npm/vite-plugin-monkey',
        author: 'Arathi of Nebnizilla',
        match: [
          'https://www.curseforge.com/minecraft/search*'
        ],
      },
      build: {
        externalGlobals: {
          react: cdn.jsdelivr('React', 'umd/react.production.min.js'),
          'react-dom': cdn.jsdelivr(
            'ReactDOM',
            'umd/react-dom.production.min.js',
          ),
        },
      },
    }),
  ],
});

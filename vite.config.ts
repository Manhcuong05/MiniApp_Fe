// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  base: './',
  plugins: [
    react(),
    {
      name: 'zmp-assets',
      async writeBundle() {
        const fs = require('fs');
        const { execSync } = require('child_process');

        const outDir = path.resolve(__dirname, 'www');

        // 1. Copy zaui.css
        const zauiSrc = path.resolve(__dirname, 'node_modules/zmp-ui/zaui.css');
        const zauiDest = path.resolve(outDir, 'zmp-ui/zaui.css');
        if (fs.existsSync(zauiSrc)) {
          fs.mkdirSync(path.dirname(zauiDest), { recursive: true });
          fs.copyFileSync(zauiSrc, zauiDest);
          console.log('Copied zaui.css');
        }

        // 2. Compile SCSS → CSS into www/ (root)
        const compile = (entry: string, output: string) => {
          const cmd = `npx postcss ${entry} -o ${path.resolve(outDir, output)}`;
          try {
            execSync(cmd, { stdio: 'inherit' });
            console.log(`Compiled ${entry} → ${output}`);
          } catch (e) {
            console.error(`Failed to compile ${entry}`, e);
          }
        };

        compile('src/css/tailwind.scss', 'tailwind.css');
        compile('src/css/app.scss', 'app.css');

        // 3. Copy config files
        fs.copyFileSync('app-config.json', path.resolve(outDir, 'app-config.json'));
        fs.copyFileSync('public/zmp-manifest.json', path.resolve(outDir, 'zmp-manifest.json'));
      },
    },
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      'react-router-dom': path.resolve(
        __dirname,
        'node_modules/zmp-ui/node_modules/react-router-dom'
      ),
      'react-router': path.resolve(
        __dirname,
        'node_modules/zmp-ui/node_modules/react-router'
      ),
    },
  },
  build: {
    outDir: 'www',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: 'app.js',
        assetFileNames: '[name].[ext]', // no hash, no folder
      },
    },
  },
  server: { port: 4000, host: true },
});

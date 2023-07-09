import { crx } from '@crxjs/vite-plugin';
import react from '@vitejs/plugin-react';
import { join, resolve } from 'path';
import { defineConfig } from 'vite';
import manifest from './src/manifest';
import makeManifest from './utils/plugins/make-manifest';
import buildContentScript from './utils/plugins/build-content-script';


const root = resolve(__dirname, 'src');

const backgroundDir = resolve(root, 'background');


export default defineConfig({
  // @see https://github.com/crxjs/chrome-extension-tools/issues/696
  server: {
    port: 5173,
    strictPort: true,
    hmr: {
      port: 5173,
    },
  },
  // prevent src/ prefix on extension urls
  root: resolve(__dirname, 'src'),
  publicDir: resolve(__dirname, 'public'),
  build: {
    outDir: resolve(__dirname, 'dist'),
    rollupOptions: {
      input: {
        // see web_accessible_resources in the manifest config
        content: join(__dirname, 'src/welcome/welcome.html'),
        background: resolve(root, 'background', 'index.ts'),
        // background: resolve(root, 'background', 'index.ts'),
        options: resolve(root, 'options', 'options.html'),
        popup: resolve(root, 'popup', 'popup.html'),

      },
      output: {
        chunkFileNames: 'assets/chunk-[hash].js',
      },
    },
  },
  plugins: [react(), makeManifest(), buildContentScript()],
});

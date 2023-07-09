import { PluginOption, build } from 'vite'; 
import { resolve } from 'path';
import { outputFolderName } from '../constants';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

const packages = [
  {
    content:  resolve(__dirname, '../../', 'src/background/index.ts')
  },
];

const outDir = resolve(__dirname, '../../',  outputFolderName); 

export default function buildContentScript(): PluginOption {
  return {
    name: 'build-content',
    async buildEnd() {
      for (const _package of packages) {
        await build({
          publicDir: false,
          plugins: [ cssInjectedByJsPlugin() ],
          build: {
            outDir,
            sourcemap: process.env.__DEV__ === 'true',
            emptyOutDir: false,
            rollupOptions: {
              input: _package,
              output: {
                entryFileNames: (chunk) => {
                  return `background/index.js`;
                },
              },
            },
          },
          configFile: false,
        });
      }
    },
  };
}

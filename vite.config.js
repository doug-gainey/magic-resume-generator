import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import ViteYaml from '@modyfi/vite-plugin-yaml';
import autoprefixer from 'autoprefixer';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: 'esnext'
  },
  plugins: [vue(), ViteYaml()],
  css: {
    preprocessorOptions: {
      less: {
        math: 'always',
        relativeUrls: true,
        javascriptEnabled: true
      }
    },
    postcss: {
      plugins: [autoprefixer()]
    }
  }
});

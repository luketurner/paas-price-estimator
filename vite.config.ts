import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import ssr from 'vite-plugin-ssr/plugin';

export default defineConfig({
  plugins: [solidPlugin({ ssr: true }), ssr({ prerender: true })],
  base: '/paas-price-estimator/', // TODO -- can I avoid this hardcoded path?
  build: {
    target: 'esnext',
    // polyfillDynamicImport: false,
  },
});

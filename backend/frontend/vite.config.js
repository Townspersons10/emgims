import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';

export default defineConfig({
  plugins: [reactRefresh()],
  server: {
    middlewareMode: 'ssr',
    fs: {
      strict: false,
    },
  },
  esbuild: {
    loader: 'jsx',
  },
});
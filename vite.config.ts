import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/findACoach',
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @import "@/scss/_colors.scss";
        @import "@/scss/_variables.scss";
        
        `,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});

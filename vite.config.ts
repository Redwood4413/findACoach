import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Icons from 'unplugin-icons/vite';
import Components from 'unplugin-vue-components/vite';
import IconsResolver from 'unplugin-icons/resolver';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      dirs: '',
      resolvers: [
        IconsResolver({
          prefix: false,
        }),
      ],
    }),
    Icons({
      autoInstall: true,
      compiler: 'vue3',
      scale: 2,
    }),
  ],
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
      '@': '/src',
    },
  },
});

import vue from '@vitejs/plugin-vue';
import htmlTemplate from 'vite-plugin-html-template';
import helpers from 'helpers';
import config from '@/config';

const isProduction = config.environment === 'production';

module.exports = {
  root: helpers.root('client', 'src'),
  base: '/',
  resolve: {
    extensions: [ '.js', '.vue' ],
    alias: {
      'vue$': isProduction ? 'vue/dist/vue.runtime.min.js' : 'vue/dist/vue.runtime.js',
      '@': helpers.root('client', 'src')
    }
  },
  plugins: [
    vue(),
    htmlTemplate(),
  ],
};

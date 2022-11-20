import vue from '@vitejs/plugin-vue';
import helpers from 'helpers';
import config from '@/config';

const isProduction = config.environment === 'production';

module.exports = {
  root: helpers.root('client', 'src'),
  base: '/',
  mode: config.environment,
  resolve: {
    extensions: [ '.js', '.vue' ],
    alias: {
      'vue$': isProduction ? 'vue/dist/vue.runtime.min.js' : 'vue/dist/vue.runtime.js',
      '@': helpers.root('client', 'src')
    }
  },
  plugins: [
    vue(),
  ],
};

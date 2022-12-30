import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
import { md3 } from 'vuetify/blueprints';

import { createVuetify } from 'vuetify';

export default createVuetify({
  blueprint: md3,
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#FF965B',
          secondary: '#2DA093',
        },
      },
      dark: {
        colors: {
          primary: '#FF965B',
          secondary: '#2DA093',
        },
      },
    },
  },
});

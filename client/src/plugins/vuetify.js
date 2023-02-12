import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
import { md3 } from 'vuetify/blueprints';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import { fa } from 'vuetify/iconsets/fa';

import { VDataTable } from 'vuetify/labs/VDataTable';


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
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
      fa
    }
  },
  components: {
    VDataTable,
  }
});

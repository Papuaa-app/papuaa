// Styles
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';

// Composables
import { createVuetify } from 'vuetify';

export default createVuetify({
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

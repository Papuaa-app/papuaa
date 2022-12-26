import { createI18n } from 'vue-i18n';

import enUS from './en-US';
import es from './es';

const messages = {
  'en-US': enUS,
  'es': es,
};

export default createI18n({
  locale: 'es',
  globalInjection: true,
  messages
});

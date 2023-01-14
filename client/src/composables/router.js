'use strict';
import router from '@/router';

async function goTo (routeName) {
  await router.push({ name: routeName });
}

export { goTo };

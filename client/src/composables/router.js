'use strict';
import router from '@/router';

async function goTo (routeName) {
  await router.push({ name: routeName });
}

async function goBack () {
  await router.back();
}

export { goTo, goBack };

<template>
  <div>
    hotel info
  </div>
</template>

<script>
import { useSessionStore } from '@/store/session';
import { mapActions, mapWritableState } from 'pinia';

export default {
  name: 'HotelInformation',
  computed: {
    ...mapWritableState(useSessionStore, { me: 'me' }),
  },
  created () {
    console.log(this.me);
  },
};
</script>

<style scoped>

</style>

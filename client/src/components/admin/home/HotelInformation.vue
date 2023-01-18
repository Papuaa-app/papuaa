<template>
  <div>
    hotel info
  </div>
</template>

<script>
import { useSessionStore } from '@/store/session';
import { mapActions } from 'pinia';

export default {
  name: 'HotelInformation',
  created () {

  },
  methods: {
    ...mapActions(useSessionStore, [ 'login' ]),
  }
};
</script>

<style scoped>

</style>

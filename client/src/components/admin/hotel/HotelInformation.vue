<template>
  <div>
    hotel info
  </div>
</template>

<script>
import { useSessionStore } from '@/store/session';
import { mapState } from 'pinia';

export default {
  name: 'HotelInformation',
  computed: {
    ...mapState(useSessionStore, [ 'me' ] ),
  },
  created () {
    if (!this.me.hotelGroups.length) {
      this.$router.push({ name: 'HotelWizard' });
    }
  }
};
</script>

<style scoped>

</style>

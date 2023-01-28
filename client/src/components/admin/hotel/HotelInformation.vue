<template>
  <div>
    <div v-if="hotels">
      hotel groups
    </div>
    <div v-else>
      hotel info
    </div>
  </div>
</template>

<script>
import { useSessionStore } from '@/store/session';
import { mapState } from 'pinia';

export default {
  name: 'HotelInformation',
  computed: {
    ...mapState(useSessionStore, [ 'me' ] ),
    hotels () {
      return this.me.hotelGroups?.find(hotelGroup => !!hotelGroup.hotels?.length);
    },
  },
};
</script>

<style scoped>

</style>

<template>
  <div>
    <div v-if="hotels">
      hotel groups
    </div>
    <div v-else>
      <v-card variant="tonal">
        <v-card-title>
          <v-icon>
            mdi-office-building-remove-outline
          </v-icon>
          {{ $t('admin.home.notFound') }}
        </v-card-title>
        <v-card-text>
          {{ $t('admin.home.notFoundInfo') }}
        </v-card-text>
      </v-card>
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

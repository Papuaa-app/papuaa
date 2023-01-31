<template>
  <div>
    <div v-if="hotelGroups">
      <v-card
        v-for="hotelGroup in hotelGroups"
        :key="hotelGroup._id"
      >
        <v-card-title>
          Organización: {{ hotelGroup.name }}
        </v-card-title>
        <v-card-text>
          <div>
            {{ hotelGroup.description }}
          </div>
          <v-card
            v-for="(hotel, i) in hotelGroup.hotels"
            :key="hotel._id"
            variant="tonal"
          >
            <v-card-subtitle>
              hotel {{ i + 1 }}: {{ hotel.name }}
            </v-card-subtitle>
          </v-card>
        </v-card-text>
      </v-card>
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
    hotelGroups () {
      return !!this.me.hotelGroups?.length && this.me.hotelGroups;
    },
  },
};
</script>

<style scoped>

</style>

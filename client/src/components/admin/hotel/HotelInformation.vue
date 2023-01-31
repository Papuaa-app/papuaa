<template>
  <div>
    <div v-if="hotelGroups">
      <h2>
        {{ activeHotelGroup.name }}
      </h2>
      <div class="d-flex flex-wrap mb-5">
        <v-card
          v-for="(card, i) in cards"
          :key="`card-${i}`"
          class="mr-3"
          min-width="250"
          min-height="80"
          elevation="10"
          :color="card.color"
        >
          <div class="h-100 d-flex align-center justify-center px-10">
            <div class="d-flex flex-column">
              <div class="card-text">
                {{ card.data }}
              </div>
              <div class="small">
                {{ card.label }}
              </div>
            </div>
            <div class="ml-auto">
              <v-icon size="40">
                {{ card.icon }}
              </v-icon>
            </div>
          </div>
        </v-card>
      </div>
      <v-card
        v-for="hotel in activeHotelGroup.hotels"
        :key="hotel._id"
        variant="flat"
        border
        min-height="400"
      >
        <v-card-title>
          {{ hotel.name }}
        </v-card-title>
        <v-card-subtitle v-if="hotel.description">
          {{ hotel.description }}
        </v-card-subtitle>
        <v-card-text />
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
  data () {
    return {
      bookings: 14,
      freeRooms: 10,
    };
  },
  computed: {
    ...mapState(useSessionStore, [ 'me', 'activeOrganizationId' ] ),
    hotelGroups () {
      return !!this.me.hotelGroups?.length && this.me.hotelGroups;
    },
    activeHotelGroup () {
      return this.hotelGroups.find(hotelGroup => hotelGroup._id === this.activeOrganizationId);
    },
    cards () {
      return [
        {
          data: this.bookings,
          color: 'blue',
          icon: 'mdi-bookmark-multiple-outline',
          label: 'Active Bookings',
        },
        {
          data: this.freeRooms,
          color: 'green',
          icon: 'mdi-bed-king-outline',
          label: 'Free Rooms',
        },
      ];
    },
  },
};
</script>

<style scoped>
.card-text {
  font-size: 2em;
  font-weight: 800;
  line-height: 1em;
}
</style>

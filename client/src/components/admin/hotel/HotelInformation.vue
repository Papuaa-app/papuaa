<template>
  <div>
    <div v-if="hotelGroups">
      <h2>
        {{ activeHotelGroup.name }}
      </h2>
      <v-row class="mb-6">
        <v-col
          cols="12"
          xs="12"
          sm="5"
          md="5"
        >
          <v-card
            max-height="35em"
            elevation="10"
            color="dark"
            class="text-white"
          >
            <v-card-title class="font-weight-bold ma-3 mb-10">
              {{ $t('admin.hotelGroup.performance.title') }}
            </v-card-title>
            <v-card-text class="d-flex justify-space-around">
              <div class="d-flex flex-column align-center">
                <div class="font-weight-bold font-xl mb-2">
                  15
                </div>
                <div class="text-center">
                  {{ $t('admin.hotelGroup.performance.activeBookings') }}
                </div>
              </div>
              <v-divider vertical />
              <div class="d-flex flex-column align-center">
                <div class="font-weight-bold font-xl mb-2">
                  4
                </div>
                <div class="text-center">
                  {{ $t('admin.hotelGroup.performance.roomsLeft') }}
                </div>
              </div>
            </v-card-text>
            <v-card-text>
              <v-list class="bg-transparent">
                <v-list-item
                  v-for="(check, i) in checks"
                  :key="`check-${i}`"
                  class="mb-2"
                >
                  <v-avatar
                    class="mr-4 mb-2"
                    :color="check.color"
                  >
                    <v-icon>
                      {{ check.icon }}
                    </v-icon>
                  </v-avatar>
                  <span class="font-weight-bold mr-3">
                    {{ check.entity }}
                  </span>
                  {{ check.label }}
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col>
          <v-card
            max-height="35em"
            elevation="10"
            color="light-blue-lighten-4"
          >
            <v-tabs
              v-model="activeTab"
              centered
              stacked
              color="black"
            >
              <v-tab
                v-for="(tab, i) in tabs"
                :key="`tab-header-${i}`"
                :value="`tab-${i}`"
                class="font-weight-bold"
              >
                {{ tab.label }}
              </v-tab>
            </v-tabs>
            <v-window
              v-model="activeTab"
              class="border-0"
            >
              <v-window-item
                v-for="(tab, i) in tabs"
                :key="i"
                :ref="`tab-${i}`"
                :value="`tab-${i}`"
                class="h-100"
              >
                <Sparkline
                  class="w-100 h-100"
                  :width="getParentWidth(`tab-${i}`)"
                  :height="getParentHeight(`tab-${i}`)"
                  :data="[2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31]"
                />
              </v-window-item>
            </v-window>
          </v-card>
        </v-col>
      </v-row>
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
import Sparkline from '@/components/utils/charts/sparkline.vue';
import { useSessionStore } from '@/store/session';
import { mapState } from 'pinia';

export default {
  name: 'HotelInformation',
  components: { Sparkline },
  data () {
    return {
      bookings: 14,
      freeRooms: 10,
      activeTab: 0,
      tabs: [
        {
          label: 'Actividad',
          value: [ 1, 2, 3, 4, 5 ],
        },
        {
          label: 'Actividad',
          value: [ 1, 2, 3, 4, 5 ],
        },
        {
          label: 'Actividad',
          value: [ 1, 2, 3, 4, 5 ],
        },
      ]
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
    checks () {
      return [
        {
          color: 'success',
          icon: 'mdi-check',
          entity: 'Organización',
          label: 'Esto es el KPI 1',
        },
        {
          color: 'blue',
          icon: 'mdi-information-outline',
          entity: 'Hotel',
          label: 'Esto es el KPI 2',
        },
        {
          color: 'error',
          icon: 'mdi-exclamation',
          entity: 'Reservas',
          label: 'Check 3',
        },
      ];
    }
  },
  methods: {
    getParentWidth (refName) {
      return this.$refs[refName][0].$el.parentElement.clientWidth;
    },
    getParentHeight (refName) {
      return this.$refs[refName][0].$el.parentElement.clientHeight;
    },
  }
};
</script>

<style scoped>
.card-text {
  font-size: 2em;
  font-weight: 800;
  line-height: 1em;
}
.font-xl {
  font-size: 3em;
}
</style>

<template>
  <div>
    <v-card
      color="secondary"
      :min-height="$vuetify.display.xs ? 400 : 250"
      elevation="10"
      class="d-flex flex-column h-100"
    >
      <v-card-title class="white-space-no-wrap">
        {{ $t('admin.createNewHotelGroup.title') }}
      </v-card-title>
      <v-card-subtitle class="white-space-no-wrap">
        {{ $t('admin.createNewHotelGroup.subtitle') }}
      </v-card-subtitle>
      <v-card-text>
        <div>
          <v-btn
            class="ma-1"
            variant="flat"
            @click="goTo('CreateHotelGroup', { target: 'user', redirect: 'AdminHome'  })"
          >
            {{ $t('admin.createNewHotelGroup.title') }}
          </v-btn>
        </div>
        <div>
          <v-btn
            class="ma-1"
            disabled
            @click="goTo('CreateHotelGroup', { target: 'user', redirect: 'AdminHome' })"
          >
            {{ $t('admin.createNewHotelGroup.access') }}
          </v-btn>
        </div>
      </v-card-text>
      <v-img
        width="350"
        class="img"
        :src="hotel3"
      />
    </v-card>
  </div>
</template>

<script>
import hotel3 from '@/assets/hotel/hotel3.png';
import { goTo } from '@/composables/router';

export default {
  name: 'CreateNewHotelGroup',
  data () {
    return {
      hotel3,
    };
  },
  methods: {
    goTo
  },
};
</script>

<style scoped>
.img {
  position: absolute;
  right: -5%;
  bottom: 0;
  z-index: 0;
  opacity: .9;
}
.v-card-text {
  z-index: 10;
}
</style>

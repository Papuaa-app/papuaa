<template>
  <div>
    <v-card
      color="purple"
      elevation="10"
      class="d-flex flex-column h-100"
    >
      <v-card-title class="white-space-no-wrap">
        {{ $t('admin.createNewHotel.title') }}
      </v-card-title>
      <v-card-subtitle class="white-space-no-wrap">
        {{ $t('admin.createNewHotel.subtitle') }}
      </v-card-subtitle>
      <v-card-text>
        <div>
          <v-btn
            color="secondary"
            class="ma-1"
            variant="flat"
            @click="goTo('CreateHotel')"
          >
            {{ $t('admin.createNewHotel.title') }}
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import hotel2 from '@/assets/hotel/hotel2.png';
import { goTo } from '@/composables/router';

export default {
  name: 'CreateNewHotel',
  data () {
    return {
      hotel2,
    };
  },
  methods: { goTo },
};
</script>

<style scoped>

</style>

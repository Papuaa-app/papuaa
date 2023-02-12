<template>
  <div v-if="component">
    <component
      :is="component"
      class="mb-10"
    />
  </div>
</template>

<script>
import CreateNewHotelGroup from '@/components/admin/hotel-group/CreateNewHotelGroup.vue';
import CreateNewHotel from '@/components/admin/hotel/CreateNewHotel.vue';
import { useSessionStore } from '@/store/session';
import { mapState } from 'pinia';
import { shallowRef } from 'vue';

export default {
  name: 'UserExtra',
  data () {
    return {
      component: undefined,
    };
  },
  computed: {
    ...mapState(useSessionStore, [ 'me' ] ),
    myHotelGroups () {
      return this.me.hotelGroups;
    },
  },
  watch: {
    myHotelGroups () {
      this.setComponent();
    },
  },
  mounted () {
    this.setComponent();
  },
  methods: {
    setComponent () {
      if (!this.myHotelGroups?.length) {
        this.component = shallowRef(CreateNewHotelGroup);
      } else {
        const hasHotels = this.myHotelGroups.find(hotelGroup => !!hotelGroup.hotels?.length);
        if (!hasHotels) {
          this.component = shallowRef(CreateNewHotel);
        } else {
          this.component = undefined;
        }
      }
    }
  }
};
</script>

<style scoped>

</style>

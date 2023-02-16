<template>
  <div>
    <div class="d-flex align-center">
      <v-icon>
        mdi-bed-outline
      </v-icon>
      <h3 class="ml-3 mb-0">
        {{ $t('admin.hotel.title') }}
      </h3>
    </div>
    <div class="mt-2">
      <v-card
        v-for="(hotel, i) in hotels"
        :key="hotel._id"
        class="mb-3"
      >
        <v-card-title class="d-flex justify-space-between">
          <span>
            {{ hotel.name }}
          </span>
          <span>
            {{ hotel.city }}
          </span>
        </v-card-title>
        <v-card-subtitle>
          {{ hotel.description }}
        </v-card-subtitle>
        <v-divider />
        <v-card-text class="pt-0">
          <div class="d-flex justify-space-between">
            <h6>
              {{ $t('admin.roomType.title') }}
            </h6>
            <v-btn
              size="small"
              variant="flat"
              @click="addRoomType(hotel._id)"
            >
              <v-icon
                size="large"
                class="mr-3"
              >
                mdi-plus
              </v-icon>
              {{ $t('admin.roomType.detail.create') }}
            </v-btn>
          </div>
          <AdminTable
            :headers="roomTypesTableHeaders"
            :items="hotel.roomTypes"
            @edit-item="(roomType) => editRoomType(i, roomType)"
            @delete-item="removeRoomType"
          />
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
import RoomTypeFormDialog from '@/components/admin/dialog/RoomTypeFormDialog.vue';
import AdminTable from '@/components/admin/table/AdminTable';
import eventBus from '@/plugins/eventBus';
import { useHotelStore } from '@/store/hotel';
import { useHotelGroupStore } from '@/store/hotelGroup';
import { useRoomTypeStore } from '@/store/roomType';
import { mapActions, mapState } from 'pinia';

export default {
  name: 'HotelAdminHome',
  components: { AdminTable },
  data () {
    return {
      roomTypesTableHeaders: [
        { title: this.$t('table.name'), key: 'name' },
        { title: this.$t('table.actions'), key: 'actions-2', fixed: true, align: 'start', width: 10 },
      ],
    };
  },
  computed: {
    ...mapState(useHotelStore, [ 'hotels' ]),
  },
  async created () {
    await this.getActiveOrganizationHotels(true);
  },
  methods: {
    ...mapActions(useHotelGroupStore, [ 'getActiveOrganizationHotels' ]),
    ...mapActions(useRoomTypeStore, [ 'deleteRoomTypeById' ]),
    addRoomType (hotelId) {
      eventBus.$emit('OPEN_DIALOG', {
        component: RoomTypeFormDialog,
        data: {
          hotelId,
        }
      });
    },
    async editRoomType (hotelIndex, roomType) {
      const hotelId = this.hotels[hotelIndex]._id;
      eventBus.$emit('OPEN_DIALOG', {
        component: RoomTypeFormDialog,
        data: {
          hotelId,
          roomTypeId: roomType._id,
        }
      });
    },
    async removeRoomType (roomType) {
      await this.deleteRoomTypeById(roomType._id);
      await this.getActiveOrganizationHotels(true);
      console.log(this.hotels);
    },
  }
};
</script>

<style scoped>

</style>

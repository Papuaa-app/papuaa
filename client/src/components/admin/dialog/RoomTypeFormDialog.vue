<template>
  <v-card :class="{ 'border-radius-0': isFullScreen }">
    <v-card-actions
      v-if="isFullScreen"
      class="justify-space-between bg-primary"
    >
      <v-btn
        color="white"
        variant="tonal"
        icon
        @click="closeDialog"
      >
        <v-icon>
          mdi-close
        </v-icon>
      </v-btn>
      <v-btn
        variant="tonal"
        color="white"
        @click="submitDialog"
      >
        {{ $t('form.submit') }}
      </v-btn>
    </v-card-actions>
    <v-card-title>
      {{ data.hotelId ? $t('admin.roomType.detail.edit') : $t('admin.roomType.detail.create') }}
    </v-card-title>
    <v-card-text>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        @submit.prevent="submitDialog"
      >
        <v-text-field
          v-model="roomTypeForm.name"
          :rules="[ validation.required ]"
          :label="$t('form.name')"
        />
        <v-textarea
          v-model="roomTypeForm.description"
          :label="$t('form.description')"
        />
        <v-card
          variant="flat"
          border
        >
          <v-card-title class="d-flex justify-space-between">
            <span>
              {{ $t('admin.room.title') }} ({{ roomTypeForm.rooms.length }})
            </span>
            <span>
              <v-btn
                variant="flat"
                size="x-small"
                icon
                @click="addRoom"
              >
                <v-icon size="large">
                  mdi-plus
                </v-icon>
              </v-btn>
            </span>
          </v-card-title>
          <AdminTable
            :headers="roomsTableHeaders"
            :items="roomTypeForm.rooms"
            @delete-item="removeRoom"
          />
        </v-card>
      </v-form>
    </v-card-text>
    <v-card-actions
      v-if="!isFullScreen"
      class="justify-space-between"
    >
      <v-btn
        color="error"
        @click="closeDialog"
      >
        close
      </v-btn>
      <v-btn
        color="success"
        @click="submitDialog"
      >
        {{ $t('form.submit') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import AdminTable from '@/components/admin/table/AdminTable';
import form from '@/mixins/form';
import eventBus from '@/plugins/eventBus';
import { useHotelGroupStore } from '@/store/hotelGroup';
import { useRoomTypeStore } from '@/store/roomType';
import { mapActions, mapState } from 'pinia';

export default {
  name: 'RoomTypeFormDialog',
  components: { AdminTable },
  mixins: [ form ],
  props: {
    data: {
      type: Object,
      default: () => undefined,
    },
    isFullScreen: {
      type: Boolean,
      default: () => false,
    },
  },
  data () {
    return {
      roomTypeForm: {
        name: undefined,
        description: undefined,
        hotelId: this.data.hotelId,
        rooms: [],
      },
      roomsTableHeaders: [
        { title: this.$t('table.name'), key: 'inputText', value: 'name', required: true },
        { title: this.$t('table.actions'), key: 'actions-1', fixed: true, align: 'start', width: 10 },
      ]
    };
  },
  computed: {
    ...mapState(useRoomTypeStore, [ 'roomTypeDetail' ]),
  },
  async created () {
    if (this.data.roomTypeId) {
      await this.getRoomTypeById(this.data.roomTypeId, true);
      this.fillForm();
    }
  },
  methods: {
    ...mapActions(useRoomTypeStore, [ 'getRoomTypeById', 'upsertRoomType' ]),
    ...mapActions(useHotelGroupStore, [ 'getActiveOrganizationHotels' ]),
    fillForm () {
      this.roomTypeForm = { ...this.roomTypeDetail };
    },
    closeDialog () {
      eventBus.$emit('CLOSE_DIALOG');
    },
    async submitDialog () {
      const { valid } = await this.$refs.form.validate();
      if (valid) {
        await this.upsertRoomType(this.roomTypeForm);
        await this.getActiveOrganizationHotels(true);
        eventBus.$emit('CLOSE_DIALOG');
      }
    },
    addRoom () {
      this.roomTypeForm.rooms.push({
        name: this.roomTypeForm.name,
      });
    },
    async removeRoom (room) {
      const roomIndex = this.roomTypeForm.rooms.indexOf(room);
      this.roomTypeForm.rooms.splice(roomIndex, 1);
    },
  }
};
</script>

<style scoped>

</style>

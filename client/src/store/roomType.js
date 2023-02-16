import { defineStore } from 'pinia';
import RestService from '@/service';
import router from '@/router';
import { toast } from '@/composables/sweetalert';
import { i18n } from '@/plugins/i18n';

const service = new RestService({ namespace: '/room-types' });

export const useRoomTypeStore = defineStore('roomType', {
  state () {
    return {
      roomTypeFetching: false,
      roomTypeDetail: undefined,
      roomTypes: [],
    };
  },
  actions: {
    async getRoomTypes () {
      try {
        this.roomTypeFetching = true;
        const { data } = await service.request({
          method: 'get',
        });
        this.roomTypes = data;
      } catch (err) {
        await service.manageError(err);
      } finally {
        this.roomTypeFetching = false;
      }
    },
    async getRoomTypeById (roomTypeId, isFull) {
      try {
        this.roomTypeFetching = true;
        const { data } = await service.request({
          url: `/${roomTypeId}`,
          method: 'get',
          params: {
            full: isFull,
          },
        });
        this.roomTypeDetail = data;
      } catch (err) {
        await service.manageError(err);
      } finally {
        this.roomTypeFetching = false;
      }
    },
    async upsertRoomType (roomType) {
      try {
        this.roomTypeFetching = true;
        const method = roomType._id ? 'put' : 'post';
        const { data } = await service.request({
          url: roomType._id && `/${roomType._id}`,
          method,
          data: roomType,
        });
        toast.fire({
          title: method === 'put' ? i18n.t('roomType.updated') : i18n.t('roomType.created'),
          icon: 'success',
        });
        this.roomTypeDetail = data;
      } catch (err) {
        await service.manageError(err);
      } finally {
        this.roomTypeFetching = false;
      }
    },
    async deleteRoomTypeById (roomTypeId) {
      try {
        this.roomTypeFetching = true;
        await service.request({
          url: `/${roomTypeId}`,
          method: 'delete',
        });
        toast.fire({
          title: i18n.t('roomType.deleted'),
          icon: 'success',
        });
        this.roomTypes = this.roomTypes.filter(roomType => roomType._id !== roomTypeId);
      } catch (err) {
        await service.manageError(err);
      } finally {
        this.roomTypeFetching = false;
      }
    },
  }
});

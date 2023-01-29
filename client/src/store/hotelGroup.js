import { defineStore } from 'pinia';
import RestService from '@/service';
import router from '@/router';
import { toast } from '@/composables/sweetalert';
import { i18n } from '@/plugins/i18n';

const service = new RestService({ namespace: '/hotel-groups' });

export const useHotelGroupStore = defineStore('hotelGroup', {
  state () {
    return {
      hotelGroupFetching: false,
      hotelGroupDetail: undefined,
      hotelGroups: [],
    };
  },
  actions: {
    async getHotelGroups () {
      try {
        this.hotelGroupFetching = true;
        const { data } = await service.request({
          method: 'get',
        });
        this.hotelGroups = data;
      } catch (err) {
        await service.manageError(err);
      } finally {
        this.hotelGroupFetching = false;
      }
    },
    async getHotelGroupById (hotelGroupId) {
      try {
        this.hotelGroupFetching = true;
        const { data } = await service.request({
          url: `/${hotelGroupId}`,
          method: 'get',
        });
        this.hotelGroupDetail = data;
      } catch (err) {
        await service.manageError(err);
      } finally {
        this.hotelGroupFetching = false;
      }
    },
    async upsertHotelGroup (hotelGroup) {
      try {
        this.hotelGroupFetching = true;
        const method = hotelGroup._id ? 'put' : 'post';
        const { data } = await service.request({
          url: hotelGroup._id && `/${hotelGroup._id}`,
          method,
          data: hotelGroup,
        });
        toast.fire({
          title: method === 'put' ? i18n.t('hotelGroup.updated') : i18n.t('hotelGroup.created'),
          icon: 'success',
        });
        this.hotelGroupDetail = data;
      } catch (err) {
        await service.manageError(err);
      } finally {
        this.hotelGroupFetching = false;
      }
    },
    async deleteHotelGroupById (hotelGroupId) {
      try {
        this.hotelGroupFetching = true;
        await service.request({
          url: `/${hotelGroupId}`,
          method: 'delete',
        });
        toast.fire({
          title: i18n.t('hotelGroup.deleted'),
          icon: 'success',
        });
        this.hotelGroups = this.hotelGroups.filter(hotelGroup => hotelGroup._id !== hotelGroupId);
      } catch (err) {
        await service.manageError(err);
      } finally {
        this.hotelGroupFetching = false;
      }
    },
    async addUserToHotelGroup ({ hotelGroupId, userId }) {
      try {
        this.hotelGroupFetching = true;
        const { data } = await service.request({
          url: `/${hotelGroupId}/user/${userId}`,
          method: 'post',
        });
        toast.fire({
          title: i18n.t('hotelGroup.user.added'),
          icon: 'success',
        });
      } catch (err) {
        await service.manageError(err);
      } finally {
        this.hotelGroupFetching = false;
      }
    },
  }
});

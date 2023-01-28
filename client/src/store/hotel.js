import { defineStore } from 'pinia';
import RestService from '@/service';
import router from '@/router';
import { toast } from '@/composables/sweetalert';
import { i18n } from '@/plugins/i18n';

const service = new RestService({ namespace: '/hotels' });

export const useHotelStore = defineStore('hotel', {
  state () {
    return {
      hotelFetching: false,
      hotelDetail: undefined,
      hotels: [],
    };
  },
  actions: {
    async getHotels () {
      try {
        this.hotelFetching = true;
        const { data } = await service.request({
          method: 'get',
        });
        this.hotels = data;
      } catch (err) {
        await service.manageError(err);
      } finally {
        this.hotelFetching = false;
      }
    },
    async getHotelById (hotelId) {
      try {
        this.hotelFetching = true;
        const { data } = await service.request({
          url: `/${hotelId}`,
          method: 'get',
        });
        this.hotelDetail = data;
      } catch (err) {
        await service.manageError(err);
      } finally {
        this.hotelFetching = false;
      }
    },
    async upsertHotel (hotel) {
      try {
        this.hotelFetching = true;
        const method = hotel._id ? 'put' : 'post';
        const { data } = await service.request({
          url: hotel._id && `/${hotel._id}`,
          method,
          data: hotel,
        });
        toast.fire({
          title: method === 'put' ? i18n.t('hotel.updated') : i18n.t('hotel.created'),
          icon: 'success',
        });
        this.hotelDetail = data;
      } catch (err) {
        await service.manageError(err);
      } finally {
        this.hotelFetching = false;
      }
    },
    async deleteHotelById (hotelId) {
      try {
        this.hotelFetching = true;
        await service.request({
          url: `/${hotelId}`,
          method: 'delete',
        });
        toast.fire({
          title: i18n.t('hotel.deleted'),
          icon: 'success',
        });
        this.hotels = this.hotels.filter(hotel => hotel._id !== hotelId);
      } catch (err) {
        await service.manageError(err);
      } finally {
        this.hotelFetching = false;
      }
    },
  }
});

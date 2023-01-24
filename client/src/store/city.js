import { defineStore } from 'pinia';
import RestService from '@/service';
import router from '@/router';
import { toast } from '@/composables/sweetalert';
import { i18n } from '@/plugins/i18n';

const service = new RestService({ namespace: '/cities' });

export const useCityStore = defineStore('city', {
  state () {
    return {
      cityFetching: false,
      cityDetail: undefined,
      cities: [],
    };
  },
  actions: {
    async getCities () {
      try {
        this.cityFetching = true;
        const { data } = await service.request({
          method: 'get',
        });
        this.cities = data;
      } catch (err) {
        await service.manageError(err);
      } finally {
        this.cityFetching = false;
      }
    },
    async getCityById (cityId) {
      try {
        this.cityFetching = true;
        const { data } = await service.request({
          url: `/${cityId}`,
          method: 'get',
        });
        this.cityDetail = data;
      } catch (err) {
        await service.manageError(err);
      } finally {
        this.cityFetching = false;
      }
    },
    async upsertCity (city) {
      try {
        this.cityFetching = true;
        const method = city._id ? 'put' : 'post';
        const { data } = await service.request({
          url: city._id ?? `/${city._id}`,
          method,
          data: city,
        });
        toast.fire({
          title: method === 'put' ? i18n.t('city.updated') : i18n.t('city.created'),
          icon: 'success',
        });
        this.cityDetail = data;
      } catch (err) {
        await service.manageError(err);
      } finally {
        this.cityFetching = false;
      }
    },
    async deleteCityById (cityId) {
      try {
        this.cityFetching = true;
        await service.request({
          url: `/${cityId}`,
          method: 'delete',
        });
        toast.fire({
          title: i18n.t('city.deleted'),
          icon: 'success',
        });
        this.cities = this.cities.filter(city => city._id !== cityId);
      } catch (err) {
        await service.manageError(err);
      } finally {
        this.cityFetching = false;
      }
    },
  }
});

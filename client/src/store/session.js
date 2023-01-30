import { defineStore } from 'pinia';
import RestService from '@/service';
import router from '@/router';
import { toast } from '@/composables/sweetalert';
import { i18n } from '@/plugins/i18n';
import { useUserStore } from './user';
import ls from '@/composables/localStorage';
import asymmetricEncrypt from '@/composables/encrypt';

const service = new RestService({ namespace: '/session' });

export const useSessionStore = defineStore('session', {
  state () {
    return {
      sessionFetching: false,
      session: undefined,
      me: undefined,
      activeOrganizationId: undefined,
    };
  },
  actions: {
    async login ({ email, password }, isAdmin) {
      try {
        this.sessionFetching = true;
        const { data } = await service.request({
          url: '/login',
          method: 'POST',
          data: {
            email,
            password: asymmetricEncrypt(password),
          }
        });
        ls.set('authenticated', data.authenticated);
        ls.set('isAdmin', isAdmin);
        if (isAdmin) {
          await router.push({ name: 'AdminHome' });
        } else {
          await router.push({ name: 'Home' });
        }
      } catch (err) {
        console.log(err);
        // await service.manageError(err);
      } finally {
        this.sessionFetching = false;
      }
    },
    async logout () {
      try {
        await service.request({
          url: '/logout',
          method: 'POST',
        });
        ls.set('authenticated', false);
        if (ls.get('isAdmin')) {
          await router.push({ name: 'AdminLogin' });
        } else {
          // TODO - user login
          await router.push({ name: 'AdminLogin' });
        }
      } catch (err) {
        await service.manageError(err);
      }
    },
    async register (newUser) {
      try {
        this.sessionFetching = true;
        const { data } = await service.request({
          url: '/admin/register',
          method: 'POST',
          data: {
            ...newUser,
            password: asymmetricEncrypt(newUser.password),
          },
        });
        toast.fire({
          title: i18n.t('admin.session.user.registered'),
          icon: 'success',
        });
        await router.push({ name: 'AdminLogin' });
      } catch (err) {
        await service.manageError(err);
      } finally {
        this.sessionFetching = false;
      }
    },
    setActiveOrganizationId (activeOrganizationId) {
      const orgId = activeOrganizationId || ls.get('activeOrganizationId');
      const existsOrg = orgId && !!this.me.hotelGroups?.find(hotelGroup => hotelGroup._id === orgId);
      if (existsOrg) {
        this.activeOrganizationId = orgId;
        ls.set('activeOrganizationId', orgId);
      } else {
        ls.set('activeOrganizationId', null);
      }
      if (!this.activeOrganizationId && this.me.hotelGroups?.length) {
        const firstHotelGroupId = this.me.hotelGroups.at(0)._id;
        ls.set('activeOrganizationId', firstHotelGroupId);
        this.activeOrganizationId = firstHotelGroupId;
      }
    },
    async getMe () {
      try {
        this.sessionFetching = true;
        const { data } = await service.request({
          url: '/me',
          method: 'GET',
        });
        this.me = data;
      } catch (err) {
        await service.manageError(err);
      } finally {
        this.sessionFetching = false;
      }
    },
    async getFullMe () {
      try {
        this.sessionFetching = true;
        const user = useUserStore();
        this.me = await user.getUserById(this.me?._id, true);
        this.setActiveOrganizationId();
      } catch (err) {
        await service.manageError(err);
      } finally {
        this.sessionFetching = false;
      }
    },
  }
});

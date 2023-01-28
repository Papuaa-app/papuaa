import { defineStore } from 'pinia';
import RestService from '@/service';
import router from '@/router';
import { toast } from '@/composables/sweetalert';
import { i18n } from '@/plugins/i18n';
// import asymmetricEncrypt from '@/composables/encrypt';
import { useUserStore } from './user';

const service = new RestService({ namespace: '/session' });

function setLocalStorage (key, value) {
  localStorage.setItem(key, value);
}

function getLocalStorage (key) {
  return parseInt(localStorage.getItem(key));
}

export const useSessionStore = defineStore('session', {
  state () {
    return {
      sessionFetching: false,
      session: undefined,
      me: 'asdf',
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
            password,
            // password: key.encrypt(password, 'base64', 'utf8'),
          }
        });
        setLocalStorage('authenticated', data.authenticated);
        setLocalStorage('isAdmin', isAdmin);
        if (isAdmin) {
          await router.push({ name: 'AdminHome' });
        } else {
          await router.push({ name: 'Home' });
        }
      } catch (err) {
        await service.manageError(err);
      } finally {
        this.sessionFetching = false;
      }
    },
    async logout () {
      try {
        console.log('logout');
        setLocalStorage('authenticated', false);
        if (getLocalStorage('isAdmin')) {
          await router.push({ name: 'AdminLogin' });
        } else {
          // TODO - user login
          await router.push({ name: 'AdminLogin' });
        }
        toast.fire({
          title: i18n.t('session.user.logout'),
          icon: 'success',
        });
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
            // TODO - ENCRYPTION
            // password: asymmetricEncrypt(newUser.password),
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
      } catch (err) {
        await service.manageError(err);
      } finally {
        this.sessionFetching = false;
      }
    },
  }
});

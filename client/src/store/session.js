import { defineStore } from 'pinia';
import RestService from '@/service';
import router from '@/router';
// import asymmetricEncrypt from '@/composables/encrypt';

const service = new RestService({ namespace: '/session' });

function setAuthenticated (authenticated) {
  localStorage.setItem('authenticated', authenticated);
}

export const useSessionStore = defineStore('session', {
  state () {
    return {
      sessionFetching: false,
      session: undefined,
      me: undefined,
    };
  },
  actions: {
    async login ({ email, password }) {
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
        setAuthenticated(data.authenticated);
        await router.push({ name: 'adminHome' });
      } catch (err) {
        console.log(err);
        await service.manageError(err);
      } finally {
        this.sessionFetching = false;
      }
    },
    async register (newUser) {
      try {
        this.sessionFetching = true;
        const { data } = await service.request({
          url: '/register',
          method: 'POST',
          data: {
            ...newUser,
            // TODO - ENCRYPTION
            // password: asymmetricEncrypt(newUser.password),
          }
        });
        console.log(data);
        await router.push({ name: 'adminLogin' });
      } catch (err) {
        console.log(err);
        await service.manageError(err);
      } finally {
        this.sessionFetching = false;
      }
    }
  }
});

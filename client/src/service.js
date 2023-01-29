import { useSessionStore } from '@/store/session';
import { i18n } from '@/plugins/i18n';
import Axios from 'axios';
import HttpStatusCodes from 'http-status-codes';
import config from '@/config';
import Swal from 'sweetalert2';
import router from '@/router';

export default class Service {

  constructor ({ baseUri, namespace }) {
    this.axios = Axios.create({
      baseURL: `${baseUri || config.baseUri}${namespace || ''}`,
      responseType: 'json',
      withCredentials: true,
    });

    this.axios.interceptors.response.use(response => response,
      async err => {
        if (err && err.response && err.response.status === HttpStatusCodes.UNAUTHORIZED) {
          if (router.currentRoute.path !== '/login') {
            await Swal.fire({
              title: i18n.t('session.expired'),
              text: i18n.t('session.loginAgain'),
              icon: 'warning',
            });
            const store = useSessionStore();
            await store.logout();
          }
        }
        return Promise.reject(err);
      });
  }

  async request ({ url, method, params, data }) {
    try {
      const response = await this.axios.request({ url, method, data, params });
      return response.data;
    } catch (err) {
      console.log('error', err);
      // Vue.$log.error('Error in request', err);
      throw err.response;
    }
  }

  async uploadFiles ({ url, method, params, data }) {
    try {
      const bodyFormData = new FormData();
      // Vue.$log.debug('Files to upload', bodyFormData);
      console.log('Files to upload', bodyFormData);
      for (const key of Object.keys(data)) {
        bodyFormData.append(key, data[key]);
      }
      const response = await this.axios.request({
        url,
        method,
        data: bodyFormData,
        params,
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data;
    } catch (err) {
      console.log('error', err);
      // Vue.$log.error('Error in request', err);
      throw err.response;
    }
  }

  async internalDownload (action, params, fileName, method) {
    try {
      const response = await this.axios.request(action, {
        method: method || 'post',
        data: params,
        responseType: 'blob'
      });
      const url = window.URL.createObjectURL(new Blob([ response.data ]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      // Vue.$log.error('Error in request', err);
      throw err.response;
    }
  }

  async externalDownload (url, fileName) {
    try {
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      link.target = '_blank';
      link.dispatchEvent(new MouseEvent('click'));
    } catch (err) {
      // Vue.$log.error('Error in request', err);
      throw err.response;
    }
  }

  async manageError (err) {
    // Vue.$log.error('Managing error', err);
    const { data, status, config, request } = err;
    const statusCodesWithoutErrorModal = [
      HttpStatusCodes.UNAUTHORIZED,
      HttpStatusCodes.TOO_MANY_REQUESTS,
    ];
    if (!statusCodesWithoutErrorModal.includes(status) || err.config.url.includes('login')) {
      const errors = data && data.data;
      await Swal.fire({
        html:
          `<img class="error-img" src="img/error.png">` +
          `<h3>${'titleError'}</h3>` +
          (errors && errors.length ? `<div>${errors.map(error => `<div class="alert alert-danger" role="alert">${error.param ? `${error.param} -` : ''} ${error.i18nKey || error.msg}</div>`)}</div>` : '') +
          `<p>${'informYourAdmin'}<p>` +
          `<div class="text--secondary alert-show-more" style="font-size: .6em"><div>${data.traceId}</div>` +
          `<div>${request.responseURL}</div></div>`,
      });
    }
  }

}

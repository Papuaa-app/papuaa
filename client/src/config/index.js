'use strict';

window.__ENV__ = {
  NODE_ENV: 'local',
  LOG_LEVEL: 'debug',
  BASE_URI: '/api/v1',
  API_SERVER_PORT: '8080',
  API_SERVER_PROTOCOL: 'http',
  API_SERVER_HOSTNAME: 'localhost',
  PUBLIC_KEY: undefined,
};

const apiServerPort = window.__ENV__.API_SERVER_PORT || process.env.API_SERVER_PORT;
const apiServerHostname = window.__ENV__.API_SERVER_HOSTNAME || process.env.API_SERVER_HOSTNAME;
const apiProtocol = window.__ENV__.API_SERVER_PROTOCOL || process.env.API_SERVER_PROTOCOL;

export default {
  baseUri: `${apiProtocol}://${apiServerHostname}${apiServerPort && `:${apiServerPort}`}${window.__ENV__.BASE_URI || process.env.BASE_URI}`,
  publicKey: '-----BEGIN PUBLIC KEY-----\nMIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgH9VFub0xGg7Br9On4jaIAyjNhxX\nZoP7lLA+QXeFFIaMhRYWRw5bPKRLNTtr3/ERYvcylNnS4EkSHln1ZvU4RLbXnPm7\nETd+c3xpNG4q+t2vlkU3GIIsD5P7ltaOqddeozGwBrph5AaBvE0klb1REfm+EtCC\n6Ymo3XcWKU2ra20NAgMBAAE=\n-----END PUBLIC KEY-----'
};

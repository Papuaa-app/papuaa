'use strict';

window.__ENV__ = {};

module.exports = {
  environment: window.__ENV__.NODE_ENV || process.env.NODE_ENV,
  baseUri: window.__ENV__.BASE_URI || process.env.BASE_URI,
  publicKey: window.__ENV__.PUBLIC_KEY || process.env.PUBLIC_KEY,
  googleAuth: {
    clientId: window.__ENV__.GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID,
    scope: window.__ENV__.GOOGLE_SCOPE || process.env.GOOGLE_SCOPE,
    prompt: window.__ENV__.GOOGLE_PROMPT || process.env.GOOGLE_PROMPT,
    domain: window.__ENV__.GOOGLE_DOMAIN || process.env.GOOGLE_DOMAIN,
  },
  instance: {
    logoPath: window.__ENV__.LOGO_PATH || process.env.LOGO_PATH,
    logoTitle: window.__ENV__.LOGO_TITLE || process.env.LOGO_TITLE,
    name: window.__ENV__.INSTANCE_NAME || process.env.INSTANCE_NAME,
  },
  maxFileSize: parseFloat(window.__ENV__.MAX_FILE_SIZE || process.env.MAX_FILE_SIZE),
  logger: {
    logLevel: window.__ENV__.LOG_LEVEL || process.env.LOG_LEVEL,
  },
};

'use strict';

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  googleAuth: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    translationApiKey: process.env.GOOGLE_TRANSLATION_API_KEY,
    domain: process.env.GOOGLE_EMAIL_DOMAIN,
  },
  security: {
    privateKey: process.env.PRIVATE_KEY,
    publicKey: process.env.PUBLIC_KEY,
    salt: process.env.SALT,
    expirationTime: parseInt(process.env.EXPIRATION_TIME),
    algorithm: 'RS512',
    cookieSessionSecure: process.env.COOKIE_SESSION_SECURE && JSON.parse(process.env.COOKIE_SESSION_SECURE),
    otpMinutesExpiration: parseInt(process.env.OTP_MINUTES_EXPIRATION),
    minutesUntilMaxRequestsAreRefreshed: parseInt(process.env.MINUTES_UNTIL_MAX_REQUESTS_ARE_REFRESHED),
    maxRequestsAllowed: parseInt(process.env.MAX_REQUESTS_ALLOWED),
  },
  spacesConfig: {
    endpoint: process.env.S3_ENDPOINT,
    region: process.env.S3_REGION,
    bucket: process.env.S3_BUCKET,
    projectPath: process.env.S3_PROJECTPATH,
    expireTime: parseInt(process.env.S3_EXPIRATION_TIME),
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT),
    user: process.env.REDIS_USER || undefined,
    pass: process.env.REDIS_PASSWORD || undefined,
    db: (process.env.REDIS_DB && parseInt(process.env.REDIS_DB)) || undefined,
    url: process.env.REDIS_URL || undefined
  },
  db: {
    host: process.env.DB_HOST,
    names: process.env.DB_NAMES && JSON.parse(process.env.DB_NAMES),
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    dialect: 'mysql',
    slaves: process.env.DB_SLAVES && JSON.parse(process.env.DB_SLAVES),
    define: {
      defaultScope: {
        attributes: {
          exclude: [ 'createdAt', 'updatedAt' ]
        }
      }
    }
  },
  mailer: {
    user: process.env.MAILER_USER,
    pass: process.env.MAILER_PASS
  },
  defaultLanguage: 'es',
  publicEndpoints: [
    // { method: 'post', url: '/api/session/forgot-password' },
  ],
  allowedEndpoints: [
    // { method: 'post', url: '/api/session/forgot-password' },
  ],
  imageMimeTypesAllowed: [
    'image/jpeg',
    'image/png',
  ],
  resourceMimeTypesAllowed: [
    'application/pdf',
    'image/jpeg',
    'image/png',
  ],
  logs: {
    level: process.env.LOG_LEVEL,
    logPath: process.env.LOG_PATH,
    graylogEnabled: process.env.GRAYLOG_ENABLED && JSON.parse(process.env.GRAYLOG_ENABLED),
    graylog: {
      enabled: process.env.GRAYLOG_ENABLED && JSON.parse(process.env.GRAYLOG_ENABLED),
      host: process.env.GRAYLOG_HOST,
      port: process.env.GRAYLOG_PORT,
      facility: process.env.GRAYLOG_FACILITY,
      level: process.env.GRAYLOG_LEVEL,
    }
  },
};

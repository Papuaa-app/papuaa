'use strict';

const config = require('./config');
const handlebars = require('./utils/handlebars');
const responses = require('./responses');
const logger = require('./logger');
const DBConnector = require('./dbConnector');

const awilix = require('awilix');
const httpContext = require('express-http-context');
const fs = require('fs');
const ipLocation = require('geoip-lite');
const path = require('path');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const HttpStatusCodes = require('http-status-codes');
const Redis = require('ioredis');
const redisClient = new Redis(({
  host: config.redis.host,
  port: config.redis.port,
  password: config.redis.pass,
  db: config.redis.db,
}));
const RedisJson = require('redis-json');
const cache = new RedisJson(redisClient);
const moment = require('moment');
const { google } = require('googleapis');
const jwt = require('jsonwebtoken');
const RSA = require('node-rsa');
const axios = require('axios');
// const AWS = require('aws-sdk');
// const spacesEndpoint = new AWS.Endpoint(`${config.spacesConfig.region}.${config.spacesConfig.endpoint}`);
// const S3 = new AWS.S3({
//   endpoint: spacesEndpoint,
//   accessKeyId: config.spacesConfig.accessKeyId,
//   secretAccessKey: config.spacesConfig.secretAccessKey,
// });

const { createContainer, asValue, asFunction, Lifetime } = awilix;
const container = createContainer();

container.register({

  httpStatusCodes: asValue(HttpStatusCodes),
  httpContext: asValue(httpContext),
  fs: asValue(fs),
  ipLocation: asValue(ipLocation),
  handlebars: asValue(handlebars),
  smtpTransport: asValue(smtpTransport),
  path: asValue(path),
  nodemailer: asValue(nodemailer),
  moment: asValue(moment),
  redisClient: asValue(redisClient),
  cache: asValue(cache),
  // s3: asValue(S3),
  logger: asValue(logger),
  crypto: asValue(crypto),
  axios: asValue(axios),
  jwt: asValue(jwt),
  RSA: asValue(RSA),
  config: asValue(config),
  responses: asValue(responses),
  google: asValue(google),
  dbConnector: asFunction(DBConnector).singleton(),

});

container.loadModules([
  './../api/tools/**/*.js',
  './../api/controllers/**/*.js',
  './../api/services/**/*.js',
  './../api/repositories/**/*.js',
  './../api/dao/**/*.js',
], {
  formatName: 'camelCase',
  cwd: __dirname,
  resolverOptions: {
    lifetime: Lifetime.SINGLETON,
    register: asFunction
  }
});

module.exports = container;

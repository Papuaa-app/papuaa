'use strict';

require('dotenv').config();
const config = require('./config');
const container = require('./boot');
const logger = require('./logger');
const loggerMiddleware = require('./middlewares/logger');
const tracking = require('./middlewares/tracking');
const { isAuthenticated, isGranted } = require('./middlewares/auth');
const systemInfo = require('./utils/sysinfo');

const fs = require('fs');
const path = require('path');
const userAgent = require('express-useragent');
const cookieParser = require('cookie-parser');
const httpContext = require('express-http-context');
const helmet = require('helmet');
const helmetCrossDomain = require('helmet-crossdomain');
const compression = require('compression');
const express = require('express');
const rateLimit = require('express-rate-limit');
const fileUpload = require('express-fileupload');
const { scopePerRequest, loadControllers } = require('awilix-express');
const bodyParser = require('body-parser');

function initHelmetHeaders (app) {
  try {
    app.use(helmet());
    app.use(helmetCrossDomain());
  } catch (err) {
    logger.error(`HELMETS LOAD ERROR: ${err}`);
  }
}

function loadAPI (app) {
  try {
    app.use(scopePerRequest(container));
    app.use(loggerMiddleware.init);
    app.use(isAuthenticated);
    app.use(isGranted);
    app.use(loadControllers('./../api/controllers/**/*.js', { cwd: __dirname }));
    app.use(loggerMiddleware.end);
  } catch (err) {
    logger.error(`API LOAD ERROR: ${err}`);
  }
}

function initMiddleware (app) {
  try {
    app.set('trust proxy', config.env === 'local' ? false : 1);
    app.use(rateLimit({
      windowMs: config.security.minutesUntilMaxRequestsAreRefreshed * 60 * 1000,
      max: config.security.maxRequestsAllowed
    }));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json({ limit: '1000kb' }));
    app.set('json replacer', (k, v) => (v === null ? undefined : v));
    app.use(fileUpload({ limits: { fileSize: 5e6 } }));
    app.use(cookieParser());
    app.use(userAgent.express());
    app.use(httpContext.middleware);
    loadAPI(app);
    app.use(tracking);
  } catch (err) {
    logger.error(`MIDDLEWARES LOAD ERROR: ${err}`);
  }
}

async function startApp (app) {
  try {
    const { dbConnector, redisClient } = container.cradle;
    redisClient.on('error', (err) => logger.error('Redis error', err));
    // await redisClient.auth(config.redis.pass);
    await dbConnector.connect();
    return app.listen(config.port, () => Promise.resolve());
  } catch (err) {
    logger.error(`STARTING APP ERROR: ${err}`);
    await startApp(app);
  }
}

(async () => {
  try {
    const app = express();
    initHelmetHeaders(app);
    initMiddleware(app);
    await startApp(app);
    systemInfo();
    logger.info(`Environment: ${config.env}`);
    logger.info(`Port: ${config.port}`);
    logger.info(`Server started at ${new Date().toISOString()}`);
  } catch (err) {
    logger.error(err);
  }
})();

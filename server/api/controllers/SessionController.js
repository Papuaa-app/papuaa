'use strict';

const { createController } = require('awilix-express');
const {
  loginValidator,
  forgotPasswordValidator,
  forgotPasswordAcceptValidator,
} = require('../validators/SessionValidator');

function SessionController (deps) {

  const {
    httpStatusCodes,
    logger,
    config,
    cache,
    responses,
    sessionService,
  } = deps;

  function cookieOptions (httpOnly) {
    return {
      maxAge: config.security.expirationTime * 1000,
      secure: config.security.cookieSessionSecure,
      httpOnly,
    };
  }

  return {

    async login (req, res, next) {
      try {
        const { email, password } = req.body;
        const { accessToken, tokenType, user } = await sessionService.login({ email, password });
        res.cookie('authorization', `${tokenType} ${accessToken}`, cookieOptions(true));
        res.cookie('authenticated', true, cookieOptions(false));
        res.status(httpStatusCodes.OK).json(responses());
        // trackingService.track({ employee, req, trackingInfo: [ { kpiId: 2 }, { kpiId: 1002 } ] });
      } catch (err) {
        logger.error('login', err);
        const { statusCode = httpStatusCodes.INTERNAL_SERVER_ERROR, data } = err;
        res.status(statusCode).json(responses(data));
        // trackingService.track({
        //   employee: null,
        //   req,
        //   trackingInfo: [
        //     {
        //       kpiId: 50002,
        //       description: `Error de local login al usuario ${req.body.email}`,
        //     }, {
        //       kpiId: 51002,
        //       description: `Error de local login al usuario ${req.body.email}`,
        //     }
        //   ]
        // });
      } finally {
        next();
      }
    },

  };

}

module.exports = createController(SessionController)
  .prefix('/session')
  .post('/login', 'login', { before: [ loginValidator ] });

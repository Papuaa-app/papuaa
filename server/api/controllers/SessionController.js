'use strict';

const { createController } = require('awilix-express');
const {
  loginValidator,
} = require('../validators/SessionValidator');

class SessionController {

  constructor (deps) {
    this.httpStatusCodes = deps.httpStatusCodes;
    this.logger = deps.logger;
    this.config = deps.config;
    this.responses = deps.responses;
    this.sessionService = deps.sessionService;
  }

  _cookieOptions (httpOnly) {
    return {
      maxAge: this.config.security.expirationTime * 1000,
      secure: this.config.security.cookieSessionSecure,
      httpOnly,
    };
  }

  async login (req, res, next) {
    try {
      const { email, password } = req.body;
      const { accessToken, tokenType, user } = await this.sessionService.login({ email, password });
      res.cookie('authorization', `${tokenType} ${accessToken}`, this._cookieOptions(true));
      res.cookie('authenticated', true, this._cookieOptions(false));
      res.status(this.httpStatusCodes.OK).json(this.responses());
      // trackingService.track({ employee, req, trackingInfo: [ { kpiId: 2 }, { kpiId: 1002 } ] });
    } catch (err) {
      this.logger.error('login', err);
      const { statusCode = this.httpStatusCodes.INTERNAL_SERVER_ERROR, data } = err;
      res.status(statusCode).json(this.responses(data));
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
  }

}

export default createController(SessionController)
  .prefix('/session')
  .post('/login', 'login', { before: [ loginValidator ] });

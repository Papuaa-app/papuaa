'use strict';

const { createController } = require('awilix-express');
const {
  loginValidator,
  registerValidator,
} = require('../validators/SessionValidator');

class SessionController {

  constructor (deps) {
    this.httpStatusCodes = deps.httpStatusCodes;
    this.logger = deps.logger;
    this.config = deps.config;
    this.responses = deps.responses;
    this.sessionService = deps.sessionService;
    this.responses = deps.responses;
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
      res.status(this.httpStatusCodes.OK).json(this.responses({ authenticated: true }));
      // TODO
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
      //       description: `Error de local register al usuario ${req.body.email}`,
      //     }, {
      //       kpiId: 51002,
      //       description: `Error de local register al usuario ${req.body.email}`,
      //     }
      //   ]
      // });
    } finally {
      next();
    }
  }

  async register (req, res, next) {
    try {
      const newUser = req.body;
      await this.sessionService.register(newUser);
      res.status(this.httpStatusCodes.OK).json(this.responses());
      // TODO
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
      //       description: `Error de local register al usuario ${req.body.email}`,
      //     }, {
      //       kpiId: 51002,
      //       description: `Error de local register al usuario ${req.body.email}`,
      //     }
      //   ]
      // });
    } finally {
      next();
    }
  }

  async adminRegister (req, res, next) {
    try {
      const newUser = req.body;
      await this.sessionService.register(newUser, true);
      res.status(this.httpStatusCodes.OK).json(this.responses());
      // TODO
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
      //       description: `Error de local register al usuario ${req.body.email}`,
      //     }, {
      //       kpiId: 51002,
      //       description: `Error de local register al usuario ${req.body.email}`,
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
  .post('/login', 'login', { before: [ loginValidator ] })
  .post('/register', 'register', { before: [ registerValidator ] })
  .post('/admin/register', 'adminRegister', { before: [ registerValidator ] });

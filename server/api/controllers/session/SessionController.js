'use strict';

import { requestEntity } from '../../../core/utils/formatter';

const { createController } = require('awilix-express');
const {
  loginValidator,
  registerValidator,
} = require('../../validators/session/SessionValidator');

class SessionController {

  constructor (deps) {
    this.httpStatusCodes = deps.httpStatusCodes;
    this.logger = deps.logger;
    this.config = deps.config;
    this.responses = deps.responses;
    this.sessionService = deps.sessionService;
    this.formatter = deps.formatter;
  }

  _cookieOptions () {
    return {
      maxAge: this.config.security.expirationTime * 1000,
      secure: this.config.security.cookieSessionSecure,
      httpOnly: true,
      sameSite: this.config.cors.sameSite ? 'lax' : 'none',
    };
  }

  async login (req, res, next) {
    try {
      const { email, password } = req.body;
      const { accessToken, tokenType } = await this.sessionService.login({ email, password });
      res.cookie('authorization', `${tokenType} ${accessToken}`, this._cookieOptions());
      res.status(this.httpStatusCodes.OK).json(this.responses({ authenticated: true }, this.formatter.requestEntity(req)));
      // TODO
      // trackingService.track({ user, req, trackingInfo: [ { kpiId: 2 }, { kpiId: 1002 } ] });
    } catch (err) {
      this.logger.error('login', err);
      const { statusCode = this.httpStatusCodes.INTERNAL_SERVER_ERROR, data } = err;
      res.status(statusCode).json(this.responses(data, this.formatter.requestEntity(req)));
      // trackingService.track({
      //   user: null,
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

  async logout (req, res, next) {
    try {
      // const { user } = req.container.cradle;
      // const googleTokens = await cache.get(`${user.email}-google-tokens`);
      // if (googleTokens) {
      //   await cache.del(`${user.email}-google-tokens`);
      // }
      res.cookie('authorization', false, {
        maxAge: 0,
        httpOnly: true,
        secure: this.config.security.cookieSessionSecure,
      });
      res.status(this.httpStatusCodes.OK).json(this.responses(undefined, this.formatter.requestEntity(req)));
      // trackingService.track({ user, req, trackingInfo: { kpiId: 11 } });
    } catch (err) {
      this.logger.error('logout', err);
      const { statusCode = this.httpStatusCodes.INTERNAL_SERVER_ERROR, data } = err;
      res.status(statusCode).json(this.responses(data, this.formatter.requestEntity(req)));
    } finally {
      next();
    }
  }

  async register (req, res, next) {
    try {
      const newUser = req.body;
      await this.sessionService.register(newUser, false);
      res.status(this.httpStatusCodes.OK).json(this.responses(undefined, this.formatter.requestEntity(req)));
      // TODO
      // trackingService.track({ user, req, trackingInfo: [ { kpiId: 2 }, { kpiId: 1002 } ] });
    } catch (err) {
      this.logger.error('register', err);
      const { statusCode = this.httpStatusCodes.INTERNAL_SERVER_ERROR, data } = err;
      res.status(statusCode).json(this.responses(data, this.formatter.requestEntity(req)));
      // trackingService.track({
      //   user: null,
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
      res.status(this.httpStatusCodes.OK).json(this.responses(undefined, this.formatter.requestEntity(req)));
      // TODO
      // trackingService.track({ user, req, trackingInfo: [ { kpiId: 2 }, { kpiId: 1002 } ] });
    } catch (err) {
      this.logger.error('login', err);
      const { statusCode = this.httpStatusCodes.INTERNAL_SERVER_ERROR, data } = err;
      res.status(statusCode).json(this.responses(data, this.formatter.requestEntity(req)));
      // trackingService.track({
      //   user: null,
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

  async getMe (req, res, next) {
    const { user } = req.container.cradle;
    res.status(this.httpStatusCodes.OK).json(this.responses(user, this.formatter.requestEntity(req)));
    next();
  }

}

export default createController(SessionController)
  .prefix('/session')
  .post('/login', 'login', { before: [ loginValidator ] })
  .post('/logout', 'logout')
  .post('/register', 'register', { before: [ registerValidator ] })
  .post('/admin/register', 'adminRegister', { before: [ registerValidator ] })
  .get('/me', 'getMe');

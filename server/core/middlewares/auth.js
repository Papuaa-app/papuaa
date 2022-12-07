'use strict';

const jwt = require('jsonwebtoken');
const httpStatusCodes = require('http-status-codes');
const { asValue } = require('awilix');
const config = require('./../config');
const logger = require('./../logger');

function areUrlsEquals (urlDB, urlController) {
  const urlDBWithoutParams = urlDB.split('?')[0];
  const urlControllerWithoutParams = urlController.split('?')[0];
  if (urlDBWithoutParams === urlControllerWithoutParams) {
    return true;
  } else if (urlDB.includes('*')) {
    const urlDBSplit = urlDBWithoutParams.split('/');
    const urlControllerSplit = urlControllerWithoutParams.split('/');
    if (urlDBSplit.length !== urlControllerSplit.length) {
      return false;
    }
    for (const index in urlDBSplit) {
      if (urlDBSplit[index] !== '*' && urlDBSplit[index] !== urlControllerSplit[index]) {
        return false;
      }
    }
    return true;
  } else {
    return false;
  }
}

function endpointExistsByRequest (endpointList, req) {
  return endpointList.find(({ method, url }) =>
    method.toUpperCase() === req.method.toUpperCase() &&
        areUrlsEquals(url, req.url));
}

module.exports = {
  checkRoles: (roles) => {
    return (req, res, next) => {
      const { trackingService, httpContext } = req.container.cradle;
      const user = httpContext.get('user');
      if (user.profile.roles.find(role => roles.includes(role.name))) {
        next();
      } else {
        const { responses } = require('./../boot').cradle;
        res.status(httpStatusCodes.FORBIDDEN).json(responses());
        req.path.includes('/api/') && trackingService.track({
          user,
          req,
          trackingInfo: {
            kpiId: 51004,
            description: `Error accediendo al path ${req.path} con method ${req.method} y roles ${user.roleIds}`
          }
        });
      }
    };
  },
  isAuthenticated: async (req, res, next) => {
    const { userService, trackingService, cache, httpContext } = req.container.cradle;
    try {
      if (!endpointExistsByRequest(config.publicEndpoints, req)) {
        const { authorization } = req.cookies;
        const {
          user,
          thirdParty
        } = jwt.verify(authorization && authorization.replace('Bearer ', ''), config.security.publicKey, { algorithms: [ 'RS512' ] });
        if (thirdParty) {
          throw new Error(`This token only can be used by third parties for ${user.email}`);
        }
        const googleTokens = await cache.get(`${user.email}-google-tokens`);
        if (user.email.includes(config.googleAuth.domain) && !googleTokens) {
          throw new Error(`Google token doesn\'t exists for ${user.email}. Please login again!`);
        }
        const userDB = await userService.getEmployeeByFiltersForSession({ email: user.email });
        req.container.register({ user: asValue(userDB) });
        httpContext.set('user', userDB);
      }
      next();
    } catch (err) {
      logger.error(err);
      const { responses } = require('./../boot').cradle;
      res.status(httpStatusCodes.UNAUTHORIZED).json(responses());
      // TODO
      // req.path.includes('/api/') && trackingService.track({
      //   user: null,
      //   req,
      //   trackingInfo: {
      //     kpiId: 51003,
      //     description: err.message,
      //   }
      // });
    }
  },
  isGranted: async (req, res, next) => {
    const { endpointRepository, trackingService, httpContext } = req.container.cradle;
    try {
      if (endpointExistsByRequest(config.allowedEndpoints, req)) {
        next();
      } else {
        const user = httpContext.get('user');
        const endpoints = await endpointRepository.findEndpointsByRoleIds(user.roleIds);
        if (!endpointExistsByRequest(endpoints, req)) {
          throw new Error('Endpoint is not granted by roles');
        }
        next();
      }
    } catch (err) {
      logger.error(err);
      const { responses } = require('./../boot').cradle;
      res.status(httpStatusCodes.FORBIDDEN).json(responses());
      const user = httpContext.get('user');
      req.path.includes('/api/') && trackingService.track({
        user,
        req,
        trackingInfo: {
          kpiId: 51004,
          description: `Error accediendo al path ${req.path} con method ${req.method} y roles ${user.roleIds}`
        }
      });
    }
  }
};

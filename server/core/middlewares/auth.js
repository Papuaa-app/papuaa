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
      const employee = httpContext.get('employee');
      if (employee.profile.roles.find(role => roles.includes(role.name))) {
        next();
      } else {
        const { responses } = require('./../boot').cradle;
        res.status(httpStatusCodes.FORBIDDEN).json(responses());
        req.path.includes('/api/') && trackingService.track({
          employee,
          req,
          trackingInfo: {
            kpiId: 51004,
            description: `Error accediendo al path ${req.path} con method ${req.method} y roles ${employee.roleIds}`
          }
        });
      }
    };
  },
  isAuthenticated: async (req, res, next) => {
    const { employeeService, trackingService, cache, httpContext } = req.container.cradle;
    try {
      if (!endpointExistsByRequest(config.publicEndpoints, req)) {
        const { authorization } = req.cookies;
        const {
          employee,
          thirdParty
        } = jwt.verify(authorization && authorization.replace('Bearer ', ''), config.security.publicKey, { algorithms: [ 'RS512' ] });
        if (thirdParty) {
          throw new Error(`This token only can be used by third parties for ${employee.email}`);
        }
        const googleTokens = await cache.get(`${employee.email}-google-tokens`);
        if (employee.email.includes(config.googleAuth.domain) && !googleTokens) {
          throw new Error(`Google token doesn\'t exists for ${employee.email}. Please login again!`);
        }
        const employeeDB = await employeeService.getEmployeeByFiltersForSession({ email: employee.email });
        req.container.register({ employee: asValue(employeeDB) });
        httpContext.set('employee', employeeDB);
      }
      next();
    } catch (err) {
      logger.error(err);
      const { responses } = require('./../boot').cradle;
      res.status(httpStatusCodes.UNAUTHORIZED).json(responses());
      req.path.includes('/api/') && trackingService.track({
        employee: null,
        req,
        trackingInfo: {
          kpiId: 51003,
          description: err.message,
        }
      });
    }
  },
  isGranted: async (req, res, next) => {
    const { endpointRepository, trackingService, httpContext } = req.container.cradle;
    try {
      if (endpointExistsByRequest(config.allowedEndpoints, req)) {
        next();
      } else {
        const employee = httpContext.get('employee');
        const endpoints = await endpointRepository.findEndpointsByRoleIds(employee.roleIds);
        if (!endpointExistsByRequest(endpoints, req)) {
          throw new Error('Endpoint is not granted by roles');
        }
        next();
      }
    } catch (err) {
      logger.error(err);
      const { responses } = require('./../boot').cradle;
      res.status(httpStatusCodes.FORBIDDEN).json(responses());
      const employee = httpContext.get('employee');
      req.path.includes('/api/') && trackingService.track({
        employee,
        req,
        trackingInfo: {
          kpiId: 51004,
          description: `Error accediendo al path ${req.path} con method ${req.method} y roles ${employee.roleIds}`
        }
      });
    }
  }
};

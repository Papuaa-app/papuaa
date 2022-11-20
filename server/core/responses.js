'use strict';

const httpContext = require('express-http-context');

module.exports = (data) => ({
  traceId: httpContext.get('traceId'),
  data,
});
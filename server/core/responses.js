'use strict';

import httpContext from 'express-http-context';

export default function (data) {
  return {
    traceId: httpContext.get('traceId'),
    data, 
  };
}
'use strict';

import responses from '../../../core/responses';
const { validationResult } = require('express-validator');
const { StatusCodes } = require('http-status-codes');

module.exports = {
  coreValidator: (req, res, next) => {
    const errorValidation = validationResult(req);
    if (!errorValidation.isEmpty()) {
      const { errors } = errorValidation;
      return res.status(StatusCodes.BAD_REQUEST).json(responses(errors));
    } else {
      next();
    }
  },
};
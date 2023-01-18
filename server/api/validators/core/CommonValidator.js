'use strict';

const { param } = require('express-validator');
const { coreValidator, singleImageTypeFileValidator, singleResourceSizeFileValidator } = require('./CoreValidator');

module.exports = {
  paramIdValidator: [
    param('id').notEmpty().isInt().toInt(),
    coreValidator,
  ],
  resourceValidator: [
    singleImageTypeFileValidator(),
    singleResourceSizeFileValidator(),
    coreValidator,
  ],
};
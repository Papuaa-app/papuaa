'use strict';

const { body, param } = require('express-validator');
const { coreValidator } = require('../core/CoreValidator');

module.exports = {
  hotelGroupValidator: [
    body('name').notEmpty().isString(),
    body('description').optional({ nullable: true }).isString(),
    body('billing').notEmpty().isObject(),
    body('billing.holdingName').notEmpty().isString(),
    body('billing.address').notEmpty().isString(),
    body('billing.cityId').optional({ nullable: true }).isInt().toInt(),
    body('billing.taxId').optional({ nullable: true }).isString(),
    param('addSessionUser').optional({ nullable: true }).notEmpty().isInt(),
    coreValidator,
  ],
  hotelGroupUserValidator: [
    param('userId').notEmpty().isInt(),
    coreValidator,
  ],
};

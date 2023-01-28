'use strict';

const { body } = require('express-validator');
const { coreValidator } = require('../core/CoreValidator');

module.exports = {
  hotelValidator: [
    body('name').notEmpty().isString(),
    body('description').optional({ nullable: true }).isString(),
    body('cityId').notEmpty().isInt().toInt(),
    body('hotelGroupId').notEmpty().isInt().toInt(),
    coreValidator,
  ],
};

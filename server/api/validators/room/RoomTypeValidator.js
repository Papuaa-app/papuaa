'use strict';

const { body } = require('express-validator');
const { coreValidator } = require('../core/CoreValidator');

module.exports = {
  roomTypeValidator: [
    body('name').notEmpty().isString(),
    body('description').optional({ nullable: true }).isString(),
    body('hotelId').notEmpty().isInt().toInt(),
    coreValidator,
  ],
};

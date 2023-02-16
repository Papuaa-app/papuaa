'use strict';

const { body } = require('express-validator');
const { coreValidator } = require('../core/CoreValidator');

module.exports = {
  roomValidator: [
    body('name').notEmpty().isString(),
    body('description').optional({ nullable: true }).isString(),
    body('roomTypeId').notEmpty().isInt().toInt(),
    body('status').notEmpty().isInt().toInt(),
    coreValidator,
  ],
};

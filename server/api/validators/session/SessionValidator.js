'use strict';

const { body, param } = require('express-validator');
const { coreValidator } = require('../core/CoreValidator');

module.exports = {
  loginValidator: [
    body('email').notEmpty().isEmail(),
    body('password').notEmpty().isString(),
    coreValidator,
  ],
  registerValidator: [
    body('name').notEmpty().isString(),
    body('surname').notEmpty().isString(),
    body('email').notEmpty().isEmail(),
    body('password').notEmpty().isString(),
    coreValidator,
  ],
  forgotPasswordValidator: [
    body('email').notEmpty().isEmail(),
    coreValidator,
  ],
  forgotPasswordAcceptValidator: [
    body('email').notEmpty().isEmail(),
    body('password').notEmpty().isString(),
    body('otp').notEmpty().isInt().toInt(),
    coreValidator,
  ],
  roomTypesValidator: [
    param('hotelGroupId').notEmpty().isInt().toInt(),
    param('hotelId').notEmpty().isInt().toInt(),
    body('name').notEmpty().isString(),
    body('description').optional({ nullable: true }).isString(),
    body('rooms').optional({ nullable: true }).isArray(),
    body('rooms.*.name').optional({ nullable: true }).isString(),
    body('rooms.*.description').optional({ nullable: true }).isString(),
    coreValidator,
  ],
  deleteRoomTypeValidator: [
    param('hotelGroupId').notEmpty().isInt().toInt(),
    param('hotelId').notEmpty().isInt().toInt(),
    param('roomTypeId').notEmpty().isInt().toInt(),
    coreValidator,
  ],
};

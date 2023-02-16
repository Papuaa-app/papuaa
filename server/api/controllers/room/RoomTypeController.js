'use strict';

const { createController } = require('awilix-express');
const {
  roomTypeValidator,
} = require('../../validators/room/RoomTypeValidator');
const {
  paramIdValidator,
} = require('../../validators/core/CommonValidator');

class RoomTypeController {

  constructor (deps) {
    this.httpStatusCodes = deps.httpStatusCodes;
    this.logger = deps.logger;
    this.responses = deps.responses;
    this.roomTypeService = deps.roomTypeService;
  }

  async getRoomTypes (req, res, next) {
    try {
      const result = await this.roomTypeService.getAll();
      res.status(this.httpStatusCodes.OK).json(this.responses(result));
    } catch (err) {
      this.logger.error('getRoomTypes', err);
      const { statusCode = this.httpStatusCodes.INTERNAL_SERVER_ERROR, data } = err;
      res.status(statusCode).json(this.responses(data));
    } finally {
      next();
    }
  }

  async getRoomTypeById (req, res, next) {
    try {
      const { id } = req.params;
      const { full } = req.query;
      const result = await this.roomTypeService.get({ _id: id }, true, full);
      res.status(this.httpStatusCodes.OK).json(this.responses(result, 'ROOM_TYPE'));
    } catch (err) {
      this.logger.error('getRoomTypeById', err);
      const { statusCode = this.httpStatusCodes.INTERNAL_SERVER_ERROR, data } = err;
      res.status(statusCode).json(this.responses(data));
    } finally {
      next();
    }
  }

  async createRoomType (req, res, next) {
    try {
      const roomType = req.body;
      const result = await this.roomTypeService.upsert(roomType);
      res.status(this.httpStatusCodes.CREATED).json(this.responses(result, 'ROOM_TYPE'));
      // TODO
      // trackingService.track({ user, req, trackingInfo: { kpiId: 1473, description: `roomType has been created with _id: ${result._id}` } });
    } catch (err) {
      this.logger.error('createRoomType', err);
      const { statusCode = this.httpStatusCodes.INTERNAL_SERVER_ERROR, data } = err;
      res.status(statusCode).json(this.responses(data));
    } finally {
      next();
    }
  }

  async updateRoomType (req, res, next) {
    try {
      const roomType = Object.assign({}, req.body, { _id: req.params.id });
      const result = await this.roomTypeService.upsert(roomType);
      res.status(this.httpStatusCodes.ACCEPTED).json(this.responses(result, 'ROOM_TYPE'));
      // TODO
      // trackingService.track({ employee, req, trackingInfo: { kpiId: 1474, description: `roomType has been updated with _id: ${result._id}` } });
    } catch (err) {
      this.logger.error('updateRoomType', err);
      const { statusCode = this.httpStatusCodes.INTERNAL_SERVER_ERROR, data } = err;
      res.status(statusCode).json(this.responses(data));
    } finally {
      next();
    }
  }

  async deleteRoomType (req, res, next) {
    try {
      const { id } = req.params;
      const result = await this.roomTypeService.delete(id);
      res.status(this.httpStatusCodes.OK).json(this.responses(result, 'ROOM_TYPE'));
      // TODO
      // trackingService.track({ employee, req, trackingInfo: { kpiId: 1475, description: `roomType has been deleted with _id: ${id}` } });
    } catch (err) {
      this.logger.error('deleteRoomType', err);
      const { statusCode = this.httpStatusCodes.INTERNAL_SERVER_ERROR, data } = err;
      res.status(statusCode).json(this.responses(data));
    } finally {
      next();
    }
  }

}

export default createController(RoomTypeController)
  .prefix('/room-types')
  .get('', 'getRoomTypes')
  .get('/:id', 'getRoomTypeById', { before: [ paramIdValidator ] })
  .post('', 'createRoomType', { before: [ roomTypeValidator ] })
  .put('/:id', 'updateRoomType', { before: [ paramIdValidator, roomTypeValidator ] })
  .delete('/:id', 'deleteRoomType', { before: [ paramIdValidator ] });

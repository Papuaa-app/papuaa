'use strict';

const { createController } = require('awilix-express');
const {
  roomValidator,
} = require('../../validators/room/RoomValidator');
const {
  paramIdValidator,
} = require('../../validators/core/CommonValidator');

class RoomController {

  constructor (deps) {
    this.httpStatusCodes = deps.httpStatusCodes;
    this.logger = deps.logger;
    this.responses = deps.responses;
    this.roomService = deps.roomService;
  }

  async getRooms (req, res, next) {
    try {
      const result = await this.roomService.getAll();
      res.status(this.httpStatusCodes.OK).json(this.responses(result));
    } catch (err) {
      this.logger.error('getRooms', err);
      const { statusCode = this.httpStatusCodes.INTERNAL_SERVER_ERROR, data } = err;
      res.status(statusCode).json(this.responses(data));
    } finally {
      next();
    }
  }

  async getRoomById (req, res, next) {
    try {
      const { id } = req.params;
      const result = await this.roomService.get({ id }, true);
      res.status(this.httpStatusCodes.OK).json(this.responses(result, 'ROOM'));
    } catch (err) {
      this.logger.error('getRoomById', err);
      const { statusCode = this.httpStatusCodes.INTERNAL_SERVER_ERROR, data } = err;
      res.status(statusCode).json(this.responses(data));
    } finally {
      next();
    }
  }

  async createRoom (req, res, next) {
    try {
      const room = req.body;
      const result = await this.roomService.upsert(room);
      res.status(this.httpStatusCodes.CREATED).json(this.responses(result, 'ROOM'));
      // TODO
      // trackingService.track({ user, req, trackingInfo: { kpiId: 1473, description: `room has been created with _id: ${result._id}` } });
    } catch (err) {
      this.logger.error('createRoom', err);
      const { statusCode = this.httpStatusCodes.INTERNAL_SERVER_ERROR, data } = err;
      res.status(statusCode).json(this.responses(data));
    } finally {
      next();
    }
  }

  async updateRoom (req, res, next) {
    try {
      const room = Object.assign({}, req.body, { _id: req.params.id });
      const result = await this.roomService.upsert(room);
      res.status(this.httpStatusCodes.ACCEPTED).json(this.responses(result, 'ROOM'));
      // TODO
      // trackingService.track({ employee, req, trackingInfo: { kpiId: 1474, description: `room has been updated with _id: ${result._id}` } });
    } catch (err) {
      this.logger.error('updateRoom', err);
      const { statusCode = this.httpStatusCodes.INTERNAL_SERVER_ERROR, data } = err;
      res.status(statusCode).json(this.responses(data));
    } finally {
      next();
    }
  }

  async deleteRoom (req, res, next) {
    try {
      const { id } = req.params;
      const result = await this.roomService.delete(id);
      res.status(this.httpStatusCodes.OK).json(this.responses(result, 'ROOM'));
      // TODO
      // trackingService.track({ employee, req, trackingInfo: { kpiId: 1475, description: `room has been deleted with _id: ${id}` } });
    } catch (err) {
      this.logger.error('deleteRoom', err);
      const { statusCode = this.httpStatusCodes.INTERNAL_SERVER_ERROR, data } = err;
      res.status(statusCode).json(this.responses(data));
    } finally {
      next();
    }
  }

}

export default createController(RoomController)
  .prefix('/rooms')
  .get('', 'getRooms')
  .get('/:id', 'getRoomById', { before: [ paramIdValidator ] })
  .post('', 'createRoom', { before: [ roomValidator ] })
  .put('/:id', 'updateRoom', { before: [ paramIdValidator, roomValidator ] })
  .delete('/:id', 'deleteRoom', { before: [ paramIdValidator ] });

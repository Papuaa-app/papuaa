'use strict';

import { userBelongsToHotelGroup } from '../../../core/middlewares/visibility';

const { createController } = require('awilix-express');
const {
  hotelGroupValidator,
  hotelGroupUserValidator,
} = require('../../validators/hotel/HotelGroupValidator');
const {
  paramIdValidator,
} = require('../../validators/core/CommonValidator');

class HotelGroupController {

  constructor (deps) {
    this.httpStatusCodes = deps.httpStatusCodes;
    this.logger = deps.logger;
    this.responses = deps.responses;
    this.hotelGroupService = deps.hotelGroupService;
    this.formatter = deps.formatter;
    this.user = deps.user;
  }

  async getHotelGroups (req, res, next) {
    try {
      const result = await this.hotelGroupService.getAll();
      res.status(this.httpStatusCodes.OK).json(this.responses(result, this.formatter.requestEntity(req)));
    } catch (err) {
      this.logger.error('getHotelGroups', err);
      const { statusCode = this.httpStatusCodes.INTERNAL_SERVER_ERROR, data } = err;
      res.status(statusCode).json(this.responses(data, this.formatter.requestEntity(req)));
    } finally {
      next();
    }
  }

  async getHotelGroupById (req, res, next) {
    try {
      const { id } = req.params;
      const result = await this.hotelGroupService.get({ id }, true);
      res.status(this.httpStatusCodes.OK).json(this.responses(result, this.formatter.requestEntity(req)));
    } catch (err) {
      this.logger.error('getHotelGroupById', err);
      const { statusCode = this.httpStatusCodes.INTERNAL_SERVER_ERROR, data } = err;
      res.status(statusCode).json(this.responses(data, this.formatter.requestEntity(req)));
    } finally {
      next();
    }
  }

  async createHotelGroup (req, res, next) {
    try {
      const hotelGroup = req.body;
      const { addSessionUser } = req.query;
      let result;
      if (addSessionUser) {
        result = await this.hotelGroupService.upsertByUser(hotelGroup, this.user);
      } else {
        result = await this.hotelGroupService.upsert(hotelGroup);
      }
      res.status(this.httpStatusCodes.CREATED).json(this.responses(result, this.formatter.requestEntity(req)));
      // TODO
      // trackingService.track({ user, req, trackingInfo: { kpiId: 1473, description: `hotelGroup has been created with _id: ${result._id}` } });
    } catch (err) {
      this.logger.error('createHotelGroup', err);
      const { statusCode = this.httpStatusCodes.INTERNAL_SERVER_ERROR, data } = err;
      res.status(statusCode).json(this.responses(data, this.formatter.requestEntity(req)));
    } finally {
      next();
    }
  }

  async updateHotelGroup (req, res, next) {
    try {
      const hotelGroup = Object.assign({}, req.body, { _id: req.params.id });
      const result = await this.hotelGroupService.upsert(hotelGroup);
      res.status(this.httpStatusCodes.ACCEPTED).json(this.responses(result, this.formatter.requestEntity(req)));
      // TODO
      // trackingService.track({ employee, req, trackingInfo: { kpiId: 1474, description: `hotelGroup has been updated with _id: ${result._id}` } });
    } catch (err) {
      this.logger.error('updateHotelGroup', err);
      const { statusCode = this.httpStatusCodes.INTERNAL_SERVER_ERROR, data } = err;
      res.status(statusCode).json(this.responses(data, this.formatter.requestEntity(req)));
    } finally {
      next();
    }
  }

  async deleteHotelGroup (req, res, next) {
    try {
      const { id } = req.params;
      const result = await this.hotelGroupService.delete(id);
      res.status(this.httpStatusCodes.OK).json(this.responses(result, this.formatter.requestEntity(req)));
      // TODO
      // trackingService.track({ employee, req, trackingInfo: { kpiId: 1475, description: `hotelGroup has been deleted with _id: ${id}` } });
    } catch (err) {
      this.logger.error('deleteHotelGroup', err);
      const { statusCode = this.httpStatusCodes.INTERNAL_SERVER_ERROR, data } = err;
      res.status(statusCode).json(this.responses(data, this.formatter.requestEntity(req)));
    } finally {
      next();
    }
  }

  async addUserToHotelGroup (req, res, next) {
    try {
      const { id, userId } = req.params;
      await this.hotelGroupService.addUser(id, userId);
      res.status(this.httpStatusCodes.CREATED).json(this.responses(undefined, this.formatter.requestEntity(req)));
      // TODO
      // trackingService.track({ user, req, trackingInfo: { kpiId: 1473, description: `hotelGroup has been created with _id: ${result._id}` } });
    } catch (err) {
      this.logger.error('addUserToHotelGroup', err);
      const { statusCode = this.httpStatusCodes.INTERNAL_SERVER_ERROR, data } = err;
      res.status(statusCode).json(this.responses(data, this.formatter.requestEntity(req)));
    } finally {
      next();
    }
  }

  async getHotelGroupHotels (req, res, next) {
    try {
      const { id } = req.params;
      const { full } = req.query;
      const result = await this.hotelGroupService.getHotels(id, full);
      res.status(this.httpStatusCodes.OK).json(this.responses(result, this.formatter.requestEntity(req)));
    } catch (err) {
      this.logger.error('getHotelGroupById', err);
      const { statusCode = this.httpStatusCodes.INTERNAL_SERVER_ERROR, data } = err;
      res.status(statusCode).json(this.responses(data, this.formatter.requestEntity(req)));
    } finally {
      next();
    }
  }

}

export default createController(HotelGroupController)
  .prefix('/hotel-groups')
  .get('', 'getHotelGroups')
  .get('/:id', 'getHotelGroupById', { before: [ paramIdValidator ] })
  .post('', 'createHotelGroup', { before: [ hotelGroupValidator ] })
  .put('/:id', 'updateHotelGroup', { before: [ paramIdValidator, hotelGroupValidator ] })
  .delete('/:id', 'deleteHotelGroup', { before: [ paramIdValidator ] })
  .post('/:id/user/:userId', 'addUserToHotelGroup', { before: [ paramIdValidator, hotelGroupUserValidator, userBelongsToHotelGroup() ] })
  .get('/:id/hotels', 'getHotelGroupHotels', { before: [ paramIdValidator, userBelongsToHotelGroup() ] });
// TODO
// .post('/:id/hotels/:hotelId/room-types', 'createRoomType' )
// .delete('/:id/hotels/:hotelId/room-types/:roomTypeId', 'deleteRoomType' );

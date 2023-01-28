'use strict';

const { createController } = require('awilix-express');
const {
  hotelValidator,
} = require('../../validators/hotel/HotelValidator');
const {
  paramIdValidator,
} = require('../../validators/core/CommonValidator');

class HotelController {

  constructor (deps) {
    this.httpStatusCodes = deps.httpStatusCodes;
    this.logger = deps.logger;
    this.responses = deps.responses;
    this.hotelService = deps.hotelService;
  }

  async getHotels (req, res, next) {
    try {
      const result = await this.hotelService.getAll();
      res.status(this.httpStatusCodes.OK).json(this.responses(result));
    } catch (err) {
      this.logger.error('getHotels', err);
      const { statusCode = this.httpStatusCodes.INTERNAL_SERVER_ERROR, data } = err;
      res.status(statusCode).json(this.responses(data));
    } finally {
      next();
    }
  }

  async getHotelById (req, res, next) {
    try {
      const { id } = req.params;
      const result = await this.hotelService.get({ id }, true);
      res.status(this.httpStatusCodes.OK).json(this.responses(result));
    } catch (err) {
      this.logger.error('getHotelById', err);
      const { statusCode = this.httpStatusCodes.INTERNAL_SERVER_ERROR, data } = err;
      res.status(statusCode).json(this.responses(data));
    } finally {
      next();
    }
  }

  async createHotel (req, res, next) {
    try {
      const hotel = req.body;
      const result = await this.hotelService.upsert(hotel);
      res.status(this.httpStatusCodes.CREATED).json(this.responses(result));
      // TODO
      // trackingService.track({ user, req, trackingInfo: { kpiId: 1473, description: `hotel has been created with _id: ${result._id}` } });
    } catch (err) {
      this.logger.error('createHotel', err);
      const { statusCode = this.httpStatusCodes.INTERNAL_SERVER_ERROR, data } = err;
      res.status(statusCode).json(this.responses(data));
    } finally {
      next();
    }
  }

  async updateHotel (req, res, next) {
    try {
      const hotel = Object.assign({}, req.body, { _id: req.params.id });
      const result = await this.hotelService.upsert(hotel);
      res.status(this.httpStatusCodes.ACCEPTED).json(this.responses(result));
      // TODO
      // trackingService.track({ employee, req, trackingInfo: { kpiId: 1474, description: `hotel has been updated with _id: ${result._id}` } });
    } catch (err) {
      this.logger.error('updateHotel', err);
      const { statusCode = this.httpStatusCodes.INTERNAL_SERVER_ERROR, data } = err;
      res.status(statusCode).json(this.responses(data));
    } finally {
      next();
    }
  }

  async deleteHotel (req, res, next) {
    try {
      const { id } = req.params;
      const result = await this.hotelService.delete(id);
      res.status(this.httpStatusCodes.OK).json(this.responses(result));
      // TODO
      // trackingService.track({ employee, req, trackingInfo: { kpiId: 1475, description: `hotel has been deleted with _id: ${id}` } });
    } catch (err) {
      this.logger.error('deleteHotel', err);
      const { statusCode = this.httpStatusCodes.INTERNAL_SERVER_ERROR, data } = err;
      res.status(statusCode).json(this.responses(data));
    } finally {
      next();
    }
  }

}

export default createController(HotelController)
  .prefix('/hotels')
  .get('', 'getHotels')
  .get('/:id', 'getHotelById', { before: [ paramIdValidator ] })
  .post('', 'createHotel', { before: [ hotelValidator ] })
  .put('/:id', 'updateHotel', { before: [ paramIdValidator, hotelValidator ] })
  .delete('/:id', 'deleteHotel', { before: [ paramIdValidator ] });

'use strict';

const { createController } = require('awilix-express');
const {
  cityValidator,
} = require('../../validators/location/CityValidator');
const {
  paramIdValidator,
} = require('../../validators/core/CommonValidator');

class CityController {

  constructor (deps) {
    this.httpStatusCodes = deps.httpStatusCodes;
    this.logger = deps.logger;
    this.responses = deps.responses;
    this.cityService = deps.cityService;
  }

  async getCities (req, res, next) {
    try {
      const result = await this.cityService.getAll();
      res.status(this.httpStatusCodes.OK).json(this.responses(result));
    } catch (err) {
      this.logger.error('getCities', err);
      const { statusCode = this.httpStatusCodes.INTERNAL_SERVER_ERROR, data } = err;
      res.status(statusCode).json(this.responses(data));
    } finally {
      next();
    }
  }

  async getCityById (req, res, next) {
    try {
      const { id } = req.params;
      const result = await this.cityService.get({ id }, true);
      res.status(this.httpStatusCodes.OK).json(this.responses(result));
    } catch (err) {
      this.logger.error('getCityById', err);
      const { statusCode = this.httpStatusCodes.INTERNAL_SERVER_ERROR, data } = err;
      res.status(statusCode).json(this.responses(data));
    } finally {
      next();
    }
  }

  async createCity (req, res, next) {
    try {
      const city = req.body;
      const result = await this.cityService.upsert(city);
      res.status(this.httpStatusCodes.CREATED).json(this.responses(result));
      // TODO
      // trackingService.track({ user, req, trackingInfo: { kpiId: 1473, description: `city has been created with _id: ${result._id}` } });
    } catch (err) {
      this.logger.error('createCity', err);
      const { statusCode = this.httpStatusCodes.INTERNAL_SERVER_ERROR, data } = err;
      res.status(statusCode).json(this.responses(data));
    } finally {
      next();
    }
  }

  async updateCity (req, res, next) {
    try {
      const city = Object.assign({}, req.body, { _id: req.params.id });
      const result = await this.cityService.upsert(city);
      res.status(this.httpStatusCodes.ACCEPTED).json(this.responses(result));
      // TODO
      // trackingService.track({ employee, req, trackingInfo: { kpiId: 1474, description: `city has been updated with _id: ${result._id}` } });
    } catch (err) {
      this.logger.error('updateCity', err);
      const { statusCode = this.httpStatusCodes.INTERNAL_SERVER_ERROR, data } = err;
      res.status(statusCode).json(this.responses(data));
    } finally {
      next();
    }
  }

  async deleteCity (req, res, next) {
    try {
      const { id } = req.params;
      const result = await this.cityService.delete(id);
      res.status(this.httpStatusCodes.OK).json(this.responses(result));
      // TODO
      // trackingService.track({ employee, req, trackingInfo: { kpiId: 1475, description: `city has been deleted with _id: ${id}` } });
    } catch (err) {
      this.logger.error('deleteCity', err);
      const { statusCode = this.httpStatusCodes.INTERNAL_SERVER_ERROR, data } = err;
      res.status(statusCode).json(this.responses(data));
    } finally {
      next();
    }
  }

}

export default createController(CityController)
  .prefix('/cities')
  .get('', 'getCities')
  .get('/:id', 'getCityById', { before: [ paramIdValidator ] })
  .post('', 'createCity', { before: [ cityValidator ] })
  .put('/:id', 'updateCity', { before: [ paramIdValidator, cityValidator ] })
  .delete('/:id', 'deleteCity', { before: [ paramIdValidator ] });

'use strict';

export default class CityRepository {

  constructor (deps) {
    this.dbConnector = deps.dbConnector;
    this.logger = deps.logger;
    this.cityDao = deps.cityDao;
  }

  async findAll (filters, isStrict) {
    const parsedFilters = filters && Object.keys(filters).map(filter => ({ [filter]: filters[filter] }));
    const operator = this.dbConnector.getMainDb().getOp()[isStrict ? 'and' : 'or'];
    const result = await this.cityDao.getDAO().findAll({
      where: parsedFilters && {
        [operator]: parsedFilters,
      }
    });
    return result;
  }

  async find (filters, isStrict) {
    const parsedFilters = filters && Object.keys(filters).map(filter => ({ [filter]: filters[filter] }));
    const operator = this.dbConnector.getMainDb().getOp()[isStrict ? 'and' : 'or'];
    const result = await this.cityDao.getDAO().findOne({
      where: parsedFilters && {
        [operator]: parsedFilters,
      }
    });
    return result;
  }

  async upsert (city) {
    const [ record, created ] = await this.cityDao.getDAO().upsert(city);
    this.logger.info(`City ${record._id} was ${created ? 'created' : 'updated'}`);
    return record;
  }
  
  async softDelete (cityId) {
    const result = await this.cityDao.getDAO().update({ status: 0 }, {
      where: {
        _id: cityId,
      }
    });
    return result;
  }

}

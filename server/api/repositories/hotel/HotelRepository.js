'use strict';

export default class HotelRepository {

  constructor (deps) {
    this.dbConnector = deps.dbConnector;
    this.logger = deps.logger;
    this.hotelDao = deps.hotelDao;
  }

  async findAll (filters, isStrict) {
    const parsedFilters = filters && Object.keys(filters).map(filter => ({ [filter]: filters[filter] }));
    const operator = this.dbConnector.getMainDb().getOp()[isStrict ? 'and' : 'or'];
    const result = await this.hotelDao.getDAO().findAll({
      where: parsedFilters && {
        [operator]: parsedFilters,
      }
    });
    return result;
  }

  async find (filters, isStrict) {
    const parsedFilters = filters && Object.keys(filters).map(filter => ({ [filter]: filters[filter] }));
    const operator = this.dbConnector.getMainDb().getOp()[isStrict ? 'and' : 'or'];
    const result = await this.hotelDao.getDAO().findOne({
      where: parsedFilters && {
        [operator]: parsedFilters,
      }
    });
    return result;
  }

  async upsert (hotel) {
    const [ record, created ] = await this.hotelDao.getDAO().upsert(hotel);
    this.logger.info(`Hotel ${record._id} was ${created ? 'created' : 'updated'}`);
    return record;
  }
  
  async softDelete (hotelId) {
    const result = await this.hotelDao.getDAO().update({ status: 0 }, {
      where: {
        _id: hotelId,
      }
    });
    return result;
  }

}

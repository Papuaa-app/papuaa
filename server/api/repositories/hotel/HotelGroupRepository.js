'use strict';

export default class HotelGroupRepository {

  constructor (deps) {
    this.dbConnector = deps.dbConnector;
    this.logger = deps.logger;
    this.hotelGroupDao = deps.hotelGroupDao;
    this.hotelDao = deps.hotelDao;
    this.roomTypeDao = deps.roomTypeDao;
    this.roomDao = deps.roomDao;
  }

  async findAll (filters, isStrict) {
    const parsedFilters = Object.keys(filters).map(filter => ({ [filter]: filters[filter] }));
    const operator = this.dbConnector.getMainDb().getOp()[isStrict ? 'and' : 'or'];
    const result = await this.hotelGroupDao.getDAO().findAll({
      where: {
        [operator]: parsedFilters,
      }
    });
    return result;
  }

  async find (filters, isStrict) {
    const parsedFilters = Object.keys(filters).map(filter => ({ [filter]: filters[filter] }));
    const operator = this.dbConnector.getMainDb().getOp()[isStrict ? 'and' : 'or'];
    const result = await this.hotelGroupDao.getDAO().findOne({
      where: {
        [operator]: parsedFilters,
      }
    });
    return result;
  }

  async findHotels (hotelGroupId, isFull) {
    const result = await this.hotelDao.getDAO().findAll({
      include: isFull && [
        {
          model: this.roomTypeDao.getDAO(),
          as: 'roomTypes',
          required: false,
          include: [
            {
              model: this.roomDao.getDAO(),
              as: 'rooms',
              required: false,
            },
          ],
        },
      ],
      where: {
        hotelGroupId,
      },
    });
    return result;
  }

  async upsert (hotelGroup) {
    const [ record, created ] = await this.hotelGroupDao.getDAO().upsert(hotelGroup);
    this.logger.info(`HotelGroup ${record._id} was ${created ? 'created' : 'updated'}`);
    return record;
  }

  async addUser (hotelGroupId, userId) {
    const [ record, created ] = await this.hotelGroupDao.getDAO().upsert(hotelGroup);
    this.logger.info(`HotelGroup ${record._id} was ${created ? 'created' : 'updated'}`);
    return record;
  }

  async softDelete (hotelGroupId) {
    const result = await this.hotelGroupDao.getDAO().update({ status: 0 }, {
      where: {
        _id: hotelGroupId,
      }
    });
    return result;
  }

}

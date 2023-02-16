'use strict';

export default class RoomRepository {

  constructor (deps) {
    this.dbConnector = deps.dbConnector;
    this.logger = deps.logger;
    this.roomDao = deps.roomDao;
  }

  async findAll (filters, isStrict) {
    const parsedFilters = filters && Object.keys(filters).map(filter => ({ [filter]: filters[filter] }));
    const operator = this.dbConnector.getMainDb().getOp()[isStrict ? 'and' : 'or'];
    const result = await this.roomDao.getDAO().findAll({
      where: parsedFilters && {
        [operator]: parsedFilters,
      }
    });
    return result;
  }

  async find (filters, isStrict) {
    const parsedFilters = filters && Object.keys(filters).map(filter => ({ [filter]: filters[filter] }));
    const operator = this.dbConnector.getMainDb().getOp()[isStrict ? 'and' : 'or'];
    const result = await this.roomDao.getDAO().findOne({
      where: parsedFilters && {
        [operator]: parsedFilters,
      }
    });
    return result;
  }

  async upsert (room) {
    const [ record, created ] = await this.roomDao.getDAO().upsert(room);
    this.logger.info(`Room ${record._id} was ${created ? 'created' : 'updated'}`);
    return record;
  }

  async softDelete (roomId) {
    const result = await this.roomDao.getDAO().update({ status: 0 }, {
      where: {
        _id: roomId,
      }
    });
    return result;
  }

}

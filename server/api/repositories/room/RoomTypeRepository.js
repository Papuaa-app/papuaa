'use strict';

export default class RoomTypeRepository {

  constructor (deps) {
    this.dbConnector = deps.dbConnector;
    this.logger = deps.logger;
    this.roomTypeDao = deps.roomTypeDao;
    this.roomDao = deps.roomDao;
  }

  async findAll (filters, isStrict) {
    const parsedFilters = filters && Object.keys(filters).map(filter => ({ [filter]: filters[filter] }));
    const operator = this.dbConnector.getMainDb().getOp()[isStrict ? 'and' : 'or'];
    const result = await this.roomTypeDao.getDAO().findAll({
      where: parsedFilters && {
        [operator]: parsedFilters,
      }
    });
    return result;
  }

  async find (filters, isStrict, isFull) {
    const parsedFilters = filters && Object.keys(filters).map(filter => ({ [filter]: filters[filter] }));
    const operator = this.dbConnector.getMainDb().getOp()[isStrict ? 'and' : 'or'];
    const result = await this.roomTypeDao.getDAO().findOne({
      include: isFull && [
        {
          model: this.roomDao.getDAO(),
          as: 'rooms',
          required: false,
        },
      ],
      where: parsedFilters && {
        [operator]: parsedFilters,
      }
    });
    return result;
  }

  async upsert (roomType) {
    const [ record, created ] = await this.roomTypeDao.getDAO().upsert(roomType);
    this.logger.info(`RoomType ${record._id} was ${created ? 'created' : 'updated'}`);
    return record;
  }

  async setRooms (roomTypeId, rooms) {
    await this.roomDao.getDAO().destroy({ where: { roomTypeId } });
    const result = await this.roomDao.getDAO().bulkCreate(rooms);
    this.logger.info(`RoomType: ${roomTypeId} Rooms created or updated`);
    return result;
  }

  async softDelete (roomTypeId) {
    const result = await this.roomTypeDao.getDAO().update({ status: 0 }, {
      where: {
        _id: roomTypeId,
      }
    });
    return result;
  }

}

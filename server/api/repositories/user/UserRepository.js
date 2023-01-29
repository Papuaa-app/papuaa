'use strict';

export default class UserRepository {

  constructor (deps) {
    this.userDao = deps.userDao;
    this.dbConnector = deps.dbConnector;
    this.endpointDao = deps.endpointDao;
    this.permissionDao = deps.permissionDao;
    this.roleDao = deps.roleDao;
    this.profileDao = deps.profileDao;
    this.hotelGroupDao = deps.hotelGroupDao;
    this.hotelGroupUserDao = deps.hotelGroupUserDao;
    this.hotelDao = deps.hotelDao;
  }

  async find (filters, isStrict, scopeStatus = 'activeStatus', isFull) {
    const parsedFilters = Object.keys(filters).map(filter => ({ [filter]: filters[filter] }));
    const operator = this.dbConnector.getMainDb().getOp()[isStrict ? 'and' : 'or'];
    const result = await this.userDao.getDAO().scope(scopeStatus).findOne({
      include: isFull && [
        {
          through: {
            model: this.hotelGroupUserDao.getDAO(),
            as: 'hotelGroupUser',
            where: {
              userId: filters._id,
            },
          },
          model: this.hotelGroupDao.getDAO(),
          as: 'hotelGroups',
          include: {
            model: this.hotelDao.getDAO(),
            as: 'hotels',
          }
        },
      ],
      where: {
        [operator]: parsedFilters,
      }
    });
    return result;
  }

  async findEndpoints (userId) {
    const result = await this.endpointDao.getDAO().findAll({
      include: {
        model: this.permissionDao.getDAO(),
        as: 'endpointPermission',
        include: {
          model: this.roleDao.getDAO(),
          as: 'roles',
          include: {
            model: this.profileDao.getDAO(),
            as: 'profiles',
            include: {
              model: this.userDao.getDAO(),
              as: 'users',
              where: {
                _id: userId,
              },
            },
          },
        },
      },
    });
    return result;
  }

  async findHotelGroups (userId) {
    const result = await this.hotelGroupDao.getDAO().findAll({
      include: {
        through: {
          model: this.hotelGroupUserDao.getDAO(),
          as: 'hotelGroupUser',
          where: {
            userId,
          },
        },
        model: this.userDao.getDAO(),
        as: 'users',
      },
    });
    return result;
  }

  async create (user) {
    const result = await this.userDao.getDAO().create(user);
    return result;
  }

}

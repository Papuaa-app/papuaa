'use strict';

export default class UserRepository {

  constructor (deps) {
    this.userDao = deps.userDao;
    this.dbConnector = deps.dbConnector;
  }

  async find (filters, scopeStatus = 'allStatus') {
    const orFilters = Object.keys(filters).map(filter => ({ [filter]: filters[filter] }));
    const result = await this.userDao.getDAO().scope(scopeStatus).findOne({
      where: {
        [this.dbConnector.getMainDb().getOp().or]: orFilters,
      }
    });
    return result;
  }

  async findUserEndpoints (userId) {

  }

  async create (user) {
    const result = await this.userDao.getDAO().create(user);
    return result;
  }

}

'use strict';

export default class UserRepository {

  constructor (deps) {
    this.userDao = deps.userDao;
    this.dbConnector = deps.dbConnector;
  }

  async find (filters, scopeStatus = 'allStatus', isStrict) {
    const parsedFilters = Object.keys(filters).map(filter => ({ [filter]: filters[filter] }));
    const operator = this.dbConnector.getMainDb().getOp()[isStrict ? 'and' : 'or'];
    const result = await this.userDao.getDAO().scope(scopeStatus).findOne({
      where: {
        [operator]: parsedFilters,
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

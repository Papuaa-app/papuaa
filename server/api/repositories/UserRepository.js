'use strict';

export default class UserRepository {

  constructor (deps) {
    this.userDao = deps.userDao;
    this.mainDbConnector = deps.mainDbConnector;
  }

  async findUser (filters, scopeStatus = 'allStatus') {
    filters = [ ...filters ];
    const result = await this.userDao.getDAO().scope(scopeStatus).findOne({
      where: {
        [this.mainDbConnector.getOp().or]: filters,
      }
    });
    return result;
  }

}

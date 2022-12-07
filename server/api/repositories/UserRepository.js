'use strict';

function UserRepository (deps) {

  const {
    userDao,
    dbConnector,
  } = deps;

  return {

    async findUser (filters, scopeStatus = 'allStatus') {
      filters = [ ...filters ];
      const result = await userDao.getDAO().scope(scopeStatus).findOne({
        where: {
          [dbConnector.getOp().or]: filters,
        }
      });
      return result;
    }

  };

}

module.exports = UserRepository;
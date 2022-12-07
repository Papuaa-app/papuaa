'use strict';

function UserService (deps) {

  const {
    userRepository,
  } = deps;

  return {

    async getUser (filters) {
      const user = await userRepository.findUser(filters);
      return user;
    },

  };

}

module.exports = UserService;
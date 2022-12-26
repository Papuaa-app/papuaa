'use strict';

export default class UserService {

  constructor (deps) {
    this.userRepository = deps.userRepository;
  }

  async getUser (filters) {
    const user = await this.userRepository.findUser(filters);
    return user;
  }

  async getUserEndpoints (userId) {
    const endpoints = await this.userRepository.findUserEndpoints(userId);
    return endpoints;
  }

}

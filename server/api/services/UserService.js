'use strict';

export default class UserService {

  constructor (deps) {
    this.userRepository = deps.userRepository;
  }

  async get (filters, scope, isStrict) {
    const user = await this.userRepository.find(filters, scope, isStrict);
    return user;
  }

  async create (newUser) {
    const user = await this.userRepository.create(newUser);
    return user;
  }

  async getEndpoints (userId) {
    const endpoints = await this.userRepository.findEndpoints(userId);
    return endpoints;
  }

}

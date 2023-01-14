'use strict';

export default class UserService {

  constructor (deps) {
    this.userRepository = deps.userRepository;
  }

  async get (filters) {
    const user = await this.userRepository.find(filters);
    return user;
  }

  async create (newUser) {
    const user = await this.userRepository.create(newUser);
    return user;
  }

  async getUserEndpoints (userId) {
    const endpoints = await this.userRepository.findUserEndpoints(userId);
    return endpoints;
  }

}

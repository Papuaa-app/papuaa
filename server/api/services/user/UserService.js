'use strict';

export default class UserService {

  constructor (deps) {
    this.userRepository = deps.userRepository;
  }

  async get (filters, isStrict, scope) {
    const user = await this.userRepository.find(filters, isStrict, scope);
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

  async getHotelGroups (userId) {
    const hotelGroups = await this.userRepository.findHotelGroups(userId);
    return hotelGroups;
  }

}

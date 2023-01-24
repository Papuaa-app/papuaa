'use strict';

export default class HotelGroupService {

  constructor (deps) {
    this.hotelGroupRepository = deps.hotelGroupRepository;
  }

  async getAll (filters, isStrict) {
    const hotelGroup = await this.hotelGroupRepository.findAll(filters, isStrict);
    return hotelGroup;
  }

  async get (filters, isStrict) {
    const hotelGroup = await this.hotelGroupRepository.find(filters, isStrict);
    return hotelGroup;
  }

  async upsert (hotelGroup) {
    const result = await this.hotelGroupRepository.upsert(hotelGroup);
    return await this.get({ _id: result._id }, true);
  }

  async addUser (hotelGroupId, userId) {
    const hotelGroup = await this.get({ _id: hotelGroupId });
    await hotelGroup.addUser(userId);
    return true;
  }

  async delete (hotelGroupId) {
    const hotelGroup = await this.get({ _id: hotelGroupId }, true);
    await this.hotelGroupRepository.softDelete(hotelGroup._id);
  }

}

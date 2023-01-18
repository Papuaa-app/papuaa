'use strict';

export default class HotelGroupService {

  constructor (deps) {
    this.hotelGroupRepository = deps.hotelGroupRepository;
  }

  async get (filters, isStrict, scope) {
    const hotelGroup = await this.hotelGroupRepository.find(filters, isStrict, scope);
    return hotelGroup;
  }

  async upsert (hotelGroup) {
    const result = await this.hotelGroupRepository.upsert(hotelGroup);
    return await this.get({ _id: result._id }, true);
  }

  async delete (hotelGroupId) {
    const hotelGroup = await this.get({ _id: hotelGroupId }, true);
    await this.hotelGroupRepository.softDelete(hotelGroup._id);
  }

}

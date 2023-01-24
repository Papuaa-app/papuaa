'use strict';

export default class CityService {

  constructor (deps) {
    this.cityRepository = deps.cityRepository;
  }

  async getAll (filters, isStrict) {
    const city = await this.cityRepository.findAll(filters, isStrict);
    return city;
  }

  async get (filters, isStrict) {
    const city = await this.cityRepository.find(filters, isStrict);
    return city;
  }

  async upsert (city) {
    const result = await this.cityRepository.upsert(city);
    return await this.get({ _id: result._id }, true);
  }

  async delete (cityId) {
    const city = await this.get({ _id: cityId }, true);
    await this.cityRepository.softDelete(city._id);
  }

}

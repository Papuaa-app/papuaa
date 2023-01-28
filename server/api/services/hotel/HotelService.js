'use strict';

export default class HotelService {

  constructor (deps) {
    this.hotelRepository = deps.hotelRepository;
  }

  async getAll (filters, isStrict) {
    const hotels = await this.hotelRepository.findAll(filters, isStrict);
    return hotels;
  }

  async get (filters, isStrict) {
    const hotel = await this.hotelRepository.find(filters, isStrict);
    return hotel;
  }

  async upsert (hotel) {
    const result = await this.hotelRepository.upsert(hotel);
    return await this.get({ _id: result._id }, true);
  }

  async delete (hotelId) {
    const hotel = await this.get({ _id: hotelId }, true);
    await this.hotelRepository.softDelete(hotel._id);
  }

}

'use strict';

export default class RoomService {

  constructor (deps) {
    this.roomRepository = deps.roomRepository;
  }

  async getAll (filters, isStrict) {
    const rooms = await this.roomRepository.findAll(filters, isStrict);
    return rooms;
  }

  async get (filters, isStrict) {
    const room = await this.roomRepository.find(filters, isStrict);
    return room;
  }

  async upsert (room) {
    const result = await this.roomRepository.upsert(room);
    return await this.get({ _id: result._id }, true);
  }

  async delete (roomId) {
    const room = await this.get({ _id: roomId }, true);
    await this.roomRepository.softDelete(room._id);
  }

}

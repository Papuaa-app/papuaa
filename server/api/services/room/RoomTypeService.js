'use strict';

export default class RoomTypeService {

  constructor (deps) {
    this.roomTypeRepository = deps.roomTypeRepository;
  }

  async getAll (filters, isStrict) {
    const roomTypes = await this.roomTypeRepository.findAll(filters, isStrict);
    return roomTypes;
  }

  async get (filters, isStrict, isFull) {
    const roomType = await this.roomTypeRepository.find(filters, isStrict, isFull);
    return roomType;
  }

  async upsert (roomType) {
    const roomTypeRecord = await this.roomTypeRepository.upsert(roomType);
    if (roomType.rooms?.length) {
      const rooms = roomType.rooms.map(room => ({  roomTypeId: roomTypeRecord._id, ...room }));
      await this.roomTypeRepository.setRooms(roomTypeRecord._id, rooms);
    }
    return await this.get({ _id: roomTypeRecord._id }, true);
  }

  async delete (roomTypeId) {
    const roomType = await this.get({ _id: roomTypeId }, true);
    await this.roomTypeRepository.softDelete(roomType._id);
  }

}

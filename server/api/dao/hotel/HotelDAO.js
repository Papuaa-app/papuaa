'use strict';

import { DataTypes } from 'sequelize';

export default function HotelDAO (deps) {

  const {
    dbConnector,
  } = deps;

  dbConnector.getMainDb().getSchema().define(HotelDAO.name, {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    roomsNumber: DataTypes.INTEGER,
  }, {
    tableName: 'hotel',
    schema: dbConnector.getMainDb().getSchema().options.schema,
  });

  return Object.assign({}, dbConnector.getMainDb().abstractDAO(HotelDAO), {

    makeAssociations () {

      const {
        HotelDAO,
        HotelGroupDAO,
        CityDAO,
        RoomDAO,
        ResourceDAO,
        ResourceHotelDAO,
        AccommodationDAO,
        HotelAccommodationDAO,
      } = dbConnector.getMainDb().getSchema().models;

      HotelDAO.belongsTo(HotelGroupDAO, {
        foreignKey: 'hotelGroupId',
        as: 'hotelGroup',
      });

      HotelDAO.belongsTo(CityDAO, {
        foreignKey: 'cityId',
        as: 'hotelCity'
      });

      HotelDAO.hasMany(RoomDAO, {
        foreignKey: 'hotelId',
        as: 'hotelRooms'
      });

      HotelDAO.belongsToMany(ResourceDAO, {
        through: ResourceHotelDAO,
        foreignKey: 'hotelId',
        otherKey: 'resourceId',
        as: 'hotelResources',
        onDelete: 'cascade'
      });

      HotelDAO.belongsToMany(AccommodationDAO, {
        through: HotelAccommodationDAO,
        foreignKey: 'hotelId',
        otherKey: 'accommodationId',
        as: 'hotelAccommodations',
        onDelete: 'cascade'
      });

    }

  });

}
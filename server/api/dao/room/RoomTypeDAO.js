'use strict';

import { DataTypes } from 'sequelize';

export default function RoomTypeDAO (deps) {

  const {
    dbConnector,
  } = deps;

  dbConnector.getMainDb().getSchema().define(RoomTypeDAO.name, {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
  }, {
    tableName: 'room_type',
    defaultScope: {
      where: {
        status: 1,
      },
    },
    schema: dbConnector.getMainDb().getSchema().options.schema,
  });

  return Object.assign({}, dbConnector.getMainDb().abstractDAO(RoomTypeDAO), {

    makeAssociations () {

      const {
        RoomTypeDAO,
        ResourceDAO,
        ResourceRoomTypeDAO,
        HotelDAO,
        RoomDAO,
      } = dbConnector.getMainDb().getSchema().models;

      RoomTypeDAO.belongsToMany(ResourceDAO, {
        through: ResourceRoomTypeDAO,
        foreignKey: 'roomTypeId',
        otherKey: 'resourceId',
        as: 'roomTypeResources',
        onDelete: 'cascade'
      });

      RoomTypeDAO.belongsTo(HotelDAO, {
        foreignKey: 'hotelId',
        as: 'hotel',
      });

      RoomTypeDAO.hasMany(RoomDAO, {
        foreignKey: 'roomTypeId',
        as: 'rooms',
      });

    }

  });

}
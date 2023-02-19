'use strict';

import { DataTypes } from 'sequelize';

export default function RoomTypeDAO (deps) {

  const {
    dbConnector,
  } = deps;

  const columns = {
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
  };

  const options = {
    tableName: 'room_type',
    defaultScope: {
      where: {
        status: 1,
      },
    },
    schema: dbConnector?.getMainDb().getSchema().options.schema,
  };

  dbConnector?.getMainDb().getSchema().define(RoomTypeDAO.name, columns, options);

  return Object.assign({}, dbConnector?.getMainDb().abstractDAO(RoomTypeDAO), {

    columns,

    options,

    getAssociations () {
      return [
        {
          from: 'room_type',
          through: 'resource_room_type',
          foreignKey: 'roomTypeId',
          otherKey: 'resourceId',
          to: 'resource',
        },
        {
          from: 'room_type',
          foreignKey: 'hotelId',
          to: 'hotel',
        },
      ];
    },

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
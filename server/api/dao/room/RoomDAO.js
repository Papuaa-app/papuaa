'use strict';

import { DataTypes } from 'sequelize';

export default function RoomDAO (deps) {

  const {
    dbConnector,
  } = deps;

  dbConnector.getMainDb().getSchema().define(RoomDAO.name, {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
  }, {
    tableName: 'room',
    schema: dbConnector.getMainDb().getSchema().options.schema,
  });

  return Object.assign({}, dbConnector.getMainDb().abstractDAO(RoomDAO), {

    makeAssociations () {

      const {
        RoomDAO,
        RoomTypeDAO,
        HotelDAO,
      } = dbConnector.getMainDb().getSchema().models;

      RoomDAO.belongsTo(RoomTypeDAO, {
        foreignKey: 'roomTypeId',
        as: 'roomType',
      });

      RoomDAO.belongsTo(HotelDAO, {
        foreignKey: 'hotelId',
        as: 'hotel',
      });

    }

  });

}
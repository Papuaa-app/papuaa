'use strict';

import { DataTypes } from 'sequelize';

export default function RoomUserDAO (deps) {

  const {
    dbConnector,
  } = deps;

  dbConnector.getMainDb().getSchema().define(RoomUserDAO.name, {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    isCancelled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
  }, {
    tableName: 'room_user',
    defaultScope: {
      where: {
        status: 1
      },
    },
    schema: dbConnector.getMainDb().getSchema().options.schema,
  });

  return Object.assign({}, dbConnector.getMainDb().abstractDAO(RoomUserDAO), {

  });

}
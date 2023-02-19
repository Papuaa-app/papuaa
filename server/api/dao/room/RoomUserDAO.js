'use strict';

import { DataTypes } from 'sequelize';

export default function RoomUserDAO (deps) {

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
  };

  const options = {
    tableName: 'room_user',
    defaultScope: {
      where: {
        status: 1
      },
    },
    schema: dbConnector?.getMainDb().getSchema().options.schema,
  };

  dbConnector?.getMainDb().getSchema().define(RoomUserDAO.name, columns, options);

  return Object.assign({}, dbConnector?.getMainDb().abstractDAO(RoomUserDAO), {

    columns,

    options,

  });

}
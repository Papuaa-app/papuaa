'use strict';

import { DataTypes } from 'sequelize';

export default function ResourceRoomTypeDAO (deps) {

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
  };

  const options = {
    tableName: 'resource_room_type',
    schema: dbConnector?.getMainDb().getSchema().options.schema,
  };

  dbConnector?.getMainDb().getSchema().define(ResourceRoomTypeDAO.name, columns, options);

  return Object.assign({}, dbConnector?.getMainDb().abstractDAO(ResourceRoomTypeDAO), {

    columns,

    options,

  });

}
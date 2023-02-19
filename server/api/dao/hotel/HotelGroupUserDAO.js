'use strict';

import { DataTypes } from 'sequelize';

export default function HotelGroupUserDAO (deps) {

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
    tableName: 'hotel_group_user',
    schema: dbConnector?.getMainDb().getSchema().options.schema,
  };

  dbConnector?.getMainDb().getSchema().define(HotelGroupUserDAO.name, columns, options);

  return Object.assign({}, dbConnector?.getMainDb().abstractDAO(HotelGroupUserDAO), {

    columns,

    options,

  });

}
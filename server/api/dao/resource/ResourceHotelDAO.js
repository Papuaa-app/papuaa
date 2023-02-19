'use strict';

import { DataTypes } from 'sequelize';

export default function ResourceHotelDAO (deps) {

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
  };

  const options = {
    tableName: 'resource_hotel',
    schema: dbConnector?.getMainDb().getSchema().options.schema,
  };

  dbConnector?.getMainDb().getSchema().define(ResourceHotelDAO.name, columns, options);

  return Object.assign({}, dbConnector?.getMainDb().abstractDAO(ResourceHotelDAO), {

    columns,

    options,

  });

}
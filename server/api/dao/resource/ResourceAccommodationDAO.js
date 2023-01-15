'use strict';

import { DataTypes } from 'sequelize';

export default function ResourceAccommodationDAO (deps) {

  const {
    dbConnector,
  } = deps;

  dbConnector.getMainDb().getSchema().define(ResourceAccommodationDAO.name, {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
  }, {
    tableName: 'resource_accommodation',
    schema: dbConnector.getMainDb().getSchema().options.schema,
  });

  return Object.assign({}, dbConnector.getMainDb().abstractDAO(ResourceAccommodationDAO), {

  });

}
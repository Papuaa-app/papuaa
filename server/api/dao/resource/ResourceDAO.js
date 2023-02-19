'use strict';

import { DataTypes } from 'sequelize';

export default function ResourceDAO (deps) {

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
    url: DataTypes.STRING,
    description: DataTypes.TEXT,
    icon: DataTypes.STRING,
  };

  const options = {
    tableName: 'resource',
    schema: dbConnector?.getMainDb().getSchema().options.schema,
  };

  dbConnector?.getMainDb().getSchema().define(ResourceDAO.name, columns, options);

  return Object.assign({}, dbConnector?.getMainDb().abstractDAO(ResourceDAO), {

    columns,

    options,

  });

}
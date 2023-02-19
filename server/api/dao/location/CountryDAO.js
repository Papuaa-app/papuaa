'use strict';

import { DataTypes } from 'sequelize';

export default function CountryDAO (deps) {

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
    description: DataTypes.TEXT,
  };

  const options = {
    tableName: 'country',
    schema: dbConnector?.getMainDb().getSchema().options.schema,
  };

  dbConnector?.getMainDb().getSchema().define(CountryDAO.name, columns, options);

  return Object.assign({}, dbConnector?.getMainDb().abstractDAO(CountryDAO), {

    columns,

    options,

  });

}
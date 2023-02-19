'use strict';

import { DataTypes } from 'sequelize';

export default function PageDAO (deps) {

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
    tableName: 'page',
    schema: dbConnector?.getMainDb().getSchema().options.schema,
  };

  dbConnector?.getMainDb().getSchema().define(PageDAO.name, columns, options);

  return Object.assign({}, dbConnector?.getMainDb().abstractDAO(PageDAO), {

    columns,

    options,

  });

}
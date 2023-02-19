'use strict';

import { DataTypes } from 'sequelize';

export default function PermissionPageDAO (deps) {

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
    tableName: 'permission_page',
    schema: dbConnector?.getMainDb().getSchema().options.schema,
  };

  dbConnector?.getMainDb().getSchema().define(PermissionPageDAO.name, columns, options);

  return Object.assign({}, dbConnector?.getMainDb().abstractDAO(PermissionPageDAO), {

    columns,

    options,

  });

}
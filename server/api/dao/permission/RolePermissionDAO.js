'use strict';

import { DataTypes } from 'sequelize';

export default function RolePermissionDAO (deps) {

  const { dbConnector } = deps;

  const columns = {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
  };

  const options = {
    tableName: 'role_permission',
    schema: dbConnector?.getMainDb().getSchema().options.schema,
  };

  dbConnector?.getMainDb().getSchema().define(RolePermissionDAO.name, columns, options);

  return Object.assign({}, dbConnector?.getMainDb().abstractDAO(RolePermissionDAO), {

    columns,

    options,

  });

}
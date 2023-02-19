'use strict';

import { DataTypes } from 'sequelize';

export default function ProfileRoleDAO (deps) {

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
    tableName: 'profile_role',
    schema: dbConnector?.getMainDb().getSchema().options.schema,
  };

  dbConnector?.getMainDb().getSchema().define(ProfileRoleDAO.name, columns, options);

  return Object.assign({}, dbConnector?.getMainDb().abstractDAO(ProfileRoleDAO), {

    columns,

    options,

  });

}
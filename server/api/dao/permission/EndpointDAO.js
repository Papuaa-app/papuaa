'use strict';

import { DataTypes } from 'sequelize';

export default function EndpointDAO (deps) {

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
    method: DataTypes.STRING,
    url: DataTypes.STRING,
  };

  const options = {
    tableName: 'endpoint',
    schema: dbConnector?.getMainDb().getSchema().options.schema,
  };

  dbConnector?.getMainDb().getSchema().define(EndpointDAO.name, columns, options);

  return Object.assign({}, dbConnector?.getMainDb().abstractDAO(EndpointDAO), {

    columns,

    options,

    getAssociations () {
      return [
        {
          from: 'endpoint',
          foreignKey: 'permissionId',
          to: 'permission',
        },
      ];
    },

    makeAssociations () {

      const {
        EndpointDAO,
        PermissionDAO,
      } = dbConnector.getMainDb().getSchema().models;

      EndpointDAO.belongsTo(PermissionDAO, {
        foreignKey: 'permissionId',
        as: 'endpointPermission',
      });

    }

  });

}
'use strict';

import { DataTypes } from 'sequelize';

export default function  PermissionDAO (deps) {

  const { dbConnector } = deps;

  dbConnector.getMainDb().getSchema().define(PermissionDAO.name, {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
  }, {
    tableName: 'permission',
    schema: dbConnector.getMainDb().getSchema().options.schema,
  });

  return Object.assign({}, dbConnector.getMainDb().abstractDAO(PermissionDAO), {

    makeAssociations () {
      const {
        PermissionDAO,
        PermissionPageDAO,
        PageDAO,
        EndpointDAO,
      } = dbConnector.getMainDb().getSchema().models;

      // PermissionDAO.belongsToMany(PageDAO, {
      //   through: PermissionPageDAO,
      //   foreignKey: 'permissionId',
      //   otherKey: 'pageId',
      //   as: 'pages',
      // });

      PermissionDAO.hasMany(EndpointDAO, {
        foreignKey: 'permissionId',
        as: 'endpoints',
      });

    }

  });

}
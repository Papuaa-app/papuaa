'use strict';

import { DataTypes } from 'sequelize';

export default function  PermissionDAO (deps) {

  const { dbConnector } = deps;

  const columns = {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
  };

  const options = {
    tableName: 'permission',
    schema: dbConnector?.getMainDb().getSchema().options.schema,
  };

  dbConnector?.getMainDb().getSchema().define(PermissionDAO.name, columns, options);

  return Object.assign({}, dbConnector?.getMainDb().abstractDAO(PermissionDAO), {

    columns,

    options,

    getAssociations () {
      return [
        {
          from: 'permission',
          through: 'permission_page',
          foreignKey: 'permissionId',
          otherKey: 'pageId',
          to: 'page',
        },
      ];
    },

    makeAssociations () {

      const {
        PermissionDAO,
        PermissionPageDAO,
        PageDAO,
        EndpointDAO,
        RoleDAO,
        RolePermissionDAO,
      } = dbConnector.getMainDb().getSchema().models;

      PermissionDAO.belongsToMany(PageDAO, {
        through: PermissionPageDAO,
        foreignKey: 'permissionId',
        otherKey: 'pageId',
        as: 'permissionPages',
      });

      PermissionDAO.belongsToMany(RoleDAO, {
        through: RolePermissionDAO,
        foreignKey: 'permissionId',
        otherKey: 'roleId',
        as: 'roles',
      });

      PermissionDAO.hasMany(EndpointDAO, {
        foreignKey: 'permissionId',
        as: 'permissionEndpoints',
      });

    }

  });

}
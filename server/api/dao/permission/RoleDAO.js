'use strict';

import { DataTypes, Op } from 'sequelize';

export default function RoleDAO (deps) {

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
    tableName: 'role',
    schema: dbConnector?.getMainDb().getSchema().options.schema,
  };

  dbConnector?.getMainDb().getSchema().define(RoleDAO.name, columns, options);

  return Object.assign({}, dbConnector?.getMainDb().abstractDAO(RoleDAO), {

    columns,

    options,

    getAssociations () {
      return [
        {
          from: 'role',
          through: 'role_permission',
          foreignKey: 'roleId',
          otherKey: 'permissionId',
          to: 'permission',
        },
      ];
    },

    makeAssociations () {

      const {
        RoleDAO,
        RolePermissionDAO,
        PermissionDAO,
        ProfileDAO,
        ProfileRoleDAO,
      } = dbConnector.getMainDb().getSchema().models;

      RoleDAO.belongsToMany(PermissionDAO, {
        through: RolePermissionDAO,
        foreignKey: 'roleId',
        otherKey: 'permissionId',
        as: 'permissions',
      });

      RoleDAO.belongsToMany(ProfileDAO, {
        through: ProfileRoleDAO,
        foreignKey: 'roleId',
        otherKey: 'profileId',
        as: 'profiles',
      });

    }

  });

}
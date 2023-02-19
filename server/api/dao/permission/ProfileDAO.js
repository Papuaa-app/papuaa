'use strict';

import { DataTypes, Op } from 'sequelize';

export default function ProfileDAO (deps) {

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
    tableName: 'profile',
    schema: dbConnector?.getMainDb().getSchema().options.schema,
  };

  dbConnector?.getMainDb().getSchema().define(ProfileDAO.name, columns, options);

  return Object.assign({}, dbConnector?.getMainDb().abstractDAO(ProfileDAO), {

    columns,

    options,

    getAssociations () {
      return [
        {
          from: 'profile',
          through: 'profile_role',
          foreignKey: 'profileId',
          otherKey: 'roleId',
          to: 'role',
        },
      ];
    },

    makeAssociations () {

      const {
        UserDAO,
        ProfileDAO,
        ProfileRoleDAO,
        RoleDAO,
      } = dbConnector.getMainDb().getSchema().models;

      ProfileDAO.hasMany(UserDAO, {
        foreignKey: 'profileId',
        as: 'users',
      });

      ProfileDAO.belongsToMany(RoleDAO, {
        through: ProfileRoleDAO,
        foreignKey: 'profileId',
        otherKey: 'roleId',
        as: 'roles',
      });

    }

  });

}
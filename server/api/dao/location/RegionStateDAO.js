'use strict';

import { DataTypes } from 'sequelize';

export default function RegionStateDAO (deps) {

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

  const options =  {
    tableName: 'region_state',
    schema: dbConnector?.getMainDb().getSchema().options.schema,
  };

  dbConnector?.getMainDb().getSchema().define(RegionStateDAO.name, columns,options);

  return Object.assign({}, dbConnector?.getMainDb().abstractDAO(RegionStateDAO), {

    columns,

    options,

    getAssociations () {
      return [
        {
          from: 'region_state',
          foreignKey: 'regionStateId',
          to: 'region',
        },
      ];
    },

    makeAssociations () {

      const {
        RegionStateDAO,
        RegionDAO,
      } = dbConnector.getMainDb().getSchema().models;

      RegionStateDAO.belongsTo(RegionDAO, {
        foreignKey: 'regionStateId',
        as: 'region',
      });

    }

  });

}
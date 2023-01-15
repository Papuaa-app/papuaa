'use strict';

import { DataTypes } from 'sequelize';

export default function RegionStateDAO (deps) {

  const {
    dbConnector,
  } = deps;

  dbConnector.getMainDb().getSchema().define(RegionStateDAO.name, {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
  }, {
    tableName: 'region_state',
    schema: dbConnector.getMainDb().getSchema().options.schema,
  });

  return Object.assign({}, dbConnector.getMainDb().abstractDAO(RegionStateDAO), {

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
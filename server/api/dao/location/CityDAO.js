'use strict';

import { DataTypes } from 'sequelize';

export default function CityDAO (deps) {

  const {
    dbConnector,
  } = deps;

  dbConnector.getMainDb().getSchema().define(CityDAO.name, {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
  }, {
    tableName: 'city',
    schema: dbConnector.getMainDb().getSchema().options.schema,
  });

  return Object.assign({}, dbConnector.getMainDb().abstractDAO(CityDAO), {

    makeAssociations () {

      const {
        CityDAO,
        RegionStateDAO,
      } = dbConnector.getMainDb().getSchema().models;

      CityDAO.belongsTo(RegionStateDAO, {
        foreignKey: 'regionStateId',
        as: 'regionState',
      });

    }

  });

}
'use strict';

import { DataTypes } from 'sequelize';

export default function RegionDAO (deps) {

  const {
    dbConnector,
  } = deps;

  dbConnector.getMainDb().getSchema().define(RegionDAO.name, {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
  }, {
    tableName: 'region',
    schema: dbConnector.getMainDb().getSchema().options.schema,
  });

  return Object.assign({}, dbConnector.getMainDb().abstractDAO(RegionDAO), {

    makeAssociations () {

      const {
        RegionDAO,
        CountryDAO,
      } = dbConnector.getMainDb().getSchema().models;

      RegionDAO.belongsTo(CountryDAO, {
        foreignKey: 'countryId',
        as: 'country',
      });

    }

  });

}
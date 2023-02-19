'use strict';

import { DataTypes } from 'sequelize';

export default function RegionDAO (deps) {

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

  const options = {
    tableName: 'region',
    schema: dbConnector?.getMainDb().getSchema().options.schema,
  };

  dbConnector?.getMainDb().getSchema().define(RegionDAO.name, columns, options);

  return Object.assign({}, dbConnector?.getMainDb().abstractDAO(RegionDAO), {

    columns,

    options,

    getAssociations () {
      return [
        {
          from: 'region',
          foreignKey: 'countryId',
          to: 'country',
        },
      ];
    },

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
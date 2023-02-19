'use strict';

import { DataTypes } from 'sequelize';

export default function CityDAO (deps) {

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
    tableName: 'city',
    schema: dbConnector?.getMainDb().getSchema().options.schema,
  };

  dbConnector?.getMainDb().getSchema().define(CityDAO.name, columns, options);

  return Object.assign({}, dbConnector?.getMainDb().abstractDAO(CityDAO), {

    columns,

    options,

    getAssociations () {
      return [
        {
          from: 'city',
          foreignKey: 'regionStateId',
          to: 'region_state',
        },
      ];
    },

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
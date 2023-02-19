'use strict';

import { DataTypes } from 'sequelize';

export default function AccommodationDAO (deps) {

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
    description: DataTypes.STRING,
  };

  const options = {
    tableName: 'accommodation',
    schema: dbConnector?.getMainDb().getSchema().options.schema,
  };

  dbConnector?.getMainDb().getSchema().define(AccommodationDAO.name, columns, options);

  return Object.assign({}, dbConnector?.getMainDb().abstractDAO(AccommodationDAO), {

    columns,

    options,

    getAssociations () {
      return [
        {
          from: 'accommodation',
          through: 'resource_accommodation',
          foreignKey: 'accommodationId',
          otherKey: 'resourceId',
          to: 'resource',
        },
      ];
    },

    makeAssociations () {

      const {
        AccommodationDAO,
        ResourceDAO,
        ResourceAccommodationDAO,
      } = dbConnector.getMainDb().getSchema().models;

      AccommodationDAO.belongsToMany(ResourceDAO, {
        through: ResourceAccommodationDAO,
        foreignKey: 'accommodationId',
        otherKey: 'resourceId',
        as: 'accommodationResource',
        onDelete: 'cascade'
      });

    }

  });

}
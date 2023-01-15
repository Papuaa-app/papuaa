'use strict';

import { DataTypes } from 'sequelize';

export default function AccommodationDAO (deps) {

  const {
    dbConnector,
  } = deps;

  dbConnector.getMainDb().getSchema().define(AccommodationDAO.name, {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
  }, {
    tableName: 'accommodation',
    schema: dbConnector.getMainDb().getSchema().options.schema,
  });

  return Object.assign({}, dbConnector.getMainDb().abstractDAO(AccommodationDAO), {

    makeAssociations () {

      const {
        HotelDAO,
        ResourceDAO,
        ResourceAccommodationDAO,
      } = dbConnector.getMainDb().getSchema().models;

      HotelDAO.belongsToMany(ResourceDAO, {
        through: ResourceAccommodationDAO,
        foreignKey: 'accommodationId',
        otherKey: 'resourceId',
        as: 'accommodationResource',
        onDelete: 'cascade'
      });

    }

  });

}
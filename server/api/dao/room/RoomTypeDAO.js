'use strict';

import { DataTypes } from 'sequelize';

export default function RoomTypeDAO (deps) {

  const {
    dbConnector,
  } = deps;

  dbConnector.getMainDb().getSchema().define(RoomTypeDAO.name, {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
  }, {
    tableName: 'room_type',
    schema: dbConnector.getMainDb().getSchema().options.schema,
  });

  return Object.assign({}, dbConnector.getMainDb().abstractDAO(RoomTypeDAO), {

    makeAssociations () {

      const {
        RoomTypeDAO,
        ResourceDAO,
        ResourceRoomTypeDAO,
      } = dbConnector.getMainDb().getSchema().models;

      RoomTypeDAO.belongsToMany(ResourceDAO, {
        through: ResourceRoomTypeDAO,
        foreignKey: 'roomTypeId',
        otherKey: 'resourceId',
        as: {
          singular: 'resource_a',
          plural: 'resources_a',
        },
        onDelete: 'cascade'
      });
    }

  });

}
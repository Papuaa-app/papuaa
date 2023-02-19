'use strict';

import { DataTypes } from 'sequelize';

export default function RoomDAO (deps) {

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
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
  };

  const options = {
    tableName: 'room',
    defaultScope: {
      where: {
        status: 1
      },
    },
    schema: dbConnector?.getMainDb().getSchema().options.schema,
  };

  dbConnector?.getMainDb().getSchema().define(RoomDAO.name, columns, options);

  return Object.assign({}, dbConnector?.getMainDb().abstractDAO(RoomDAO), {

    columns,

    options,

    getAssociations () {
      return [
        {
          from: 'room',
          foreignKey: 'roomTypeId',
          to: 'room_type',
        },
      ];
    },

    makeAssociations () {

      const {
        RoomDAO,
        RoomTypeDAO,
      } = dbConnector.getMainDb().getSchema().models;

      RoomDAO.belongsTo(RoomTypeDAO, {
        foreignKey: 'roomTypeId',
        as: 'roomType',
      });

    }

  });

}
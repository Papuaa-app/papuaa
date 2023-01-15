'use strict';

import { DataTypes } from 'sequelize';

export default function HotelAccommodationDAO (deps) {

  const {
    dbConnector,
  } = deps;

  dbConnector.getMainDb().getSchema().define(HotelAccommodationDAO.name, {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
  }, {
    tableName: 'hotel_accommodation',
    schema: dbConnector.getMainDb().getSchema().options.schema,
  });

  return Object.assign({}, dbConnector.getMainDb().abstractDAO(HotelAccommodationDAO), {

  });

}
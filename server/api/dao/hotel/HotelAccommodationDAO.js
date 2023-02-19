'use strict';

import { DataTypes } from 'sequelize';

export default function HotelAccommodationDAO (deps) {

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
  };

  const options = {
    tableName: 'hotel_accommodation',
    schema: dbConnector?.getMainDb().getSchema().options.schema,
  };

  dbConnector?.getMainDb().getSchema().define(HotelAccommodationDAO.name, columns, options);

  return Object.assign({}, dbConnector?.getMainDb().abstractDAO(HotelAccommodationDAO), {

    columns,

    options,

  });

}
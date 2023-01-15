'use strict';

import { DataTypes } from 'sequelize';

export default function HotelGroupDAO (deps) {

  const {
    dbConnector,
  } = deps;

  dbConnector.getMainDb().getSchema().define(HotelGroupDAO.name, {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
  }, {
    tableName: 'hotel_group',
    schema: dbConnector.getMainDb().getSchema().options.schema,
  });

  return Object.assign({}, dbConnector.getMainDb().abstractDAO(HotelGroupDAO), {

    makeAssociations () {

      const {
        HotelGroupDAO,
        HotelDAO,
        BillingDAO,
      } = dbConnector.getMainDb().getSchema().models;

      HotelGroupDAO.hasMany(HotelDAO, {
        foreignKey: 'hotelGroupId',
        as: 'hotels',
      });

      HotelGroupDAO.belongsTo(BillingDAO, {
        foreignKey: 'billingId',
        as: 'hotelBilling',
      });

    }

  });

}
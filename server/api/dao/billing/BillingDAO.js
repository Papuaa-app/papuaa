'use strict';

import { DataTypes } from 'sequelize';

export default function BillingDAO (deps) {

  const {
    dbConnector,
  } = deps;

  dbConnector.getMainDb().getSchema().define(BillingDAO.name, {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    holdingName: DataTypes.STRING,
    address: DataTypes.STRING,
    taxId: DataTypes.STRING,
  }, {
    tableName: 'billing',
    schema: dbConnector.getMainDb().getSchema().options.schema,
  });

  return Object.assign({}, dbConnector.getMainDb().abstractDAO(BillingDAO), {

    makeAssociations () {

      const {
        HotelDAO,
        CityDAO,
      } = dbConnector.getMainDb().getSchema().models;

      HotelDAO.belongsTo(CityDAO, {
        foreignKey: 'cityId',
        as: 'billingCity'
      });

    }

  });

}
'use strict';

import { DataTypes } from 'sequelize';

export default function BillingDAO (deps) {

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
    holdingName: DataTypes.STRING,
    address: DataTypes.STRING,
    taxId: DataTypes.STRING,
  };

  const options = {
    tableName: 'billing',
    schema: dbConnector?.getMainDb().getSchema().options.schema,
  };

  dbConnector?.getMainDb().getSchema().define(BillingDAO.name, columns, options);

  return Object.assign({}, dbConnector?.getMainDb().abstractDAO(BillingDAO), {

    columns,

    options,

    getAssociations () {
      return [
        {
          from: 'billing',
          foreignKey: 'cityId',
          to: 'city',
        },
      ];
    },

    makeAssociations () {

      const {
        BillingDAO,
        CityDAO,
      } = dbConnector.getMainDb().getSchema().models;

      BillingDAO.belongsTo(CityDAO, {
        foreignKey: 'cityId',
        as: 'billingCity'
      });

    }

  });

}
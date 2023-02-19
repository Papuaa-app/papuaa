'use strict';

import { DataTypes } from 'sequelize';

export default function HotelGroupDAO (deps) {

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
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
  };

  const options = {
    tableName: 'hotel_group',
    defaultScope: {
      where: {
        status: 1
      },
    },
    schema: dbConnector?.getMainDb().getSchema().options.schema,
  };

  dbConnector?.getMainDb().getSchema().define(HotelGroupDAO.name, columns, options);

  return Object.assign({}, dbConnector?.getMainDb().abstractDAO(HotelGroupDAO), {

    columns,

    options,

    getAssociations () {
      return [
        {
          from: 'hotel_group',
          foreignKey: 'billingId',
          to: 'billing',
        },
      ];
    },

    makeAssociations () {

      const {
        HotelGroupDAO,
        HotelDAO,
        BillingDAO,
        HotelGroupUserDAO,
        UserDAO,
      } = dbConnector.getMainDb().getSchema().models;

      HotelGroupDAO.hasMany(HotelDAO, {
        foreignKey: 'hotelGroupId',
        as: 'hotels',
      });

      HotelGroupDAO.belongsTo(BillingDAO, {
        foreignKey: 'billingId',
        as: 'hotelBilling',
      });

      HotelGroupDAO.belongsToMany(UserDAO, {
        through: HotelGroupUserDAO,
        foreignKey: 'hotelGroupId',
        otherKey: 'userId',
        as: 'users',
        onDelete: 'cascade'
      });

    }

  });

}
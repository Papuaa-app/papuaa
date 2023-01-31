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
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
  }, {
    tableName: 'hotel_group',
    defaultScope: {
      where: {
        status: 1
      },
    },
    schema: dbConnector.getMainDb().getSchema().options.schema,
  });

  return Object.assign({}, dbConnector.getMainDb().abstractDAO(HotelGroupDAO), {

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
        as: {
          singular: 'user',
          plural: 'users',
        },
        onDelete: 'cascade'
      });

    }

  });

}
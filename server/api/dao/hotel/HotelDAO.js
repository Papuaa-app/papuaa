'use strict';

import { DataTypes } from 'sequelize';

export default function HotelDAO (deps) {

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
    tableName: 'hotel',
    defaultScope: {
      where: {
        status: 1
      },
    },
    schema: dbConnector?.getMainDb().getSchema().options.schema,
  };

  dbConnector?.getMainDb().getSchema().define(HotelDAO.name, columns, options);

  return Object.assign({}, dbConnector?.getMainDb().abstractDAO(HotelDAO), {

    columns,

    options,

    getAssociations () {
      return [
        {
          from: 'hotel',
          foreignKey: 'hotelGroupId',
          to: 'hotel_group',
        },
        {
          from: 'hotel',
          foreignKey: 'cityId',
          to: 'city',
        },
        {
          from: 'hotel',
          through: 'resource_hotel',
          foreignKey: 'hotelId',
          otherKey: 'resourceId',
          to: 'resource',
        },
        {
          from: 'hotel',
          through: 'hotel_accommodation',
          foreignKey: 'hotelId',
          otherKey: 'accommodationId',
          to: 'accommodation',
        },
      ];
    },

    makeAssociations () {

      const {
        HotelDAO,
        HotelGroupDAO,
        CityDAO,
        ResourceDAO,
        ResourceHotelDAO,
        AccommodationDAO,
        HotelAccommodationDAO,
        RoomTypeDAO,
      } = dbConnector.getMainDb().getSchema().models;

      HotelDAO.belongsTo(HotelGroupDAO, {
        foreignKey: 'hotelGroupId',
        as: 'hotelGroup',
      });

      HotelDAO.belongsTo(CityDAO, {
        foreignKey: 'cityId',
        as: 'hotelCity',
      });

      HotelDAO.hasMany(RoomTypeDAO, {
        foreignKey: 'hotelId',
        as: 'roomTypes',
      });

      HotelDAO.belongsToMany(ResourceDAO, {
        through: ResourceHotelDAO,
        foreignKey: 'hotelId',
        otherKey: 'resourceId',
        as: 'hotelResources',
        onDelete: 'cascade',
      });

      HotelDAO.belongsToMany(AccommodationDAO, {
        through: HotelAccommodationDAO,
        foreignKey: 'hotelId',
        otherKey: 'accommodationId',
        as: 'hotelAccommodations',
        onDelete: 'cascade',
      });

    }

  });

}
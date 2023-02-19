'use strict';

/** @type {import('sequelize-cli').Migration} */

import {
  AddColumn,
  AddConstraint,
  CreateTable,
  ImportDao,
} from '../utils';

module.exports = {
  async up (queryInterface, Sequelize) {
    const associationsList = [];
    await queryInterface.sequelize.transaction(async (transaction) => {
      const tables = [
        await ImportDao('../../api/dao/billing/BillingDAO'),
        await ImportDao('../../api/dao/hotel/AccommodationDAO'),
        await ImportDao('../../api/dao/hotel/HotelAccommodationDAO'),
        await ImportDao('../../api/dao/hotel/HotelDAO'),
        await ImportDao('../../api/dao/hotel/HotelGroupDAO'),
        await ImportDao('../../api/dao/hotel/HotelGroupUserDAO'),
        await ImportDao('../../api/dao/location/CityDAO'),
        await ImportDao('../../api/dao/location/CountryDAO'),
        await ImportDao('../../api/dao/location/RegionDAO'),
        await ImportDao('../../api/dao/location/RegionStateDAO'),
        await ImportDao('../../api/dao/page/PageDAO'),
        await ImportDao('../../api/dao/permission/EndpointDAO'),
        await ImportDao('../../api/dao/permission/PermissionDAO'),
        await ImportDao('../../api/dao/permission/PermissionPageDAO'),
        await ImportDao('../../api/dao/permission/ProfileDAO'),
        await ImportDao('../../api/dao/permission/ProfileRoleDAO'),
        await ImportDao('../../api/dao/permission/RoleDAO'),
        await ImportDao('../../api/dao/permission/RolePermissionDAO'),
        await ImportDao('../../api/dao/resource/ResourceAccommodationDAO'),
        await ImportDao('../../api/dao/resource/ResourceDAO'),
        await ImportDao('../../api/dao/resource/ResourceHotelDAO'),
        await ImportDao('../../api/dao/resource/ResourceRoomTypeDAO'),
        await ImportDao('../../api/dao/room/RoomDAO'),
        await ImportDao('../../api/dao/room/RoomTypeDAO'),
        await ImportDao('../../api/dao/room/RoomUserDAO'),
        await ImportDao('../../api/dao/user/UserDAO'),
      ];
      for (const { options, columns, associations } of tables) {
        associationsList.push(...associations);
        await CreateTable({ queryInterface, Sequelize, transaction }, options.tableName, columns);
      }
    });
    await queryInterface.sequelize.transaction(async (transaction) => {
      for (const association of associationsList) {
        await AddColumn({ queryInterface, Sequelize, transaction }, association);
      }
    });
    await queryInterface.sequelize.transaction(async (transaction) => {
      for (const association of associationsList) {
        await AddConstraint({ queryInterface, Sequelize, transaction }, association);
      }
    });
  },
  async down (queryInterface, Sequelize) {
    // for (const table of tables) {
    //   await queryInterface.dropTable('user');
    // }
    // await queryInterface.removeConstraint('UserDAO', 'UserDAO_profileId_fkey');
    // await queryInterface.removeColumn('UserDAO', 'profileId');
  },
};

'use strict';

import config from '../../core/config';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.bulkInsert('profile', [
        {
          _id: 1,
          name: 'MASTER_ADMIN',
          description: 'Full permissions admin, god like.',
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ], { transaction });
      await queryInterface.bulkInsert('role', [
        {
          _id: 1,
          name: 'MASTER_ADMIN_ROLE',
          description: 'Role for master admin',
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ], { transaction });
      await queryInterface.bulkInsert('profile_role', [
        {
          _id: 1,
          profileId: 1,
          roleId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ], { transaction });
      await queryInterface.bulkInsert('permission', [
        {
          _id: 1,
          name: 'MASTER_ADMIN_PERMISSION',
          description: 'Permission for master admin',
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ], { transaction });
      await queryInterface.bulkInsert('role_permission', [
        {
          _id: 1,
          roleId: 1,
          permissionId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ], { transaction });
      await queryInterface.bulkInsert('endpoint', [
        {
          method: 'GET',
          url: `${config.api.prefix}/session/me`,
          permissionId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ], { transaction });
    });
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.bulkDelete('profile', null, { transaction });
      await queryInterface.bulkDelete('role', null, { transaction });
      await queryInterface.bulkDelete('profile_role', null, { transaction });
      await queryInterface.bulkDelete('permission', null, { transaction });
      await queryInterface.bulkDelete('role_permission', null, { transaction });
      await queryInterface.bulkDelete('endpoint', null, { transaction });
    });
  },
};

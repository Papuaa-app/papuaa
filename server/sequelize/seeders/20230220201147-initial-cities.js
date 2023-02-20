'use strict';

import config from '../../core/config';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.bulkInsert('city', [
        {
          _id: 1,
          name: 'CITY TEST 1',
          description: 'This city should be deleted',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          _id: 2,
          name: 'CITY TEST 2',
          description: 'This city should be deleted',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          _id: 3,
          name: 'CITY TEST 3',
          description: 'This city should be deleted',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ], { transaction });
    });
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.bulkDelete('city', undefined, { transaction });
    });
  },
};

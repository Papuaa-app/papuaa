'use strict';

import config from '../../core/config';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  endpoints: [
    {
      method: 'get',
      url: `${config.api.prefix}/cities`,
      permissionId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      method: 'post',
      url: `${config.api.prefix}/hotel-groups`,
      permissionId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      method: 'post',
      url: `${config.api.prefix}/hotel-groups/*/user/*`,
      permissionId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      method: 'post',
      url: `${config.api.prefix}/hotels`,
      permissionId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      method: 'get',
      url: `${config.api.prefix}/hotel-groups/8/hotels`,
      permissionId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      method: 'post',
      url: `${config.api.prefix}/room-types`,
      permissionId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      method: 'delete',
      url: `${config.api.prefix}/room-types/*`,
      permissionId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      method: 'get',
      url: `${config.api.prefix}/room-types/*`,
      permissionId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      method: 'put',
      url: `${config.api.prefix}/room-types/*`,
      permissionId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      method: 'get',
      url: `${config.api.prefix}/users/*/hotel-groups`,
      permissionId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.bulkInsert('endpoint', this.endpoints, { transaction });
    });
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.bulkDelete('endpoint', {
        url: this.endpoints.map(endpoint => endpoint.url),
      }, { transaction });
    });
  },
};

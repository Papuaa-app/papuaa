'use strict';

export async function CreateTable ({ queryInterface, Sequelize, transaction }, tableName, columns) {
  console.log(`Creating table ${tableName}`);
  await queryInterface.createTable(tableName, {
    ...columns,
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
  }, { transaction });
}
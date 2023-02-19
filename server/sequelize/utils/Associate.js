'use strict';

export async function AddColumn ({ queryInterface, Sequelize, transaction }, association) {
  if (association.through) {
    console.log(`Adding column ${association.through}`);
    await queryInterface.addColumn(association.through, association.foreignKey, {
      type: Sequelize.INTEGER,
      references: {
        model: association.from,
        key: '_id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    }, { transaction });
    await queryInterface.addColumn(association.through, association.otherKey, {
      type: Sequelize.INTEGER,
      references: {
        model: association.to,
        key: '_id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    }, { transaction });
  } else {
    console.log(`Adding column ${association.from}`);
    await queryInterface.addColumn(association.from, association.foreignKey, {
      type: Sequelize.INTEGER,
      references: {
        model: association.to,
        key: '_id',
      },
    }, { transaction });
  }
}

export async function AddConstraint ({ queryInterface, Sequelize, transaction }, association) {
  if (association.through) {
    console.log(`Adding constraint ${association.through}`);
    await queryInterface.addConstraint(association.through, {
      fields: [ association.foreignKey ],
      type: 'foreign key',
      name: `${association.through}_${association.foreignKey}_fk`,
      references: {
        table: association.from,
        field: '_id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    }, { transaction });
    await queryInterface.addConstraint(association.through, {
      fields: [ association.otherKey ],
      type: 'foreign key',
      name: `${association.through}_${association.otherKey}_fk`,
      references: {
        table: association.to,
        field: '_id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    }, { transaction });
  } else {
    console.log(`Adding constraint ${association.from}`);
    await queryInterface.addConstraint(association.from, {
      fields: [ association.foreignKey ],
      type: 'foreign key',
      name: `${association.from}_${association.to}_fk`,
      references: {
        table: association.to,
        field: '_id',
      },
    }, { transaction });
  }
}
'use strict';

import { DataTypes, Op } from 'sequelize';

export default function UserDAO (deps) {
  
  const { dbConnector } = deps;

  dbConnector.getMainDb().getSchema().define('UserDAO', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    surname: DataTypes.STRING,
    email: {
      type: DataTypes.STRING(96),
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: DataTypes.STRING,
    otp: DataTypes.INTEGER,
    otpExpiration: DataTypes.DATE,
    birthday: DataTypes.DATEONLY,
    phone: {
      type: DataTypes.STRING(20),
      validate: {
        validatePhone: function (value) {
          if (!/^\d{9}$/i.test(value) && !/^(([+]|0+)\d{1,3}\s?)?\d{9}$/i.test(value)) {
            throw new Error('el teléfono no es válido!');
          }
        }
      }
    },
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    googleRefreshToken: DataTypes.STRING,
    observations: DataTypes.TEXT,
  }, {
    tableName: 'user',
    scopes: {
      googleRefreshToken: {
        attributes: [ 'googleRefreshToken' ],
        where: {
          status: { [Op.or]: [ 1, 2 ] }
        }
      },
      allStatus: {
        attributes: { exclude: [ 'googleRefreshToken', 'password' ] },
      },
      activeStatus: {
        attributes: { exclude: [ 'googleRefreshToken', 'password' ] },
        where: {
          status: 1
        },
      }
    },
    defaultScope: {
      attributes: { exclude: [ 'googleRefreshToken', 'password' ] },
      where: {
        status: 1
      }
    },
    getterMethods: {
      fullName () {
        return `${this.name} ${this.surname}`;
      },
    },
    schema: dbConnector.getMainDb().getSchema().options.schema,
  });

  return Object.assign({}, dbConnector.getMainDb().abstractDAO(UserDAO), {

    makeAssociations () {

      const {
        UserDAO,
        ProfileDAO,
      } = dbConnector.getMainDb().getSchema().models;

      UserDAO.belongsTo(ProfileDAO, {
        foreignKey: 'profileId',
        as: 'profile',
      });

    }
    
  });

}
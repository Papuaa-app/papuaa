'use strict';

const { Sequelize, Op, QueryTypes } = require('sequelize');

function DBConnector (deps) {

  const {
    logger,
    config,
  } = deps;

  let associations = false;

  function loadDAOs (makeAssociations = false) {
    Object.keys(deps).map(dep => {
      if (dep.includes('Dao')) {
        makeAssociations ? deps[dep].makeAssociations() : deps[dep];
      }
    });
  }

  function makeAssociations () {
    if (!associations) {
      loadDAOs(false);
      loadDAOs(true);
      associations = true;
    }
  }

  const dbs = config.db.names
    .map(dbName => config.db.slaves.length ?
      new Sequelize({
        port: config.db.port,
        database: dbName.name,
        schema: dbName.schema,
        databaseKey: dbName.key,
        dialect: config.db.dialect,
        logging: msg => logger.debug(msg),
        define: config.db.define,
        replication: {
          write: {
            host: config.db.host,
            username: config.db.user,
            password: config.db.pass,
          },
          read: config.db.slaves.map(host => ({
            host,
            username: config.db.user,
            password: config.db.pass,
          })),
        }
      }) :
      new Sequelize({
        host: config.db.host,
        port: config.db.port,
        database: dbName.name,
        schema: dbName.schema,
        databaseKey: dbName.key,
        username: config.db.user,
        password: config.db.pass,
        dialect: config.db.dialect,
        logging: msg => logger.debug(msg),
        define: config.db.define
      }))
    .map(db => {
      db.dialect.supports.schemas = true;
      return db;
    });

  function getDbByKey (key) {
    return dbs.find(db => db.options.databaseKey === key);
  }

  return {

    getConnector (key = 'core') {
      return getDbByKey(key);
    },

    getOp () {
      return Op;
    },

    getQueryTypes () {
      return QueryTypes;
    },

    async connect () {
      try {
        makeAssociations();
        for (const db of dbs) {
          await db.authenticate();
          await db.sync();
        }
      } catch (err) {
        logger.error(err);
        throw err;
      }
    },

    abstractDAO (dao, key = 'core') {
      return {
        makeAssociations: () => {},
        getDAO: () => {
          return getDbByKey(key).models[dao.name];
        }
      };
    }

  };

}

module.exports = DBConnector;

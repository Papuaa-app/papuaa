'use strict';

import { PostgresDbConnector } from './postgresDbConnector.js';
import RedisDbConnector from './redisDbConnector.js';

// TODO - store trackings on mongodb
// import mongoDbConnector from './connectors/dbConnector/mongoDbConnector.js';

export default class DbConnector {

  constructor (deps) {
    this.deps = deps;
    this.mainDbConnector = new PostgresDbConnector(this.deps);
    this.cacheDbConnector = new RedisDbConnector(this.deps);
  }

  async connect () {
    await this.mainDbConnector.connect();
    this.cacheDbConnector.connect();
  }

}
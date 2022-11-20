'use strict';

const os = require('os');
const clui = require('clui');
const pretty = require('pretty-bytes');
const logger = require('./../logger');

module.exports = function () {
  const Gauge = clui.Gauge;
  const total = os.totalmem();
  const free = os.freemem();
  const used = total - free;
  const human = pretty(free);

  logger.info(`Arch: ${os.arch()}`);
  logger.info(`Cores: ${os.cpus().length}`);
  logger.info(`Memory: ${Gauge(used, total, 20, total * 0.8, human + ' free')}`);
  logger.info(`OS: ${os.platform()} ${os.type()}`);
};

'use strict';

const path = require('path');
const _root = path.resolve(__dirname, '../../');

export default {
  root (args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [ _root ].concat(args));
  },
  assetsPath (_path) {
    return path.posix.join('static', _path);
  },
  outputFolder () {
    return this.root('dist');
  },
};
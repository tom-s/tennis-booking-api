'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initTennis = undefined;

var _routes = require('./routes');

var _scheduler = require('./services/scheduler');

var initTennis = exports.initTennis = function initTennis(server) {
  (0, _scheduler.initScheduler)();
  (0, _routes.initRoutes)(server);
};
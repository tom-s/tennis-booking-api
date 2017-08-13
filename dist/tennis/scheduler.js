'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scheduleJob = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _nodeSchedule = require('node-schedule');

var _nodeSchedule2 = _interopRequireDefault(_nodeSchedule);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var scheduleJob = exports.scheduleJob = function scheduleJob(timestamp, job) {
  return new _promise2.default(function (resolve, reject) {
    var date = new Date(timestamp);
    _nodeSchedule2.default.scheduleJob(date, function () {
      resolve(job);
    });
  });
};
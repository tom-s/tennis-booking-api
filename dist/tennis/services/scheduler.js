'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.book = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var doBooking = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(data) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return (0, _nightmare.runBooking)(data);

          case 3:
            _context.next = 5;
            return (0, _email.sendEmail)((0, _email.formatEmail)(data, _email.EMAIL_TEMPLATES['SUCCESS']['BOOKING_DONE']));

          case 5:
            return _context.abrupt('return', true);

          case 8:
            _context.prev = 8;
            _context.t0 = _context['catch'](0);
            _context.next = 12;
            return (0, _email.sendEmail)((0, _email.formatEmail)(data, _email.EMAIL_TEMPLATES['ERROR']));

          case 12:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 8]]);
  }));

  return function doBooking(_x) {
    return _ref.apply(this, arguments);
  };
}();

var scheduleBooking = function () {
  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(data, date) {
    var isWeekend, executionTime, job;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            isWeekend = date.getDay() == 6 || date.getDay() == 0;
            executionTime = isWeekend ? date.getTime() - _utils.MS_PER_HOUR * 6 : date.getTime() - _utils.MS_PER_HOUR * 48;
            job = (0, _extends3.default)({}, data, { executionTime: executionTime });
            _context2.next = 6;
            return (0, _api.dbAddJob)(job);

          case 6:
            _context2.next = 8;
            return (0, _email.sendEmail)((0, _email.formatEmail)(job, _email.EMAIL_TEMPLATES['SUCCESS']['BOOKING_PLANNED']));

          case 8:
            return _context2.abrupt('return', true);

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2['catch'](0);
            _context2.next = 15;
            return (0, _email.sendEmail)((0, _email.formatEmail)(data, _email.EMAIL_TEMPLATES['ERROR']));

          case 15:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this, [[0, 11]]);
  }));

  return function scheduleBooking(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

var runJobs = function () {
  var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5() {
    var jobs, now, pastJobs, futureJobs;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return (0, _api.dbGet)('jobs');

          case 3:
            jobs = _context5.sent;
            now = new Date();
            pastJobs = jobs.items.filter(function (job) {
              return job.executionTime <= now.getTime();
            });
            futureJobs = jobs.items.filter(function (job) {
              return job.executionTime > now.getTime();
            });

            // Do past jobs that should have been done before

            pastJobs.forEach(function () {
              var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(job) {
                return _regenerator2.default.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        console.log("handle past job", job);
                        _context3.next = 3;
                        return doBooking(job);

                      case 3:
                        console.log("now unplan");
                        _context3.next = 6;
                        return (0, _api.dbDeleteJob)(job);

                      case 6:
                      case 'end':
                        return _context3.stop();
                    }
                  }
                }, _callee3, this);
              }));

              return function (_x4) {
                return _ref4.apply(this, arguments);
              };
            }());

            // Schedule future jobs
            futureJobs.forEach(function () {
              var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(job) {
                return _regenerator2.default.wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        console.log("handle future job", job);
                        _context4.next = 3;
                        return scheduleJob(job.executionTime, job);

                      case 3:
                        _context4.next = 5;
                        return doBooking(job);

                      case 5:
                        _context4.next = 7;
                        return (0, _api.dbDeleteJob)(job);

                      case 7:
                      case 'end':
                        return _context4.stop();
                    }
                  }
                }, _callee4, this);
              }));

              return function (_x5) {
                return _ref5.apply(this, arguments);
              };
            }());
            _context5.next = 14;
            break;

          case 11:
            _context5.prev = 11;
            _context5.t0 = _context5['catch'](0);

            console.log('error', _context5.t0);

          case 14:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, this, [[0, 11]]);
  }));

  return function runJobs() {
    return _ref3.apply(this, arguments);
  };
}();

/** Public methods  **/


exports.initScheduler = initScheduler;

var _nodeSchedule = require('node-schedule');

var _nodeSchedule2 = _interopRequireDefault(_nodeSchedule);

var _config = require('../../../config');

var _api = require('./api');

var _nightmare = require('./nightmare');

var _email = require('./email');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var canBookNow = function canBookNow(date) {
  var now = new Date();
  var isWeekend = date.getDay() == 6 || date.getDay() == 0;
  var hoursDifference = (date.getTime() - now.getTime()) / _utils.MS_PER_HOUR;

  return isWeekend ? hoursDifference <= 6 : hoursDifference <= 48;
};

var scheduleJob = function scheduleJob(timestamp, job) {
  return new _promise2.default(function (resolve, reject) {
    var date = new Date(timestamp);
    _nodeSchedule2.default.scheduleJob(date, function () {
      resolve(job);
    });
  });
};

function initScheduler() {
  runJobs();
}

var book = exports.book = function () {
  var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(data, cb) {
    var startTime, _data$dateObj, day, month, year, date, isBookable, success;

    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            startTime = data.startTime, _data$dateObj = data.dateObj, day = _data$dateObj.day, month = _data$dateObj.month, year = _data$dateObj.year;
            date = new Date(year, month - 1, day, startTime); // month start at 0

            isBookable = canBookNow(date);

            if (!isBookable) {
              _context6.next = 9;
              break;
            }

            _context6.next = 6;
            return doBooking(data);

          case 6:
            _context6.t0 = _context6.sent;
            _context6.next = 12;
            break;

          case 9:
            _context6.next = 11;
            return scheduleBooking(data, date);

          case 11:
            _context6.t0 = _context6.sent;

          case 12:
            success = _context6.t0;

            cb(data);
            runJobs();

          case 15:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, this);
  }));

  return function book(_x6, _x7) {
    return _ref6.apply(this, arguments);
  };
}();
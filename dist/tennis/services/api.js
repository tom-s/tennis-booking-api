'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dbDeleteJob = exports.dbAddJob = exports.dbGet = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var dbAddJob = exports.dbAddJob = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(data) {
    var jobs;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return dbGet('jobs');

          case 2:
            jobs = _context.sent;

            jobs.items = [].concat((0, _toConsumableArray3.default)(jobs.items), [data]);
            return _context.abrupt('return', dbUpdate(jobs));

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function dbAddJob(_x) {
    return _ref.apply(this, arguments);
  };
}();

var dbDeleteJob = exports.dbDeleteJob = function () {
  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(_ref3) {
    var executionTime = _ref3.executionTime;
    var jobs;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return dbGet('jobs');

          case 2:
            jobs = _context2.sent;

            jobs.items = jobs.items.filter(function (job) {
              return job.executionTime !== executionTime;
            });
            return _context2.abrupt('return', dbUpdate(jobs));

          case 5:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function dbDeleteJob(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var _jsonFsStore = require('json-fs-store');

var _jsonFsStore2 = _interopRequireDefault(_jsonFsStore);

var _config = require('../../config');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Set up db
var db = (0, _jsonFsStore2.default)(_config.DB_PATH);

var dbUpdate = function dbUpdate(obj) {
  return new _promise2.default(function (resolve, reject) {
    db.add(obj, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(obj);
      }
    });
  });
};

var dbGet = exports.dbGet = function dbGet(key) {
  return new _promise2.default(function (resolve, reject) {
    db.load(key, function (err, res) {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};
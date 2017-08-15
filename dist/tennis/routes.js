"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initRoutes = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _slicedToArray2 = require("babel-runtime/helpers/slicedToArray");

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _scheduler = require("./services/scheduler");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fakeReplyHistory = [{
  "id": 1045378,
  "raw": "2512",
  "extractedData": null
}, {
  "id": 1045307,
  "raw": "Book a tennis court",
  "extractedData": null
}, {
  "id": 1045305,
  "raw": "tomorrow at 5pm",
  "extractedData": "Wed Aug 16 2017 17:00:00 GMT+0200 (RDT)"
}, {
  "id": 1045306,
  "raw": "2",
  "extractedData": "2"
}];

var extractData = function extractData(response) {
  return response.reduce(function (memo, reply) {
    var extractedData = reply.extractedData;

    if (!extractedData) return memo;
    return [].concat((0, _toConsumableArray3.default)(memo), [extractedData]);
  }, []);
};

var initRoutes = exports.initRoutes = function initRoutes(server) {
  server.route({
    method: 'GET', // 'POST'
    path: '/tennis/book',
    handler: {
      async: function async(request, reply) {
        var _this = this;

        return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
          var _extractData, _extractData2, dateStr, court, date, booking;

          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.prev = 0;

                  //const { replyHistory } = request
                  _extractData = extractData(fakeReplyHistory), _extractData2 = (0, _slicedToArray3.default)(_extractData, 2), dateStr = _extractData2[0], court = _extractData2[1];

                  console.log("dateStr", dateStr);
                  date = new Date(dateStr);
                  booking = {
                    date: date,
                    court: parseInt(court)
                  };


                  console.log("booking", booking);

                  (0, _scheduler.book)(booking, function (data) {
                    return reply('booking in progress', data);
                  });
                  _context.next = 12;
                  break;

                case 9:
                  _context.prev = 9;
                  _context.t0 = _context["catch"](0);
                  return _context.abrupt("return", reply('error').code(500));

                case 12:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, _this, [[0, 9]]);
        }))();
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/tennis/results',
    handler: function handler(request, reply) {
      return reply('the current results are');
    }
  });
};
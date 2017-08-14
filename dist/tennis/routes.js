'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initRoutes = undefined;

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _utils = require('./services/utils');

var _scheduler = require('./services/scheduler');

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
  "extractedData": "Tue Aug 15 2017 17:00:00 GMT+0200 (RDT)"
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
    method: 'POST',
    path: '/tennis/book',
    handler: function handler(request, reply) {
      try {
        console.log("request", request);
        //const { replyHistory } = request

        var _extractData = extractData(fakeReplyHistory),
            _extractData2 = (0, _slicedToArray3.default)(_extractData, 2),
            dateObj = _extractData2[0],
            court = _extractData2[1];

        var date = new Date(dateObj);

        var booking = {
          date: date,
          //startTime: pad(date.getHours()),
          //endTime: pad(date.getHours() + 1),
          court: parseInt(court)
        };

        console.log("booking", booking);

        (0, _scheduler.book)(booking, function (data) {
          return reply('booking in progress', data);
        });
      } catch (e) {
        return reply('error').code(500);
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
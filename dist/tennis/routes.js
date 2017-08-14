'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var initRoutes = exports.initRoutes = function initRoutes(server) {
  server.route({
    method: 'POST',
    path: '/tennis/book',
    handler: function handler(request, reply) {
      var date = request.date,
          time = request.time,
          court = request.court;

      var endTime = '';
      var booking = {
        dateObj: extractDate(date),
        startTime: pad(parseInt(time)),
        endTime: pad(parseInt(time) + 1),
        court: parseInt(court)
      };

      book(booking, function (data) {
        return reply('booking in progress');
      });
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
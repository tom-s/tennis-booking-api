'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var initRoutes = exports.initRoutes = function initRoutes(server) {
  server.route({
    method: 'POST',
    path: '/tennis/book',
    handler: function handler(request, reply) {
      return reply('youpi');
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
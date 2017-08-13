'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var initRoutes = exports.initRoutes = function initRoutes(server) {

  server.route({
    method: 'GET',
    path: '/hello',
    handler: function handler(request, reply) {
      return reply('hello world !!!');
    }
  });

  server.route({
    method: 'GET',
    path: '/youpi',
    handler: function handler(request, reply) {
      return reply('youpi');
    }
  });
};
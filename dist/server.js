'use strict';

var _hapi = require('hapi');

var _hapi2 = _interopRequireDefault(_hapi);

var _good = require('good');

var _good2 = _interopRequireDefault(_good);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var server = new _hapi2.default.Server();

server.connection({
  host: 'localhost',
  port: 8000
});

server.route({
  method: 'GET',
  path: '/hello',
  handler: function handler(request, reply) {
    return reply('hello world !!!');
  }
});

// Start the server
server.start(function (err) {
  if (err) {
    throw err;
  }
  console.log('Server running at:', server.info.uri);
});
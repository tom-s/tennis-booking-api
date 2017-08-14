'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initServer = undefined;

var _hapi = require('hapi');

var _hapi2 = _interopRequireDefault(_hapi);

var _good = require('good');

var _good2 = _interopRequireDefault(_good);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initServer = exports.initServer = function initServer() {
  var server = new _hapi2.default.Server();

  server.connection({
    host: '0.0.0.0',
    port: 9000
  });

  server.register({
    register: _good2.default,
    options: {
      reporters: {
        console: [{
          module: 'good-squeeze',
          name: 'Squeeze',
          args: [{
            response: '*',
            log: '*'
          }]
        }, {
          module: 'good-console'
        }, 'stdout']
      }
    }
  }, function (err) {
    if (err) {
      throw err; // something bad happened loading the plugin
    }

    server.start(function (err) {
      if (err) {
        throw err;
      }
      server.log('info', 'Server running at: ' + server.info.uri);
    });
  });

  return server;
};
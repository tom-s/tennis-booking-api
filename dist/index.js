'use strict';

var _server = require('./server');

var _routes = require('./routes');

// Create server
var server = (0, _server.initServer)(server);

// Add routes
(0, _routes.initRoutes)(server);
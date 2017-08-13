'use strict';

var _server = require('./server');

var _tennis = require('./tennis');

// Create server
var server = (0, _server.initServer)(server);

// modules
(0, _tennis.initTennis)(server);
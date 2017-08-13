'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var MS_PER_HOUR = exports.MS_PER_HOUR = 3600000;

var pad = exports.pad = function pad(num) {
  var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;

  var s = num + '';
  while (s.length < size) {
    s = '0' + s;
  }return s;
};
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatEmail = exports.sendEmail = exports.EMAIL_TEMPLATES = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _config = require('../../../config');

var _utils = require('./utils');

var _mailgunJs = require('mailgun-js');

var _mailgunJs2 = _interopRequireDefault(_mailgunJs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Set up emails
var mailer = (0, _mailgunJs2.default)(_config.MAILGUN);

var EMAIL_TEMPLATES = exports.EMAIL_TEMPLATES = {
  SUCCESS: {
    BOOKING_PLANNED: {
      subject: 'Booking planned for %date on court %court',
      text: 'The scheduled job will run on %executionDate, I will not fail you.'
    },
    BOOKING_DONE: {
      subject: 'Booking done for %date on court %court',
      text: "I have not failed you, it's tennis time..."
    }
  },
  ERROR: {
    subject: 'Booking has failed for %date on court %court',
    text: "I have failed you. I'm pretty sure the court is not available."
  }
};

var sendEmail = exports.sendEmail = function sendEmail(_ref) {
  var _ref$subject = _ref.subject,
      subject = _ref$subject === undefined ? 'test email' : _ref$subject,
      _ref$text = _ref.text,
      text = _ref$text === undefined ? 'test email' : _ref$text,
      _ref$to = _ref.to,
      to = _ref$to === undefined ? 'thom.schell@gmail.com' : _ref$to,
      _ref$cc = _ref.cc,
      cc = _ref$cc === undefined ? 'hester.borren@gmail.com' : _ref$cc;

  return new _promise2.default(function (resolve, reject) {
    var message = {
      from: 'tennis-booking@thomster.ddns.net',
      to: to,
      cc: cc,
      subject: subject,
      text: text
    };
    mailer.messages().send(message, function (error, body) {
      if (error) {
        console.log("error sending email");
        reject(error);
      } else {
        console.log("sent email");
        resolve();
      }
    });
  });
};

var formatEmail = exports.formatEmail = function formatEmail(data, template) {
  var court = data.court,
      dateObj = data.dateObj,
      startTime = data.startTime,
      executionTime = data.executionTime;

  var executionDate = new Date(executionTime);
  var replacements = [{
    'name': '%date',
    'value': dateObj.day + '/' + dateObj.month + '/' + dateObj.year + ' at ' + startTime + ':00'
  }, {
    'name': '%executionDate',
    'value': (0, _utils.pad)(executionDate.getDate()) + '/' + (0, _utils.pad)(executionDate.getMonth() + 1) + '/' + (0, _utils.pad)(executionDate.getFullYear()) + ' at ' + (0, _utils.pad)(executionDate.getHours()) + ':' + (0, _utils.pad)(executionDate.getMinutes())
  }, {
    'name': '%court',
    'value': court
  }];
  return {
    subject: replacements.reduce(function (memo, data) {
      return memo.replace(data.name, data.value);
    }, template.subject),
    text: replacements.reduce(function (memo, data) {
      return memo.replace(data.name, data.value);
    }, template.text)
  };
};
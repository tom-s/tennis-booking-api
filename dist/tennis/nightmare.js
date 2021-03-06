'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.runBooking = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _nightmare = require('nightmare');

var _nightmare2 = _interopRequireDefault(_nightmare);

var _config = require('../../config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HTTP_WAIT = 1000;

/* Run nightmare scraper */
var runBooking = exports.runBooking = function runBooking(_ref) {
  var date = _ref.dateObj,
      startTime = _ref.startTime,
      endTime = _ref.endTime,
      court = _ref.court;

  var dateStr = date.day + '/' + date.month + '/' + date.year;
  var courtId = court == 1 ? 21133 : 21134;

  return new _promise2.default(function (resolve, reject) {
    var nightmare = (0, _nightmare2.default)({
      //show: true,
      //openDevTools: true,
      typeInterval: 20,
      pollInterval: 50 //in ms
    });
    nightmare.goto(_config.LOGIN_URL).type('form[name=membreLoginForm] [name=login]', _config.USERNAME).type('form[name=membreLoginForm] [name=password]', _config.PWD).click('form[name=membreLoginForm] input[name=buttonConnecter]').wait('a[title="Tableaux par jour"]').click('a[title="Tableaux par jour"]').wait('a#fd-but-date').evaluate(function (dateStr) {
      window.moveToThisDate(document.tableauJourForm, $('date'), dateStr);
    }, dateStr).wait(HTTP_WAIT) // give some time fot the page to reload -> this is dirty but i haven't found any better
    .evaluate(function (dateStr, startTime, courtId, done) {
      // It's a bit dodgy code, but at least it works in electron (no need to be compiled)
      var boxes = document.querySelectorAll('.donnee');
      var ids = [];
      for (var i = 0; i < boxes.length; i++) {
        var box = boxes[i];
        var boxId = box.getAttribute('id');
        if (boxId) {
          ids = ids.filter(function (id) {
            return id !== boxId;
          });
          ids.push(boxId);
        }
      }
      var id = ids.find(function (id) {
        return id.indexOf(courtId) !== -1 && id.indexOf('null') === -1;
      });
      var idCreneau = parseInt(id.split('_')[0].replace('creneau', ''), 10);
      window.ajoutReservation(idCreneau, startTime + ':00', dateStr);
      done(null, idCreneau);
    }, dateStr, startTime, courtId).evaluate(function () {
      // Make hidden inputs visible so that we can modify their values
      document.querySelector('#identifiantCreneau').type = 'text';
      document.querySelector('#date').type = 'text';
      document.querySelector('#identifiantMembreDeux_value').type = 'text';
      document.querySelector('#nomMembre2_value').type = 'text';
      return true;
    }).insert('#identifiantMembreDeux_value', _config.PLAYERS.HESTER.id).insert('#nomMembre2_value', _config.PLAYERS.HESTER.name).insert('#identifiantMembreDeux', _config.PLAYERS.HESTER.name).click('input[name=buttonRechercher]').wait('.dialog input[name=buttonRechercher]').click('.dialog input[name=buttonRechercher]').wait(HTTP_WAIT).end().then(function () {
      resolve(true);
    }).catch(function (error) {
      console.log("error", error);
      reject(error);
    });
  });
};
'use strict';

var schedule = require('node-schedule'),
    moment = require('moment');

var parse = function parse(text, key) {
  return text.toLowerCase().includes(key.toLowerCase());
};

var Remind = {

  init: function init() {
    return this;
  },

  funnel: function funnel(data, send_message) {
    var _this = this;

    if (parse(data.text, 'remind me')) {
      var reminderData = data.text.match(/(\d+)\s(\w+)(?:\sto\s|\s)["']([^"]*)["']/i);
      if (reminderData && reminderData.length === 4) {
        this.duration = reminderData[1];
        this.unit = reminderData[2];
        this.message = reminderData[3];

        var date = moment().add(this.duration, this.cleanseUnit(this.unit))._d;

        schedule.scheduleJob(date, function () {
          var message = 'Reminder! ' + _this.duration + ' ' + _this.unit + ' ago, you told me "' + _this.message + '"';
          send_message(message);
        });
      }
    }
  },

  cleanseUnit: function cleanseUnit(unit) {
    if (!unit.endsWith('s')) {
      return unit + 's';
    } else {
      return unit;
    }
  }

};

module.exports = Remind;
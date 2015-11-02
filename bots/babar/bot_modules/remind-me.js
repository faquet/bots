'use strict';

const schedule = require('node-schedule'),
      moment = require('moment'),
      Slack = require('../controllers/slack');

const RemindMe = {

  create: function(reminderData, send_message) {
    if (reminderData.length === 4) {
      this.duration = reminderData[1];
      this.unit = reminderData[2];
      this.message = reminderData[3];

      let date = moment().add(this.duration, this.cleanseUnit(this.unit))._d;

      schedule.scheduleJob(date, () => {
        let message = `Reminder! ${this.duration} ${this.unit} ago, you told me "${this.message}"`;
        send_message(message);
      });
    }
  },

  cleanseUnit: function(unit) {
    if (!unit.endsWith('s')) {
      return unit + 's';
    } else {
      return unit;
    }
  },


};


module.exports = RemindMe;




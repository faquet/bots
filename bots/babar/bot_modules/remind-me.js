'use strict';

let schedule = require('node-schedule'),
    moment = require('moment'),
    Slack = require('../controllers/slack');

let RemindMe = {

  create: function(reminderData, send_message) {
    console.log('reminderData: ', reminderData);
    if (reminderData.length === 4) {
      this.duration = reminderData[1];
      this.unit = reminderData[2];
      this.message = reminderData[3];

      let date = moment().add(this.duration, this.cleanseUnit(this.unit))._d;

      schedule.scheduleJob(date, function(){
        let message = `Reminder! ${this.duration} ${this.unit} ago, you told me "${this.message}"`;
        send_message(message);
      }.bind(this));
    }
  },

  cleanseUnit: function(unit) {
    if (!unit.match(/s$/i)) {return unit + 's';};
  },


};


module.exports = RemindMe;




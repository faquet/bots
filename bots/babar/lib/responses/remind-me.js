'use strict';

let store = require('../store'),
schedule = require('node-schedule'),
moment = require('moment'),
Slack = require('../controllers/slack');

let RemindMe = {

  create: function(reminderData, send_message) {
    if (reminderData.length === 5) {
      this.duration = reminderData[2];
      this.unit = reminderData[3];
      this.message = reminderData[4];

      let date = moment().add(this.duration, this.cleanseUnit(this.unit))._d;

        console.log('this.unit: ', this.unit);
      schedule.scheduleJob(date, function(){
        let message = `Reminder! ${this.duration} ${this.unit} ago, you told me "${this.message}"`;
        send_message(message);
      }.bind(this));
    }
  },

  cleanseUnit: function(unit) {
    if (unit.match(/(second)/i)) {return 'seconds';};
    if (unit.match(/(minute)/i)) {return 'minutes';};
    if (unit.match(/(hour)/i)) {return 'hours';};
    if (unit.match(/(day)/i)) {return 'days';};
    if (unit.match(/(month)/i)) {return 'months';};
  },


};


module.exports = RemindMe;




'use strict';

const schedule = require('node-schedule'),
      moment = require('moment');

const parse = (text, key) => {
  return text.toLowerCase().includes(key.toLowerCase());
};

const Remind = {

  init: function(){
    return this;
  },

  funnel: function(data, send_message) {
    if (parse(data.text, 'remind me')) {
      let reminderData = data.text.match(/(\d+)\s(\w+)(?:\sto\s|\s)["']([^"]*)["']/i);
      if (reminderData && reminderData.length === 4) {
        this.duration = reminderData[1];
        this.unit = reminderData[2];
        this.message = reminderData[3];

        let date = moment().add(this.duration, this.cleanseUnit(this.unit))._d;

        schedule.scheduleJob(date, () => {
          let message = `Reminder! ${this.duration} ${this.unit} ago, you told me "${this.message}"`;
          send_message(message);
        });
      }
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


module.exports = Remind;




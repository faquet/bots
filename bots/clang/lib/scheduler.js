'use strict';
const CronJob = require('cron').CronJob;

module.exports = (bot, time, text) => {
  return new CronJob(time, () => {
    bot.post('channel', 'roughhouse', text);
  }, null, true);
};
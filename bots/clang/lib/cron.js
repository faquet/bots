const Clang = require('../../clang');
const CronJob = require('cron').CronJob;
const cron = {};

cron.biscuit = new CronJob('00 00 * * * *', () => {
  Clang.postMessage('I just ate a biscuit.');
}, null, true);

cron.triscuit = new CronJob('00 30 * * * *', () => {
  Clang.postMessage('I just ate a triscuit.');
}, null, true);

module.exports = cron;
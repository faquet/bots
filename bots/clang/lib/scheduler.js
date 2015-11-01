'use strict';
const CronJob = require('cron').CronJob;

module.exports = (clang) => {

  cron.biscuit = new CronJob('00 00 * * * *', () => {
    let params = store.attributes;
    params.token = store.token;
    params.channel = store.test;
    params.text = 'I just ate a biscuit.';

    clang.postMessage(params);
  }, null, true);

  cron.triscuit = new CronJob('00 30 * * * *', () => {
    let params = store.attributes;
    params.token = store.token;
    params.channel = store.test;
    params.text = 'I just ate a triscuit.';

    clang.postMessage(params);
  }, null, true);

  return cron;
};
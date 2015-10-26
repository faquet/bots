'use strict';
const Bot = require('slackbots');
const CronJob = require('cron').CronJob;

module.exports = () => {

  const clang = new Bot({
      token: process.env.CLANG_KEY,
      name: 'clang'
  });

  clang.on('start', () => {
    let params = {
        icon_url: 'http://geekdad.com/images_blogs/photos/uncategorized/2007/06/08/cb2.jpg'
    };
    clang.postMessageToChannel('roughhouse', 'Clanging and banging.', params);
  });

  new CronJob('00 00 * * * *', () => {
    clang.postMessageToChannel('general', 'Clang. Every hour, on the hour.', params);
  }, null, true);

}();

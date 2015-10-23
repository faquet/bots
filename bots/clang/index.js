'use strict';
let Bot = require('slackbots');

module.exports = () => {

  let clang = new Bot({
      token: process.env.CLANG_KEY,
      name: 'calng'
  });

  clang.on('start', () => {
    let params = {
        icon_emoji: ':nail_care:'
    };

    clang.postMessageToChannel('general', 'Clanging and banging.', params);
  });
}();
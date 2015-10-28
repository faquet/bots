
'use strict';

const _ = require('underscore'),
      store = require('./lib/store'),
      Message = require('./lib/responses/message'),
      Bot = require('./lib/init');


module.exports = () => {

  let babar = new Bot({
    token: store.token,
    name: store.name,
  });

  babar.on('start', () => {
    console.log('Babar can\'t feel his legs');
  });

  babar.on('message', (data) => {
    Message.init(data);
  });


}();
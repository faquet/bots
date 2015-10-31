
'use strict';

const _ = require('underscore'),
      store = require('./lib/store'),
      Response = require('./lib/responses/index'),
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
    Response.init(data);
    console.log('message data: ', data);
  });


}();
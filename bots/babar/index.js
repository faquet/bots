
// 'use strict';

// const store = require('./config/store'),
//       Bot = require('./config/bot');


// Bot(store);


'use strict';
const store = require('./config/store');
const Bot = require('../../src');


Bot(store).then(function(babar){
  babar.createMessage('yoyo', 'yoyo', 'plickity-plow');
});


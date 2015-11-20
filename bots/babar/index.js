
// 'use strict';

// const store = require('./config/store'),
//       Bot = require('./config/bot');


// Bot(store);


'use strict';
const store = require('./config/store');
const Bot = require('../../src');


Bot(store).then(function(babar){
  console.log('babar', babar);
  babar.createMessage('yoyo', 'yoyo', 'plickity-plow');
  babar.createMessage('funyuns', 'funyuns', 'OH DOZ FUNYUNS');
});


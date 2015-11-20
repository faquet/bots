
// 'use strict';

// const store = require('./config/store'),
//       Bot = require('./config/bot');


// Bot(store);


'use strict';

const Babar_Store = require('./config/store');
const Babar = require('../../src')(Babar_Store);

const Clang_Store = {
  token      : process.env.CLANG_KEY,
  name       : 'clang',
  username   : 'clang',
  real_name  : '__clang__',
  icon_url   : 'http://geekdad.com/images_blogs/photos/uncategorized/2007/06/08/cb2.jpg'
};
const Clang = require('../../src')(Clang_Store);

Babar.createMessage('yoyo', 'plickity-plow');
Babar.createMessage('funyuns', 'OH DOZ FUNYUNS');
Babar.createMessage('who wants sum?', 'I do! I want some!');



Clang.createMessage('facebook', 'face your book');
Clang.createMessage('clang on', 'PEEEewwww do loo pew pew');

console.log('clang', Clang);
console.log('Babar', Babar);

// Bot.then(function(babar){
//   console.log('babar', babar);
//   babar.createMessage('yoyo', 'yoyo', 'plickity-plow');
//   babar.createMessage('funyuns', 'funyuns', 'OH DOZ FUNYUNS');
// });


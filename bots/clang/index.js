'use strict';
const Bot = require('../../src/bot');
const scheduler = require('./lib/scheduler');

const clang = new Bot({
  token      : process.env.CLANG_KEY,
  name       : 'clang',
  username   : 'clang',
  real_name  : '__clang__',
  icon_url   : 'http://geekdad.com/images_blogs/photos/uncategorized/2007/06/08/cb2.jpg'
});

clang.on('start', () => {
  clang.post('channel', 'roughhouse', 'Sup dudez');
  scheduler(clang);
});

module.exports = clang;
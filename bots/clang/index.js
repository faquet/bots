'use strict';

module.exports = {
  token      : process.env.CLANG_KEY,
  name       : 'clang',
  username   : 'clang',
  real_name  : '__clang__',
  icon_url   : 'http://geekdad.com/images_blogs/photos/uncategorized/2007/06/08/cb2.jpg',
  triggers   : {
    'binary': 'binary',
    'gif' : 'gif'
  },
  methods: {
    binary: function binary(data) {
      console.log('I work.');
    },
    gif: function gif(data) {
      console.log('Me work.');
    }
  }
};
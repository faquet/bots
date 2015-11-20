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
      console.log(data);
      const params = {
        channel: data.channel,
        text: `I can't do that yet. In fact I refuse.`
      };
      params.username = this.username;
      params.icon_url = this.icon_url;
      params.token = this.token;
      params.name = this.name;
      console.log('Me work.');
      return this.postMessage(params);
    }
  }
};
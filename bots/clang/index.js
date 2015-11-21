'use strict';

module.exports = {
  store: {
    token      : process.env.CLANG_KEY,
    name       : 'clang',
    username   : 'clang',
    real_name  : '__clang__',
    icon_url   : 'http://geekdad.com/images_blogs/photos/uncategorized/2007/06/08/cb2.jpg',
  },
  triggers   : {
    'clean': 'clean',
    'gif' : 'gif',
    'image me' : 'image'
  },
  methods: {
    clean: function clean(data) {
      return this.postMessage({
        channel: data.channel,
        text: `Goddamnit, I'm not your fucking servant. But what do you need? I have no problem doing it for you.`
      });
    },
    gif: function gif(data) {
      return this.postMessage({
        channel: data.channel,
        text: `I can't do that yet. In fact I refuse.`
      });
    },
    image: function image(data) {
      return this.postMessage({
        channel: data.channel,
        text: `Fuck off man!`
      });
    }
  }
};
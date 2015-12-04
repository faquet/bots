'use strict';

module.exports = {
  token        : process.env.CLANG_KEY,
  name         : 'clang',
  username     : 'clang',
  real_name    : '__clang__',
  icon_url     : 'https://avatars.slack-edge.com/2015-10-27/13322469031_0dea48e972bdcc02ec0e_72.jpg',
  events: {
    'clean'    : 'clean',
    'gif'      : 'gif',
    'image me' : 'image'
  },
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
};
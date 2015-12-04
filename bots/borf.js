'use strict';

module.exports = {
  token        : process.env.B0RF_KEY,
  name         : 'b0rf',
  username     : 'b0rf',
  real_name    : 'b0rf b0rf',
  icon_url     : 'https://avatars.slack-edge.com/2015-11-22/15093041921_8590eaf4dbc9820e8249_72.jpg',
  onStart      : 'b0rf city.',
  events: {
    'sup'      : 'angry',
    'go wild'  : 'wild',
    'image me' : 'image'
  },
  angry: function angry(data) {
    return this.postMessage({
      channel: data.channel,
      text: `Huh? Stop.`
    });
  },
  wild: function wild(data) {
    return this.postMessage({
      channel: data.channel,
      text: `Nah man, just chill right now.`
    });
  },
  image: function image(data) {
    return this.postMessage({
      channel: data.channel,
      text: `Fuck off man!`
    });
  }
};
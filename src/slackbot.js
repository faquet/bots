import Proto from '@evturn/proto'
import qs from 'querystring'
import ws from 'ws'
import r from 'request'

const EventEmitter = require('events').EventEmitter

const Bot = Proto.extend({
  preconfigure: function(params) {
    this.mixin(this, params)
    this.mixin(this, EventEmitter.prototype)

    return this
  },
  connect: function connect() {
    this.start()
    .then(data => {
      Object.defineProperties(this, {
        'id': {
          value: data.self.id,
          enumerable: true,
          writable: true,
          configurable: true
        },
        'url': {
          value: data.url,
          enumerable: true,
          writable: true,
          configurable: true
        },
        'team': {
          value: data.team,
          enumerable: true,
          writable: true,
          configurable: true
        }
      })

      return this
    })
    .then(data => {
      const socket = new ws(this.url)

      socket.on('open', data => this.emit('open', data))
      socket.on('close', data => this.emit('close', data))
      socket.on('message', data => {
        try {
          this.emit('message')
          this.reply(data)
        }
        catch (err) {
          console.log(err)
        }
      });
    })
    .then(data => this.emit('start'))
    .catch(err => console.log(err))
  },
  reply: function reply(message) {
    const data = JSON.parse(message);
    const text = data.text;
    const mention = `<@${this.id}> `;

    if (text && text.startsWith(mention)){
      const command = text.substr(mention.length, text.length);
      const imageMe = 'image me ';
      const remindMe = 'remind me ';
      if (command.startsWith(imageMe)) {
        data.query = command.substr(imageMe.length, text.length);
        return this.postImage(data);
      } else if (command.startsWith(remindMe)) {
          data.query = command.substr(remindMe.length, text.length);
          return this.setReminder(data);
      } else {
        for (let event in this.events) {
          if (text.includes(event)) {
            const method = this.events[event];
            return this[method](data);
          }
        }
      }
    }
  },
  request: function request(method, params) {
    params.token = this.token
    params.name = this.name
    params.icon_url = this.icon_url
    params.username = this.username
    params.real_name = this.real_name

    const url = `https://slack.com/api/${method}?${qs.stringify(params)}`;

    return new Promise((resolve, reject) => {
      r(url, (error, response, body) => {
        if (!error && response.statusCode === 200) {
          resolve(JSON.parse(body))
        } else if (error || response.statusCode !== 200) {
          throw new Error(`${response.statusCode}: ${error}`)
        }
      });
    });
  },
  postMessage: function postMessage(params) {
    return this.request('chat.postMessage', params)
  },
  postImage: function postImage(params) {
    params.channel = params.channel
    params.text = 'Gonna post soon, I swear.'

    return this.request('chat.postMessage', params)
  },
  setReminder: function postImage(params) {
    params.channel = params.channel
    params.text = 'Gonna set reminders soon, I swear.'

    return this.request('chat.postMessage', params)
  },
  start: function start() {
    if (this.onStart) {
      this.on('start', () => console.log(`[bot] ${this.onStart}`));
    } else {
      this.on('start', () => console.log(`[bot] @${this.username} connected to ${this.team.name}.slack`));
    }

    return this.request('rtm.start', this)
  }
});

module.exports = function createBot(params) {
  if (!params.token) {
    throw new Error('No token was provided');
  }

  const bot = Bot.new(params);

  bot.preconfigure(params);
  bot.connect();

  return bot;
};
import express from 'express'
import bots from '../../bots'
import request from 'request'
import qs from 'querystring'
import ws, { Server as WebSocketServer } from 'ws';
import { Observable, Observer } from 'rx'
import { DOM } from 'rx-dom'

const app = express()

const logger = (x, bot, e) => {
  if (x !== undefined) {
    const { type } = JSON.parse(x)

    if (type !== 'presence_change') {
      const { self: {name } } = bot

      console.log(`\nEvent : ${e}`, `\nBot   : ${name}`, `\nValue : ${x}`)
    }
  }
}

const startApi = bot => sendRequest(`https://slack.com/api/rtm.start?${qs.stringify(bot)}`)
const postApi = bot => sendRequest(`https://slack.com/api/chat.postMessage?${qs.stringify(bot)}`)

const sendRequest = url => {
  return Observable.create(x => {
    request(url, (error, response, body) => {
      if (error) {
        x.onError(error)
      } else if (!error && response.statusCode === 200) {
        x.onNext(JSON.parse(body))
      }

      x.onCompleted()
    })
  })
}

const bots$ = Observable.from(bots)

const socket$ = bots$
  .flatMap(startApi)
  .map(bot => [ bot, new ws(bot.url) ])
  .subscribe(
    x => {
      const [bot, ws] = x

      Observable.fromEvent(ws, 'open')
        .subscribe(x => logger(x, bot, 'open'))

      Observable.fromEvent(ws, 'close')
        .subscribe(x => logger(x, bot, 'close'))

      Observable.fromEvent(ws, 'message')
        .subscribe(x => logger(x, bot, 'message'))
    },
    e => console.log('SOCKET$ We errored:', e),
    _ => console.log('We completed.')
  )

const post$ = Observable.interval(5000)
  .flatMap(() => bots$)
  .map(x => {
    return {
      channel: 'C0D1VK2P9',
      text: `My name is ${x.name} and I came here to show you my face. ${x.icon_url}`,
      token: x.token,
      username: x.username,
      icon_url: x.icon_url,
      unfurl_links: true
    }
  })
  .flatMap(postApi)
  .subscribe(
    x => console.log('Post Message:', x),
    e => console.log('Post Message Error:', e),
    x => console.log('Post Message Complete')
  )

app.listen(3000, _ => console.log('Swerver listening on 3OOO'))
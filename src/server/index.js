import express from 'express'
// import db from '../../bots/babar/config/mongoose'
// import babar from '../../bots/babar/index.js'
import bot from '../slackbot'
import { clang, borf, pancakes } from '../../bots'
import request from 'request'
import qs from 'querystring'
import ws, { Server as WebSocketServer } from 'ws';
import { Observable, Observer } from 'rx'
import { DOM } from 'rx-dom'

const app = express()

const sendRequest = bot => {
  const url = `https://slack.com/api/rtm.start?${qs.stringify(bot)}`

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

const bots$ = Observable.from([ clang, borf, pancakes ])
  .flatMap(sendRequest)

const socket$ = bots$
  .map(bot => new ws(bot.url))
  .subscribe(
    ws => {
      Observable.fromEvent(ws, 'open')
        .subscribe(
          x => console.log('we open dog.')
        )

      Observable.fromEvent(ws, 'close')
        .subscribe(
          x => console.log('we closed dog.')
        )

      Observable.fromEvent(ws, 'message')
        .subscribe(
          x => console.log('we got a message dog.', x)
        )
    },
    e => console.log('SOCKET$ We errored:', e),
    _ => console.log('We completed.')
  )
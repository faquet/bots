import express from 'express'
// import db from '../../bots/babar/config/mongoose'
// import babar from '../../bots/babar/index.js'
import bot from '../slackbot'
import { clang, borf, pancakes } from '../../bots'
import request from 'request'
import qs from 'querystring'
import ws from 'ws'
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
    x => console.log(x),
    e => console.log('socket We errored:', e),
    x => console.log('We completed.')
  )

const open$ = Observable.fromEvent(socket$, 'open')
const close$ = Observable.fromEvent(socket$, 'close')

app.listen(3000, _ => console.log('Now Serving.'))
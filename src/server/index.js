import express from 'express'
import db from '../../bots/babar/config/mongoose'
import bot from '../slackbot'
import { clang, borf, pancakes } from '../../bots'
import babar from '../../bots/babar/index.js'
import request from 'request'
import qs from 'querystring'
import { Observable } from 'rx'

const app = express()

const sendRequest = ({ token, name, icon_url, username, real_name }) => {

  const url = `https://slack.com/api/rtm.start?${qs.stringify({ token, name, icon_url, username, real_name })}`

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

  .subscribe(
    x => console.log(x),
    e => console.log('We errored:', e),
    x => console.log('We completed.')
  )

app.listen(3000, _ => console.log('Now Serving.'))
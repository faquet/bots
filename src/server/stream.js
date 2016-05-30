import bots from '../../bots'
import request from 'request'
import qs from 'querystring'
import ws, { Server as WebSocketServer } from 'ws';
import * as Rx from 'rx'

const observer = Rx.Observer.create(
  x => console.log('Next:', x),
  e => console.log('Error:', e),
  _ => console.log('Complete.')
)

const sendRequest = url => (
  Rx.Observable.create(x => {
    request(url, (error, response, body) => {
      if (error) {
        x.onError(error)
      } else if (!error && response.statusCode === 200) {
        x.onNext(JSON.parse(body))
      }

      x.onCompleted()
    })
  })
)

const startRequest = bot => (
  sendRequest(`https://slack.com/api/rtm.start?${qs.stringify(bot)}`)
)
const postRequest = bot => (
  sendRequest(`https://slack.com/api/chat.postMessage?${qs.stringify(bot)}`)
)

const bots$ = Rx.Observable.from(bots)
const socket$ = bots$
  .flatMap(startRequest)
  .map(x => new ws(x.url))
  .map(socket => (
    Rx.Observable.combineLatest(
      Rx.Observable.fromEvent(socket, 'open'),
      Rx.Observable.fromEvent(socket, 'close'),
      Rx.Observable.fromEvent(socket, 'message')
    )
  ))

const postMessage$ = bots$
  .map(x => ({
    channel: 'C0D1VK2P9',
    text: `My name is ${x.name} and I came here to show you my face. ${x.icon_url}`,
    token: x.token,
    username: x.username,
    icon_url: x.icon_url,
    unfurl_links: true
  }))
  .flatMap(postRequest)

function main() {
  Rx.Observable
    .combineLatest(socket$, postMessage$)
    .subscribe(observer)
}

export default main()

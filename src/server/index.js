import express from 'express'
import db from '../../bots/babar/config/mongoose'
import bot from '../slackbot'
import { clang, borf, pancakes } from '../../bots'
import babar from '../../bots/babar/index.js'

const app = express()

bot(clang)
bot(borf)
bot(pancakes)

app.listen(3000, _ => console.log('Now Serving.'))
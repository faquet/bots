import express from 'express'
import mongoose from '../../bots/babar/config/mongoose'
import bot from '../slackbot'
import { clang, borf, pancakes } from '../../bots'
// import babar from '../../bots/babar/index.js'

const app = express()
const db = mongoose()

bot(clang)
bot(borf)
bot(pancakes)

app.listen(3000, _ => console.log('Now Serving.'))
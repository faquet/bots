import mongoose from 'mongoose'

mongoose.connect('mongodb://127.0.0.1/bot_database')
mongoose.connection.on('error', console.error.bind(console, 'connection error:'))
mongoose.connection.once('open', _ => console.log('DB connected'))

require('../models/message')
import express from 'express'
import stream from './stream'

const app = express()

app.listen(3000, _ => console.log('Swerver listening on 3OOO'))

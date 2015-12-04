'use strict';
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const express = require('express');
const app = express();
const mongoose = require('./bots/babar/config/mongoose');
const db = mongoose();

const SLACKBOT = require('./src').turn;
const bots = require('./bots');

const clang = SLACKBOT(bots.clang);
const borf = SLACKBOT(bots.borf);
const pancakes = SLACKBOT(bots.pancakes);
const babar = SLACKBOT(bots.babar);

app.listen(3000, () => console.log('Served'));
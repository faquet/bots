'use strict';
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const express = require('express');
const app = express();
const mongoose = require('./bots/babar/config/mongoose');
const db = mongoose();

/**
 *
 * Application
 * @params {object} - Object describing a bot's properties
 *
 */

const SLACKBOT = require('./src').turn;

/**
 *
 * Bots properties
 *
 */

const bots = require('./bots');


/**
 *
 * Bot Instances
 *
 */

const clang = SLACKBOT(bots.clang);
const borf = SLACKBOT(bots.borf);
const pancakes = SLACKBOT(bots.pancakes);
const babar = require('./bots/babar/index.js');


app.listen(3000, () => console.log('Served'));
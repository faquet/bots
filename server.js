'use strict';
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const express = require('express');
const app = express();
const mongoose = require('./bots/babar/config/mongoose');
const db = mongoose();
const bots = require('./bots');

bots();

app.listen(3000);
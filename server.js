'use strict';
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const express = require('express');
const app = express();
const mongoose = require('./bots/babar/config/mongoose');
const db = mongoose();


const clang = require('./bots/clang');
require('./bots/babar');


app.listen(3000);
'use strict';
const express = require('express');
const app = express();

const clang = require('./bots/clang');
require('./bots/babar');

app.listen(3000);
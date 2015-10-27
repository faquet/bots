'use strict';
const express = require('express');
const app = express();
const Clang = require('./bots/clang');

require('./bots/babar');

app.listen(3000);
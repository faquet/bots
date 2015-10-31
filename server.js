'use strict';
const express = require('express');
const app = express();

const clang = require('./bots/clang');

clang.on('start', () => {
  clang.post('roughhouse', 'I work now. I work for UPS.');
});

require('./bots/babar');

app.listen(3000);
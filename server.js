'use strict';
let express = require('express');
let app = express();

require('./bots/clang');

app.listen(3000);
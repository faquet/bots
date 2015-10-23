'use strict';
let express = require('express');
let app = express();

require('./bots/clang');
require('./bots/babar');

app.listen(3000);
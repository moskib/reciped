const express = require('express');
require('./db/mongoose');

const app = express();

require('./routers')(app);

module.exports = app;

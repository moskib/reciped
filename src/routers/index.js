const express = require('express');
const users = require('./user');

module.exports = function(app) {
  app.use(express.json());
  app.use('/users', users);
};

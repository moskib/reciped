const express = require('express');
const users = require('./user');
const recipes = require('./recipe');
const categories = require('./category');

module.exports = function (app) {
  app.use(express.json());
  app.use('/users', users);
  app.use('/recipes', recipes);
  app.use('/categories', categories);
};

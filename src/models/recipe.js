const mongoose = require('mongoose');
const validator = require('validator');

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  ingredients: [
    {
      name: String,
      amount: String
    }
  ],
  defaultUnit: String,
  defaultImage: String,
  images: [
    {
      image: Buffer
    }
  ]
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;

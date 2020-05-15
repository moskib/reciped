const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  ingredients: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Ingredient',
    },
  ],
  instructions: String,
  defaultUnit: String,
  defaultImage: String,
  images: [
    {
      image: Buffer,
    },
  ],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: 'Category',
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;

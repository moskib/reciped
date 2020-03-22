const mongoose = require('mongoose');

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
  instructions: String,
  defaultUnit: String,
  defaultImage: String,
  images: [
    {
      image: Buffer
    }
  ],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;

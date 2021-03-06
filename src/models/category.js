const mongoose = require('mongoose');

const contegorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const Category = mongoose.model('Category', contegorySchema);

module.exports = Category;

const Recipe = require('../models/recipe');

const addRecipe = async (recipe, ownerId) => {
  const recipeObj = new Recipe({
    ...recipe,
    owner: ownerId
  });
  await recipeObj.save();
  return recipeObj;
};

module.exports = {
  addRecipe
};

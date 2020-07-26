const Recipe = require('../models/recipe');

const addRecipe = async (recipe, ownerId) => {
  const recipeObj = new Recipe({
    ...recipe,
    owner: ownerId,
  });
  await recipeObj.save();
  return recipeObj;
};

const getRecipeById = async (recipeId) => {
  const recipe = await Recipe.findById(recipeId);
  return recipe;
};

const updateRecipe = async (recipeId, objWithUpdates) => {
  const recipe = await getRecipeById(recipeId);

  const updateFields = Object.keys(objWithUpdates);
  updateFields.forEach(
    (updateField) => (recipe[updateField] = objWithUpdates[updateField])
  );

  await recipe.save();
  return recipe;
};

const checkUpdateFields = (recipeToUpdate) => {
  const updates = Object.keys(recipeToUpdate);
  const allowedUpdates = [
    'name',
    'ingredients',
    'instructions',
    'defaultUnit',
    'defaultImage',
    'images',
    'category',
  ];
  const isValidOperation = updates.every((udpate) => {
    return allowedUpdates.includes(udpate);
  });
  return isValidOperation;
};

module.exports = {
  addRecipe,
  getRecipeById,
  checkUpdateFields,
  updateRecipe,
};

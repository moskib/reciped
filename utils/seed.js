const Category = require('../src/models/category');
const Ingredient = require('../src/models/ingredient');
const Recipe = require('../src/models/recipe');
const User = require('../src/models/ingredient');
const mongoose = require('mongoose');

const recipes = [
  {
    name: 'Keto Thai salad',
    ingredients: [
      { name: 'mint', amount: 50, unit: 'grams' },
      { name: 'parsely', amount: 50, unit: 'grams' },
      { name: 'caschews', amount: 100, unit: 'grams' },
      { name: 'peanuts', amount: 100, unit: 'grams' },
      { name: 'red onion', amount: 1, unit: 'whole' },
      { name: 'lemons', amount: 5, unit: 'whole' },
      { name: 'soy sauce', amount: 1, unit: 'tbsp' },
      { name: 'fish sauce', amount: 1, unit: 'tsp' },
      { name: 'pepper flakes', amount: 1, unit: 'tsp' },
    ],
    instructions: 'combine all',
    category: { name: 'thai' },
    owner: {
      firstName: 'dear',
      lastName: 'god',
      email: 'deargod@deargod.com',
      password: '$2a$08$nAyAFd9X2MqxPJEXbu.UTuI4Bku78QlDrkDwPPsC0u42FBug/Dhgm',
    },
  },
];

/** */
async function seed() {
  mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });
  await Category.deleteMany({});
  await Ingredient.deleteMany({});
  await Recipe.deleteMany({});
  await User.deleteMany({});

  for (const recipe of recipes) {
    const newRecipe = new Recipe();
    for (const ingredient of recipe.ingredients) {
      const { _id: ingredientId } = await new Ingredient({
        name: ingredient.name,
        amount: ingredient.amount,
        unit: ingredient.unit,
      }).save();
      newRecipe.ingredients = { _id: ingredientId };
    }
    const { _id: categoryId } = await new Category({
      name: recipe.category.name,
    }).save();
    newRecipe.category = { _id: categoryId };
    const { _id: ownerId } = await new User({ ...recipe.owner });
    newRecipe.owner = { _id: ownerId };

    await newRecipe.save();
  }

  mongoose.disconnect();

  console.info('Done!');
}

seed();

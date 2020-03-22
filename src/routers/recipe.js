const express = require('express');
const auth = require('../middlewares/auth');
const recipeService = require('../services/recipeService');

const router = new express.Router();

// CREATE NEW RECIPE
router.post('', auth, async (req, res) => {
  try {
    const recipe = await recipeService.addRecipe(req.body, req.user._id);
    res.status(201).send(recipe);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;

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

// UPDATE RECIPE
router.patch('/:id', auth, async (req, res) => {
  const fieldsAreValid = recipeService.checkUpdateFields(req.body);

  if (!fieldsAreValid) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }
  try {
    const udpatedRecipe = await recipeService.updateRecipe(
      req.params.id,
      req.body
    );
    return res.status(200).send(udpatedRecipe);
  } catch (e) {
    res.status(304).send();
  }
});

module.exports = router;

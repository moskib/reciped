const express = require('express');
const auth = require('../middlewares/auth');
const Category = require('../models/category');

const router = new express.Router();

// CREATE NEW CATEGORY
router.post('', auth, async (req, res) => {
  try {
    const categoryObj = new Category({
      ...req.body,
    });
    await categoryObj.save();
    res.status(201).send(categoryObj);
  } catch (e) {
    res.status(400).send(e);
  }
});

// UPDATE CATEGORY
router.patch('/:id', auth, async (req, res) => {
  try {
    const categoryId = req.params.id;
    const newCategory = req.body;

    const udpatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      newCategory
    );
    udpatedCategory.save();
    res.status(201).send();
  } catch (e) {
    res.status(400).send(e);
  }
});

// GET Categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).send(categories);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Remove Category
router.delete('/:id', auth, async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    res.status(200).send(category);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;

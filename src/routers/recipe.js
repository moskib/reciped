const express = require('express');
const auth = require('../middlewares/auth');

const router = new express.Router();

// CREATE NEW RECIPE
router.post('', auth, async (req, res) => {});

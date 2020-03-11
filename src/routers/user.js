const express = require("express");
const User = require("../models/user");
const auth = require("../middlewares/auth");

const router = new express.Router();

// CREATE NEW USER
router.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    // //TODO: send welcome email...
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

// LOGIN USER
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send();
  }
});

// LOGOUT USER
router.post("/users/logout", auth, async (req, res) => {
  console.log(req);
  try {
    req.user.tokens = req.user.tokens.filter(token => {
      return token.token !== req.token;
    });
    await req.user.save();

    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;

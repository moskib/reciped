const express = require('express');
const auth = require('../middlewares/auth');
const multer = require('multer');
const sharp = require('sharp');
const userService = require('../services/userService');

const router = new express.Router();

// CREATE NEW USER
router.post('', async (req, res) => {
  try {
    const user = await userService.addUser(req.body);
    const token = await userService.generateAuthToken(user);
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

// LOGIN USER
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userService.loginUser(email, password);
    const token = await userService.generateAuthToken(user);
    res.send({ user, token });
  } catch (e) {
    res.status(400).send();
  }
});

// LOGOUT USER
router.post('/logout', auth, async (req, res) => {
  try {
    await userService.logoutUser(req.user, req.token);
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

// GET USER PROFILE
router.get('/me', auth, async (req, res) => {
  res.send(req.user);
});

// UPDATE USER
router.patch('/me', auth, async (req, res) => {
  const fieldsAreValid = userService.checkUpdateFields(req.body);

  if (!fieldsAreValid) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    await userService.updateUser(req.user, req.body);
    res.send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
});

// DELETE USER
router.delete('/me', auth, async (req, res) => {
  try {
    userService.deleteUser(req.user);
    res.send(req.user);
  } catch (e) {
    res.status(500).send();
  }
});

const upload = multer({
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Please upload an image'));
    }

    cb(undefined, true);
  }
});

// ADD USER AVATAR
router.post(
  '/me/avatar',
  auth,
  upload.single('avatar'),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();
    req.user.avatar = buffer;
    await req.user.save();
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

// DELETE USER AVATAR
router.delete('/me/avatar', auth, async (req, res) => {
  req.user.avatar = undefined;
  await req.user.save();
  res.send();
});

// GET USER AVATAR
router.get('/:id/avatar', async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user || !user.avatar) {
      throw new Error();
    }

    res.set('Content-Type', 'image/png');
    res.send(user.avatar);
  } catch (e) {
    res.status(404).send();
  }
});

module.exports = router;

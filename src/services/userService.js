const User = require('../models/user.js');

const addUser = async user => {
  const userObj = new User(user);
  await userObj.save();
  return userObj;
};

const generateAuthToken = async user => {
  return await user.generateAuthToken();
};

const loginUser = async (email, password) => {
  const user = await User.findByCredentials(req.body.email, req.body.password);
  return user;
};

const logoutUser = async (user, currentToken) => {
  user.tokens = user.tokens.filter(token => token.token !== currentToken);
  await user.save();
};

const updateUser = async (currrentUser, fieldsWithUpdates) => {
  const updateFields = Object.keys(fieldsWithUpdates);

  updateFields.forEach(
    updateField => (currrentUser[updateField] = fieldsWithUpdates[updateField])
  );
  await currentToken.save();
  return currrentUser;
};

const checkUpdateFields = userToUpdate => {
  const updates = Object.keys(userToUpdate);
  const allowedUpdates = ['name', 'email', 'password', 'age'];
  const isValidOperation = updates.every(update => {
    allowedUpdates.includes(update);
  });

  return isValidOperation;
};

const getUserById = async userId => {
  const user = await User.findById(userId);
  return user;
};

const deleteUser = async user => {
  await user.remove();
};

module.exports = {
  addUser,
  generateAuthToken,
  loginUser,
  logoutUser,
  updateUser,
  getUserById,
  checkUpdateFields,
  deleteUser
};

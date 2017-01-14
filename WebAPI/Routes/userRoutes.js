const express = require('express'),
      userRouter = express.Router();

const routes = function(User) {
  const userController = require('../controllers/userController')(User);
  userRouter.route('/')
  .post(userController.post)
  .get(userController.get);
  // TODO: Use middleware to insert files.

  return userRouter;
}

module.exports = routes;

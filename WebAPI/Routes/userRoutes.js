const express = require('express'),
      userRouter = express.Router();

const routes = function(User) {
  const userController = require('../controllers/userController')(User);
  
  userRouter.route('/:userId').get(function(req, res) {
    User.findById(req.params.userId, function(err, user) {
      if(err) {
        res.status(500).send(err);
      } else {
        res.json(user);
      }
    });
  });
  
  userRouter.route('/')
  .post(userController.post)
  .get(userController.get);
  // TODO: Use middleware to insert files.

  return userRouter;
};

module.exports = routes;

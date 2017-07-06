const express = require('express'),
      userRouter = express.Router();
      
const routes = function(User) {
  const userController = require('../controllers/userController')(User);
  
  const logger = (req, res, next) => {
    console.log(req.params.userId);
    next();
  }

  userRouter.route('/')
  .post(userController.post)
  .get(userController.get);

  // TODO: Get this to a separate file.
  const userIdMiddleware = (User) => (req, res, next) => {
    User.findById(req.params.userId, (err, user) => {
      console.log('Acess userId Middleware');
       if (err) {
         res.status(500).send(err);
       } 
       req.user = user;
       next();
    });
  };

  userRouter.use('/:userId', userIdMiddleware(User));

  userRouter.route('/:userId')
  .get(logger, (req, res) => {
    res.json(req.user);
  });

  return userRouter;
};

module.exports = routes;

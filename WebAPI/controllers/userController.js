// TODO: Include parser for rich query search
const userController = function(User) {
  const post = (req, res) => {
    if (req.body.name && req.body.lastName) {
      const user = new User(req.body);
      user.save();
      res.status(201);
      res.send(user); // Breakpoint here, and look out what is going on.
    } else {
      res.status(400);
      res.send('Name and last name are required');
    }
  };

  const get = (req, res) => {
    User.find({}, function(err, users) {
      if (err) {
        res.status(500).send(err);
      } else {
        console.log(users);
        res.json(users);
      }
    });
  };

  return {
    post,
    get
  };
}

module.exports = userController;

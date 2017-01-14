const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

var userModel = new Schema({
  name: {
    type: String
  },
  lastName: {
    type: String
  },
  files:[{
    name: String,
    root: String,
    size: Number
  }]
});

module.exports = mongoose.model('User', userModel);

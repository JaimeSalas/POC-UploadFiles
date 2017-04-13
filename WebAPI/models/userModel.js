const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      fileModel = require('./fileModel.js');

var userModel = new Schema({
  name: {
    type: String
  },
  lastName: {
    type: String
  },
  files:[fileModel]
});

module.exports = mongoose.model('User', userModel);

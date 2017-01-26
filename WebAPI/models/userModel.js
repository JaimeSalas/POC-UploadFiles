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
    //type: String, // Conatins /, not allowed character
    size: Number
  }]
});

module.exports = mongoose.model('User', userModel);

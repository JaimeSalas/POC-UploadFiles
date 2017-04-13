const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const fileModel = new Schema({
    name: {
        type: String
    },
    size: {
        type: Number
    }
});

module.exports = fileModel;
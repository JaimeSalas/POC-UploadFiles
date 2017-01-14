const express = require('express'),
      cors = require('cors'),
      app = express(),
      port = process.env.PORT || 3000,
      mongoose = require('mongoose'),
      bodyParser = require('body-parser'),
      path = require('path'),
      formidable = require('formidable'),
      fs = require('fs');

// TODO: Add package for uploading files
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var db;

if(process.env.ENV === 'Test') {
  db = mongoose.connect('mongodb://localhost/userAPI_test'); // Our database is going to connect here in tests environment
} else {
  db = mongoose.connect('mongodb://localhost/userAPI');
}

const User = require('./models/userModel');
const userRouter = require('./Routes/userRoutes')(User);
app.use('/api/users', userRouter);

const fileRouter = require('./Routes/fileRoutes')();
app.use('/api/files', fileRouter);

app.get('/', (req, res) => res.send('API base root'));

app.listen(port, function() {
  console.log('Gulp is running my app on PORT: ' + port);
});

module.exports = app; // We need to do this to provided it to supertest.

const express = require('express'),
      fileRouter = express.Router(),
      formidable = require('formidable'),
      path = require('path'),
      fs = require('fs');

// TODO: Discuss use upload/download on uri
const routes = function () {
  fileRouter.route('/')
    .post((req, res) => {
      console.log(req);
      let form = new formidable.IncomingForm();
      form.multiples = true;
      form.uploadDir = path.join(__dirname, '../uploads');

      form.on('file', function(field, file) {
        fs.rename(file.path, path.join(form.uploadDir, file.name));
      });

      form.on('error', function(err) {
        console.log(`An error has occured: ${err}`);
      });

      form.on('end', function() {
        res.end('success');
      });

      form.parse(req);
    });


  return fileRouter;
};

module.exports = routes;

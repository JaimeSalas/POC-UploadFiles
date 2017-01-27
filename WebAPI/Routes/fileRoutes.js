const express = require('express'),
      fileRouter = express.Router(),
      formidable = require('formidable'),
      path = require('path'),
      fs = require('fs');

// TODO: Discuss use upload/download on uri
const routes = function (User) {
  fileRouter.route('/')
    .post((req, res) => {
      let userFile = {
        userId: null,
        fileName: null,
        fileSize: null,
        fileType: null
      };

      let form = new formidable.IncomingForm();
      form.multiples = true;
      form.uploadDir = path.join(__dirname, '../uploads');

      form.on('file', function(field, file) {
        fs.rename(file.path, path.join(form.uploadDir, file.name));
        userFile.fileName = file.name;
        userFile.fileSize = file.size;
        userFile.fileType = file.type;
      });

      // More info: http://stackoverflow.com/questions/30128701/parse-form-value-with-formidable-to-filename
      form.on('field', function(name, field) {
        if (name === 'userId') {
          userFile.userId = field;
        }
      });

      form.on('error', function(err) {
        console.log(`An error has occured: ${err}`);
      });

      form.on('end', function() {
        User.findById(userFile.userId, function(err, doc) {
          console.log(userFile);
          doc.files.push({
            name: userFile.fileName.toString(),
            //type: userFile.fileType.toString(),
            size: userFile.fileSize
          });
          doc.save();
          res.end('success');
        });
      });

      form.parse(req);
    });

  return fileRouter;
};

module.exports = routes;

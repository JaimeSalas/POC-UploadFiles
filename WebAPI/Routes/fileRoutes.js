const express = require('express'),
      fileRouter = express.Router(),
      formidable = require('formidable'),
      path = require('path'),
      fs = require('fs');

// TODO: Discuss use upload/download on uri
// TODO: Get File by _id
// TODO: Delete File by _id
/*
  To delete a single file, we have to pass two parameters: user._id
  and file._id. We have to create a query string that comes with 
  both parameters. userId and fileId
*/
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
          console.log(doc);
          doc.files.push({
            name: userFile.fileName.toString(),
            //type: userFile.fileType.toString(),
            size: userFile.fileSize
          });
          doc.save();
          res.end('success');
        });
      });
      // TODO: Use callback on parse and onParts.
      form.parse(req);
    })
    .get((req, res) => {
      let query = {};

      if(req.query.fileId) {
        query.files._id = req.query.fileId;
      }

      User.find(query, function(err, users) {
        if(err) {
          res.status(500).send(err);
        } else {
          res.json(users);
        }
      });
    });


  return fileRouter;
};

module.exports = routes;

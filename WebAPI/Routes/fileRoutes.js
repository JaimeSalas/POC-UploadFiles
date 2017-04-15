const express = require('express'),
      fileRouter = express.Router(),
      formidable = require('formidable'),
      path = require('path'),
      fs = require('fs');

// TODO: Discuss use upload/download on uri
// TODO: Delete File by _id
// Chaining multiple promises: http://blog.revathskumar.com/2015/07/using-promises-with-mongoosejs.html
/*
  To delete a single file, we have to pass two parameters: user._id
  and file._id. We have to create a query string that comes with 
  both parameters. userId and fileId
 
  On client:
  // Delete a user
  var url = "http://localhost:8080/api/v1/users";
  var xhr = new XMLHttpRequest();
  xhr.open("DELETE", url+'/12', true);
  xhr.onload = function () {
    var users = JSON.parse(xhr.responseText);
    if (xhr.readyState == 4 && xhr.status == "200") {
      console.table(users);
    } else {
      console.error(users);
    }
  }
  xhr.send(null);
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
    .get((req, res) => { // For download file
      // localhost:8000/api/files?userId=5888fbbeca10712d7c18e672&fileId=588ba74ac05ac5126ce1d0f0
      // TODO: Move to middleware. 
      // TODO: Download file.
      const query = getQueryParams(req);

      User.findById(query.id)
        .exec()
        .then(user => res.json(user.files.id(query.file.id)))
        .catch(err => res.status(500).send(err));
    })
    .delete((req, res) => {  
      const query = getQueryParams(req);
      // TODO: Try out -> http://blog.revathskumar.com/2015/07/using-promises-with-mongoosejs.html
      User.findById(query.id)
      .exec()
      .then(user => {
        user.files.id(query.file.id).remove();
        user.save(); 
        return res.status(200).send('OK'); 
      })
      .catch(err => res.status(500).send(err));
    });

  return fileRouter;
};

// TODO: Move to parsers
// TODO: Create specific route???
const getQueryParams = (req) => {
  let query = null;

  if(req.query.userId && req.query.fileId) {
    query = {
      id: req.query.userId,
      file: { id: req.query.fileId }
    }
  }

  return query;
};

module.exports = routes;

const express = require('express'),
      aws = require('aws-sdk');

// var AWS = require('aws-sdk');
aws.config.loadFromPath('./config.json'); // This one set by heroku

// const s3 = new AWS.S3({ apiVersion: '2006-03-01' });

// s3.listBuckets((err, data) => {
//     if (err) console.log('Error', err);
//     console.log('Bucket list', data.Buckets);
// });

const app = express();
app.set('views', './views');
app.use(express.static('./public'));
app.engine('html', require('ejs').renderFile);
app.listen(process.env.PORT || 3000);

app.get('/account', (re, res) => res.render('account.html'));


// {Bucket: 'bucketName', Key: 'keyName'}
app.get('/sign-s3', (req, res) => {
    const s3 = new aws.S3();
    const fileName = req.query['file-name'];
    const fileType = req.query['file-type'];
    const s3Params = {
        Bucket: 'jaime-salas-test',
        Key: fileName,
        Expires: 60,
        ContentType: fileType,
        ACL: 'public-read'
    };
    s3.getSignedUrl('putObject', s3Params, (err, data) => {
        if (err) {
            console.log(err);
            return res.end();
        }

        console.log(data);
        
        const returnData = {
            signedRequest: data,
            url: `https://${s3Params.Bucket}.s3.amazonaws.com/${fileName}`
        };
        res.write(JSON.stringify(returnData));
        res.end();
    });
});
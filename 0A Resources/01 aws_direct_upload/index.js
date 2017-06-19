var AWS = require('aws-sdk');
AWS.config.loadFromPath('./config.json');

const s3 = new AWS.S3({ apiVersion: '2006-03-01' });

s3.listBuckets((err, data) => {
    if (err) console.log('Error', err);
    console.log('Bucket list', data.Buckets);
});

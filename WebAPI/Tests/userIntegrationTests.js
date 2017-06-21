// NOTE: Take a look on this: http://www.marcusoft.net/2015/10/eaddrinuse-when-watching-tests-with-mocha-and-supertest.html

// const should = require('should'),
//       request = require('supertest'),
//       app = require('../app.js'),
//       mongoose = require('mongoose'),
//       User = mongoose.model('User'),
//       agent = request.agent(app);
// // TODO: Use chai instead should.
// //TRIBUTE: http://stackoverflow.com/questions/31549857/mongoose-what-does-the-exec-function-do
//   describe.skip('User crud Test', function() {
//       it('should allow user to be posted and return _id', function(done) {
//         const userPost = {
//           name: 'new Jai',
//           lastName: 'new Sal'
//         };

//         agent.post('/api/users')
//           .send(userPost)
//           .expect(201)
//           .end(function (err, results) {
            
//             results.body.should.have.property('_id');
//             results.body.name.should.be.eql(userPost.name);
//             results.body.lastName.should.be.eql(userPost.lastName);

//             done();
//           });
//       });

//       afterEach(function (done) {
//         User.remove().exec();
//         done();
//       });
//     });

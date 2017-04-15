const should = require('should'),
      sinon = require('sinon'),
      UserController = require('../controllers/userController.js');

describe('userController test', function() {
    describe('Post', function () {
        it('should not allowed empty lastName', function () {
             const User = function(user) { this.save = function(){}};
             const req = {
                 body: {
                     name: 'Jai'
                 }
             }
             const res = {
                 status: sinon.spy(),
                 send: sinon.spy()
             }  

             const userController = UserController(User);
             userController.post(req, res);
             // res.status.args[0][0] args -> each time this function has been called, and the arguments that
             // has been used for call.
             res.status.calledWith(400).should.equal(true, 'Bad status ' + res.status.args[0][0]);
             res.send.calledWith('Name and last name are required').should.equal(true);
        });

        it('should not allow empty name', function () {
            const User = function(user) { this.save = function(){};};
            req = {
                body: {
                    lastName: 'sal',
                }
            }
            res = {
                status: sinon.spy(),
                send: sinon.spy()
            }

            const userController = UserController(User).post(req, res);

            res.status.calledWith(400).should.equal(true);
            res.send.calledWith('Name and last name are required').should.equal(true);
        });

        it('should call user with name and lastName', function () {
            const User = function (user) {
                this.save = function () {}
            };
            const req = {
                body: {
                  name: 'Jai',
                  lastName: 'Sal'  
                }
            }
            const res = {
                status: sinon.spy(),
                send: sinon.spy()
            }

            const userController = UserController(User);

            userController.post(req, res);

            res.status.calledWith(201).should.equal(true);
            res.send.calledOnce.should.equal(true);
        });
    });
});
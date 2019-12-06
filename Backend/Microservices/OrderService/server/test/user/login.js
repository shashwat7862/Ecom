const should = require('should');
const request = require('supertest');
const app=require('../../app.js');

describe('#login()', function () {

    describe('when the request contains a valid payload', function () {

        it('should return a 200 ok response', function (done) {

            const login = {
                email: 'pulkitchadha27@gmail.com',
                password: '123456'
            };

            request(app)
                .post('/api/v1/user/login')
                .send(login)
                .expect(200)
                .end(function (err, res) {
                    res.status.should.equal(200);
                    done();
                });
        });
    });
});
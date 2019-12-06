var BaseService = require('./BaseService');
var jwt = require("jsonwebtoken");
var fs = require('fs');

class UserService extends BaseService {

    

 
    async createUser(callback) {
         
        callback(null, {
            msg:"okhhg"
        });
    }


}





module.exports = function (app) {
    return new UserService(app);
};
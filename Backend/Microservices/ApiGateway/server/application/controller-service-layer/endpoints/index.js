let AuthService = require('./auth.endpoints');
let ProductService = require('./product.endpoints');


module.exports = function () {

  return {
    AuthService,
    ProductService
  };
}


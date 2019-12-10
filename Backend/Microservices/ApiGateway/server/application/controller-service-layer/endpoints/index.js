let VendorService = require('./vendor.endpoints');
let CustomerService = require('./customer.endpoint')


module.exports = function () {

  return {
    VendorService,
    CustomerService
  };
}


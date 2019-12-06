module.exports = function () {
	const registrationPayload = require('../../../application-utilities/payloadSchema');

	var registerVendor = function (req, res, callback) {

		this.services.userService.registerVendor(callback);
		
		
		 
	}

	 
	return {
		registerVendor,
		 
	}
};
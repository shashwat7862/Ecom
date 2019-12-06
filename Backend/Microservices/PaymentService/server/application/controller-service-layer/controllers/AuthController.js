module.exports = function () {

	var registerVendor = function (req, res, callback) {
		var salt = uuid.v4();
		vendor = new domain.Vendor(req.body);
		vendor.role = 'ROLE_VENDOR';
		vendor.salt = salt;
		vendor.password = configHolder.encryptUtil.encryptPassword(salt, req.body.password);
		this.services.authService.registerVendor(vendor, callback);
	}

	var login_Vendor = function (req, res, callback) {
		this.services.authService.login_Vendor(req.body, callback);
	}

	var Send_OTP = function (req, res, callback) {
		this.services.authService.Send_OTP(req.body.mobile, callback);
	}

	var Verify_OTP = function (req, res, callback) {
		this.services.authService.Verify_OTP(req.body, callback);
	}

	return {
		registerVendor,
		login_Vendor,
		Send_OTP,
		Verify_OTP

	}
};
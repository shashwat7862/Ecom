module.exports = function () {

	var registerVendor = function (req, res, callback) {
		var salt = uuid.v4();
		vendor = new domain.Vendor(req.body);
		vendor.role = 'ROLE_VENDOR';
		vendor.salt = salt;
		if (req.body.password) {
			vendor.password = configHolder.encryptUtil.encryptPassword(salt, req.body.password);
		}
		this.services.authService.registerVendor(vendor, callback);
	}

	

	var registerCustomer = function (req, res, callback) {
		var salt = uuid.v4();
		customer = new domain.Customer(req.body);
		customer.role = 'ROLE_customer';
		customer.salt = salt;
		if (req.body.password) {
			customer.password = configHolder.encryptUtil.encryptPassword(salt, req.body.password);
		}
		this.services.authService.registerCustomer(customer, callback);
	}

	var login_Vendor = function (req, res, callback) {
		this.services.authService.login_Vendor(req.body, callback);
	}
	var Customer_Login = function (req, res, callback) {
		this.services.authService.Customer_Login(req.body, callback);
	}

	

	var Send_OTP = function (req, res, callback) {
		this.services.authService.Send_OTP(req.body, callback);
	}

	var Verify_OTP = function (req, res, callback) {
		this.services.authService.Verify_OTP(req.body, callback);
	}

	var Forgot_Password = function (req, res, callback) {
		this.services.authService.Forgot_Password(req.body, callback);
	}

	var Reset_Password = function (req, res, callback) {
		this.services.authService.Reset_Password(req.body, callback);
	}
	
	var get_CustomerList = function (req, res, callback) {
		this.services.authService.get_CustomerList(req.params, callback);
	}

	return {
		registerVendor,
		registerCustomer,
		login_Vendor,
		Customer_Login,
		Send_OTP,
		Verify_OTP,
		Forgot_Password,
		Reset_Password,
		get_CustomerList

	}
};
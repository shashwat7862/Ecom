module.exports = function () {
	var registerVendor = function (req, res, callback) {
		this.services.vendorService.registerVendor(req,callback);
	}

	var login = function (req, res, callback) {
		this.services.vendorService.login(req,callback);
	}

	var SendOTP = function (req, res, callback) {
		this.services.vendorService.SendOTP(req,callback);
	}

	var VerifyOTP  = function (req, res, callback) {
		this.services.vendorService.VerifyOTP(req,callback);
	}

	var ForgotPassword = function (req, res, callback) {
		this.services.vendorService.ForgotPassword(req,callback);
	}

	var ResetPassword  = function (req, res, callback) {
		this.services.vendorService.ResetPassword(req,callback);
	}

	var SaveProducts = function (req, res, callback) {
		this.services.vendorService.SaveProducts(req,callback);
	}


	var ProductsList = function (req, res, callback) {
		this.services.vendorService.ProductsList(req,callback);
	}

	var ProductApprovalRequest = function (req, res, callback) {
		this.services.vendorService.ProductApprovalRequest(req,callback);
	}

	var EditProductsDetails = function (req, res, callback) {
		this.services.vendorService.EditProductsDetails(req,callback);
	}
	

	return {
		registerVendor,
		login,
		SendOTP,
		VerifyOTP,
		ForgotPassword,
		ResetPassword,
		SaveProducts,
		ProductsList,
		ProductApprovalRequest,
		EditProductsDetails
	}
};
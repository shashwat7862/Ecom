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
		console.log("------------------ss",req.body)
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

	var ProfileUpdate = function(req,res,callback){
		this.services.vendorService.ProfileUpdate(req,callback);
	}

	var DeleteProduct = function(req,res,callback){
		this.services.vendorService.DeleteProduct(req,callback);
	}

	var FilterProducts = function(req,res,callback){
		this.services.vendorService.FilterProducts(req,callback);
	}

	var SearchProducts = function(req,res,callback){
		this.services.vendorService.SearchProducts(req,callback);
	}

	var AllProductsList = function(req,res,callback){
		this.services.vendorService.AllProductsList(req,callback);
	}

	var saveAllImages = function(req,res,callback){
		this.services.vendorService.saveAllImages(req,callback);
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
		EditProductsDetails,
		ProfileUpdate,
		DeleteProduct,
		FilterProducts,
		SearchProducts,
		AllProductsList,
		saveAllImages
	}
};
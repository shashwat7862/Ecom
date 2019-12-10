


module.exports = function () {
	var registerCustomer = function (req, res, callback) {
		this.services.customerService.registerCustomer(req,callback);
	}

	var CustomerLogin = function (req, res, callback) {
		this.services.customerService.CustomerLogin(req,callback);
	}

	 

	var Cart = function (req, res, callback) {
		console.log("cart",req.params , req.body)
		this.services.customerService.Cart(req,callback);
	}

	var WishList  = function (req, res, callback) {
		this.services.customerService.WishList(req,callback);
	}

	var CartList = function (req, res, callback) {
		this.services.customerService.CartList(req,callback);
	}


	var GetAllWishLists = function (req, res, callback) {
		this.services.customerService.GetAllWishLists(req,callback);
	}

	var searchProducts = function (req, res, callback) {
		this.services.customerService.searchProducts(req,callback);
	}

 
	

	return {
		registerCustomer,
		CustomerLogin,
		Cart,
		WishList,
		CartList,
		GetAllWishLists,
		searchProducts,
	 
	}
};
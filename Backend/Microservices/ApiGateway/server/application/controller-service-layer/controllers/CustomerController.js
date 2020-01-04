


module.exports = function () {
	var registerCustomer = function (req, res, callback) {
		this.services.customerService.registerCustomer(req, callback);
	}

	var CustomerLogin = function (req, res, callback) {
		this.services.customerService.CustomerLogin(req, callback);
	}



	var Cart = function (req, res, callback) {
		console.log("cart", req.params, req.body)
		this.services.customerService.Cart(req, callback);
	}

	var WishList = function (req, res, callback) {
		this.services.customerService.WishList(req, callback);
	}

	var CartList = function (req, res, callback) {
		this.services.customerService.CartList(req, callback);
	}


	var GetAllWishLists = function (req, res, callback) {
		this.services.customerService.GetAllWishLists(req, callback);
	}

	var searchProducts = function (req, res, callback) {
		this.services.customerService.searchProducts(req, callback);
	}

	var createOrder = function (req, res, callback) {
		this.services.customerService.createOrder(req, callback);
	}

	var getOrderList = function (req, res, callback) {
		this.services.customerService.getOrderList(req, callback);
	}

	var getOrderDetails = function (req, res, callback) {
		this.services.customerService.getOrderDetails(req, callback);
	}

	var searchOrders = function (req, res, callback) {
		this.services.customerService.searchOrders(req, callback);
	}

	var saveAddress = function (req, res, callback) {
		this.services.customerService.saveAddress(req, callback);
	}

	var getAddress = function (req, res, callback) {
		this.services.customerService.getAddress(req, callback);
	}


	var editAddress = function (req, res, callback) {
		this.services.customerService.editAddress(req, callback);
	}

	var deleteAddress = function (req, res, callback) {
		this.services.customerService.deleteAddress(req, callback);
	}

	var saveProductReview = function (req, res, callback) {
		this.services.customerService.saveProductReview(req, callback);
	}

	var getProductReview = function (req, res, callback) {
		console.log("called")
		this.services.customerService.getProductReview(req, callback);
	}

	var getAllCustomerList = function (req, res, callback) {
		this.services.customerService.getAllCustomerList(req, callback);
	}

	var CustomerProfileUpdate = function (req, res, callback) {
		this.services.customerService.CustomerProfileUpdate(req, callback);
	}

	var SaveComplaint = function (req, res, callback) {
		this.services.customerService.SaveComplaint(req, callback);
	}

	var getComplaint = function (req, res, callback) {
		this.services.customerService.getComplaint(req, callback);
	}

	
	return {
		registerCustomer,
		CustomerLogin,
		Cart,
		WishList,
		CartList,
		GetAllWishLists,
		searchProducts,
		createOrder,
		getOrderList,
		getOrderDetails,
		searchOrders,
		saveAddress,
		getAddress,
		editAddress,
		deleteAddress,
		saveProductReview,
		getProductReview,
		getAllCustomerList,
		CustomerProfileUpdate,
		SaveComplaint,
		getComplaint,

	}
};
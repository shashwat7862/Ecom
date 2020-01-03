module.exports = function () {

	var create_Order = function (req, res, callback) {
		this.services.orderService.create_Order(req.body, callback);

	}

	var get_OrderList = function (req, res, callback) {
		this.services.orderService.get_OrderList(req.params.userId,req.params.vendorId, {
			fetch: req.params.fetch,
			limit: parseInt(req.params.limit),
			skip: parseInt(req.params.skip)
		}, callback);

	}

	var get_OrderDetails = function (req, res, callback) {
		this.services.orderService.get_OrderDetails(req.params.orderId, callback);
	}

	var search_Orders = function (req, res, callback) {
		this.services.orderService.search_Orders(req.query.q, callback);
	}

	var save_Address  = function (req, res, callback) {
		this.services.orderService.save_Address(req.body, callback);
	}

	var get_Address  = function (req, res, callback) {
		this.services.orderService.get_Address(req.params.userId, callback);
	}

	var edit_Address  = function (req, res, callback) {
		this.services.orderService.edit_Address(req.body,req.params, callback);
	}

	var delete_Address  = function (req, res, callback) {
		this.services.orderService.delete_Address(req.params, callback);
	}

	var get_CustomerList = function (req, res, callback) {
		this.services.orderService.get_CustomerList(req.params, callback);
	}

	var Save_Complaint = function (req, res, callback) {
		this.services.orderService.Save_Complaint(req.body, callback);
	}

	var get_ComplaintList = function (req, res, callback) {
		this.services.orderService.get_ComplaintList(req.params, callback);
	}

	


	return {
		create_Order,
		get_OrderList,
		get_OrderDetails,
		search_Orders,
		save_Address,
		get_Address,
		edit_Address,
		delete_Address,
		get_CustomerList,
		Save_Complaint,
		get_ComplaintList
	}
};
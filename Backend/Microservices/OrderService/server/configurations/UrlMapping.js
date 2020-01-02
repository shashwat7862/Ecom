	module.exports = function(app) {
	    var controllers = app.controllers,
	        views = app.views;

	    return {
	      

	        "/create_Order": [{
	            method: "POST",
	            action: controllers.orderController.create_Order,
	            views: {
	                json: views.jsonView
	            }
			}],
			"/get_OrderList/:userId/:vendorId/:fetch/:limit/:skip": [{
	            method: "GET",
	            action: controllers.orderController.get_OrderList,
	            views: {
	                json: views.jsonView
	            }
			}],
			"/get_OrderDetails/:orderId": [{
	            method: "GET",
	            action: controllers.orderController.get_OrderDetails,
	            views: {
	                json: views.jsonView
	            }
			}],
			"/search_Orders": [{
	            method: "GET",
	            action: controllers.orderController.search_Orders,
	            views: {
	                json: views.jsonView
	            }
			}],
			"/save_Address": [{
	            method: "POST",
	            action: controllers.orderController.save_Address,
	            views: {
	                json: views.jsonView
	            }
			}],
			"/get_Address/:userId": [{
	            method: "GET",
	            action: controllers.orderController.get_Address,
	            views: {
	                json: views.jsonView
	            }
			}],
			"/edit_Address/:userId/:addressId": [{
	            method: "PUT",
	            action: controllers.orderController.edit_Address,
	            views: {
	                json: views.jsonView
	            }
			}],
			"/delete_Address/:userId/:addressId": [{
	            method: "DELETE",
	            action: controllers.orderController.delete_Address,
	            views: {
	                json: views.jsonView
	            }
			}],
			"/get_CustomerList/:vendorId": [{
	            method: "GET",
	            action: controllers.orderController.get_CustomerList,
	            views: {
	                json: views.jsonView
	            }
			}],
			"/Save_Complaint": [{
	            method: "POST",
	            action: controllers.orderController.Save_Complaint,
	            views: {
	                json: views.jsonView
	            }
			}],

			
	    };
	};

 
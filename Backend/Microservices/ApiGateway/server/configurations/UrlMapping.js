	module.exports = function(app) {
	    var controllers = app.controllers,
	        views = app.views;

	    return {
	        "/api/v1/vendor/Register": [{
	            method: "POST",
	            action: controllers.vendorController.registerVendor,
	            views: {
	                json: views.jsonView
	            }
			}],
			"/api/v1/vendor/Login": [{
	            method: "POST",
	            action: controllers.vendorController.login,
	            views: {
	                json: views.jsonView
	            }
			}],
			"/api/v1/vendor/SendOTP": [{
	            method: "POST",
	            action: controllers.vendorController.SendOTP,
	            views: {
	                json: views.jsonView
	            }
			}],
			"/api/v1/vendor/VerifyOTP": [{
	            method: "POST",
	            action: controllers.vendorController.VerifyOTP,
	            views: {
	                json: views.jsonView
	            }
			}],
			"/api/v1/vendor/ForgotPassword": [{
	            method: "POST",
	            action: controllers.vendorController.ForgotPassword,
	            views: {
	                json: views.jsonView
	            }
			}],
			"/api/v1/vendor/ResetPassword": [{
	            method: "POST",
	            action: controllers.vendorController.ResetPassword,
	            views: {
	                json: views.jsonView
	            }
			}],
			
			"/api/v1/vendor/SaveProducts/:category": [{
	            method: "POST",
	            action: controllers.vendorController.SaveProducts,
	            views: {
	                json: views.jsonView
	            }
			}],
			
			"/api/v1/vendor/:vendor_id/ProductsList/:category/:isApprove/:limit/:skip": [{
	            method: "GET",
	            action: controllers.vendorController.ProductsList,
	            views: {
	                json: views.jsonView
	            }
			}],
			"/api/v1/All/ProductsList/:category/:isApprove/:limit/:skip": [{
	            method: "GET",
	            action: controllers.vendorController.AllProductsList,
	            views: {
	                json: views.jsonView
	            }
			}],
			
			"/api/v1/vendor/ProductApprovalRequest/:category": [{
	            method: "PUT",
	            action: controllers.vendorController.ProductApprovalRequest,
	            views: {
	                json: views.jsonView
	            }
			}],

			"/api/v1/vendor/EditProductsDetails/:category": [{
	            method: "PUT",
	            action: controllers.vendorController.EditProductsDetails,
	            views: {
	                json: views.jsonView
	            }
			}],
			"/api/v1/vendor/ProfileUpdate/:id": [{
	            method: "PUT",
	            action: controllers.vendorController.ProfileUpdate,
	            views: {
	                json: views.jsonView
	            }
			}],

			"/api/v1/vendor/DeleteProduct/:category/:id": [{
	            method: "DELETE",
	            action: controllers.vendorController.DeleteProduct,
	            views: {
	                json: views.jsonView
	            }
			}],

			"/api/v1/vendor/FilterProducts/:category": [{
	            method: "GET",
	            action: controllers.vendorController.FilterProducts,
	            views: {
	                json: views.jsonView
	            }
			}],

			"/api/v1/vendor/:vendor_id/SearchProducts/:category": [{
	            method: "GET",
	            action: controllers.vendorController.SearchProducts,
	            views: {
	                json: views.jsonView
	            }
			}],

			"/api/v1/customer/Register": [{
	            method: "POST",
	            action: controllers.customerController.registerCustomer,
	            views: {
	                json: views.jsonView
	            }
			}],
			"/api/v1/customer/Login": [{
	            method: "POST",
	            action: controllers.customerController.CustomerLogin,
	            views: {
	                json: views.jsonView
	            }
			}],

			"/api/v1/customer/Cart/:action": [{
	            method: "PUT",
	            action: controllers.customerController.Cart,
	            views: {
	                json: views.jsonView
	            }
			}],

			"/api/v1/customer/CartList/:userId": [{
	            method: "GET",
	            action: controllers.customerController.CartList,
	            views: {
	                json: views.jsonView
	            }
			}],

			"/api/v1/customer/WishList/:action": [{
	            method: "PUT",
	            action: controllers.customerController.WishList,
	            views: {
	                json: views.jsonView
	            }
			}],

			"/api/v1/customer/GetAllWishLists/:userId": [{
	            method: "GET",
	            action: controllers.customerController.GetAllWishLists,
	            views: {
	                json: views.jsonView
	            }
			}],

			"/api/v1/customer/searchProducts/:categroy": [{
	            method: "GET",
	            action: controllers.customerController.searchProducts,
	            views: {
	                json: views.jsonView
	            }
			}],
			"/api/v1/common/aws/saveAllImages": [{
				method: "POST",
				middleware: [multipartMiddleware],
	            action: controllers.vendorController.saveAllImages,
	            views: {
	                json: views.jsonView
	            }
			}],

			"/api/v1/customer/createOrder": [{
				method: "POST",
	            action: controllers.customerController.createOrder,
	            views: {
	                json: views.jsonView
	            }
			}],
			"/api/v1/common/getOrderList/:userId/:vendorId/:fetch/:limit/:skip": [{
				method: "GET",
	            action: controllers.customerController.getOrderList,
	            views: {
	                json: views.jsonView
	            }
			}],
			"/api/v1/common/getOrderDetails/:orderId": [{
				method: "GET",
	            action: controllers.customerController.getOrderDetails,
	            views: {
	                json: views.jsonView
	            }
			}],
			"/api/v1/common/searchOrders": [{
				method: "GET",
	            action: controllers.customerController.searchOrders,
	            views: {
	                json: views.jsonView
	            }
			}],
			"/api/v1/common/saveAddress": [{
				method: "POST",
	            action: controllers.customerController.saveAddress,
	            views: {
	                json: views.jsonView
	            }
			}],
			"/api/v1/common/getAddress/:userId": [{
				method: "GET",
	            action: controllers.customerController.getAddress,
	            views: {
	                json: views.jsonView
	            }
			}],
			"/api/v1/common/editAddress/:userId/:addressId": [{
				method: "PUT",
	            action: controllers.customerController.editAddress,
	            views: {
	                json: views.jsonView
	            }
			}],
			"/api/v1/common/deleteAddress/:userId/:addressId": [{
				method: "DELETE",
	            action: controllers.customerController.deleteAddress,
	            views: {
	                json: views.jsonView
	            }
			}],

			"/api/v1/customer/saveProductReview/:userId": [{
				method: "POST",
	            action: controllers.customerController.saveProductReview,
	            views: {
	                json: views.jsonView
	            }
			}],
			"/api/v1/common/getProductReview": [{
				method: "GET",
	            action: controllers.customerController.getProductReview,
	            views: {
	                json: views.jsonView
	            }
			}],
			"/api/v1/common/getUserList/:skip/:limit/:FetchFor": [{
				method: "GET",
	            action: controllers.customerController.getCustomerList,
	            views: {
	                json: views.jsonView
	            }
			}]
	    };
	};

 
  
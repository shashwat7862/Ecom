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
			
			"/api/v1/vendor/ProductsList/:category/:isApprove/:limit/:skip": [{
	            method: "GET",
	            action: controllers.vendorController.ProductsList,
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
	    };
	};


	//sudo service mongod start

// 	-- UI
// seller popup
// profiile list fix
// user profile 
// seller profile
// chat set
// etc

// --main site

// product id -> product info ->api

// buyproduct api 
// payment gatway set
// searching api fix

// -=dashboard 
// payment list

// -----done

// contact us -> api
// req for quatation api


// contact query list 
// user list api
// seller list api



// https://github.com/Instamojo/instamojo-nodejs/blob/master/instamojo.js#L8
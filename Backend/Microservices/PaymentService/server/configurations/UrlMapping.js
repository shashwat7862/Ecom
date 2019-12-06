	module.exports = function(app) {
	    var controllers = app.controllers,
	        views = app.views;

	    return {
	      

	        "/registerVendor": [{
	            method: "POST",
	            action: controllers.authController.registerVendor,
	            views: {
	                json: views.jsonView
	            }
			}],
			
			"/login_Vendor": [{
	            method: "POST",
	            action: controllers.authController.login_Vendor,
	            views: {
	                json: views.jsonView
	            }
			}],

			"/Send_OTP": [{
	            method: "POST",
	            action: controllers.authController.Send_OTP,
	            views: {
	                json: views.jsonView
	            }
			}],

			"/Verify_OTP": [{
	            method: "POST",
	            action: controllers.authController.Verify_OTP,
	            views: {
	                json: views.jsonView
	            }
			}],
			
			
			
			
	    };
	};

 
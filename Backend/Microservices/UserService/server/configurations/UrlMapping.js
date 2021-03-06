module.exports = function (app) {
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

		"/Forgot_Password": [{
			method: "POST",
			action: controllers.authController.Forgot_Password,
			views: {
				json: views.jsonView
			}
		}],
		"/Reset_Password": [{
			method: "POST",
			action: controllers.authController.Reset_Password,
			views: {
				json: views.jsonView
			}
		}],

		"/Vendor_Profile_Update/:id": [{
			method: "PUT",
			action: controllers.vendorController.Vendor_Profile_Update,
			views: {
				json: views.jsonView
			}
		}],

		"/register_Customer": [{
			method: "POST",
			action: controllers.authController.registerCustomer,
			views: {
				json: views.jsonView
			}
		}],

		
		"/Customer_Login": [{
			method: "POST",
			action: controllers.authController.Customer_Login,
			views: {
				json: views.jsonView
			}
		}],
		
		
		



	};
};


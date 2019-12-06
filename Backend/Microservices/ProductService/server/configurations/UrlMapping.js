	module.exports = function(app) {
	    var controllers = app.controllers,
	        views = app.views;

	    return {
	      

	        "/Save_Products/:category": [{
	            method: "POST",
	            action: controllers.productController.Save_Products,
	            views: {
	                json: views.jsonView
	            }
			}],

	        "/Products_List/:category/:isApprove/:limit/:skip": [{
	            method: "GET",
	            action: controllers.productController.Products_List,
	            views: {
	                json: views.jsonView
	            }
			}],

			"/Product_ApprovalRequest/:category": [{
	            method: "PUT",
	            action: controllers.productController.Product_ApprovalRequest,
	            views: {
	                json: views.jsonView
	            }
			}],

			"/Edit_ProductsDetails/:category": [{
	            method: "PUT",
	            action: controllers.productController.Edit_ProductsDetails,
	            views: {
	                json: views.jsonView
	            }
			}],

			
			

			
			
		 
			
			
			
	    };
	};

 
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

	        "/Products_List/:vendor_id/:category/:isApprove/:limit/:skip": [{
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

			"/Delete_Product/:category/:id": [{
	            method: "DELETE",
	            action: controllers.productController.Delete_Product,
	            views: {
	                json: views.jsonView
	            }
			}],

			"/Filter_Products/:category": [{
	            method: "GET",
	            action: controllers.productController.Filter_Products,
	            views: {
	                json: views.jsonView
	            }
			}],

			"/Search_Products/:vendor_id/:category": [{
	            method: "GET",
	            action: controllers.productController.Search_Products,
	            views: {
	                json: views.jsonView
	            }
			}],

			"/Cart/:action": [{
	            method: "PUT",
	            action: controllers.productController.Cart,
	            views: {
	                json: views.jsonView
	            }
			}],


			"/Wish_List/:action": [{
	            method: "PUT",
	            action: controllers.productController.Wish_List,
	            views: {
	                json: views.jsonView
	            }
			}],
			
			"/Cart_List/:userId": [{
	            method: "GET",
	            action: controllers.productController.Cart_List,
	            views: {
	                json: views.jsonView
	            }
			}],

			"/GetAll_WishLists/:userId": [{
	            method: "GET",
	            action: controllers.productController.GetAll_WishLists,
	            views: {
	                json: views.jsonView
	            }
			}],

			"/search_Products_ForCustomers/:category": [{
	            method: "GET",
	            action: controllers.productController.productSearchForCustomers,
	            views: {
	                json: views.jsonView
	            }
			}],

			"/All_Products_List/:category/:isApprove/:limit/:skip": [{
	            method: "GET",
	            action: controllers.productController.All_Products_List,
	            views: {
	                json: views.jsonView
	            }
			}],

			"/save_ProductReview/:userId": [{
	            method: "POST",
	            action: controllers.productController.save_ProductReview,
	            views: {
	                json: views.jsonView
	            }
			}],

			"/get_ProductReview/:vendorId/:userId/:for": [{
	            method: "GET",
	            action: controllers.productController.get_ProductReview,
	            views: {
	                json: views.jsonView
	            }
			}],

			"/get_BrandList/:skip/:limit/:FetchFor": [{
	            method: "GET",
	            action: controllers.productController.get_BrandList,
	            views: {
	                json: views.jsonView
	            }
			}],

			"/Filter_Ratings": [{
	            method: "GET",
	            action: controllers.productController.Filter_Ratings,
	            views: {
	                json: views.jsonView
	            }
			}],
			"/create_Store/:vendorId": [{
	            method: "POST",
	            action: controllers.productController.create_Store,
	            views: {
	                json: views.jsonView
	            }
			}],
			"/getAll_Store/:vendorId/:for": [{
	            method: "GET",
	            action: controllers.productController.getAll_Store,
	            views: {
	                json: views.jsonView
	            }
			}],
			"/get_StoreDetails/:storeId": [{
	            method: "GET",
	            action: controllers.productController.get_StoreDetails,
	            views: {
	                json: views.jsonView
	            }
			}],

			

			

			
 
  
			
 
			
			

			

			
			

			
			
		 
			
			
			
	    };
	};

 
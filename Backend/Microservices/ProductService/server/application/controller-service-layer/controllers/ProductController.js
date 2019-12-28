module.exports = function () {

	var Products_List = function (req, res, callback) {
		console.log("1")
		let dynamicDomain = getDynamicDomain(req.params.category)
		if (dynamicDomain) {
			console.log("2")
			let pagination = {
				limit: req.params.limit,
				skip: req.params.skip,
				isApprove: req.params.isApprove,
				vendor_id: req.params.vendor_id
			}
			console.log("paginations", pagination)
			this.services.productService.Products_List(dynamicDomain, pagination, callback);
		} else {
			callback(null, {
				"msg": "Category is not valid"
			})
		}
	}

	var Product_ApprovalRequest = function (req, res, callback) {
		let dynamicDomain = getDynamicDomain(req.params.category)
		if (dynamicDomain) {
			this.services.productService.Product_ApprovalRequest(req.body, dynamicDomain, callback);
		} else {
			callback(null, {
				"msg": "Category is not valid"
			})
		}
	}

	var Edit_ProductsDetails = function (req, res, callback) {
		let dynamicDomain = getDynamicDomain(req.params.category)
		if (dynamicDomain) {
			this.services.productService.Edit_ProductsDetails(req.body, dynamicDomain, callback);
		} else {
			callback(null, {
				"msg": "Category is not valid"
			})
		}
	}

	var Save_Products = function (req, res, callback) {
		let dynamicDomain = getDynamicDomain(req.params.category)
		if (dynamicDomain) {
			console.log("req.body while save product", req.body)
			var productData = new domain[dynamicDomain](req.body);
			productData.category = req.params.category;
			this.services.productService.Save_Products(productData, callback);
		} else {
			callback(null, {
				"msg": "Category is not valid"
			})
		}
	}

	var Delete_Product = function (req, res, callback) {
		let dynamicDomain = getDynamicDomain(req.params.category)
		if (dynamicDomain) {
			this.services.productService.Delete_Product(req.params.id, dynamicDomain, callback);
		} else {
			callback(null, {
				"msg": "Category is not valid"
			})
		}
	}

	var Filter_Products = function (req, res, callback) {
		let dynamicDomain = getDynamicDomain(req.params.category)
		if (dynamicDomain) {
			this.services.productService.Filter_Products(req.query, dynamicDomain, callback);
		} else {
			callback(null, {
				"msg": "Category is not valid"
			})
		}

	}

	var Search_Products = function (req, res, callback) {
		let dynamicDomain = getDynamicDomain(req.params.category)
		if (dynamicDomain) {
			this.services.productService.Search_Products(req.query, dynamicDomain, req.params.vendor_id, callback);
		} else {
			callback(null, {
				"msg": "Category is not valid"
			})
		}

	}


	function getDynamicDomain(category) {
		if (category) {
			switch (category) {
				case 'fashion':
					return setDomain(category);
				case 'electronics':
					return setDomain(category);
				default:
					'electronics'
					break;
			}
		} else {
			return 'Na'
		}
	}

	function setDomain(domain, isBranded) {
		switch (domain) {
			case 'fashion':
				if (isBranded == false)
					return 'FashionProduct'

			case 'electronics':
				return 'ElectronicsProduct'

			default:
				break;
		}
	}

	var Cart = function (req, res, callback) {
		this.services.productService.Cart(req.params.action, req.body, callback);
	}

	var Wish_List = function (req, res, callback) {
		this.services.productService.Wish_List(req.params.action, req.body, callback);
	}

	var Cart_List = function (req, res, callback) {
		this.services.productService.Cart_List(req.params.userId, callback);
	}

	var GetAll_WishLists = function (req, res, callback) {
		this.services.productService.GetAll_WishLists(req.params.userId, callback);
	}

	var productSearchForCustomers = function (req, res, callback) {
		let dynamicDomain = getDynamicDomain(req.params.category);
		console.log(dynamicDomain, req.params.category, "----------------------------")
		if (dynamicDomain) {
			this.services.productService.productSearchForCustomers(req.query, dynamicDomain, callback);
		} else {
			callback(null, {
				"msg": "Category is not valid"
			})
		}

	}

	var All_Products_List = function (req, res, callback) {
		console.log("1")
		let dynamicDomain = getDynamicDomain(req.params.category)
		if (dynamicDomain) {
			console.log("2")
			let pagination = {
				limit: req.params.limit,
				skip: req.params.skip,
				isApprove: req.params.isApprove,
			}
			console.log("paginations", pagination)
			this.services.productService.All_Products_List(dynamicDomain, pagination, callback);
		} else {
			callback(null, {
				"msg": "Category is not valid"
			})
		}
	}

	var save_ProductReview = function (req, res, callback) {
		var productReview = new domain.ProductReview(req.body);
		this.services.productService.save_ProductReview(productReview, callback);
	}

	var get_ProductReview = function (req, res, callback) {
		this.services.productService.get_ProductReview(callback);
	}




	return {
		Save_Products,
		Products_List,
		Product_ApprovalRequest,
		Edit_ProductsDetails,
		Delete_Product,
		Filter_Products,
		Search_Products,
		Cart,
		Wish_List,
		Cart_List,
		GetAll_WishLists,
		productSearchForCustomers,
		All_Products_List,
		save_ProductReview,
		get_ProductReview
	}


};
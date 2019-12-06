module.exports = function () {

	var Products_List = function (req, res, callback) {
		console.log("1")
		let dynamicDomain = getDynamicDomain(req.params.category)
		if (dynamicDomain) {
			console.log("2")
			let pagination = {
				limit: req.params.limit,
				skip: req.params.skip,
				isApprove: req.params.isApprove
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
			var productData = new domain[dynamicDomain](req.body);
			productData.category = req.params.category;
			this.services.productService.Save_Products(productData, callback);
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



	return {
		Save_Products,
		Products_List,
		Product_ApprovalRequest,
		Edit_ProductsDetails
	}


};
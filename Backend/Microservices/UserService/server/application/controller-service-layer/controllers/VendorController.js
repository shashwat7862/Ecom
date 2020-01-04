module.exports = function () {

	var Vendor_Profile_Update = function (req, res, callback) {
		this.services.vendorServices.Vendor_Profile_Update(req.body, req.params.id, callback);
	}

	var getAll_Vendors = function (req, res, callback) {
		this.services.vendorServices.getAll_Vendors(req.params,callback);
	}

	

	return {
		Vendor_Profile_Update,
		getAll_Vendors

	}
};
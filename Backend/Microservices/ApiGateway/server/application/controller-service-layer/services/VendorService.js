var BaseService = require('./BaseService');
let { register_Vendor, login_Vendor, Send_OTP, Verify_OTP, Vendor_Profile_Update, Save_Products,
    Products_List, Product_ApprovalRequest, Edit_ProductsDetails, Delete_Product, Filter_Products, Search_Products } = require('../endpoints/vendor.endpoints');


class VendorService extends BaseService {

    async registerVendor(req, callback) {
        let data = await register_Vendor(req.body);
        callback(null, data)
    }

    async login(req, callback) {
        let loginData = await login_Vendor(req.body);
        callback(null, loginData)
    }

    async SendOTP(req, callback) {
        let data = await Send_OTP(req.body);
        console.log(data, "data");
        callback(null, data)
    }

    async VerifyOTP(req, callback) {
        let verfier = await Verify_OTP(req.body);
        callback(null, verfier)
    }

    async ForgotPassword(req, callback) {
        let change = await Forgot_Password(req.body);
        callback(null, change)
    }

    async ResetPassword(req, callback) {
        let data = await Reset_Password(req.body);
        callback(null, data)
    }

    async SaveProducts(req, callback) {
        let SaveProductsDetails = await Save_Products(req.body, req.params.category);
        callback(null, SaveProductsDetails)
    }

    async ProductsList(req, callback) {
        let listOfProducts = await Products_List(req.params);
        callback(null, listOfProducts)
    }


    async ProductApprovalRequest(req, callback) {
        let request = await Product_ApprovalRequest(req.body, req.params);
        callback(null, request)
    }

    async EditProductsDetails(req, callback) {
        let request = await Edit_ProductsDetails(req.body, req.params);
        callback(null, request)
    }

    async ProfileUpdate(req, callback) {
        console.log("req.body, req.params.id", req.body, req.params.id)
        let updatedDetails = await Vendor_Profile_Update(req.body, req.params.id);
        callback(null, updatedDetails)
    }


    async DeleteProduct(req, callback) {
        let deleteResult = await Delete_Product(req.params);
        callback(null, deleteResult)
    }

    async FilterProducts(req, callback) {
        let filterResult = await Filter_Products(req.params, req.query);
        callback(null, filterResult)
    }

    async SearchProducts(req, callback) {
        let searchResult = await Search_Products(req.params, req.query);
        callback(null, searchResult)
    }

}

module.exports = function (app) {
    return new VendorService(app);
};
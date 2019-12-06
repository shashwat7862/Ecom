var BaseService = require('./BaseService');
let { register_Vendor, login_Vendor, Send_OTP, Verify_OTP } = require('../endpoints/auth.endpoints');
let { Save_Products, Products_List, Product_ApprovalRequest, Edit_ProductsDetails } = require('../endpoints/product.endpoints');


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






}

module.exports = function (app) {
    return new VendorService(app);
};
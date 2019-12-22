var BaseService = require('./BaseService');
// let { register_Vendor, login_Vendor, Send_OTP, Verify_OTP, Vendor_Profile_Update, Save_Products,
//     Products_List, Product_ApprovalRequest, Edit_ProductsDetails, Delete_Product, Filter_Products, Search_Products } = require('../endpoints/vendor.endpoints');


class CustomerService extends BaseService {

    async registerCustomer(req, callback) {
        let data = await register_Customer(req.body);
        callback(null, data)
    }

    async CustomerLogin(req, callback) {
        let loginData = await Customer_Login(req.body);
        callback(null, loginData)
    }

    async Cart(req, callback) {
        let cartDetails = await Cart(req.params,req.body);
        callback(null, cartDetails)
    }

    async CartList(req, callback) {
        let list = await Cart_List(req.params.userId);
        callback(null, list)
    }

    async WishList(req, callback) {
        let WishListDetails = await Wish_List(req.params,req.body);
        callback(null, WishListDetails)
    }

   

    async GetAllWishLists(req, callback) {
        let list = await GetAll_WishLists(req.params.userId);
        callback(null, list)
    }

    async searchProducts(req, callback) {
        console.log("req.params.category,req.query",req.params,req.query)
        let searchResult = await search_Products_ForCustomers(req.params,req.query);
        callback(null, searchResult)
    }

    async createOrder(req, callback) {
        let orderResult = await create_Order(req.body);
        callback(null, orderResult)
    }

    async getOrderList(req,callback){
        let OrderList = await get_OrderList(req.params);
        callback(null, OrderList)
    }

    async getOrderDetails(req,callback){
        let OrderList = await get_OrderDetails(req.params);
        callback(null, OrderList)
    }

    async searchOrders(req,callback){
        let searchResult = await search_Orders(req.query);
        callback(null, searchResult)
    }

    async saveAddress(req,callback){
        let searchResult = await save_Address(req.body);
        callback(null, searchResult)
    }

    async getAddress(req,callback){
        let searchResult = await get_Address(req.params);
        callback(null, searchResult)
    }

    async editAddress(req,callback){
        let searchResult = await edit_Address(req.body,req.params);
        callback(null, searchResult)
    }

    async deleteAddress(req,callback){
        let searchResult = await delete_Address(req.params);
        callback(null, searchResult)
    }

    async saveProductReview(req,callback){
        let saveReview = await save_ProductReview(req.params.userId,req.body);
        callback(null, saveReview)
    }

    async getProductReview(req,callback){
        let listReview = await get_ProductReview();
        callback(null, listReview)
    }

}

module.exports = function (app) {
    return new CustomerService(app);
};
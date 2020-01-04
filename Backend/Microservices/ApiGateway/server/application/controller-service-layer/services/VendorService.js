var BaseService = require('./BaseService');
const AWS = require('aws-sdk');
var fs = require('fs');
var path = require('path');
//configuring the AWS environment
AWS.config.update({
    bucketName: 'emart-product-images',
    //     // dirName: 'photos', /* optional */
    region: 'ap-south-1',
    accessKeyId: 'AKIAJIVK52LYVQCLYK7Q',
    secretAccessKey: '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',
});

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

    async AllProductsList(req, callback) {
        let listOfProducts = await AllProducts_List(req.params);
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

    async saveAllImages(req, callback) {
        console.log(req.files, "file");
        let file = req.files.file
        console.log("file", file);
        var paths = path.join(__dirname, "../../public/productImages/");
        var imageName = new Date().getTime() + ".jpg"
        var writeFilePath = paths + '/' + imageName;
        fs.readFile(file.path, function (err, data) {
            if (err) { } else {
                fs.writeFile(writeFilePath, data, function (error, success) {
                    if (error) {
                        callback(error, null)
                    } else {
                        var product = {};
                        product.msg = "product image save successfully!"
                        product.name = imageName;
                        callback(null, product)
                    }
                });
            }
        });

        // var base64data = new Buffer( 'binary',req.files.file);

        // var s3 = new AWS.S3();
        // var params = {
        //     Bucket: 'emart-product-images',
        //     Body: base64data,
        //     Key: req.files.file.name
        // };

        // s3.upload(params, function (err, data) {
        //     //handle error
        //     if (err) {
        //         console.log("Error", err);
        //         callback(err, null)
        //     }

        //     //success
        //     if (data) {
        //         console.log("Uploaded in:", data.Location);
        //         callback(null, data)
        //     }
        // })

    }


    async getBrandList(req, callback) {
        let searchResult = await get_BrandList(req.params);
        callback(null, searchResult)
    }

    async FilterRatings(req, callback) {
        let list = await Filter_Ratings(req.query);
        callback(null, list)
    }

    async deleteCustomer(req, callback) {
        let status = await delete_Customer(req.params);
        callback(null, status)
    }

    async getCustomerList(req, callback) {
        let customerlist = await get_Customer_List(req.params);
        callback(null, customerlist)
    }

    async getAllVendors(req, callback) {
        let vendorList = await getAll_Vendors(req.params);
        callback(null, vendorList)
    }

    async createStore(req, callback) {
        let storeDetails = await create_Store(req.body, req.params);
        callback(null, storeDetails)
    }

    async getAllStore(req, callback) {
        console.log(req.params)
        let storeList = await getAll_Store(req.params);
        callback(null, storeList)
    }




}

module.exports = function (app) {
    return new VendorService(app);
};
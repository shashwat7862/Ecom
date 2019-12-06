var BaseService = require('./BaseService');
var jwt = require("jsonwebtoken");
var fs = require('fs');
var request = require('request');

class ProductService extends BaseService {

    async Save_Products(productDataDetails, callback) {
        productDataDetails.save((err, savedproductDetails) => {
            console.log("savedproductDetails", savedproductDetails, err)

            if (err || !savedproductDetails) {
                callback(err, null);

            } else {
                callback(err, {
                    Details: savedproductDetails,
                    Message: "Product Save Successfully"
                });
            }
        });
    }

    async Products_List(category, pagination, callback) {
        try {
            domain[category].find({
                isApproved: pagination.isApprove
            }).skip(pagination.skip).limit(pagination.limit).exec(function (error, productList) {
                if (error) {
                    callback(error, null)
                } else {
                    callback(null, productList)
                }
            });
        } catch (e) {
            callback({
                "error": "error while saving"
            }, null)
        }

    }

    async Product_ApprovalRequest(body, dynamicDomain, callback) {
        console.log(body, dynamicDomain)
        try {
            domain[dynamicDomain].findOneAndUpdate({
                _id: body.id
            }, {
                    isApproved: body.isApprove
                }, {
                    new: true
                }, (error, result) => {
                    if (error) {
                        callback(error, null)
                    } else {
                        callback(null, result)
                    }
                });
        } catch (e) {
            callback(null, {
                "error": "error while saving"
            })
        }
    }

    async Edit_ProductsDetails(data, dynamicDomain, callback) {
        try {
            domain[dynamicDomain].findOneAndUpdate({
                _id: data.id
            }, data, {
                    new: true
                }, (error, result) => {
                    if (error) {
                        callback(error, null)
                    } else {
                        callback(null, result)
                    }
                });
        } catch (e) {
            callback(null, {
                "error": "error while saving"
            })
        }
    }


}





module.exports = function (app) {
    return new ProductService(app);
};
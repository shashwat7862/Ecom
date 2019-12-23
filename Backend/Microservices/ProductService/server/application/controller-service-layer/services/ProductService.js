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
                isApproved: pagination.isApprove,
                vendorId: pagination.vendor_id
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

    async All_Products_List(category, pagination, callback) {
        try {
            domain[category].find({
                isApproved: pagination.isApprove,
            }).populate('vendorId').skip(pagination.skip).limit(pagination.limit).exec(function (error, productList) {
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

    async Delete_Product(product_id, dynamicDomain, callback) {
        console.log(product_id, "dynamicDomain", dynamicDomain);
        domain[dynamicDomain].remove({ _id: product_id }, function (err) {
            if (err) {
                console.log(err, "error------------")
                callback(err, null)
            }
            else {
                callback(null, {
                    id: product_id,
                    msg: "Producted Deleted Successfully"
                })
            }
        });
    }

    async Filter_Products(query, dynamicDomain, callback) {
        console.log(query, dynamicDomain);
        let dbQuery;
        if (query) {
            dbQuery = {
                $or: [{
                    firstName: new RegExp('(^' + query.search + '|' + query.search + ')', 'i')
                }, {
                    lastName: new RegExp('(^' + query.search + '|' + query.search + ')', 'i')
                }, {
                    email: new RegExp('(^' + query.search + '|' + query.search + ')', 'i')
                }]
            };
        }
    };

    calculateResult(body, callback) {
        domain.Cart.find(
            {
                UserId: body.userId,
                // productDetails: { $elemMatch: { productId: body.productData.productId } },
            },
            function (err, result) {
                console.log(result, "-------------555");

                // domain.Cart.remove({})
                let arr = result;

                let finalResponse = []

                arr.forEach(function (val) {
                    if (val.productDetails.length == 0) {
                        domain.Cart.remove({
                            _id: val._id
                        }, function () {

                        })
                    } else {
                        (finalResponse.includes(val) ? '' : finalResponse.push(val))
                    }

                });
                console.log("final response", finalResponse);
                let cartList = [];
                finalResponse.forEach(function (product) {
                    (cartList.includes(product.productDetails[0])) ? '' : cartList.push(product.productDetails[0])

                })

                callback(null, {
                    cartList: cartList
                })
            });
    }

    async Cart(action, body, callback) {
        var self = this;
        console.log(action, "action", body);
        if (action == "ADD") {

            domain.Cart.find(
                {
                    UserId: body.userId,
                    productDetails: { $elemMatch: { productId: body.productData.productId } },
                },
                function (err, result) {
                    console.log(err, result, "999999999999999999999");

                    if (result.length == 0) {
                        console.log("push here", body, "body", body.productData)
                        domain.Cart.update(
                            {
                                UserId: body.userId,
                                productDetails: { $elemMatch: { productId: body.productData.productId } },
                            },
                            { "$push": { productDetails: body.productData } },
                            {
                                upsert: true
                            },
                            function (err, result) {
                                console.log(err, result);

                                self.calculateResult(body, callback)
                            });
                    } else {
                        console.log("inside inc")
                        domain.Cart.update(
                            {
                                UserId: body.userId,
                                productDetails: { $elemMatch: { productId: body.productData.productId } },
                            },
                            {
                                $inc: { "productDetails.$.productCount": 1 },
                            },
                            function (err, result) {
                                self.calculateResult(body, callback)
                            });
                    }
                })
        } else if (action == "REMOVE") {
            domain.Cart.update(
                {
                    UserId: body.userId,
                    productDetails: {
                        "$elemMatch": {
                            productId: body.productId,
                            productCount: { $gt: 0 }
                        }
                    },
                },
                { $inc: { "productDetails.$.productCount": -1 } },
                function (err, result) {
                    domain.Cart.update(
                        {
                            UserId: body.userId,
                            productDetails: {
                                "$elemMatch": {
                                    productId: body.productId,
                                    productCount: 0
                                }
                            },
                        },
                        {
                            $pull: { productDetails: { productId: body.productId } }
                        },
                        function (error, _result) {
                            if (err) {
                                callback(err, null)
                            }
                            else {
                                callback(null, {
                                    data: result
                                })
                            }
                        });
                });

        }

    }

    save_ProductReview(data, callback) {
        data.save((err, saveReviews) => {
            console.log("saveReviews", saveReviews, err)

            if (err || !saveReviews) {
                callback(err, null);

            } else {
                callback(err, {
                    Details: saveReviews,
                    Message: "Product Review Saved Successfully"
                });
            }
        });
    }

    get_ProductReview(callback) {
        console.log("get_ProductReview 3")
        domain.ProductReview.find({}, function (err,result) {
            console.log(err,result,"----------")
            callback(null,{
                reviewList:result
            })
        })
    }


    pushTocart(body, cb) {
        console.log("inside new")
        domain.Cart.remove({
            UserId: body.userId
        },
            function (err, result) {

                domain.Cart.update(
                    {
                        UserId: body.userId,
                        productDetails: { $elemMatch: { productId: body.productData.productId } },
                    },
                    {
                        $push: { productDetails: body.productData }
                    },
                    {
                        upsert: true
                    },
                    function (err, result) {
                        console.log(err, result);
                        cb(null, result)
                    });
            });
    }






    async Wish_List(action, body, callback) {
        console.log(action, "action", body);
        if (action == "ADD") {
            domain.WishList.update(
                { UserId: body.userId },
                { $push: { productDetails: body.productData } },
                {
                    upsert: true
                }, function (err, result) {
                    if (err) {
                        callback(err, null)
                    }
                    else {
                        callback(null, {
                            data: result
                        })
                    }
                });
        } else if (action == "REMOVE") {
            domain.WishList.update(
                { UserId: body.userId },
                {
                    $pull: { productDetails: { productId: body.productId } }
                },
                {
                    multi:true
                },
                function (err, result) {
                    if (err) {
                        callback(err, null)
                    }
                    else {
                        callback(null, {
                            data: result
                        })
                    }
                });
        }

    }




    async Cart_List(userId, callback) {
        var self = this;
        try {
            domain.Cart.find({
                UserId: userId
            }).exec(function (error, cartList) {
                self.calculateResult({
                    userId: userId
                }, callback)
            });
        } catch (e) {
            callback({
                "error": "error while saving"
            }, null)
        }
    }

    async GetAll_WishLists(userId, callback) {
        try {
            domain.WishList.find({
                UserId: userId
            }).exec(function (error, WishList) {
                if (error) {
                    callback(error, null)
                } else {
                    callback(null, WishList)
                }
            });
        } catch (e) {
            callback({
                "error": "error while saving"
            }, null)
        }
    }



    async productSearchForCustomers(query, dynamicDomain = 'electronics', callback) {
        console.log(query, dynamicDomain);

        let dbQuery;
        if (query && dynamicDomain) {
            dbQuery = {
                $or: [{
                    productName: new RegExp('(^' + query.search + '|' + query.search + ')', 'i')
                }, {
                    modelNo: new RegExp('(^' + query.search + '|' + query.search + ')', 'i')
                }, {
                    brandName: new RegExp('(^' + query.search + '|' + query.search + ')', 'i')
                }]
            };

            domain[dynamicDomain].find(dbQuery, function (err, searchResult) {

                if (err) {
                    console.log(err, "errors")
                    callback(err, null)
                }
                else {
                    callback(null, searchResult)
                }
            });
        } else {
            callback(null, null)
        }
    }

    async Search_Products(query, dynamicDomain, vendorId, callback) {
        console.log(query, dynamicDomain);
        let dbQuery;
        if (query) {
            dbQuery = {
                vendorId: vendorId,
                $or: [{
                    productName: new RegExp('(^' + query.search + '|' + query.search + ')', 'i')
                }, {
                    modelNo: new RegExp('(^' + query.search + '|' + query.search + ')', 'i')
                }, {
                    brandName: new RegExp('(^' + query.search + '|' + query.search + ')', 'i')
                }]
            };

            domain[dynamicDomain].find(dbQuery, function (err, searchResult) {

                if (err) {
                    console.log(err, "errors")
                    callback(err, null)
                }
                else {
                    callback(null, searchResult)
                }
            });
        }
    }


}





module.exports = function (app) {
    return new ProductService(app);
};
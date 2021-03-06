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
    }

    async Cart(action, body, callback) {
        var self = this;
        console.log(action, "action", body);
        if (action == "ADD") {

            async.auto({
                matchWithUserId: function (cb) {
                    domain.Cart.find(
                        {
                            UserId: body.userId,
                            productDetails: { $elemMatch: { productId: body.productData.productId } },
                        },
                        function (err, result) {
                            console.log(err, result);
                            cb(null, result)
                        });

                },
                updateProduct: ['matchWithUserId', function (results, cb) {
                    console.log("results.matchWithUserId",results.matchWithUserId,"------)")
                    if (results.matchWithUserId.length == 0) {
                        console.log("inside empty")
                        self.pushTocart(body, cb)
                    } else {
                        let obj = results.matchWithUserId[0].toObject();
                        console.log(obj._id,"------------------------ -id")
                        if (obj.hasOwnProperty('productDetails')) {
                            if (obj.productDetails.length == 0) {
                                console.log("inside []")
                                domain.Cart.remove({
                                    _id: obj._id
                                },
                                    function (err, result) {
                                        console.log(result,"remove-----------------------")
                                        domain.Cart.update(
                                            {
                                                UserId: body.userId,
                                                productDetails: { $elemMatch: { productId: body.productData.productId } },
                                            },
                                            {
                                                $push: { productDetails: body.productData }
                                            },
                                            function (err, result) {
                                                console.log(err, result);
                                                cb(null, result)
                                            });
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
                                        cb(null, result)
                                    });
                            }
                        } else {
                            pushTocart(body, cb);
                        }
                    }

                }],

            }, function (err, results) {
                console.log('err = ', err);
                console.log('results = ', results);
                if (!err) {
                    callback(null, results)
                } else {
                    callback(err, null)
                }

            });

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
                        upsert:true
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

    // async Wish_List(action, body, callback) {
    //     var self = this;
    //     console.log(action, "action", body);
    //     if (action == "ADD") {

    //         async.auto({
    //             matchWithUserId: function (cb) {
    //                 domain.WishList.find(
    //                     {
    //                         UserId: body.userId,
    //                         productDetails: { $elemMatch: { productId: body.productData.productId } },
    //                     },
    //                     function (err, result) {
    //                         console.log(err, result);
    //                         cb(null, result)
    //                     });

    //             },
    //             updateProduct: ['matchWithUserId', function (results, cb) {
    //                 console.log("results.matchWithUserId",results.matchWithUserId,"------)")
    //                 if (results.matchWithUserId.length == 0) {
    //                     console.log("inside empty")
    //                     self.pushToWishList(body, cb)
    //                 } else {
    //                     let obj = results.matchWithUserId[0].toObject();
    //                     console.log(obj._id,"------------------------ -id")
    //                     if (obj.hasOwnProperty('productDetails')) {
                           
    //                             console.log("inside inc")
    //                             domain.WishList.update(
    //                                 {
    //                                     UserId: body.userId,
    //                                     productDetails: { $elemMatch: { productId: body.productData.productId } },
    //                                 },
    //                                 {
    //                                     $push: { productDetails: body.productData }
    //                                 },
    //                                 function (err, result) {
    //                                     cb(null, result)
    //                                 });
                            
    //                     } else {
    //                         pushToWishList(body, cb);
    //                     }
    //                 }

    //             }],

    //         }, function (err, results) {
    //             console.log('err = ', err);
    //             console.log('results = ', results);
    //             if (!err) {
    //                 callback(null, results)
    //             } else {
    //                 callback(err, null)
    //             }

    //         });

    //     } else if (action == "REMOVE") {
           
    //                 domain.WishList.update(
    //                     {
    //                         UserId: body.userId,
    //                         productDetails: {
    //                             "$elemMatch": {
    //                                 productId: body.productId,
    //                             }
    //                         },
    //                     },
    //                     {
    //                         $pull: { productDetails: { productId: body.productId } }
    //                     },
    //                     function (err, _result) {
    //                         console.log(err,_result)
    //                         if (err) {
    //                             callback(err, null)
    //                         }
    //                         else {
    //                             callback(null, {
    //                                 data: _result
    //                             })
    //                         }
    //                     });

    //     }

    // }

    pushToWishList(body,cb){
        console.log("inside new")
        domain.WishList.remove({
            UserId: body.userId
        },
            function (err, result) {

                domain.WishList.update(
                    {
                        UserId: body.userId,
                        productDetails: { $elemMatch: { productId: body.productData.productId } },
                    },
                    {
                        $push: { productDetails: body.productData }
                    },
                    {
                        upsert:true
                    },
                    function (err, result) {
                        console.log(err, result);
                        cb(null, result)
                    });
            });
    }


    

    async Cart_List(userId, callback) {
        try {
            domain.Cart.find({
                UserId: userId
            }).exec(function (error, cartList) {
                if (error) {
                    callback(error, null)
                } else {
                    callback(null, cartList)
                }
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
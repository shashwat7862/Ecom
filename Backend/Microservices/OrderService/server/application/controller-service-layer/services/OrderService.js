var BaseService = require('./BaseService');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class OrderService extends BaseService {



    async create_Order(payload, callback) {
        let ProductArr = payload.productDetails;
        let self = this;
        let orderId = uuid.v4();
        var FinalResponse = [];
        async.eachSeries(ProductArr, function (productData, next) {

            let OrderData = self.prepairOrderData(productData, payload);
            OrderData.orderId = orderId;
            console.log("OrderData", OrderData);
            let PaymentData = self.prepairPaymentData(payload);
            PaymentData.orderId = orderId;
            console.log(PaymentData, "paymentData");

            async.auto({
                saveDataInOrderTable: function (cb) {
                    domain.Order.create(OrderData).then((createdOrderData) => {
                        cb(null, {
                            "message": "Order Has been placed successfully",
                            "orderId": OrderData.orderId,
                            "ProductName": OrderData.productName,
                            "productId": OrderData.productId
                        });
                    });
                },
                saveDataInPaymentTable: ['saveDataInOrderTable', function (results, cb) {
                    PaymentData.paymentDataId = uuid.v4();
                    domain.Payment.create(PaymentData).then((savePayemetDetails) => {
                        cb(null, {
                            "message": "Payment Data Has been saved successfully",
                            "PaymentId": PaymentData.paymentDataId,
                        });
                    });
                }],
                stockUpdateInProductTable: ['saveDataInPaymentTable', function (results, cb) {
                    domain.Cart.remove({
                        UserId: payload.UserId
                    }, {
                            multi: true
                        }, function (err, data) {
                            cb(null, {
                                data: data,
                                userId: payload.UserId
                            })
                        })

                }],
            }, function (err, results) {
                console.log('err = ', err);
                console.log('results = ', results);
                if (!err) {
                    FinalResponse.push(results);
                    next(null, results)
                } else {
                    next(err, null)
                }

            });

        }, function (error, Finalresults) {
            console.log('err = ', error);
            console.log('results = ', Finalresults);
            if (!error) {
                callback(null, FinalResponse)
            } else {
                callback(error, null)
            }
        })
    }

    prepairOrderData(productData, payload) {
        return {
            productName: productData.productName,
            productImage: productData.productImage,
            deliveryEstimateDate: new Date(),
            productPrice: productData.price,
            QTY: productData.productCount,
            UserId: payload.UserId,
            VendorId: productData.VendorId,
            VendorName: productData.VendorName,
            productId: productData.productId,
            orderCount: payload.productDetails.length,
        }
    }

    prepairPaymentData(payload) {
        let data = payload.paymentDetails;
        let addressData = payload.addressDetails;
        return {
            cardType: data.cardType,
            paymentMethod: data.paymentMethod,
            cardNumber: data.cardNumber,
            UserId: payload.UserId,
            totalItemsCost: data.totalItemsCost,
            packageCharge: data.packageCharge,
            totalBeforeTax: data.totalBeforeTax,
            Tax: data.Tax,
            FinalTotal: data.FinalTotal,
            billing_Location_Area: addressData.billing_Location_Area,
            billing_City: addressData.billing_City,
            billing_State: addressData.billing_State,
            billing_NearBy: addressData.billing_NearBy,
            billing_Pincode: addressData.billing_Pincode,
            shiping_Location_Area: addressData.shiping_Location_Area,
            shiping_City: addressData.shiping_City,
            shiping_State: addressData.shiping_State,
            shiping_NearBy: addressData.shiping_NearBy,
            shiping_Pincode: addressData.shiping_Pincode,
        }
    }

    async get_OrderList(userId, VendorId, page, callback) {

        var query;
        if (page.fetch == 'All') {
            query = {
                where: {},
                offset: page.skip, limit: page.limit
            }
        } else if (page.fetch == 'Vendor') {
            query = {
                where: {
                    VendorId: VendorId
                },
                offset: page.skip, limit: page.limit
            }
        } else {
            query = {
                where: {
                    UserId: userId
                },
                offset: page.skip, limit: page.limit
            }
        }
        console.log(query, "query")
        domain.Order.findAll(query).then(orders => {
            let orderList = JSON.stringify(orders)
            console.log("All Orders:", orderList);
            callback(null, {
                data: JSON.parse(orderList)
            })

        });
    }

    get_OrderDetails(_orderId, callback) {

        async.auto({
            getOrderData: function (cb) {
                domain.Order.findAll({
                    where: {
                        orderId: _orderId
                    }
                }).then(orders => {
                    let orderList = JSON.stringify(orders)
                    cb(null, {
                        orderList: orders
                    })
                })
            },
            getPaymentData: ['getOrderData', function (results, cb) {
                domain.Payment.findAll({
                    where: {
                        orderId: _orderId
                    }
                }).then(paymentData => {
                    let _paymentDetailsList = JSON.stringify(paymentData)
                    cb(null, {
                        paymentDetails: JSON.parse(_paymentDetailsList)
                    })
                })
            }]
        }, function (err, results) {
            console.log('err = ', err);
            console.log('results = ', results);
            if (!err) {
                callback(null, results)
            } else {
                callback(err, null)
            }

        });
    }

    async search_Orders(value, callback) {
        sequelize.query(`SELECT * FROM orders WHERE productName LIKE '%${value}%' OR productId LIKE '%${value}%' OR orderId LIKE '%${value}%' OR orderStatus LIKE '%${value}%'`, { type: sequelize.QueryTypes.SELECT })
            .then(function (users) {
                if (users) {
                    let response = JSON.stringify(users)
                    callback(null, {
                        data: JSON.parse(response)
                    })
                } else {
                    callback(err, null)
                }
            })
    };

    save_Address(payload, cb) {
        domain.Address.create(payload).then((response) => {
            cb(null, {
                "message": "Address Has been saved successfully",
            });
        });
    }

    get_Address(userId, cb) {
        domain.Address.findAll({
            where: {
                userId: userId
            }
        }).then((response) => {
            let results = JSON.stringify(response)
            cb(null, {
                "Data": JSON.parse(results),
            });
        });
    }

    get_ComplaintList(params,cb){
        domain.OrdersComplaint.findAll({
            where: {
                UserId: params.userId
            }
        }).then(paymentData => {
            let response = JSON.stringify(paymentData)
            cb(null, {
                complaintList: JSON.parse(response)
            })
        })
    }

    edit_Address(payload, params, callback) {
        var str = '';
        Object.keys(payload)
            .forEach(function eachKey(key) {
                str = str + key + ' = ' + "'" + payload[key] + "'" + ' and '

            });

        var query = str;
        query = query.slice(0, query.length - 4)

        sequelize.query(`UPDATE addresses SET ${query} WHERE id = ${params.addressId}`).then(([results, metadata]) => {
            callback(null, {
                data: "Edited Success"
            })
        })
    }

    delete_Address(params, callback) {

    }

    Save_Complaint(complaintData,callback){

        let payload ={
            productName:complaintData.productName,
            complaintProductImage:complaintData.complaintProductImage,
            ordersComplaintStatus:complaintData.ordersComplaintStatus,
            orderId:complaintData.orderId,
            UserId:complaintData.UserId,
            vendorId:complaintData.vendorId,
            productId:complaintData.productId,
            complainType:complaintData.complainType,
            problemDes:complaintData.problemDes
        }

        console.log(payload,"payload")
        domain.OrdersComplaint.create(payload).then((results) => {
            callback(null, {
                "message": "Complaint Has been Saved successfully",
                "status": results,
         
            });
        });
    }


    get_CustomerList(params, callback) {
        async.auto({
            getOrderDataOfVendor: function (cb) {
                domain.Order.findAll({
                    where: {
                        VendorId: params.vendorId,
                        orderStatus: "CREATED"

                    }
                }).then(orders => {
                    let orderList = JSON.stringify(orders)
                    cb(null, {
                        orderList: orders
                    })
                })
            },
            getCustomerList: ['getOrderDataOfVendor', function (results, cb) {
                var finalCustomerList=[];
                async.forEachSeries(results.getOrderDataOfVendor.orderList, function (orderData, next) {
                    console.log(JSON.stringify(orderData), 'orderData');
                    var obj={}
                    domain.Customer.find({
                        _id: orderData.UserId
                    }).exec(function (err, results) {
                        obj.orderData = orderData
                        obj.userData = results;
                        finalCustomerList.push(obj);
                        next();
                    });

                   
                }, function () {
                    cb(null,finalCustomerList)
                });
            }]
        }, function (err, results) {
            console.log('err = ', err);
            console.log('results = ', results);
            if (!err) {
                callback(null, results)
            } else {
                callback(err, null)
            }

        });
    }
}










module.exports = function (app) {
    return new OrderService(app);
};
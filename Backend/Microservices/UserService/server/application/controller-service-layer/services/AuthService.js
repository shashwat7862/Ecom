var BaseService = require('./BaseService');
var jwt = require("jsonwebtoken");
var fs = require('fs');
var request = require('request');

class AuthService extends BaseService {

    findOneOTP(query, selectFields = '') {
        return domain.Otp.findOne(query).select(selectFields);
    }

    removeOTP(query, selectFields = '') {
        return domain.Otp.remove(query).select(selectFields);
    }

    async registerVendor(vendor, callback) {
        console.log("4")
        vendor.save((err, vendorObj) => {
            if (err || !vendorObj) {
                callback(err, null);
            } else {
                console.log("5")
                var loginTokenObj;
                if (vendor.loginFrom == 'OTP') {
                    loginTokenObj = {
                        mobile: vendor.mobile,
                    };
                } else {
                    loginTokenObj = {
                        email: vendorObj.email,
                        password: vendorObj.password
                    };
                }

                var token = jwt.sign(loginTokenObj, "4phd7fdjEUewFB0dYRuHyw==", {
                    expiresIn: "1h"
                });
                callback(err, {
                    vendorDetails: vendorObj,
                    authToken: token
                });
            }
        });
    }

    async registerCustomer(customer, callback) {
        console.log("4")
        customer.save((err, customerObj) => {
            if (err || !customerObj) {
                callback(err, null);
            } else {
                console.log("5")
                var loginTokenObj;
                if (customer.loginFrom == 'OTP') {
                    loginTokenObj = {
                        mobile: customer.mobile,
                    };
                } else {
                    loginTokenObj = {
                        email: customerObj.email,
                        password: customerObj.password
                    };
                }

                var token = jwt.sign(loginTokenObj, "4phd7fdjEUewFB0dYRuHyw==", {
                    expiresIn: "1h"
                });
                callback(err, {
                    customerDetails: customerObj,
                    authToken: token
                });
            }
        });
    }




    async login_Vendor(payload, callback) {
        let email = payload.email;
        let password = payload.password;
        const query = {
            email: email.toLowerCase()
        }
        console.log(query, "vendorlogin ", payload.password)
        const [err, user] = await To(domain.Vendor.findOne(query));
        if (err || !user) return callback(new Error("Invalid email or Password"));
        if (configHolder.encryptUtil.verifyPassword(user, password)) {
            this.generateAuthenticationToken(email, password, user, 'vendor', callback);
        } else {
            callback(new Error("Invalid 1 Email or Password"), null);
        }
    }


    async Customer_Login(payload, callback) {
        let email = payload.email;
        let password = payload.password;
        console.log(email, password)
        const query = {
            email: email.toLowerCase()
        }
        const [err, user] = await To(domain.Customer.findOne(query));
        console.log(user, "user ---")
        if (err || !user) return callback(new Error("Invalid email or Password"));
        if (configHolder.encryptUtil.verifyPassword(user, password)) {
            this.generateAuthenticationToken(email, password, user, 'customer', callback);
        } else {
            callback(new Error("Invalid 1 Email or Password"), null);
        }
    }



    async Send_OTP(body, callback) {
        let mobile = body.mobile
        var availableNumbers = "0123456789";
        var otp = '';
        for (var i = 0; i <= 3; i++) {
            var symbol = availableNumbers[(Math.floor(Math.random() * availableNumbers.length))];
            otp += symbol;
        }

        console.log(mobile, "mobile")
        var url = configHolder.config.otpUrl + mobile + "/" + otp
        console.log("Final OTP url", url);
        request(url, function (err) {
            if (err) {
                callback(err, null)
            } else {
                // callback(null, success);
                var otpObj = new domain.Otp({
                    "otp": otp,
                    userRole: body.userRole,
                    mobileNumber: mobile,
                    countrycode: "+91"
                });
                otpObj.save(function (err, success) {
                    if (err) {
                        callback(err, null)
                    } else {
                        callback(null, success)
                    }
                });
            }
        });


    }

    async Verify_OTP(body, callback) {
        console.log("mo", body, "body", body.mobile, body.otp);

        const query = {
            mobileNumber: body.mobile,
            otp: body.otp,
        }

        const [err, otpDetails] = await To(this.findOneOTP(query));
        const [errors, otpRemoveDetails] = await To(this.removeOTP(query));
        console.log("otpDetails", otpDetails);

        if (otpDetails == null) {
            callback(null, {
                "msg": "OTP is not found",
                "otpDetails": otpDetails,
            })
        } else {
            const UserObj = {
                mobile: body.mobile,
                password: body.otp
            }

            var token = jwt.sign(UserObj, "4phd7fdjEUewFB0dYRuHyw==", {
                expiresIn: "1h"
            });

            if (body.userRole == 'VENDOR') {
                const [error, UserData] = await To(domain.Vendor.findOne({
                    mobile: body.mobile
                }));
                console.log("2", UserData, error)
                this.registerRoleBYOTP(otpDetails, otpRemoveDetails, UserData, token, body, callback)
            } else {
                const [error, UserData] = await To(domain.Customer.findOne({
                    mobile: body.mobile
                }));
                console.log("2", UserData, error)
                this.registerRoleBYOTP(otpDetails, otpRemoveDetails, UserData, token, body, callback)
            }
        }
    };

    async registerRoleBYOTP(otpDetails, otpRemoveDetails, UserData, token, body, callback) {
        console.log(callback, "callback")
        if (otpDetails && UserData) {
            callback(null, {
                "msg": "OTP is valid",
                "otpDetails": otpDetails,
                "otpRemoveDetails": otpRemoveDetails,
                "UserData": UserData,
                "authToken": token,


            })
        } else {
            var salt = uuid.v4();

            if (body.userRole == 'VENDOR') {
                let vendor = new domain.Vendor(body);
                vendor.role = 'ROLE_VENDOR';
                vendor.salt = salt;
                vendor.password = configHolder.encryptUtil.encryptPassword(salt, body.mobile.toString());
                console.log(vendor, "--------------------------")
                this.registerVendor(vendor, callback)
            } else {
                let customer = new domain.Customer(body);
                customer.role = 'ROLE_CUSTOMER';
                customer.salt = salt;
                customer.password = configHolder.encryptUtil.encryptPassword(salt, body.mobile.toString());
                console.log(customer, "--------------------------")
                this.registerCustomer(customer, callback)
            }

        }
    }

    async Forgot_Password(body, callback) {

        let query;
        if (body.loginFrom == 'OTP') {
            query = {
                mobile: body.mobile
            }
        } else {
            query = {
                email: body.email
            }
        }


        const [error, vendorDetails] = await To(domain.Vendor.findOne(query));
        console.log("2", vendorDetails, error)

        if (vendorDetails) {
            this.sendEmailToUser(body.email, "Change Passwprd", callback);
        }

    }

    generateAuthenticationToken(email, password, userData, calledFrom, callback) {
        var UserObj = {
            email: email,
            password: password
        };
        var token = jwt.sign(UserObj, "4phd7fdjEUewFB0dYRuHyw==", {
            expiresIn: "1h"
        });
        console.log(token);
        let response = {
            authToken: token,
            // userDetails: userData
        };
        response[calledFrom + 'Details'] = userData

        callback(null, response)
    }


    sendEmailToUser(email, subject, callback) {

        var availableNumbers = "0123456789";
        var otp = '';
        for (var i = 0; i <= 3; i++) {
            var symbol = availableNumbers[(Math.floor(Math.random() * availableNumbers.length))];
            otp += symbol;
        }

        const emailBody = `Hi,
            Your OTP is .
            ${otp} 
    Thank you`;

        var otpObj = new domain.Otp({
            "otp": otp,
            mobileNumber: null,
            countrycode: "+91"
        });
        otpObj.save(function (err, success) {
            if (err) {
                callback(err, null)
            } else {
                callback(null, {
                    message: 'Email has been sent to your mail.Please check it.'
                });
            }
        });

        return configHolder.EmailUtil.sendMail(email, subject, emailBody);
    }

    getAll_CustomerList(params, callback) {

            domain.Customer.find({}).exec(function (err, customerlist) {
                callback(null, {
                    customerlist: customerlist
                })
            })

    }

    delete_Customer(params, callback) {
        console.log(params, params.userId)
        domain.Customer.update({
            deleted: false,
            _id: params.userId
        }, {
                $set: {
                    deleted: true,
                    deletedAt: new Date()
                }
            }).exec(function (err, status) {
                console.log(err, status, "----------------------")
                callback(err, {
                    status: status
                })
            })
    }

    Customer_Profile_Update(params,editedProfileData,callback){
        try {
            domain.Customer.findOneAndUpdate({
                _id: params.userId
            }, editedProfileData, (error, result) => {
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
    return new AuthService(app);
};
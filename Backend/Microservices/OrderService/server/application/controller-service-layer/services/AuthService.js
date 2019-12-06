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
        vendor.save((err, vendorObj) => {
            if (err || !vendorObj) {
                callback(err, null);
            } else {
                var loginTokenObj = {
                    email: vendorObj.email,
                    password: vendorObj.password
                };
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

    async login_Vendor(payload, callback) {
        let email = payload.email;
        let password = payload.password;
        console.log(email, password);
        const query = {
            email: email.toLowerCase()
        }

        const [err, user] = await To(domain.Vendor.findOne(query));

        if (err || !user) return callback(new Error("Invalid email or Password"));

        // if (user.isAccountLocked == true) return callback(new Error('Your account is locked.Please contact to site admin.'))

        // if (user.isAccountActive == false) return callback(new Error("Verify your email."));

        if (configHolder.encryptUtil.verifyPassword(user, password)) {
            this.generateAuthenticationToken(email, password, user, callback);
        } else {
            callback(new Error("Invalid 1 Email or Password"), null);
        }
    }

    async Send_OTP(mobile, callback) {

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

        let data = await domain.Otp.find(query).exec();
        console.log("otp data", data)

        const [err, otpDetails] = await To(this.findOneOTP(query));
        const [errors, otpRemoveDetails] = await To(this.removeOTP(query));
        console.log("otpDetails", otpDetails);

        if (err) return callback(err);
        if (!otpDetails) return callback(new Error('No otp found'));


        const Userquery = {
            mobile: body.mobile
        }

        const UserObj = {
            mobile: body.mobile,
            password: body.otp
        }

        var token = jwt.sign(UserObj, "4phd7fdjEUewFB0dYRuHyw==", {
            expiresIn: "1h"
        });
        // console.log(token, UserData)
        console.log("!")
        if (otpDetails) {
                callback(null, {
                    "msg":"OTP is valid",
                    "otpDetails": otpDetails,
                    "otpRemoveDetails": otpRemoveDetails

                })
        } else {
            console.error("error occurs")
        }
        // if (otpDetails) {
        //     const [error, UserData] = await To(domain.Vendor.findOne(Userquery));
        //     console.log("2", UserData, error)
        //     if (UserData) {
        //         callback(null, {
        //             authToken: token,
        //             userDetails: UserData,
        //             "otpDetails": otpDetails,
        //             "otpRemoveDetails": otpRemoveDetails

        //         })
        //     } else {
        //         console.log("3")
        //         var salt = uuid.v4();
        //         let vendor = new domain.Vendor(body);
        //         vendor.role = 'ROLE_VENDOR';
        //         vendor.salt = salt;
        //         vendor.password = configHolder.encryptUtil.encryptPassword(salt, body.mobile.toString());
        //         console.log(vendor,"--------------------------")
        //         this.registerVendor(vendor, callback)
        //     }
        // } else {
        //     console.error("error occurs")
        // }

    };

    generateAuthenticationToken(email, password, userData, callback) {
        var UserObj = {
            email: email,
            password: password
        };
        var token = jwt.sign(UserObj, "4phd7fdjEUewFB0dYRuHyw==", {
            expiresIn: "1h"
        });
        console.log(token)
        callback(null, {
            authToken: token,
            userDetails: userData
        })
    }

}





module.exports = function (app) {
    return new AuthService(app);
};
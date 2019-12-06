global.domain = {}

domain.Address = require("../application/models/Address.js")
domain.User = require("../application/models/User.js")
domain.AuthenticationToken = require("../application/models/AuthenticationToken.js")
domain.VerificationToken = require("../application/models/VerificationToken.js")
domain.RegistrationToken = require("../application/models/RegistrationToken.js")
domain.Otp = require("../application/models/otp.js");
domain.Chat = require("../application/models/chat.js");
domain.ElectronicsProduct = require("../application/models/ElectronicsProducts");
domain.AgricultureAndFood = require('../application/models/AgricultureAndFood.js');
domain.Vendor = require('../application/models/Vendor.js');
// domain.Products = require('../application/models/Seller.js');

domain.Quotation = require("../application/models/Quotation.js");
domain.Query = require("../application/models/Query.js");
domain.Cart = require("../application/models/Cart.js");
domain.ShowInterest = require("../application/models/ShowInterest.js");

module.exports = domain
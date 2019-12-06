global.domain = {}

domain.Address = require("../application/models/Address.js")
domain.User = require("../application/models/User.js")
domain.AuthenticationToken = require("../application/models/AuthenticationToken.js")
domain.VerificationToken = require("../application/models/VerificationToken.js")
domain.RegistrationToken = require("../application/models/RegistrationToken.js")
domain.Otp = require("../application/models/otp.js");
domain.Chat = require("../application/models/chat.js");
domain.industrial_product = require("../application/models/industrial_product.js");
domain.FashionNonBrandedProduct = require("../application/models/FashionNonBrandedProduct.js");
domain.AgricultureAndFood = require('../application/models/AgricultureAndFood.js');
domain.Seller = require('../application/models/Seller.js');
// domain.Products = require('../application/models/Seller.js');

domain.FashionBrandedProductDetails = require("../application/models/FashionBrandedProductDetails.js");
domain.FashionNonBrandedProductDetails = require("../application/models/FashionNonBrandedProductDetails.js");

domain.TaxtileBrandedProduct = require("../application/models/TaxtileBrandedProduct.js");
domain.TaxtileNonBrandedProduct = require("../application/models/TaxtileNonBrandedProduct.js");
domain.TaxtileBrandedProductDetails = require("../application/models/TaxtileBrandedProductDetails.js");
domain.TaxtileNonBrandedProductDetails = require("../application/models/TaxtileNonBrandedProductDetails.js");
domain.Quotation = require("../application/models/Quotation.js");
domain.Query = require("../application/models/Query.js");
domain.Cart = require("../application/models/Cart.js");
domain.ShowInterest = require("../application/models/ShowInterest.js");

module.exports = domain
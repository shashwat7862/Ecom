global.domain = {}

domain.Order = require("../application/models/order.js");
domain.Payment = require("../application/models/payment.js");
domain.Address = require("../application/models/address.js");
domain.Cart = require("../application/models/cart.js");
domain.Customer = require('../application/models/Customer.js');
domain.OrdersComplaint = require('../application/models/OrdersComplaint');


module.exports = domain
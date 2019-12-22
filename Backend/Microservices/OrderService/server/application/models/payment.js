const Sequelize = require('sequelize');
var sequelize = require('../../configurations/Datasource');

const Payment = sequelize.define('payment', {
  // attributes
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  paymentMethod: {
    type: Sequelize.STRING,
    allowNull: false
  },
  cardType: {
    type: Sequelize.STRING,
    allowNull: true
  },
  orderId: {
    type: Sequelize.STRING,
    allowNull: false
  },
  cardNumber: {
    type: Sequelize.STRING,
    allowNull: true
  },
  billing_Location_Area: {
    type: Sequelize.STRING,
    allowNull: false
  },
  billing_City: {
    type: Sequelize.STRING,
    allowNull: false
  },
  billing_State: {
    type: Sequelize.STRING,
    allowNull: false
  },
  billing_NearBy: {
    type: Sequelize.STRING,
    allowNull: true
  },
  billing_Pincode: {
    type: Sequelize.STRING,
    allowNull: true
  },
  // VendorIds: {
  //   type: Sequelize.ARRAY,
  //   allowNull: false
  // },
  // productIds: {
  //   type: Sequelize.ARRAY,
  //   allowNull: false
  // },
  UserId: {
    type: Sequelize.STRING,
    allowNull: false
  },

  totalItemsCost: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  packageCharge: {
    type: Sequelize.DOUBLE,
    allowNull: true
  },
  totalBeforeTax: {
    type: Sequelize.DOUBLE,
    allowNull: true
  },
  Tax: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  shiping_Location_Area: {
    type: Sequelize.STRING,
    allowNull: false
  },
  shiping_City: {
    type: Sequelize.STRING,
    allowNull: false
  },
  shiping_State: {
    type: Sequelize.STRING,
    allowNull: false
  },
  shiping_NearBy: {
    type: Sequelize.STRING,
    allowNull: true
  },
  shiping_Pincode: {
    type: Sequelize.STRING,
    allowNull: true
  },
  FinalTotal: {
    type: Sequelize.DOUBLE,
    allowNull: false
  }
}, {
  associate(models) {
    console.log("model------------------------",models)
		Payment.belongsTo(domain.Order, {
			foreignKey: 'orderId',
		});
	},
  });



module.exports = Payment;





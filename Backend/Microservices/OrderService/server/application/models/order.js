const Sequelize = require('sequelize');
var sequelize = require('../../configurations/Datasource');

const Order = sequelize.define('order', {
    // attributes
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    productName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    productImage: {
        type: Sequelize.STRING,
        allowNull: true
    },
    deliveryEstimateDate: {
        type: Sequelize.DATE,
        allowNull: true
    },
    orderStatus: {
        type: Sequelize.STRING,
        defaultValue: "CREATED",
        allowNull: false
    },
    orderId: {
        type: Sequelize.STRING,
        allowNull: false
    },
    productPrice: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    QTY: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    UserId: {
        type: Sequelize.STRING,
        allowNull: false
    },
    VendorId: {
        type: Sequelize.STRING,
        allowNull: false
    },
    VendorName: {
        type: Sequelize.STRING,
        allowNull: true
    },
    productId: {
        type: Sequelize.STRING,
        allowNull: false
    },
    orderCount: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    refundStatus: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    isReturnRequested: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },

}, {
    associate(models) {
        Order.hasMany(models.payment, {
            foreignKey: 'orderId',
        });

        // Order.hasMany(models.Token, {
        //     foreignKey: 'userId',
        //     onDelete: 'cascade',
        // });
    },
    });



module.exports = Order;


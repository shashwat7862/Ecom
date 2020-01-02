const Sequelize = require('sequelize');
var sequelize = require('../../configurations/Datasource');

const OrdersComplaint = sequelize.define('ordersComplaint', {
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
    complaintProductImage: {
        type: Sequelize.STRING,
        allowNull: true
    },
    ordersComplaintStatus: {
        type: Sequelize.STRING,
        defaultValue: "PENDING",
        allowNull: false
    },
    orderId: {
        type: Sequelize.STRING,
        allowNull: false
    },
    UserId: {
        type: Sequelize.STRING,
        allowNull: false
    },
    vendorId: {
        type: Sequelize.STRING,
        allowNull: false
    },
    productId: {
        type: Sequelize.STRING,
        allowNull: false
    },
    complainType:{
        type: Sequelize.STRING,
        allowNull: true
    },
    problemDes:{
        type: Sequelize.STRING,
        allowNull: true
    },
    

}, {
     
    });



module.exports = OrdersComplaint;


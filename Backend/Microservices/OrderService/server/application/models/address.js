const Sequelize = require('sequelize');
var sequelize = require('../../configurations/Datasource');

const Address = sequelize.define('address', {
    // attributes
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    address1: {
        type: Sequelize.STRING,
        allowNull: false
    },
    address2: {
        type: Sequelize.STRING,
        allowNull: true
    },
    state: {
        type: Sequelize.STRING,
        allowNull: false
    },
    city: {
        type: Sequelize.STRING,
        allowNull: false
    },
    location_area: {
        type: Sequelize.STRING,
        allowNull: false
    },
    nearBy: {
        type: Sequelize.STRING,
        allowNull: true
    },
    userRole: {
        type: Sequelize.STRING,
        defaultValue: "CUSTOMER",
        allowNull: false
    },
    userId: {
        type: Sequelize.STRING,
        allowNull: false
    },
    pinCode: {
        type: Sequelize.STRING,
        allowNull: true
    },
    userName: {
        type: Sequelize.STRING,
        allowNull: true
    },
}, {

    });



module.exports = Address;


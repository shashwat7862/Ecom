/*
 * @author Pulkit chadha
 * Requirement - include all the global variables and module required by the application
 */

global.async = require('async');
global.crypto = require('crypto');
global.uuid = require('node-uuid');
global.winston = require('winston');
global.cluster = require('cluster');
global.To = require("await-to-js").to;
global.mkdirp = require('mkdirp');
global.mongoose_softDelete = require('mongoose-softdelete');
global.mongoose_timestamps = require('mongoose-timestamp');
global.path = require('path');
global.url = require('url');
global.validate = require('express-validation');
global.Joi = require('joi');

// Database dependencies and Connection setting 
global.mongoose = require('mongoose');
global.mongooseSchema = mongoose.Schema;
global.dbConnection = require('./Datasource.js').getDbConnection();
global.ObjectId = mongoose.Types.ObjectId;

//global variable to hold all the environment specific configuration 
global.configHolder = {}

// Application specific configuration details
configHolder.config = require('./Conf.js').configVariables()

//Application specific intial program to execute when server starts
configHolder.Bootstrap = require('./Bootstrap.js')

// Application specific security authorization middleware
configHolder.security = require('../application-middlewares/AuthorizationMiddleware').AuthorizationMiddleware
configHolder.http = require('../application-middlewares/HttpCaller').HttpCaller
//UTILITY CLASSES
configHolder.EmailUtil = require('../application-utilities/EmailUtility');
configHolder.errorMessage = require('./ApplicationMessages').appErrorMessages;
configHolder.encryptUtil = require('../application-utilities/EncryptionUtility');
global.Logger = require('../application-utilities/LoggerUtility').logger;
global.domain = require('./DomainInclude.js');
global.validationSchema = require('../application/validations/index');

module.exports = configHolder;
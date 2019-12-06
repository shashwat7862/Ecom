global.express = require('express');
global.app = module.exports = express();

// var app = express();
var server = app.listen(8086);
var io = require('socket.io').listen(server);

global.router = express.Router();
var cors = require('cors')
app.use(cors())

global.publicdir = __dirname;
app.use(express.static(__dirname + '/application/public/usersImgCollection'));
app.use(express.static(__dirname + '/application/public/productImages'));
//global.configHolder = require('./configurations/DependencyInclude.js');

var multipart = require('connect-multiparty');

global.multipartMiddleware = multipart();


// default enviornment if it is not specified.
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

global.configHolder = require('./configurations/DependencyInclude.js');


//application middlwares
require('./application-middlewares/AppMiddlewares');

Layers = require('./application-utilities/layers').Express;
var wiring = require('./configurations/UrlMapping');
new Layers(app, router, __dirname + '/application/controller-service-layer', wiring);

app.get('/', (req, res) => res.send("Service is running"));


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});


// var http = require('http').Server(app);
// var io = require('socket.io')(http);


// socket io
io.on('connection', function(socket) {
    console.log('User connected');
    // socket.on('disconnect', function() {
    //     console.log('User disconnected');
    // });
    socket.on('All-Messages', function(msg) {
        console.log("All-Messages :" + msg);
        // io.emit('new-message', { message: data });
    });
});

require("./application/controller-service-layer/endpoints/index")


configHolder.Bootstrap.initApp();
global.express = require('express');
global.app = module.exports = express();
let port = 8002;
app.listen(port,function(err){
    console.log(`app is listening on port : ${port}`)
});

global.router = express.Router();
var cors = require('cors')
app.use(cors())

global.publicdir = __dirname;
app.use(express.static(__dirname + '/application/public/usersImgCollection'));
app.use(express.static(__dirname + '/application/public/productImages'));

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


 

require("./application/controller-service-layer/endpoints/index")



configHolder.Bootstrap.initApp();

 

var stream = domain.ElectronicsProduct.synchronize()
  , count = 0;

stream.on('data', function(err, doc){
  count++;
});
stream.on('close', function(){
  console.log('indexed ' + count + ' documents!');
});
stream.on('error', function(err){
  console.log(err);
});
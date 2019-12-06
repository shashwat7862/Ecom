const mongoosemask = require('mongoosemask');
const errorHandler = require('errorhandler');
const bodyParser = require('body-parser');

module.exports = (function () {
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Credentials", "true")
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header("Access-Control-Allow-Headers", "X-Requested-With,Authorization, Content-Type");
        next();
    });
    app.use(bodyParser());
    app.use(errorHandler());

    app.use(express.static(__dirname + '/public'));

    //removing fields from the response
    app.use(mongoosemask(function (result, mask, done) {
        var masked = mask(result, []);
        if (masked.object) {
            masked.object = mask(result.object, ['__v', 'salt', 'password']);
        }
        done(null, masked);
    }));
})();
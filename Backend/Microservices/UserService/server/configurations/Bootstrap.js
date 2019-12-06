/*
 * @author Pulkit
 * This program includes all the function which are required to  initialize before the application start
 */

//call all the function which are required to perform the require initialization before server will start

var initApp = function() {
    Logger.info("config" + configHolder.config.accessLevels["anonymous"]);
    createSuperAdmin();
    createLogFolders();
}

function createLogFolders() {
    const paths = ['logs/error', 'logs/info', 'logs/warn', 'logs/exception'];

    async.eachSeries(paths, (path, callback) => {

        mkdirp(path, (err) => callback(err, null));
    }, (err) => {
        if (err) return Logger.error('Error in creating log folders', err);
    })
}

function createSuperAdmin() {
    var saltString = uuid.v1()
    var password = configHolder.encryptUtil.encryptPassword(configHolder.config.admin.password, saltString);
    domain.User.findOne({
        firstName: configHolder.config.admin.firstName
    }, function(err, doc) {
        if (!doc) {
            var superAdminUser = new domain.User({
                firstName: configHolder.config.admin.firstName,
                lastName: configHolder.config.admin.lastName,
                email: configHolder.config.admin.email,
                salt: saltString,
                password: password,
                role: 'ROLE_SUPERADMIN',
                accountLocked: false,
                isAccountActive: true
            });
            Logger.info("SuperAdmin created succesfully " + superAdminUser);
            superAdminUser.save();
            bootApplication();
        } else {
            bootApplication();
        }
    });
}

// code to start the server Clustering of the Application
function bootApplication() {
    if (configHolder.config.enableClustering == false) {
        // app.listen(configHolder.config.port, function () {
        //     Logger.info("Express server listening on port %d in %s mode, clustering disabled", configHolder.config.port, app.settings.env);
        // });
    } else {
        //For clustering
        var numCPUs = require('os').cpus().length;

        if (cluster.isMaster) {
            for (var i = 0; i < numCPUs; i++) {
                cluster.fork();
            }
            process.setMaxListeners(0);

            Object.keys(cluster.workers).forEach(function(id) {
                Logger.info("I am running with ID : " + cluster.workers[id].process.pid);
            });

            cluster.on('exit', function(worker, code, signal) {
                cluster.fork();
                Logger.info('worker ' + worker.process.pid + ' died');
            });
        } else {
            //change this line to Your Node.js app entry point.
            app.listen(configHolder.config.port, function() {
                Logger.info("Express server listening on port %d in %s mode, clustering enabled", configHolder.config.port, app.settings.env);
            });
        }
    }

    process.on('uncaughtException', function(err) {
        Logger.error((new Date).toUTCString() + ' uncaughtException:', err.message)
        Logger.error(err.stack)
            // process.exit(1);

    })
}

module.exports.initApp = initApp
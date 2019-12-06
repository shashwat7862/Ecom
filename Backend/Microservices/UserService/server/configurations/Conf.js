//add Roles in the system
var roles = ['ROLE_USER','ROLE_Seller', 'ROLE_ADMIN', 'ROLE_SUPERADMIN']

// Add different accessLevels 
var accessLevels = {
    'anonymous': ['ROLE_USER', 'ROLE_Seller','ROLE_ADMIN', 'ROLE_SUPERADMIN'],
    'user': ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_SUPERADMIN'],
    'seller': ['ROLE_ADMIN', 'ROLE_ADMIN', 'ROLE_SUPERADMIN'],
    'admin': ['ROLE_ADMIN', 'ROLE_SUPERADMIN'],
    'superadmin': ['ROLE_SUPERADMIN']
}

var admin = {
    firstName: 'SuperAdmin',
    lastName: 'oodles',
    email: 'pulkit.chadha@advaitsolutions.in',
    password: "advaits@admin"
}

var configVariables = function () {
    switch (process.env.NODE_ENV) {
        case 'development':
            var config = {
                port: process.env.PORT || 8006,
                host: 'http://localhost:3000/',
                verificationUrl: 'http://localhost:3000/verify/',
                emailFrom:'shashwat.passion@gmail.com',
                emailPassword: '7862@Suna',
                enableClustering:false,
                angularAppUrl:'https://angular-cli-demo.herokuapp.com',
                vueAppUrl:'https://vue-demo-app.herokuapp.com',
                otpUrl: "https://2factor.in/API/V1/2fc45822-0d6f-11e8-a895-0200cd936042/SMS/"
            }
            config.roles = roles;
            config.accessLevels = accessLevels;
            config.admin = admin;
            return config;

        case 'staging':
            var config ={
                port: process.env.PORT || 3000,
                host: 'http://localhost:3000/',
                verificationUrl: 'http://localhost:3000/verify/',
                emailFrom: 'pulkit.chadha@advaitsolutions.in',
                emailPassword: 'pulkit@advait',
                enableClustering:false,
                angularAppUrl:'https://angular-cli-demo.herokuapp.com',
                vueAppUrl:'https://vue-demo-app.herokuapp.com',
                otpUrl: "https://2factor.in/API/V1/2fc45822-0d6f-11e8-a895-0200cd936042/SMS/"
            }
            config.roles = roles
            config.accessLevels = accessLevels
            config.admin = admin;
            return config;

        case 'production':
            var config = {
                port: process.env.PORT || 3000,
                host: 'http://localhost:3000/',
                verificationUrl: 'http://localhost:3000/verify/',
                emailFrom: 'pulkit.chadha@advaitsolutions.in',
                emailPassword: 'pulkit@advait',
                enableClustering:false,
                angularAppUrl:'https://angular-cli-demo.herokuapp.com',
                vueAppUrl:'https://vue-demo-app.herokuapp.com',
                otpUrl: "https://2factor.in/API/V1/2fc45822-0d6f-11e8-a895-0200cd936042/SMS/"
            }
            config.roles = roles
            config.accessLevels = accessLevels
            config.admin = admin;
            return config;

        case 'test':
            var config = {
                port: process.env.PORT || 3000,
                host: 'http://localhost:3000/',
                verificationUrl: 'http://localhost:3000/verify/',
                emailFrom: 'pulkit.chadha@advaitsolutions.in',
                emailPassword: 'pulkit@advait',
                enableClustering:false,
                angularAppUrl:'https://angular-cli-demo.herokuapp.com',
                vueAppUrl:'https://vue-demo-app.herokuapp.com',
                otpUrl: "https://2factor.in/API/V1/2fc45822-0d6f-11e8-a895-0200cd936042/SMS/"
            }
            config.roles = roles
            config.accessLevels = accessLevels
            config.admin = admin;
            return config;
    }
}

module.exports.configVariables = configVariables;
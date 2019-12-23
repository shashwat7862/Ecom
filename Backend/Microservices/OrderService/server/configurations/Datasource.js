const Sequelize = require('sequelize');
var mongoose = require('mongoose');

// Option 1: Passing parameters separately
const sequelize = new Sequelize('Emart', 'root', 'root', {
  host: 'localhost',
  dialect: 'mariadb',
  // logging: (...msg) => console.log(msg)
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    sequelize.sync(
      // { force: true }
      )
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });



var getDbConnection = function () {
   
  switch ('development') {
          case 'development':
              var db = mongoose.connect('mongodb://localhost/Emart');
              return checkMongooseConnection(db)
          case 'staging':
              var db = mongoose.connect('mongodb://admin:oodles@localhost:27017/Emart',options);
              return checkMongooseConnection(db)
          case 'production':
              var db = mongoose.connect('mongodb://admin:oodles@localhost:27017/Emart',options);
              return checkMongooseConnection(db)
           
      }
}

getDbConnection();


//function to check connection to database server
function checkMongooseConnection(db) {
  
  mongoose.connection.on('open', function (ref) {
      Logger.info('Connected to mongo server.');
      return db
  });
  mongoose.connection.on('error', function (err) {
      Logger.error('Could not connect to mongo server!');
      Logger.error(err);
  });
}




module.exports = sequelize

global.sequelize = sequelize
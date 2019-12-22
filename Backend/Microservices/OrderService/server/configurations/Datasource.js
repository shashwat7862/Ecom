const Sequelize = require('sequelize');

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



module.exports = sequelize

global.sequelize = sequelize
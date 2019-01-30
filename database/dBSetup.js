
const db = {};
let sequelize;

const Sequelize = require('sequelize');

db.setup =  function () {
    console.log("Database connection setup starting");
    sequelize = new Sequelize('test', 'postgres', 'test1234', {
    host: 'localhost',
    dialect: 'postgres',
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
    });
    console.log("Database connection setup finished");
    this.testConnection(sequelize);
}
db.testConnection = function (sequelize) {
    console.log("Database connection checking");
    sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;


// we can write like below as well
//module.exports = {
    //foo: function () {
      // whatever
    //},
    //bar: function () {
      // whatever
    //}
// };
  

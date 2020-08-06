const Sequelize = require("sequelize");
const config = require("./config.json");

const db = {};
const sequelize =
  process.env.NODE_ENV === "prod"
    ? new Sequelize(config.database, config.username, config.password, {
        host: config.host,
        dialect: config.dialect,
      })
    : new Sequelize("selfimprovement", "root", "1234", {
        host: "localhost",
        dialect: "mysql",
      });

// test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

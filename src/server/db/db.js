const Sequelize = require("sequelize");

const db = {};
const sequelize =
  process.env.NODE_ENV === "prod"
    ? new Sequelize(
        "d7j8b0hcm8nnva",
        "nupslciiqxmqqi",
        "38d8dfbb4eb2dfebf0a85eba1a3f075cae1993beed19444be741d46618fd89a4",
        {
          host: "ec2-54-247-94-127.eu-west-1.compute.amazonaws.com",
          dialect: "postgres",
        }
      )
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

const Sequelize = require("sequelize");
const db = require("../db");

module.exports = db.sequelize.define(
  "User",
  {
    username: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    password: {
      type: Sequelize.STRING
    }
  },
  {
    timestamps: false
  }
);

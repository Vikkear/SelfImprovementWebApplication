const Sequelize = require("sequelize");
const db = require("../db");

module.exports = db.sequelize.define(
  "Todolist",
  {
    username: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    todo: {
      type: Sequelize.STRING,
    },
  },
  {
    timestamps: false,
  }
);

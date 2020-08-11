const Sequelize = require("sequelize");
const db = require("../db");

module.exports = db.sequelize.define(
  "Quest",
  {
    username: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    title: {
      type: Sequelize.STRING,
    },
    quest: {
      type: Sequelize.STRING,
    },
    start_date: {
      type: Sequelize.DATE,
    },
    finish_date: {
      type: Sequelize.DATE,
    },
  },
  {
    timestamps: false,
  }
);

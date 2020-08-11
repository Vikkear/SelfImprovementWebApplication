const Sequelize = require("sequelize");
const db = require("../db");

module.exports = db.sequelize.define(
  "Quest",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: Sequelize.INTEGER,
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

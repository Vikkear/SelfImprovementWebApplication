const Sequelize = require("sequelize");
const db = require("../db");

module.exports = db.sequelize.define(
  "Tracker",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false
    },
    dateSubmitted: {
      type: Sequelize.DATE,
      allowNull: false
    },
    category: {
      type: Sequelize.STRING
    },
    amount: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  },
  {
    timestamps: false
  }
);

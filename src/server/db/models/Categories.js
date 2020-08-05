const Sequelize = require("sequelize");
const db = require("../db");

module.exports = db.sequelize.define(
  "Categorie",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    category: {
      type: Sequelize.STRING
    }
  },
  {
    timestamps: false
  }
);

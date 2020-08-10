const Tracker = require("../../db/models/Tracker");
const Categories = require("../../db/models/Categories");
const Sequelize = require("sequelize");

module.exports = (app) => {
  app.post("/tracker", (req, res) => {
    Tracker.findAll({
      where: { username: req.body.username, category: req.body.category },
    })
      .then((resTwo) => {
        res.status(200).json({ tracker: resTwo });
      })
      .catch((err) => err);
  });

  app.get("/categories", (req, res) => {
    Categories.findAll()
      .then((categories) => {
        res.status(200).json({ data: categories });
      })
      .catch((err) => err);
  });

  app.post("/addEntry", (req, res) => {
    const todayString = new Date();

    let data = {
      username: req.body.username,
      category: req.body.category,
      amount: req.body.value,
      dateSubmitted: todayString,
    };

    Categories.findOne({ where: { category: data.category } })
      .then((resTwo) => {
        if (!resTwo) {
          Categories.create({ category: data.category })
            .then((res) => {})
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => {
        console.log(err);
      });

    Tracker.create({
      username: data.username,
      dateSubmitted: data.dateSubmitted,
      category: data.category,
      amount: data.amount,
    })
      .then((resTwo) => {
        res.status(200).json({ message: "Entry added" });
      })
      .catch((err) => {
        console.log(err);
      });
  });

  app.post("/getAllCategoriesForUser", (req, res) => {
    const username = req.body.username;

    Tracker.findAll({
      attributes: [
        [Sequelize.fn("DISTINCT", Sequelize.col("category")), "category"],
      ],
      where: { username: username },
    })
      .then((trackers) => {
        let categories = [];
        trackers.forEach((tracker) => {
          categories.push(tracker.dataValues.category);
        });

        res.json({ data: categories });
      })
      .catch((err) => res.json(err));
  });
};

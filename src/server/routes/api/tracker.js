const Tracker = require("../../db/models/Tracker");
const Categories = require("../../db/models/Categories");
const Sequelize = require("sequelize");
const jwt = require("jsonwebtoken");
const Op = Sequelize.Op;

module.exports = (app) => {
  function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.status(401).send({ message: "knas" });

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      console.log(err);
      if (err) return res.status(403).send({ err: err });
      req.user = user;
      next();
    });
  }

  app.post("/getAllTracksInCategory", authenticateToken, (req, res) => {
    Tracker.findAll({
      where: { username: req.body.username, category: req.body.category },
    })
      .then((resTwo) => {
        res.status(200).json({ tracker: resTwo });
      })
      .catch((err) => err);
  });

  app.post("/getAmountOfTracksAfterDate", authenticateToken, (req, res) => {
    Tracker.findAll({
      where: {
        username: req.body.username,
        category: req.body.category,
        dateSubmitted: {
          [Op.gte]: req.body.dateSubmitted,
        },
      },
    })
      .then((resTwo) => {
        let totalAmount = 0;

        resTwo.forEach((track) => {
          totalAmount += track.dataValues.amount;
        });

        res
          .status(200)
          .json({ category: req.body.category, amount: totalAmount });
      })
      .catch((err) => {
        console.log(err);
        res.json({ err: err });
      });
  });

  app.get("/categories", authenticateToken, (req, res) => {
    Categories.findAll()
      .then((categories) => {
        res.status(200).json({ data: categories });
      })
      .catch((err) => err);
  });

  app.post("/addEntry", authenticateToken, (req, res) => {
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

  app.post("/getAllCategoriesForUser", authenticateToken, (req, res) => {
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

const Quests = require("../../db/models/Quests");
const jwt = require("jsonwebtoken");

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

  app.get("/getQuestsForUser", authenticateToken, (req, res) => {
    Quests.findAll({ where: { username: req.query.username } })
      .then((quests) => {
        res.status(200).json({ data: quests });
      })
      .catch((err) => {
        res.status(500).json({ err: err });
      });
  });

  app.post("/addQuest", authenticateToken, (req, res) => {
    const data = {
      username: req.body.username,
      title: req.body.title,
      quest: req.body.quest,
      start_date: req.body.start_date,
      finish_date: req.body.finish_date,
    };

    Quests.findOne({
      where: {
        username: data.username,
        title: data.title,
      },
    }).then((quest) => {
      if (!quest) {
        Quests.create(data)
          .then((resTwo) => {
            res.status(201).json({ data: resTwo });
          })
          .catch((err) => res.json({ err: err }));
      } else {
        res.status(400).json({ message: "Quest already exists" });
      }
    });
  });

  app.delete("/removeQuest", authenticateToken, (req, res) => {
    Quests.destroy({
      where: {
        username: req.body.username,
        title: req.body.title,
      },
    })
      .then((resTwo) => {
        res.status(200).json({ message: resTwo });
      })
      .catch((err) => res.status(500).json({ err: err }));
  });
};

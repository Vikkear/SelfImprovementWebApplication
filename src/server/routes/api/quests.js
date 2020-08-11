const Quests = require("../../db/models/Quests");

module.exports = (app) => {
  app.get("/getQuestsForUser", (req, res) => {
    Quests.findAll({ where: { username: req.body.username } })
      .then((quests) => {
        res.status(200).json({ data: quests });
      })
      .catch((err) => {
        res.json({ err: err });
      });
  });

  app.post("/addQuest", (req, res) => {
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

  app.delete("/removeQuest", (req, res) => {
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

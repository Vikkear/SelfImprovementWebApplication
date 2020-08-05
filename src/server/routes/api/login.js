const User = require("../../db/models/User");

module.exports = (app) => {
  app.post("/login", (req, res) => {
    let data = { username: req.body.username, password: req.body.password };

    User.findOne({
      where: { username: data.username, password: data.password },
    })
      .then((users) => {
        if (users) {
          res.status(200).json(users);
        } else {
          res.status(202).json({ message: "User not found" });
        }
      })
      .catch((err) => err);
  });

  app.post("/register", (req, res) => {
    let data = { username: req.body.username, password: req.body.password };

    User.findOne({
      where: { username: data.username, password: data.password },
    })
      .then((user) => {
        if (!user) {
          User.create({ username: data.username, password: data.password })
            .then((resTwo) => {
              res.json(resTwo);
            })
            .catch((errTwo) => errTwo);
        } else {
          res.status(202).json({ message: "User already exists" });
        }
      })
      .catch((err) => err);
  });
};

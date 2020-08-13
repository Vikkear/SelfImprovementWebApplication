const User = require("../../db/models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SALT_VALUE = 10;

module.exports = (app) => {
  function generateAccessToken(username) {
    return jwt.sign(username, process.env.TOKEN_SECRET, {
      expiresIn: "30000s",
    });
  }

  app.post("/login", (req, res) => {
    let data = {
      username: req.body.username.toLowerCase(),
      password: req.body.password,
    };

    User.findOne({
      where: { username: data.username },
    })
      .then((users) => {
        if (users) {
          bcrypt.compare(data.password, users.password, function (err, resTwo) {
            if (resTwo) {
              const token = generateAccessToken({
                username: req.body.username,
              });
              res.status(200).json({ token: token, username: data.username });
            } else {
              res.status(202).json({ message: "Passwords does not match" });
            }
          });
        } else {
          res.status(202).json({ message: "User not found" });
        }
      })
      .catch((err) => err);
  });

  app.post("/register", (req, res) => {
    let data = {
      username: req.body.username.toLowerCase(),
      password: req.body.password,
    };

    bcrypt.hash(data.password, SALT_VALUE, function (err, hash) {
      User.findOne({
        where: { username: data.username },
      })
        .then((user) => {
          if (!user) {
            User.create({ username: data.username, password: hash })
              .then((resTwo) => {
                res.status(201).json({ resTwo });
              })
              .catch((errTwo) => res.json({ err: errTwo }));
          } else {
            res.status(202).json({ message: "User already exists" });
          }
        })
        .catch((err) => err);
    });
  });
};

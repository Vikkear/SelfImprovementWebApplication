"use strict";
const port = 8000;

// Set up Express server
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const User = require("./db/models/User");
const Tracker = require("./db/models/Tracker");
const Categories = require("./db/models/Categories");

let allowCrossDomain = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "POST");
  next();
};
app.use(express.json());
app.use(allowCrossDomain);

// Middleware
app.use((req, res, next) => {
  console.info(`Got request on ${req.path} (${req.method}).`);
  next();
});

app.get("/", (req, res) => {
  res.json({ Message: "hej" });
});

app.post("/login", (req, res) => {
  let data = { username: req.body.username, password: req.body.password };

  User.findOne({
    where: { username: data.username, password: data.password }
  })
    .then(users => {
      if (users) {
        res.status(200).json(users);
      } else {
        res.status(202).json({ message: "User not found" });
      }
    })
    .catch(err => err);
});

app.post("/register", (req, res) => {
  let data = { username: req.body.username, password: req.body.password };

  User.findOne({
    where: { username: data.username, password: data.password }
  })
    .then(user => {
      if (!user) {
        User.create({ username: data.username, password: data.password })
          .then(resTwo => {
            res.json(resTwo);
          })
          .catch(errTwo => errTwo);
      } else {
        res.status(202).json({ message: "User already exists" });
      }
    })
    .catch(err => err);
});

app.post("/addEntry", (req, res) => {
  const todayString = new Date();

  let data = {
    username: req.body.username,
    category: req.body.category,
    amount: req.body.value,
    dateSubmitted: todayString
  };

  Categories.findOne({ where: { category: data.category } })
    .then(resTwo => {
      if (!resTwo) {
        Categories.create({ category: data.category })
          .then(res => {})
          .catch(err => console.log(err));
      }
    })
    .catch(err => {
      console.log(err);
    });

  Tracker.create({
    username: data.username,
    dateSubmitted: data.dateSubmitted,
    category: data.category,
    amount: data.amount
  })
    .then(resTwo => {
      res.status(200).json({ message: "Entry added" });
    })
    .catch(err => {
      console.log(err);
    });
});

app.get("/categories", (req, res) => {
  Categories.findAll()
    .then(categories => {
      res.status(200).json({ data: categories });
    })
    .catch(err => err);
});

app.post("/tracker", (req, res) => {
  Tracker.findAll({
    where: { username: req.body.username, category: req.body.category }
  })
    .then(resTwo => {
      res.status(200).json({ tracker: resTwo });
    })
    .catch(err => err);
});

// Start up server and begin listen to requests
app.listen(port, () => {
  console.info(`Server is listening on port ${port}.`);
});

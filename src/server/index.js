"use strict";
const port = 8000;

// Set up Express server
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const User = require("./db/models/User");

// Middleware
app.use((req, res, next) => {
  console.info(`Got request on ${req.path} (${req.method}).`);
  next();
});

app.get("/", (req, res) => {
  res.json({ Message: "hej" });
});

app.get("/users", (req, res) => {
  User.findAll().then(users => {
    res.json(users);
  });
});

// Start up server and begin listen to requests
app.listen(port, () => {
  console.info(`Server is listening on port ${port}.`);
});

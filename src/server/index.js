"use strict";
const port = process.env.PORT || 8000;

// Set up Express server
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const path = require("path");

let allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "POST");
  next();
};
app.use(express.json());
app.use(allowCrossDomain);

require("./routes")(app);

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "../client/build")));

// Middleware
app.use((req, res, next) => {
  console.info(`Got request on ${req.path} (${req.method}).`);
  next();
});

// Handles any requests that don't match the ones above
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/../client/build/index.html"));
});

// Start up server and begin listen to requests
app.listen(port, () => {
  console.info(`Server is listening on port ${port}.`);
  console.log(process.env.NODE_ENV);
});

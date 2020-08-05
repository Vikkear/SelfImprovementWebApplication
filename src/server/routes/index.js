const fs = require("fs");

/* eslint-disable */

/**
 * Loops through all folders and file inside ./api folder.
 * @param {Object} app - the server object.
 * @returns {Router} all the routes
 */
module.exports = (app) => {
  fs.readdirSync(`${__dirname}/api/`).forEach((file) => {
    require(`./api/${file.substr(0, file.indexOf("."))}`)(app);
  });
};

/* eslint-enable */

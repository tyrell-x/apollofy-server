const auth = require("./auth");
const logger = require("../logger");
const genreService = require("./genre-service")
const trackService = require("./track-service")
const userService = require("./user-service")

module.exports = {
  auth: auth,
  logger: logger,
  genreService: genreService,
  trackService: trackService,
  userService: userService
};

const auth = require("./auth");
const genreService = require("./genre-service");
const trackService = require("./track-service");
const playlistService = require("./playlist-service");
const userService = require("./user-service");

module.exports = {
  auth: auth,
  genreService: genreService,
  trackService: trackService,
  playlistService: playlistService,
  userService: userService,
};

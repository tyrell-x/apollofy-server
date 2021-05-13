const userController = require("./user-controller");
const trackController = require("./track-controller");
const genreController = require("./genre-controller");
const playlistController = require("./playlist-controller");
const finderController = require("./finder-controller");

module.exports = {
  userController: userController,
  trackController: trackController,
  genreController: genreController,
  playlistController: playlistController,
  finderController: finderController
};

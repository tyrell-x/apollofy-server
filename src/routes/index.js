const { genreRouter } = require("./genre-routes");
const { trackRouter } = require("./track-routes");
const { userRouter } = require("./user-routes");
const { playlistRouter } = require("./playlist-routes");
const { finderRouter } = require("./finder-routes");

module.exports = {
  userRouter: userRouter,
  trackRouter: trackRouter,
  genreRouter: genreRouter,
  playlistRouter: playlistRouter,
  finderRouter: finderRouter
};

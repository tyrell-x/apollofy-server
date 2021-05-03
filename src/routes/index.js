const { genreRouter } = require("./genre-routes");
const { trackRouter } = require("./track-routes");
const { userRouter } = require("./user-routes");
const { playlistRouter } = require("./playlist-routes");

module.exports = {
  userRouter: userRouter,
  trackRouter: trackRouter,
  genreRouter: genreRouter,
  playlistRouter: playlistRouter,
};

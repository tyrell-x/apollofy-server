const { genreRouter } = require("./genre-routes.js");
const { trackRouter } = require("./track-routes.js");
const { userRouter } = require("./user-routes");

module.exports = {
  userRouter: userRouter,
  trackRouter: trackRouter,
  genreRouter: genreRouter
};

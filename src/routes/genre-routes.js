const Router = require("express").Router;

const { authMiddleware } = require("../middlewares");
const { genreController } = require("../controllers");

const genreRouter = Router();

genreRouter.get("/", authMiddleware, genreController.fetchGenres);
genreRouter.post("/", authMiddleware, genreController.createGenre);

module.exports = {
  genreRouter: genreRouter,
};

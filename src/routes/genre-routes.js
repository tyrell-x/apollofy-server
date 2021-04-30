const Router = require("express").Router;

const { authMiddleware } = require("../middlewares");
const { genreController } = require("../controllers");

const genreRouter = Router();

genreRouter.post("/", authMiddleware, genreController.createGenre);
genreRouter.get("/", authMiddleware, genreController.fetchGenres);
genreRouter.get("/:id", authMiddleware, genreController.fetchGenreById);

module.exports = {
  genreRouter: genreRouter,
};

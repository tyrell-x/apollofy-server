const Router = require("express").Router;

const { authMiddleware } = require("../middlewares");
const { finderController } = require("../controllers");

const finderRouter = Router();

finderRouter.get("/", authMiddleware, finderController.find);

module.exports = {
    finderRouter: finderRouter,
};

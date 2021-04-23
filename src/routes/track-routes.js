const Router = require("express").Router;

const { trackController } = require("../controllers");
const { authMiddleware } = require("../middlewares");

const trackRouter = Router();

trackRouter.post("/tracks", authMiddleware, trackController.createTrack);

trackRouter.delete("/tracks", authMiddleware, trackController.deleteTrack);


module.exports = {
  trackRouter: trackRouter,
};

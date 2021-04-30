const Router = require("express").Router;

const { trackController } = require("../controllers");
const { authMiddleware } = require("../middlewares");

const trackRouter = Router();

trackRouter.get("/", authMiddleware, trackController.fetchTracks);
trackRouter.post("/", authMiddleware, trackController.createTrack);
trackRouter.delete("/", authMiddleware, trackController.deleteTrack);
trackRouter.patch("/edit", authMiddleware, trackController.updateTrack);

module.exports = {
  trackRouter: trackRouter,
};

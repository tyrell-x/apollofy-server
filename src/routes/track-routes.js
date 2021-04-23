const Router = require("express").Router;

const { trackController } = require("../controllers");
const { authMiddleware } = require("../middlewares");

const trackRouter = Router();

trackRouter.post("/tracks", authMiddleware, trackController.createTrack);

trackRouter.get("/tracks", authMiddleware, trackController.getTracks);
trackRouter.get("/like-tracks", authMiddleware, trackController.getTrackLikeBy);

trackRouter.patch("/edit-tracks", authMiddleware, trackController.updateTrack);

module.exports = {
  trackRouter: trackRouter,
};

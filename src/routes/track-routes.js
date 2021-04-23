const Router = require("express").Router;

const { trackController } = require("../controllers");
const { authMiddleware } = require("../middlewares");

const trackRouter = Router();

trackRouter.post("/tracks", authMiddleware, trackController.createTrack);

trackRouter.get("/tracks", authMiddleware, trackController.getTracks);
trackRouter.get("/tracks/likedBy:id", authMiddleware, trackController.getTrackLikeBy);

trackRouter.patch("/tracks/edit:id", authMiddleware, trackController.updateTrack);

module.exports = {
  trackRouter: trackRouter,
};

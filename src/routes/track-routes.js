const Router = require("express").Router;

const { trackController } = require("../controllers");
const { authMiddleware } = require("../middlewares");

const trackRouter = Router();

trackRouter.post("/tracks", authMiddleware, trackController.createTrack);

trackRouter.delete("/tracks/delete",
  authMiddleware,
  trackController.deleteTrack,
);
trackRouter.get("/tracks", authMiddleware, trackController.getTracks);
trackRouter.get("/tracks/likedBy:_id", authMiddleware, trackController.getTracksLikeBy);

trackRouter.patch("/tracks/edit:_id", authMiddleware, trackController.updateTrack);

module.exports = {
  trackRouter: trackRouter,
};

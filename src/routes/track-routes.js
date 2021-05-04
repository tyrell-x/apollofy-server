const Router = require("express").Router;

const { trackController } = require("../controllers");
const { authMiddleware } = require("../middlewares");

const trackRouter = Router();

trackRouter.get("/owned", authMiddleware, trackController.fetchOwnedTracks);
trackRouter.get("/liked", authMiddleware, trackController.fetchLikedTracks);
trackRouter.post("/liked", authMiddleware, trackController.likeTrack);

trackRouter.get("/", authMiddleware, trackController.fetchTracks);
trackRouter.post("/", authMiddleware, trackController.createTrack);
trackRouter.put("/edit/:id", authMiddleware, trackController.updateTrack);
trackRouter.delete("/:id", authMiddleware, trackController.deleteTrack);

module.exports = {
  trackRouter: trackRouter,
};

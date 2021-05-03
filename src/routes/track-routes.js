const Router = require("express").Router;

const { trackController } = require("../controllers");
const { authMiddleware } = require("../middlewares");

const trackRouter = Router();

trackRouter.get("/", authMiddleware, trackController.fetchTracks);
trackRouter.post("/", authMiddleware, trackController.createTrack);
trackRouter.put("/edit/:id", authMiddleware, trackController.updateTrack);
trackRouter.delete("/:id", authMiddleware, trackController.deleteTrack);

module.exports = {
  trackRouter: trackRouter,
};

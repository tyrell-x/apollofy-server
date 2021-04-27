const Router = require("express").Router;

const { trackController } = require("../controllers");
const { authMiddleware } = require("../middlewares");

const trackRouter = Router();

trackRouter.post("/", authMiddleware, trackController.createTrack);
trackRouter.get("/", authMiddleware, trackController.getTracks);
trackRouter.delete("/", authMiddleware, trackController.deleteTrack);
trackRouter.patch("/edit/:_id", authMiddleware, trackController.updateTrack);

module.exports = {
  trackRouter: trackRouter,
};

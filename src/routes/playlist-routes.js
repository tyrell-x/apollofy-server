const Router = require("express").Router;

const { authMiddleware } = require("../middlewares");
const { playlistController } = require("../controllers");

const playlistRouter = Router();

playlistRouter.get("/", authMiddleware, playlistController.fetchPlaylists);
playlistRouter.post("/", authMiddleware, playlistController.createPlaylist);
playlistRouter.put(
  "/edit/:id",
  authMiddleware,
  playlistController.updatePlaylist,
);
playlistRouter.delete(
  "/:id",
  authMiddleware,
  playlistController.deletePlaylist,
);

playlistRouter.post(
  "/follow",
  authMiddleware,
  playlistController.followPlaylist,
);
playlistRouter.post("/playlist/track", authMiddleware, playlistController.addTrackToPlaylist)

module.exports = {
  playlistRouter: playlistRouter,
};

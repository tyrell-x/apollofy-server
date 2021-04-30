const Router = require("express").Router;

const { authMiddleware } = require("../middlewares");
const { userController } = require("../controllers");

const userRouter = Router();

userRouter.get(
  "/me/tracks/owned",
  authMiddleware,
  userController.fetchOwnedTracks,
);
userRouter.get(
  "/me/tracks/liked",
  authMiddleware,
  userController.fetchLikedTracks,
);
userRouter.post("/me/sign-up", authMiddleware, userController.signUp);
userRouter.patch("/me/edit", authMiddleware, userController.updateUser);
userRouter.post("/me/liketrack", authMiddleware, userController.likeTrack);
userRouter.post(
  "/me/followPlaylist",
  authMiddleware,
  userController.followPlaylist,
);

module.exports = {
  userRouter: userRouter,
};

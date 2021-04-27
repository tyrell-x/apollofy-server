const Router = require("express").Router;

const { authMiddleware } = require("../middlewares");
const { userController } = require("../controllers");

const userRouter = Router();

userRouter.get(
  "/me/tracks/owned",
  authMiddleware,
  userController.getOwnedTracks,
);
userRouter.get(
  "/me/tracks/liked",
  authMiddleware,
  userController.getLikedTracks,
);
userRouter.post("/me/sign-up", authMiddleware, userController.signUp);
userRouter.post("/me/sign-out", authMiddleware, userController.signOut);
userRouter.patch("/me/edit", authMiddleware, userController.updateUser);
userRouter.post("/me/liketrack", authMiddleware, userController.likeTrack);

module.exports = {
  userRouter: userRouter,
};

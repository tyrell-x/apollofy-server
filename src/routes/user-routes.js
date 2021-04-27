const Router = require("express").Router;

const { authMiddleware } = require("../middlewares");
const { userController } = require("../controllers");

const userRouter = Router();

userRouter.post("/me/sign-up", authMiddleware, userController.signUp);
userRouter.post("/me/sign-out", authMiddleware, userController.signOut);
userRouter.patch("/me/edit", authMiddleware, userController.updateUser);
userRouter.patch("/me/liketrack", authMiddleware, userController.likeTrack);

module.exports = {
  userRouter: userRouter,
};

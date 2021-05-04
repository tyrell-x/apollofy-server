const Router = require("express").Router;

const { authMiddleware } = require("../middlewares");
const { userController } = require("../controllers");

const userRouter = Router();

userRouter.post("/me/sign-up", authMiddleware, userController.signUp);
userRouter.patch("/me/edit", authMiddleware, userController.updateUser);

module.exports = {
  userRouter: userRouter,
};

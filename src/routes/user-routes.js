const Router = require("express").Router;

const { authMiddleware } = require("../middlewares");
const { userController } = require("../controllers");

const userRouter = Router();

userRouter.post("/me/sign-up", authMiddleware, userController.signUp);

userRouter.patch("/me/edit-email", authMiddleware, userController.updateEmail);
userRouter.put("/me", authMiddleware, userController.userEdit);


userRouter.get("/me", authMiddleware, userController.fetchUserById);
userRouter.get("/me/playlists", authMiddleware, userController.fetchOwnedPlaylist);
userRouter.get("/me/following", authMiddleware, userController.fetchFollowing);

module.exports = {
  userRouter: userRouter,
};

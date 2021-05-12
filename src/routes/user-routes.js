const Router = require("express").Router;

const { authMiddleware } = require("../middlewares");
const { userController } = require("../controllers");

const userRouter = Router();

userRouter.post("/me/sign-up", authMiddleware, userController.signUp);

userRouter.patch("/me/edit-email", authMiddleware, userController.updateEmail);
userRouter.put("/me", authMiddleware, userController.userEdit);


userRouter.get("/me", authMiddleware, userController.fetchCurrentUser);
userRouter.get("/me/playlists", authMiddleware, userController.fetchOwnedPlaylist);

userRouter.get("/:id/following", authMiddleware, userController.fetchFollowing);
// userRouter.get("/:id", authMiddleware, userController.fetchUserById);

module.exports = {
  userRouter: userRouter,
};

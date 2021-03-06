const Router = require("express").Router;

const { authMiddleware } = require("../middlewares");
const { userController } = require("../controllers");

const userRouter = Router();

userRouter.post("/me/sign-up", authMiddleware, userController.signUp);
userRouter.post("/follow", authMiddleware, userController.followUser);

userRouter.get("/", authMiddleware, userController.fetchAllUsers);

userRouter.get("/me", authMiddleware, userController.fetchCurrentUser);
userRouter.get("/:_id", authMiddleware, userController.fetchUserById);

userRouter.patch("/me/edit-email", authMiddleware, userController.updateEmail);
userRouter.put("/me", authMiddleware, userController.changeUser);

userRouter.get("/me/playlists", authMiddleware, userController.fetchOwnedPlaylist);
userRouter.get("/:id/following", authMiddleware, userController.fetchFollowing);

module.exports = {
  userRouter: userRouter,
};

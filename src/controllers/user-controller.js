const { userService, playlistService } = require("../services");
const { fbUpdateEmail } = require("../services/auth/auth-provider");

async function signUp(req, res, next) {
  const {
    user: { uid },
    // eslint-disable-next-line no-unused-vars
    body: { _id, ...user },
  } = req;

  if (req.body?.email === null) {
    return res.status(400).send("unkown request");
  }

  try {
    const current = await userService.findOrCreateUser(uid, user);
    res.status(200).send(current);
  } catch (error) {
    next(error);
  }
}

async function userEdit(req, res, next){
  const {
    user: { uid },
    body: { ...user },
  } = req;

  try {
    const updated = await userService.updateUser(uid, user);
    return res.status(200).send(updated);
  } catch (err) {
    next(err);
  }
}

async function updateEmail(req, res, next) {
  const {
    user: { uid },
    body: { email },
  } = req;

  try {
    if (email) {
      await fbUpdateEmail(uid, email);
    }
    const updated = await userService.updateEmail(uid, email);
    res.status(200).send(updated);
  } catch (error) {
    next(error);
  }
}


async function fetchUserById(req, res, next){
  const {
    user: { uid }
  } = req;

  try {
    const response = await userService.getUserById(uid);
    res.status(200).send(response);
  } catch (error) {
    next(error)
  }
}

async function fetchOwnedPlaylist(req, res, next){
  const {
    user: { uid },
  } = req;

  try {
    const playlists = await playlistService.getOwnedPlaylist(uid);

    res.status(200).send(playlists);
  } catch (error) {
    next(error)
  }
}

async function fetchFollowing(req, res, next){
  const {
    user: { uid },
  } = req;

  try {
    const following = await userService.getFollowing(uid);

    res.status(200).send(following)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  signUp: signUp,
  updateEmail: updateEmail,
  fetchUserById: fetchUserById,
  fetchOwnedPlaylist: fetchOwnedPlaylist,
  fetchFollowing: fetchFollowing,
  userEdit: userEdit,
};

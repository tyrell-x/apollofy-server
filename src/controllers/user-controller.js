const { userService, trackService } = require("../services");
const { fbUpdateEmail } = require("../services/auth/auth-provider");
const playlistService = require("../services/playlist-service.js");

async function fetchOwnedTracks(req, res, next) {
  const {
    user: { uid },
  } = req;

  try {
    const ownedTracks = await userService.getOwnedTracks(uid);
    return res.status(200).send(ownedTracks);
  } catch (error) {
    next(error);
  }
}

async function fetchLikedTracks(req, res, next) {
  const {
    user: { uid },
  } = req;

  try {
    const likedTracks = await userService.getLikedTracks(uid);
    return res.status(200).send(likedTracks);
  } catch (error) {
    next(error);
  }
}

async function likeTrack(req, res, next) {
  const {
    query: { trackId, liked },
    user: { uid },
  } = req;

  try {
    if (liked) {
      await userService.addLikedTrack(uid, trackId);
      await trackService.addLikedBy(trackId, uid);
    } else {
      await userService.removeLikedTrack(uid, trackId);
      await trackService.removeLikedBy(trackId, uid);
    }
    return res.status(200).send(liked);
  } catch (error) {
    next(error);
  }
}

async function followPlaylist(req, res, next) {
  const {
    query: { playlistId, followed },
    user: { uid },
  } = req;

  try {
    if (followed) {
      await userService.addFollowedPlaylist(uid, playlistId);
      await playlistService.addFollowedBy(playlistId, uid);
    } else {
      await userService.removeFollowedPlaylist(uid, playlistId);
      await playlistService.removeFollowedBy(playlistId, uid);
    }
    return res.status(200).send(followed);
  } catch (error) {
    next(error);
  }
}

async function signUp(req, res, next) {
  const {
    user: { uid },
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

async function updateUser(req, res, next) {
  const {
    user: { uid },
    body: { email },
  } = req;

  const user = req.body;

  try {
    if (email) {
      await fbUpdateEmail(uid, email);
    }

    const updated = userService.updateUser(uid, user);

    res.status(200).send(updated);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  signUp: signUp,
  updateUser: updateUser,
  likeTrack: likeTrack,
  followPlaylist: followPlaylist,
  fetchLikedTracks: fetchLikedTracks,
  fetchOwnedTracks: fetchOwnedTracks,
};

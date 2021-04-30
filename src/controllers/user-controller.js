const { UserRepo } = require("../repositories");
const { TrackRepo } = require("../repositories");
const { userService } = require("../services");
const { fbUpdateEmail } = require("../services/auth/auth-provider");

async function fetchOwnedTracks(req, res, next) {
  const {
    user: { uid },
  } = req;

  try {
    const ownedTracks = userService.getOwnedTracks(uid)
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
    const likedTracks = await userService.getLikedTracks(uid)
    return res.status(200).send(likedTracks);
  } catch (error) {
    next(error);
  }
}

async function likeTrack(req, res, next) {
  const {
    query: { trackId },
    user: { uid },
  } = req;

  try {

    let result = await userService.toggleLikedTrack(uid, trackId)

    //TODO: Also update likedBy in TrackRepo

    return res.status(200).send(result);
  } catch (error) {
    next(error);
  }
}

async function signUp(req, res, next) {
  const { uid, email } = req.user;

  try {
    const response = await UserRepo.findOne({ _id: uid });

    if (response.error) {
      return res.status(400).send({
        data: null,
        error: response.error,
      });
    }

    if (response.data) {
      return res.status(200).send({
        data: response.data,
        error: null,
      });
    }

    await UserRepo.create({
      _id: uid,
      email: email,
      ...req.body,
    });

    res.status(201).send({
      data: {
        _id: uid,
        email: email,
      },
      error: null,
    });
  } catch (error) {
    next(error);
  }
}

async function signOut(req, res) {
  req.signOut();

  res.status(200).send({
    data: "OK",
    error: null,
  });
}

async function updateUser(req, res, next) {
  const { uid } = req.user;
  const { email } = req.body;

  try {
    await UserRepo.updateOne(
      { _id: uid },
      {
        $set: req.body,
      },
    );

    if (email) {
      await fbUpdateEmail(uid, email);
    }

    res.status(200).send({ data: req.body, error: null });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  signUp: signUp,
  signOut: signOut,
  updateUser: updateUser,
  likeTrack: likeTrack,
  fetchLikedTracks: fetchLikedTracks,
  fetchOwnedTracks: fetchOwnedTracks,
};

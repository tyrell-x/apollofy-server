const { UserRepo } = require("../repositories");
const { TrackRepo } = require("../repositories");

const ObjectId = require("mongoose").Types.ObjectId;

const { fbUpdateEmail } = require("../services/auth/auth-provider");

async function fetchOwnedTracks(req, res, next) {
  const {
    user: { uid },
  } = req;

  try {
    const userResponse = await UserRepo.findOnePopulatedBy(
      {
        _id: uid,
      },
      "ownedTracks",
    );

    return res.status(200).send({
      data: userResponse.data.ownedTracks,
      error: null,
    });
  } catch (error) {
    next(error);
  }
}

async function fetchLikedTracks(req, res, next) {
  const {
    user: { uid },
  } = req;

  try {
    const userResponse = await UserRepo.findOnePopulatedBy(
      {
        _id: uid,
      },
      "likedTracks",
    );

    return res.status(200).send({
      data: userResponse.data.likedTracks,
      error: null,
    });
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
    const trackResponse = await TrackRepo.findOne({
      _id: ObjectId(trackId),
    });

    if (!trackResponse.data) {
      return res.status(400).send({
        data: null,
        error: "Track not found",
      });
    }

    let result = await UserRepo.findOne({ _id: uid });
    const likedTracks = result.data.likedTracks;
    const likedTrackIndex = likedTracks.findIndex(
      (trackIdDb) => trackIdDb == trackId,
    );

    if (likedTrackIndex === -1) {
      await UserRepo.updateOne(
        { _id: uid },
        {
          $push: {
            likedTracks: trackId,
          },
        },
      );
    } else {
      await UserRepo.updateOne(
        { _id: uid },
        {
          $pull: {
            likedTracks: trackId,
          },
        },
      );
    }

    //TODO: Also update likedBy in TrackRepo

    return res.status(204).send({
      data: "OK",
      error: null,
    });
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

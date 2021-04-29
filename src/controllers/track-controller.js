const { TrackRepo, UserRepo } = require("../repositories");
const { GenreRepo } = require("../repositories");

async function createTrack(req, res, next) {
  const {
    body: { genreNames = [], ...trackFields },
    user: { uid },
  } = req;

  try {
    const genreIds = genreNames.map((name) => name.toLowerCase());

    const trackResponse = await TrackRepo.create({
      ...trackFields,
      genreIds: genreIds,
      ownedBy: uid,
    });

    const trackId = trackResponse.data._id;

    genreIds.forEach(async (genreId) => {
      await GenreRepo.findOrUpdate(
        {
          _id: genreNames,
        },
        {
          _id: genreId,
          name: genreId,
          $push: {
            trackIds: trackId,
          },
        },
      );
    });

    UserRepo.updateOne(
      {
        _id: uid,
      },
      {
        $push: {
          ownedTracks: trackId,
        },
      },
    );

    if (trackResponse.error) {
      return res.status(400).send({
        data: null,
        error: trackResponse.error,
      });
    }

    if (trackResponse.data) {
      return res.status(201).send({
        data: "OK",
        error: null,
      });
    }
  } catch (error) {
    next(error);
  }
}

async function getTracks(req, res, next) {
  
  const { uid } = req.user;

  try {
    const response = await TrackRepo.find({});

    const tracksData = response.data.map(track => ({
      ...track._doc,
      liked: track._doc.likedBy.includes(uid)
    }));

    if (response.data) {
      return res.status(200).send({
        data: tracksData,
        error: null,
      });
    }
  } catch (error) {
    next(error);
  }
}

async function updateTrack(req, res, next) {
  const {
    //TODO: Update tracks in genres document
    // eslint-disable-next-line no-unused-vars
    body: { genreNames = [] },
    params: { _id },
  } = req;

  try {
    await TrackRepo.updateOne(
      { _id: _id },
      {
        $set: req.body,
      },
    );
    res.status(200).send({ data: req.body, error: null });
  } catch (error) {
    next(error);
  }
}

async function deleteTrack(req, res, next) {
  const {
    query: { _id },
  } = req;

  try {
    //TODO: Remove from liked tracks and owned tracks in users
    const trackResponse = await TrackRepo.findOneAndDelete({ _id: _id });

    const genreResponse = await GenreRepo.updateMany(
      { _id: trackResponse.data.genreIds },
      {
        $pull: {
          trackIds: _id,
        },
      },
    );

    if (genreResponse.error) {
      res.status(400).send({ data: null, error: genreResponse.error });
    }

    res.status(204).send({ data: "OK", error: null });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createTrack: createTrack,
  deleteTrack: deleteTrack,
  updateTrack: updateTrack,
  getTracks: getTracks,
};

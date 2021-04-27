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

async function fetchTracks(req, res, next) {
  try {
    const response = await TrackRepo.find({});

    if (response.data) {
      return res.status(200).send({
        data: response.data,
        error: null,
      });
    }
  } catch (error) {
    next(error);
  }
}

async function updateTrack(req, res, next) {
  const {
    query: { id },
  } = req;

  try {
    await TrackRepo.updateOne(
      { _id: id },
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
    query: { id },
  } = req;

  try {
    //TODO: Remove from liked tracks and owned tracks in users
    const trackResponse = await TrackRepo.findOneAndDelete({ _id: id });

    const genreResponse = await GenreRepo.updateMany(
      { _id: trackResponse.data.genreIds },
      {
        $pull: {
          trackIds: id,
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
  fetchTracks: fetchTracks,
};

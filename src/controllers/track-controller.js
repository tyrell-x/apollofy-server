const { TrackRepo } = require("../repositories");
const { GenreRepo } = require("../repositories");

async function createTrack(req, res, next) {
  const {
    body: { genreNames = [], ...trackFields },
    user: { uid },
  } = req;

  try {
    const genreIds = genreNames.map((name) => name.toLowerCase());

    const response = await TrackRepo.create({
      ...trackFields,
      genreIds: genreIds,
      ownedBy: uid,
    });

    const trackId = response.data._id;

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

    if (response.error) {
      return res.status(500).send({
        data: null,
        error: response.error,
      });
    }

    if (response.data) {
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
  try {
    const query = {};
    const response = await TrackRepo.find(query);

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
    //TODO: Update tracks in genres document
    // eslint-disable-next-line no-unused-vars
    body: { genreNames = [] },
    query: { _id },
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
    const response = await TrackRepo.findOneAndDelete({ _id: _id });

    const genres = await GenreRepo.updateMany(
      { _id: response.data.genreIds },
      {
        $pull: {
          trackIds: _id,
        },
      },
    );
    res.status(200).send({ data: "OK", error: null });
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

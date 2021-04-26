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
    console.log(uid);

    const trackId = response.data._id;

    genreIds.forEach(async (genreId) => {
      await GenreRepo.findOrUpdate(
        {
          _id: genreId,
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

async function getTracksLikedBy(req, res, next) {
  const {
    query: { _id },
    user: { uid },
  } = req;

  try {
    const likedTracks = await TrackRepo.find({ likedBy: { $all: [_id] } });

    if (likedTracks.data) {
      return res.status(200).send({
        data: likedTracks,
        error: null,
      });
    }
  } catch (error) {
    next(error);
  }
}

async function updateTrack(req, res, next) {
  const {
    body: { genreNames = [], ...trackFields },
    query: { _id },
  } = req;

  try {
    await TrackRepo.updateOne(
      { _id: _id },
      {
        $set: trackFields,
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
    const trackDelete = await TrackRepo.findOneAndDelete(_id);
    const genreDelete = await GenreRepo.findOneAndDelete(_id);
    // populate('ownedBy');
    res.status(200).send({ data: "OK", error: null });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createTrack: createTrack,
  deleteTrack: deleteTrack,
  updateTrack: updateTrack,
  getTracksLikeBy: getTracksLikedBy,
  getTracks: getTracks,
};

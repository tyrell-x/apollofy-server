const { TrackRepo } = require("../repositories");
const { GenreRepo } = require("../repositories");

async function createTrack(req, res, next) {
  const {
    body: { genreNames, ...trackFields },
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
};

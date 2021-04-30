const { trackService, genreService } = require("../services");
const userService = require("../services/user-service.js");

async function createTrack(req, res, next) {
  const {
    body: { genreNames = [], ...track },
    user: { uid },
  } = req;

  try {
    const genres = await genreService.createGenresWithNames(genreNames);
    const newTrack = await trackService.createTrack({
      ...track,
      genreIds: genres.map((genre) => genre._id),
      ownedBy: uid,
    });
    await genreService.addTrackToGenres(
      genres.map((genre) => genre._id),
      newTrack._id,
    );
    await userService.addOwnedTrack(uid, newTrack._id);

    return res.status(200).send(newTrack);
  } catch (error) {
    next(error);
  }
}

async function fetchTracks(req, res, next) {
  const { uid } = req.user;

  try {
    const tracks = await trackService.getTracks();
    const tracksWithLikedAndOwned = tracks.map((track) => ({
      ...track,
      liked: track.likedBy.includes(uid),
      owned: track.ownedBy === uid,
    }));

    return res.status(200).send(tracksWithLikedAndOwned);
  } catch (error) {
    next(error);
  }
}

async function updateTrack(req, res, next) {
  const {
    body: { track },
    params: { _id },
  } = req;

  try {
    const updatedTrack = trackService.updateTrack(_id, track);
    return res.status(200).send(updatedTrack);
  } catch (error) {
    next(error);
  }
}

async function deleteTrack(req, res, next) {
  const {
    query: { id },
  } = req;

  try {
    const deletedTrack = await trackService.deleteTrack(id);
    await genreService.removeTrackFromGenres(deletedTrack.genreIds);
    return res.status(204).send();
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

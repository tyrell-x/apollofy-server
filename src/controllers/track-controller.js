const { trackService, genreService } = require("../services");

const ObjectId = require("mongoose").Types.ObjectId;

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
    console.log(tracksWithLikedAndOwned);
    return res.status(200).send(tracksWithLikedAndOwned);
  } catch (error) {
    next(error);
  }
}

async function updateTrack(req, res, next) {
  const {
    params: { id },
    body: { ...track },
  } = req;

  try {
    const updatedTrack = trackService.updateTrack(id, track);
    return res.status(200).send(updatedTrack);
  } catch (error) {
    next(error);
  }
}

async function deleteTrack(req, res, next) {
  const {
    params: { id },
  } = req;

  try {
    const deletedTrack = await trackService.deleteTrack(id);
    await genreService.removeTrackFromGenres(
      deletedTrack.genreIds.map((id) => ObjectId(id)),
    );
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
}

async function fetchOwnedTracks(req, res, next) {
  const {
    user: { uid },
  } = req;

  try {
    const ownedTracks = await trackService.getOwnedTracksByUid(uid);
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
    const likedTracks = await trackService.getLikedTracksByUid(uid);
    return res.status(200).send(likedTracks);
  } catch (error) {
    next(error);
  }
}

async function likeTrack(req, res, next) {
  const {
    query: { id, liked },
    user: { uid },
  } = req;

  try {
    if (liked) {
      await trackService.addLikedBy(id, uid);
    } else {
      await trackService.removeLikedBy(id, uid);
    }
    return res.status(200).send(liked);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createTrack: createTrack,
  deleteTrack: deleteTrack,
  updateTrack: updateTrack,
  fetchTracks: fetchTracks,
  fetchLikedTracks: fetchLikedTracks,
  fetchOwnedTracks: fetchOwnedTracks,
  likeTrack: likeTrack,
};

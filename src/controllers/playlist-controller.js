const { PlaylistRepo } = require("../repositories");

async function createPlaylist(req, res, next) {
  const {
    body: { title, publicAccessible, tracks = [] },
    user: { uid },
  } = req;

  try {
    const dbResponse = await PlaylistRepo.create({
      title: title,
      author: uid,
      publicAccessible: publicAccessible,
      tracks: tracks,
    });

    if (dbResponse.error) {
      res.status(400).send({
        data: null,
        error: dbResponse.error,
      });
    }

    if (dbResponse.data) {
      res.status(201).send({
        data: dbResponse.data,
        error: null,
      });
    }
  } catch (err) {
    next(err);
  }
}

async function updatePlaylist(req, res, next) {
  const {
    query: { id },
    body: { title, publicAccessible, tracks, followedBy },
  } = req;

  try {
    const dbResponse = await PlaylistRepo.findOneAndUpdate(
      {
        _id: id,
      },
      {
        title: title,
        publicAccessible: publicAccessible,
        tracks: tracks,
        followedBy: followedBy,
      },
      {
        new: true,
      },
    );

    if (dbResponse.error) {
      res.status(400).send({
        data: null,
        error: dbResponse.error,
      });
    }

    if (dbResponse.data) {
      res.status(200).send({
        data: dbResponse.data,
        error: null,
      });
    }
  } catch (err) {
    next(err);
  }
}

async function fetchPlaylistById(req, res, next) {
  const {
    params: { id },
    query: { fullFetch = false },
  } = req;

  try {
    const dbResponse = fullFetch
      ? await PlaylistRepo.findPopulatedById(id, "tracks")
      : await PlaylistRepo.findById(id);

    if (dbResponse.error) {
      res.status(400).send({
        data: null,
        error: dbResponse.error,
      });
    }

    if (dbResponse.data) {
      if (dbResponse.data) {
        res.status(200).send({
          data: dbResponse.data,
          error: null,
        });
      }
    }
  } catch (err) {
    next(err);
  }
}

async function fetchPlaylists(req, res, next) {
  const {
    query: { fullFetch = false, ...rest },
  } = req;

  try {
    let dbResponse = fullFetch ? PlaylistRepo.findPopulated(rest, "tracks") : await PlaylistRepo.find(rest);

    if (dbResponse.error) {
      res.status(400).send({
        data: null,
        error: dbResponse.error,
      });
    }

    if (dbResponse.data) {
      res.status(200).send({
        data: dbResponse.data,
        error: null,
      });
    }
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createPlaylist: createPlaylist,
  updatePlaylist: updatePlaylist,
  fetchPlaylists: fetchPlaylists,
  fetchPlaylistById: fetchPlaylistById,
};

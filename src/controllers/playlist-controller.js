const { playlistService } = require("../services");

async function createPlaylist(req, res, next) {
  const {
    user: { uid },
  } = req;

  try {
    const playlist = await playlistService.createPlaylist(req.body, uid);
    return res.status(200).send(playlist);
  } catch (err) {
    next(err);
  }
}

async function deletePlaylist(req, res, next) {
  const {
    query: { id },
  } = req;

  try {
    await playlistService.deletePlaylist(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

async function updatePlaylist(req, res, next) {
  const {
    query: { id },
  } = req;

  try {
    const updatedPlaylist = playlistService.updatePlaylist(id, req.body);
    return res.status(200).send(updatedPlaylist);
  } catch (err) {
    next(err);
  }
}

async function fetchPlaylists(req, res, next) {
  const {
    query: { fullFetch = false, ...rest },
    user: { uid },
  } = req;

  try {
    const playlists = await playlistService.getPlaylists(rest, fullFetch);
    const playlistsWithOwnedAndFollowed = playlists.map((playlist) => ({
      ...playlist,
      followed: playlist.followedBy.includes(uid),
      owned: playlist.author === uid,
    }));

    return res.status(200).send(playlistsWithOwnedAndFollowed);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createPlaylist: createPlaylist,
  updatePlaylist: updatePlaylist,
  fetchPlaylists: fetchPlaylists,
  deletePlaylist: deletePlaylist,
};

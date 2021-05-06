const { response } = require("express");
const Playlist = require("../models/playlist-model");
const { playlistService, trackService } = require("../services");

async function createPlaylist(req, res, next) {
  const {
    user: { uid },
    body: { ...playlist },
  } = req;

  try {
    const created = await playlistService.createPlaylist(playlist, uid);
    return res.status(200).send(created);
  } catch (err) {
    next(err);
  }
}

async function deletePlaylist(req, res, next) {
  const {
    params: { id },
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
    params: { id },
    body: { ...playlist },
  } = req;

  try {
    const updated = await playlistService.updatePlaylists(id, playlist);
    return res.status(200).send(updated);
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

async function followPlaylist(req, res, next) {
  const {
    query: { id, followed },
    user: { uid },
  } = req;

  try {
    if (followed) {
      await playlistService.addFollowedBy(id, uid);
    } else {
      await playlistService.removeFollowedBy(id, uid);
    }
    return res.status(200).send(followed);
  } catch (error) {
    next(error);
  }
}

async function addTrackToPlaylist(req, res, next) {
  const {
    query: { id },
    body: { trackId },
  } = req;

  try {
    const response = await playlistService.addTrackToPlaylist(id, trackId);
    return res.status(200).send(response);
  } catch (error) {
    next(error);
  }

}

module.exports = {
  createPlaylist: createPlaylist,
  updatePlaylist: updatePlaylist,
  fetchPlaylists: fetchPlaylists,
  deletePlaylist: deletePlaylist,
  followPlaylist: followPlaylist,
  addTrackToPlaylist: addTrackToPlaylist,
};

const playlistModel = require("../models/playlist-model");

class PlaylistService {
  createPlaylist(track, authorId) {
    return playlistModel.create({
      ...track,
      author: authorId,
    });
  }

  getPlaylists(filter = {}, populateTracks = false) {
    return populateTracks
      ? playlistModel.find(filter).populate("tracks").lean()
      : playlistModel.find(filter).lean();
  }

  addTrackToPlaylist(id, trackId) {
    return playlistModel.updateOne(
      {
        _id: id,
      },
      {
        $addToSet: {
          tracks: trackId,
        },
      },
    );
  }

  removeTrackFromPlaylist(id, trackId) {
    return playlistModel.updateOne(
      { _id: id },
      {
        $pull: {
          tracks: trackId,
        },
      },
    );
  }

  updatePlaylists(id, playlist) {
    return playlistModel.findByIdAndUpdate(id, playlist, {
      new: true,
    });
  }

  addFollowedBy(id, uid) {
    return playlistModel.updateOne(
      { _id: id },
      {
        $addToSet: {
          followedBy: uid,
        },
      },
    );
  }

  removeFollowedBy(id, uid) {
    return playlistModel.updateOne(
      { _id: id },
      {
        $pull: {
          followedBy: uid,
        },
      },
    );
  }

  deletePlaylist(id) {
    return playlistModel.findByIdAndDelete(id);
  }
}

module.exports = new PlaylistService();

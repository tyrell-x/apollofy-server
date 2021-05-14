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

  getOwnedPlaylist(uid) {
    return playlistModel.find({ author: uid }).populate("tracks").lean();
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

  updatePlaylist(id, playlist) {
    return playlistModel.findByIdAndUpdate(id, playlist, {
      new: true,
    });
  }

  addFollowedBy(id, uid) {
    return playlistModel.findByIdAndUpdate(
      id,
      {
        $addToSet: {
          followedBy: uid,
        },
      },
      {
        new: true
      }
    );
  }

  removeFollowedBy(id, uid) {
    return playlistModel.findByIdAndUpdate(
      id,
      {
        $pull: {
          followedBy: uid,
        },
      },
      {
        new: true
      }
    );
  }

  deletePlaylist(id) {
    return playlistModel.findByIdAndDelete(id);
  }

  findPlaylists(text) {
    return playlistModel
      .find({
        title: {
          $regex: `.*${text}.*`
        }
      })
      .populate("tracks")
      .lean();
  }
}

module.exports = new PlaylistService();

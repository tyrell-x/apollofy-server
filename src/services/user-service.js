const userModel = require("../models/user-model");

class UserService {
  findOrCreateUser(id, user) {
    return userModel.findOneAndUpdate({ _id: id }, user, {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
      runValidators: true,
    });
  }

  updateUser(id, user) {
    return userModel.updateOne(
      {
        _id: id,
      },
      user,
      {
        new: true,
      },
    );
  }

  getUserById(id) {
    return userModel.findById(id);
  }

  async getOwnedTracks(id) {
    const user = await userModel
      .findById(id)
      .populate("ownedTracks")
      .select("ownedTracks");
    return user.ownedTracks;
  }

  async getLikedTracks(id) {
    const user = await userModel
      .findById(id)
      .populate("likedTracks")
      .select("likedTracks");
    return user.likedTracks.map((track) => ({
      ...track,
      liked: true,
    }));
  }

  addLikedTrack(id, trackId) {
    return userModel.updateOne(
      { _id: id },
      {
        $addToSet: {
          likedTracks: trackId,
        },
      },
    );
  }

  removeLikedTrack(id, trackId) {
    return userModel.updateOne(
      { _id: id },
      {
        $pull: {
          likedTracks: trackId,
        },
      },
    );
  }

  addFollowedPlaylist(id, playlistId) {
    return userModel.updateOne(
      { _id: id },
      {
        $addToSet: {
          followedPlaylist: playlistId,
        },
      },
    );
  }

  removeFollowedPlaylist(id, playlistId) {
    return userModel.updateOne(
      { _id: id },
      {
        $pull: {
          followedPlaylist: playlistId,
        },
      },
    );
  }

  addOwnedTrack(id, trackId) {
    return userModel.updateOne(
      {
        _id: id,
      },
      {
        $push: {
          ownedTracks: trackId,
        },
      },
    );
  }

  addOwnedPlaylist(id, playlistId) {
    return userModel.updateOne(
      {
        _id: id,
      },
      {
        $push: {
          ownedPlaylists: playlistId,
        },
      },
    );
  }
}

module.exports = new UserService();

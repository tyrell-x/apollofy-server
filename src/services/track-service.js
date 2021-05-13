const trackModel = require("../models/track-model");

class TrackService {
  createTrack(track) {
    return trackModel.create(track);
  }

  getTracks(filter = {}) {
    return trackModel.find(filter).lean();
  }

  getLikedTracksByUid(uid) {
    return trackModel.find({ likedBy: uid }).lean();
  }

  getOwnedTracksByUid(uid) {
    return trackModel.find({ ownedBy: uid }).lean();
  }

  updateTrack(id, track) {
    return trackModel.findByIdAndUpdate(id, track, {
      new: true,
    });
  }

  addLikedBy(id, uid) {
    return trackModel.updateOne(
      { _id: id },
      {
        $addToSet: {
          likedBy: uid,
        },
      },
    );
  }

  removeLikedBy(id, uid) {
    return trackModel.updateOne(
      { _id: id },
      {
        $pull: {
          likedBy: uid,
        },
      },
    );
  }

  deleteTrack(id) {
    return trackModel.findByIdAndDelete(id);
  }

  findTracks(text) {
    return trackModel
    .find({
      title: {
        $regex: `.*${text}.*`
      }
    });
  }
}

module.exports = new TrackService();

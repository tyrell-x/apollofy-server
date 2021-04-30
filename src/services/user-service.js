const userModel = require("../models/user-model");

class UserService {
  createUser(genres) {
    return userModel.insertMany(genres);
  }

  async getOwnedTracks(uid) {
    const user = await userModel
      .findById(uid)
      .populate("ownedTracks")
      .select("ownedTracks");
    return user.ownedTracks;
  }

  async getLikedTracks(uid) {
    const user = await userModel
      .findById(uid)
      .populate("likedTracks")
      .select("likedTracks");
    return user.likedTracks;
  }

  async toggleLikedTrack(uid, trackId) {
		let user = await userModel.findById(uid);
    const likedTracks = user.likedTracks;
    const likedTrackIndex = likedTracks.findIndex(
      (trackIdDb) => trackIdDb == trackId,
    );


    if (likedTrackIndex === -1) {
      await userModel.updateOne(
        { _id: uid },
        {
          $push: {
            likedTracks: trackId,
          },
        },
      );
    } else {
      await userModel.updateOne(
        { _id: uid },
        {
          $pull: {
            likedTracks: trackId,
          },
        },
      );
    }

		return likedTrackIndex === -1;

		/*
		const pullUpdate = await userModel.findOneAndUpdate({
			_id: uid,
			likedTracks: {
				$elemMatch: {
					$eq: trackId
				}
			}
		}, {

		})
		*/
    /*
    return userModel.findById(
      {
        _id: uid,
      },
      function (err, model) {
				console.log(model)
        if (model.likedTracks.indexOf(trackId) !== -1) {
          model.likedTracks.pull(trackId);
        } else {
          model.likedTracks.addToSet(trackId);
        }
				console.log(model)
        model.save();
      }
    );
		*/
    /*
		return userModel.findByIdAndUpdate(uid,
			[
					{
							$set: {
								tracksLiked: {
											$cond: [
													{
															$all: [trackId]
													},
													{
															$push: ["$tracksLiked", [trackId]]
													},
													{
															$concatArrays: ["$tracksLiked", [trackId]]
													}
											]
									}
							}
					}
			])
			*/
  }

  addOwnedTrack(userId, trackId) {
    return userModel.updateOne(
      {
        _id: userId,
      },
      {
        $push: {
          ownedTracks: trackId,
        },
      },
    );
  }
}

module.exports = new UserService();

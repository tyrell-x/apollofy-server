const userModel = require("../models/user-model");

class UserService {
  async findOrCreateUser(id, user) {
    let existing = await userModel.findById(id).populate("followedBy").lean();
    if (!existing) {
      existing = await userModel.create({ ...user, _id: id });
    }
    return existing;
  }

  getUserById(id) {
    return userModel.findById(id).populate("followedBy").lean();
  }

  getUsers(filter = {}) {
    return userModel.find(filter).populate("followedBy").lean();
  }

  getFollowing(uid) {
    return userModel.find({
      followedBy: {
        $elemMatch: {
          $eq: uid,
        },
      },
    });
  }

  updateEmail(id, email) {
    return userModel.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          email: email,
        },
      },
      {
        new: true,
      },
    );
  }

  updateUser(id, user) {
    return userModel.findByIdAndUpdate(id, user, {
      new: true,
    });
  }

  findUsers(text) {
    return userModel.find({
      firstName: {
        $regex: `.*${text}.*`
      }
    });
  }

  addFollowedBy(uid, id) {
    return userModel.findByIdAndUpdate(
      uid,
      {
        $addToSet: {
          followedBy: id,
        },
      },
      {
        new: true
      }
    );
  }

  removeFollowedBy(uid, id) {
    return userModel.findByIdAndUpdate(
      uid,
      {
        $pull: {
          followedBy: id,
        },
      },
      {
        new: true
      }
    );
  }

}

module.exports = new UserService();

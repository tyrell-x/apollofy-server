const e = require("express");
const userModel = require("../models/user-model");

class UserService {
  async findOrCreateUser(id, user) {
    let existing = await userModel.findById(id).populate("followedBy");
    if (!existing) {
      existing = await userModel.create({ ...user, _id: id });
    }
    return existing;
  }

  getUserById(id) {
    return userModel.findById(id).populate("followedBy");
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

  addFollowedBy(uid, id) {
    return userModel.updateOne(
      { _id: uid },
      {
        $addToSet: {
          followedBy: id,
        },
      },
    );
  }

  removeFollowedBy(uid, id) {
    return userModel.updateOne(
      { _id: uid },
      {
        $pull: {
          followedBy: id,
        },
      },
    );
  }
}

module.exports = new UserService();

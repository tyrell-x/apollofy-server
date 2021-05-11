const e = require("express");
const userModel = require("../models/user-model");

class UserService {
  async findOrCreateUser(id, user) {
    let existing = await userModel.findById(id);
    if (!existing) {
      existing = await userModel.create({ ...user, _id: id });
    }
    return existing;
  }

  getUserById(id) {
    return userModel.findById(id);
  }

  getUsers(filter = {}) {
    return userModel.find(filter).lean();
  }

  getFollowing(uid){
    return userModel.find({
      followedBy: {
        $elemMatch: {
          $eq: uid
        }
      }
    });
  }

  getFollowers(uid){
    return userModel.find({
      followedBy: {
        $elemMatch: {
          $eq: uid
        }
      }
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

}

module.exports = new UserService();

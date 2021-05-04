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
}

module.exports = new UserService();

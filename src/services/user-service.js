const userModel = require("../models/user-model");

class UserService {
  async findOrCreateUser(id, user) {
    let existing = await userModel.findById(id);
    if (!existing) {
      existing = await userModel.create({ ...user, _id: id });
    }
    return existing;
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

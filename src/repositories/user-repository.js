const db = require("../models");
const normalizeDBQuery = require("../utils/normalizeDBQuery");

class UserRepository {
  create(doc) {
    return normalizeDBQuery(db.User.create(doc));
  }

  findOne(filter) {
    return normalizeDBQuery(db.User.findOne(filter));
  }

  findOnePopulated(filter, populatedWith) {
    return normalizeDBQuery(db.User.findOne(filter).populate(populatedWith));
  }

  updateOne(filter, update) {
    return normalizeDBQuery(db.User.updateOne(filter, update));
  }
}

module.exports = new UserRepository();

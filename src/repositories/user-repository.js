const db = require("../models");
const normalizeDBQuery = require("../utils/normalizeDBQuery");

class UserRepository {
  create(options) {
    return normalizeDBQuery(db.User.create(options));
  }

  findOne(query) {
    return normalizeDBQuery(db.User.findOne(query));
  }

  findOnePopulatedBy(query, populatedWith) {
    return normalizeDBQuery(db.User.findOne(query).populate(populatedWith));
  }

  updateOne(query, update) {
    return normalizeDBQuery(db.User.updateOne(query, update));
  }
}

module.exports = new UserRepository();

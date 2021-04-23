const db = require("../models");
const normalizeDBQuery = require("../utils/normalizeDBQuery");

class TrackRepository {
  create(options) {
    return normalizeDBQuery(db.Track.create(options));
  }

  findOne(query) {
    return normalizeDBQuery(db.Track.findOne(query, "-__v"));
  }

  findOnedAndDelete(query) {
    return normalizeDBQuery(db.Track.findOneAndDelete(query));
  }
}

module.exports = new TrackRepository();

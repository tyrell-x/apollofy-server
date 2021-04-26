const db = require("../models");
const normalizeDBQuery = require("../utils/normalizeDBQuery");

class TrackRepository {
  create(options) {
    return normalizeDBQuery(db.Track.create(options));
  }

  find(query) {
    return normalizeDBQuery(db.Track.find(query, "-__v"));
  }

  findOne(query) {
    return normalizeDBQuery(db.Track.findOne(query, "-__v"));
  }

  findOnedAndDelete(query) {
    return normalizeDBQuery(db.Track.findOneAndDelete(query));
  }

  updateOne(query, update) {
    return normalizeDBQuery(db.Track.updateOne(query, update));
  }
}

module.exports = new TrackRepository();

const db = require("../models");
const normalizeDBQuery = require("../utils/normalizeDBQuery");

class TrackRepository {
  create(options) {
    return normalizeDBQuery(db.Track.create(options));
  }

  find(query) {
    return normalizeDBQuery(db.Track.find(query));
  }

  findOne(query) {
    return normalizeDBQuery(db.Track.findOne(query));
  }

  updateOne(query, update) {
    return normalizeDBQuery(db.Track.updateOne(query, update));
  }

  findOneAndDelete(query) {
    return normalizeDBQuery(db.Track.findOneAndDelete(query));
  }
}

module.exports = new TrackRepository();

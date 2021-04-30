const db = require("../models");
const normalizeDBQuery = require("../utils/normalizeDBQuery");

class PlaylistRepository {
  create(doc) {
    return normalizeDBQuery(db.Playlist.create(doc));
  }

  find(filter) {
    return normalizeDBQuery(db.Playlist.find(filter));
  }

  findPopulated(filter, populatedWith) {
    return normalizeDBQuery(db.Playlist.find(filter).populate(populatedWith));
  }

  findById(id) {
    return normalizeDBQuery(db.Playlist.findById(id));
  }

  findByIdPopulated(id, populatedWith) {
    return normalizeDBQuery(db.Playlist.findById(id).populate(populatedWith));
  }

  findOne(filter) {
    return normalizeDBQuery(db.Playlist.findOne(filter));
  }

  findOneAndUpdate(filter, update, options) {
    return normalizeDBQuery(
      db.Playlist.findOneAndUpdate(filter, update, options),
    );
  }

  findOneAndDelete(query) {
    return normalizeDBQuery(db.Playlist.findOneAndDelete(query));
  }

  updateOne(filter, update) {
    return normalizeDBQuery(db.Playlist.updateOne(filter, update));
  }
}

module.exports = new PlaylistRepository();

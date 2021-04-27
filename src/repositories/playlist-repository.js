const db = require("../models");
const normalizeDBQuery = require("../utils/normalizeDBQuery");

class PlaylistRepository {
  create(options) {
    return normalizeDBQuery(db.Playlist.create(options));
  }

  update(options) {
    return normalizeDBQuery(
      db.Playlist.updateOne({ _id: options._id }, options),
    );
  }

  find(query) {
    return normalizeDBQuery(db.Playlist.find(query));
  }

  findPopulated(query, populatedWith) {
    return normalizeDBQuery(db.Playlist.find(query).populate(populatedWith));
  }

  findOne(query) {
    return normalizeDBQuery(db.Playlist.findOne(query));
  }

  findOneAndUpdate(queryFilter, queryData, queryOptions) {
    return normalizeDBQuery(
      db.Playlist.findOneAndUpdate(queryFilter, queryData, queryOptions),
    );
  }

  findById(id) {
    return normalizeDBQuery(db.Playlist.findById(id));
  }

  findPopulatedById(id, populatedWith) {
    return normalizeDBQuery(db.Playlist.findById(id).populate(populatedWith));
  }
}

module.exports = new PlaylistRepository();

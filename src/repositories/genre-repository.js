const db = require("../models");
const normalizeDBQuery = require("../utils/normalizeDBQuery");

class GenreRepository {
  create(options) {
    return normalizeDBQuery(db.Genre.create(options));
  }

  find(query) {
    return normalizeDBQuery(db.Genre.find(query));
  }

  findOne(query) {
    return normalizeDBQuery(db.Genre.findOne(query));
  }

  findById(id) {
    return normalizeDBQuery(db.Genre.findById(id));
  }

  updateMany(query, update) {
    return normalizeDBQuery(db.Genre.updateMany(query, update));
  }

  updateOne(query, update) {
    return normalizeDBQuery(db.Genre.updateOne(query, update));
  }

  findOrUpdate(query, update) {
    return normalizeDBQuery(
      db.Genre.findOneAndUpdate(query, update, {
        upsert: true,
        returnOriginal: false,
      }),
    );
  }

  findOneAndDelete(query) {
    return normalizeDBQuery(db.Genre.findOneAndDelete(query));
  }
}

module.exports = new GenreRepository();

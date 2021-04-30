const db = require("../models");
const normalizeDBQuery = require("../utils/normalizeDBQuery");

class GenreRepository {
  create(doc) {
    return normalizeDBQuery(db.Genre.create(doc));
  }

  insertMany(doc) {
    return normalizeDBQuery(db.Genre.insertMany(doc));
  }

  find(filter) {
    return normalizeDBQuery(db.Genre.find(filter));
  }

  findOne(filter) {
    return normalizeDBQuery(db.Genre.findOne(filter));
  }

  findById(id) {
    return normalizeDBQuery(db.Genre.findById(id));
  }

  findOrUpdate(filter, update) {
    return normalizeDBQuery(
      db.Genre.findOneAndUpdate(filter, update, {
        upsert: true,
        returnOriginal: false,
      }),
    );
  }

  findOneAndDelete(filter) {
    return normalizeDBQuery(db.Genre.findOneAndDelete(filter));
  }

  updateMany(filter, update) {
    return normalizeDBQuery(db.Genre.updateMany(filter, update));
  }

  updateOne(filter, update) {
    return normalizeDBQuery(db.Genre.updateOne(filter, update));
  }
}

module.exports = new GenreRepository();

const genreModel = require("../models/genre-model");

class GenreService {
  getGenres(filter = {}) {
    return genreModel.find(filter).lean();
  }

  getGenreById(id) {
    return genreModel.findById(id);
  }

  createGenre(genre) {
    return genreModel.create(genre);
  }

  createGenres(genres) {
    return genreModel.insertMany(genres);
  }

  createGenresWithNames(genreNames) {
    return Promise.all(
      genreNames.map(
        async (name) =>
          await genreModel.findOneAndUpdate(
            { name: name },
            { name: name },
            {
              upsert: true,
              new: true,
              setDefaultsOnInsert: true,
            },
          ),
      ),
    );
  }

  addTrackToGenres(ids, trackId) {
    return genreModel.updateMany(
      {
        _id: {
          $in: ids,
        },
      },
      {
        $addToSet: {
          trackIds: trackId,
        },
      },
    );
  }

  removeTrackFromGenres(ids, trackId) {
    return genreModel.updateMany(
      { _id: ids },
      {
        $pull: {
          trackIds: trackId,
        },
      },
    );
  }
}

module.exports = new GenreService();

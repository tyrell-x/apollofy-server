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
      genreNames.map(name => name.toLowerCase()).map(
        async (name) => {
          let existing = await genreModel.findOne({
            name: name
          });
          if (!existing) {
            existing = await genreModel.create({ 
              name: name
            });
          }
          return existing;
        }
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

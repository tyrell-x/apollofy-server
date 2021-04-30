const genreModel = require("../models/genre-model");

class GenreService {
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

  addTrackToGenres(genreIds, trackId) {
    return genreModel.updateMany(
      {
        _id: {
          $in: genreIds,
        },
      },
      {
        $addToSet: {
          trackIds: trackId,
        },
      },
    );
  }

  removeTrackFromGenres(genreIds, trackId) {
    return genreModel.updateMany(
      { _id: genreIds },
      {
        $pull: {
          trackIds: trackId,
        },
      },
    );
  }
}

module.exports = new GenreService();

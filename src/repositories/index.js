const UserRepository = require("./user-repository");
const TrackRepository = require("./track-repository");
const GenreRepository = require("./genre-repository");

module.exports = {
  UserRepo: UserRepository,
  TrackRepo: TrackRepository,
  GenreRepo: GenreRepository
};

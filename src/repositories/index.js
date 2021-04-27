const UserRepository = require("./user-repository");
const TrackRepository = require("./track-repository");
const GenreRepository = require("./genre-repository");
const playlistRepository = require("./playlist-repository");

module.exports = {
  UserRepo: UserRepository,
  TrackRepo: TrackRepository,
  GenreRepo: GenreRepository,
  PlaylistRepo: playlistRepository
};

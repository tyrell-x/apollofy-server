const UserModel = require("./user-model");
const TrackModel = require("./track-model");
const GenreModel = require("./genre-model");
const PlaylistModel = require("./playlist-model");

module.exports = {
  User: UserModel,
  Track: TrackModel,
  Genre: GenreModel,
  Playlist: PlaylistModel
};

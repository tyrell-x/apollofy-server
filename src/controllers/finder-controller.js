
const { userService, trackService, playlistService } = require("../services");

async function find(req, res, next) {
  const {
    query: { text },
  } = req;

  try {
    const playlists = await playlistService.findPlaylists(text);
    const tracks = await trackService.findTracks(text);
    const users = await userService.findUsers(text);
    return res.status(200).send({
      playlists, tracks, users
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  find: find,
};

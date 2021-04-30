const { genreService } = require("../services");

async function createGenre(req, res, next) {
  try {
    const newGenre = genreService.createGenre(req.body);
    return res.status(200).send(newGenre);
  } catch (err) {
    next(err);
  }
}

async function fetchGenres(req, res, next) {
  const { query } = req;

  try {
    const genres = genreService.find(query);
    return res.status(200).send(genres);
  } catch (err) {
    next(err);
  }
}

async function fetchGenreById(req, res, next) {
  const {
    query: { id },
  } = req;
  try {
    const genre = genreService.getGenreById(id);
    return res.status(200).send(genre);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createGenre: createGenre,
  fetchGenres: fetchGenres,
  fetchGenreById: fetchGenreById,
};

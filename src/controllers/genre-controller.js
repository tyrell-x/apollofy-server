const { GenreRepo } = require("../repositories");
const { handleDbResponse } = require("../repositories/repo-utils");

async function createGenre(req, res, next) {
  const {
    body: { name },
  } = req;

  try {
    if (!name) {
      return res.status(400).send({
        data: null,
        error: "Bad request",
      });
    }

    const dbResponse = await GenreRepo.create({
      name: name,
    });

    handleDbResponse(res, dbResponse);
  } catch (err) {
    next(err);
  }
}

async function fetchGenres(req, res, next) {
  const { query } = req;

  try {
    const dbResponse = await GenreRepo.find(query);
    handleDbResponse(res, dbResponse);
  } catch (err) {
    next(err);
  }
}

async function fetchGenreById(req, res, next) {
  const {
    query: { id },
  } = req;
  try {
    const dbResponse = await GenreRepo.findById(id);
    handleDbResponse(res, dbResponse);
  } catch (err) {
    next(err);
  }
}

async function fetchGenreByName(req, res, next) {
  const {
    query: { name },
  } = req;
  try {
    const dbResponse = await GenreRepo.findOne({
      name: name,
    });
    handleDbResponse(res, dbResponse);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createGenre: createGenre,
  fetchGenres: fetchGenres,
  fetchGenreById: fetchGenreById,
  fetchGenreByName: fetchGenreByName,
};

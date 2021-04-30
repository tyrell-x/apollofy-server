const { auth } = require("../services");
const logger = require("../logger");

async function authMiddleware(req, res, next) {
  try {
    const bearerToken = await auth.getAuthToken(req.headers);
    const userClaims = await auth.verifyAuthToken(bearerToken);

    auth.login(req, userClaims);

    next();
  } catch (error) {
    logger.debug(error);

    res.status(401).send("Unauthorized");
  }
}

module.exports = {
  authMiddleware: authMiddleware,
};

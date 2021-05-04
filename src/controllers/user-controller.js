const { userService, trackService } = require("../services");
const { fbUpdateEmail } = require("../services/auth/auth-provider");

async function signUp(req, res, next) {
  const {
    user: { uid },
    body: { _id, ...user },
  } = req;

  if (req.body?.email === null) {
    return res.status(400).send("unkown request");
  }

  try {
    const current = await userService.findOrCreateUser(uid, user);
    res.status(200).send(current);
  } catch (error) {
    next(error);
  }
}

async function updateUser(req, res, next) {
  const {
    user: { uid },
    body: { email },
  } = req;

  const user = req.body;

  try {
    if (email) {
      await fbUpdateEmail(uid, email);
    }

    const updated = userService.updateUser(uid, user);

    res.status(200).send(updated);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  signUp: signUp,
  updateUser: updateUser,
};

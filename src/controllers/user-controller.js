const { UserRepo } = require("../repositories");

const { fbUpdateEmail } = require("../services/auth/auth-provider");

async function signUp(req, res, next) {
  const { uid, email } = req.user;

  try {
    const response = await UserRepo.findOne({ _id: uid });

    if (response.error) {
      return res.status(400).send({
        data: null,
        error: response.error,
      });
    }

    if (response.data) {
      return res.status(200).send({
        data: response.data,
        error: null,
      });
    }

    await UserRepo.create({
      _id: uid,
      email: email,
      ...req.body,
    });

    res.status(201).send({
      data: {
        _id: uid,
        email: email,
      },
      error: null,
    });
  } catch (error) {
    next(error);
  }
}

async function signOut(req, res) {
  req.signOut();

  res.status(200).send({
    data: "OK",
    error: null,
  });
}

async function updateEmail(req, res, next) {
  try {
    await UserRepo.updateOne({ _id: req.user.uid }, { email: req.query.email });
    await fbUpdateEmail(req.user.uid, req.query.email);

    return res.status(204).send({
      data: "OK",
      error: null,
    });
  } catch (error) {
    next(error);
  }
}

async function updateUser(req, res, next) {

  const { uid } = req.user
  console.log(req.user);

  try {

    await UserRepo.updateOne(
      { _id: uid },
      {
        $set: req.body
      }
    );

    res.status(200).send({ data: req.body, error: null });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  signUp: signUp,
  signOut: signOut,
  updateEmail: updateEmail,
  updateUser: updateUser
};

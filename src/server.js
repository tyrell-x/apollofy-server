const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const { json } = require("body-parser");
const cors = require("cors");

const { config } = require("./config");
const { errorMiddleware } = require("./middlewares");
const {
  userRouter,
  genreRouter,
  trackRouter,
  playlistRouter,
  finderRouter
} = require("./routes");

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(json());
app.use(
  cors({
    origin: config.client.url,
  }),
);

app.use("/user", userRouter);
app.use("/track", trackRouter);
app.use("/playlist", playlistRouter);
app.use("/genre", genreRouter);
app.use("/search", finderRouter);

app.get("/", (req, res) => {
  res.status(200).send({
    data: "hello-world",
  });
});

app.use(errorMiddleware);

module.exports = {
  app: app,
};

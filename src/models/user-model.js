const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const { isEmail } = require("validator");

const UserSchema = Schema(
  {
    _id: String,
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    locale: {
      type: String,
      trim: true,
    },
    pictureUrl: {
      type: String,
      trim: true,
      default:
        "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg",
    },
    phoneNumer: {
      type: Number,
      trim: true,
    },
    likedTracks: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "track",
        },
      ],
      default: [],
    },
    ownedTracks: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "track",
        },
      ],
      default: [],
    },
    followedPlaylists: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "playlist",
        },
      ],
      default: [],
    },
    ownedPlaylists: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "playlist",
        },
      ],
      default: [],
    },
    email: {
      type: String,
      required: [true, "The email is required"],
      trim: true,
      unique: true,
      validate: {
        validator: (value) => isEmail(value),
        message: (props) => `The email ${props.value} is not valid`,
      },
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("user", UserSchema);

module.exports = User;
